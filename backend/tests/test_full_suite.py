import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app, TripPlannerRequest, TrustScoreRequest

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["app"] == "Local Lens API"

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_places():
    response = client.get("/api/places")
    assert response.status_code == 200
    places = response.json()
    assert len(places) > 0
    assert places[0]["id"] == "rk-beach"

def test_get_places_filter_category():
    response = client.get("/api/places?category=Coastal")
    assert response.status_code == 200
    places = response.json()
    assert len(places) >= 1
    assert "Coastal" in places[0]["category"]

def test_get_place_by_id_success():
    response = client.get("/api/places/borra-caves")
    assert response.status_code == 200
    assert response.json()["name"] == "Borra Caves"

def test_get_place_by_id_404():
    response = client.get("/api/places/unknown-id")
    assert response.status_code == 404

def test_get_food():
    response = client.get("/api/food")
    assert response.status_code == 200
    foods = response.json()
    assert len(foods) >= 4

@pytest.mark.parametrize("dish_name, expected_score", [
    ("Bamboo Chicken", 99.2),
    ("Andhra Meals", 98.5),
    ("Pesarattu", 95.0),
])
def test_trust_scores_parametrized(dish_name, expected_score):
    payload = {"dish_name": dish_name, "region": "Andhra Pradesh"}
    response = client.post("/api/trust-scores", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["trust_score"] == pytest.approx(expected_score)

def test_ai_trip_planner_mocked(mocker):
    # Mocking external Claude API reasoning pipeline
    mock_claude_response = {
        "destination": "Andhra Pradesh",
        "days": 2,
        "itinerary": [
            {"day": 1, "title": "Beach Day", "morning": "RK Beach", "afternoon": "Thali", "evening": "Submarine Museum", "stay": "Beach Resort"},
            {"day": 2, "title": "Hill Day", "morning": "Araku Valley", "afternoon": "Bamboo Chicken", "evening": "Coffee tour", "stay": "Cottage"}
        ],
        "recommendations": ["Carry water"],
        "ai_notes": "Mocked Claude API Response"
    }
    
    payload = {
        "region": "Andhra Pradesh",
        "days": 2,
        "interests": ["Beaches", "Food"],
        "budget": "moderate"
    }
    
    response = client.post("/api/ai/trip-planner", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert res["destination"] == "Andhra Pradesh"
    assert res["days"] == 2
    assert len(res["itinerary"]) == 2

def test_unified_search():
    response = client.get("/api/search?q=gongura")
    assert response.status_code == 200
    res = response.json()
    assert len(res["foods"]) >= 1
    assert res["foods"][0]["name"] == "Gongura Pachadi"
