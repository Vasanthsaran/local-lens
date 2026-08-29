import pytest
from fastapi.testclient import TestClient

def test_root_endpoint(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "Local Lens API"
    assert data["status"] == "online"

def test_health_endpoint(client: TestClient):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_places(client: TestClient):
    response = client.get("/api/places")
    assert response.status_code == 200
    places = response.json()
    assert isinstance(places, list)
    assert len(places) >= 4
    # Check RK Beach
    rk_beach = next((p for p in places if p["id"] == "rk-beach"), None)
    assert rk_beach is not None
    assert rk_beach["rating"] == 4.5

def test_get_places_filtered_by_region(client: TestClient):
    response = client.get("/api/places?region=Andhra Pradesh")
    assert response.status_code == 200
    places = response.json()
    assert all("Andhra Pradesh" in p["region"] for p in places)

def test_get_place_by_id(client: TestClient):
    response = client.get("/api/places/araku-valley")
    assert response.status_code == 200
    place = response.json()
    assert place["name"] == "Araku Valley"
    assert place["rating"] == 4.6

def test_get_place_not_found(client: TestClient):
    response = client.get("/api/places/non-existent-place")
    assert response.status_code == 404

def test_get_foods(client: TestClient):
    response = client.get("/api/food")
    assert response.status_code == 200
    foods = response.json()
    assert isinstance(foods, list)
    assert len(foods) >= 4
    # Verify Bamboo Chicken
    bamboo = next((f for f in foods if f["id"] == "bamboo-chicken"), None)
    assert bamboo is not None
    assert bamboo["price"] == 250

def test_ai_trip_planner(client: TestClient):
    payload = {
        "region": "Andhra Pradesh",
        "days": 3,
        "interests": ["Beaches", "Food", "Nature"],
        "budget": "moderate"
    }
    response = client.post("/api/ai/trip-planner", json=payload)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["destination"] == "Andhra Pradesh"
    assert res_data["days"] == 3
    assert len(res_data["itinerary"]) == 3

def test_trust_score(client: TestClient):
    payload = {
        "dish_name": "Bamboo Chicken",
        "region": "Andhra Pradesh"
    }
    response = client.post("/api/trust-scores", json=payload)
    assert response.status_code == 200
    score_data = response.json()
    assert score_data["trust_score"] == 99.2
    assert score_data["local_mentions_count"] > 1000

def test_unified_search(client: TestClient):
    response = client.get("/api/search?q=Araku")
    assert response.status_code == 200
    search_res = response.json()
    assert search_res["total_results"] > 0
