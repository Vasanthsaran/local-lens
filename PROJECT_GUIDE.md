# Local Lens - Project Documentation & Guide

## 1. Project Overview
**Local Lens** is a full-stack web application designed to help users discover authentic local places, traditional food, cultural experiences, and custom AI-generated itineraries for various regions across India.

---

## 2. Work Completed So Far

### Backend (`FastAPI`)
- Created REST API endpoints:
  - `/api/places`: Retrieves popular regional landmarks and tourist spots.
  - `/api/food`: Retrieves traditional food items, price, ratings, and local trust scores.
  - `/api/culture`: Retrieves heritage experiences and art forms.
  - `/api/search`: Unified search across places, food, and culture.
  - `/api/ai/trip-planner`: Custom multi-day trip planner logic.
  - `/api/trust-scores`: Local trust score calculation engine.
- Configured CORS middleware to support seamless frontend integration.

### Frontend (`Next.js` + `Tailwind CSS`)
- Designed responsive user interface with:
  - Hero banner with location/region search selector.
  - Category cards grid for quick browsing.
  - Popular Places Carousel with interactive details modal.
  - Food Grid with local trust scores and pricing.
  - Interactive Map View (`Leaflet` / `React-Leaflet`).
  - Floating AI Trip Planner modal.

---

## 3. Tech Stack & Skillsets Used

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI & Icons**: Lucide React, Framer Motion
- **Maps**: Leaflet, React-Leaflet

### Backend
- **Framework**: FastAPI (Python 3.8+)
- **Data Validation**: Pydantic
- **Web Server**: Uvicorn
- **API Architecture**: RESTful API design with CORS handling

### DevOps & Tooling
- Shell scripts (`start.sh`)
- Node.js & npm package management
- Python virtual environment (`venv`) management

---

## 4. How to Run the Application

### Prerequisites
Make sure you have installed:
- **Python 3.8+**
- **Node.js 18+** & **npm**

---

### Installation Steps

#### Step 1: Install Backend Dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

### Running the Project

#### Option 1: Quick Start (Single Script)
```bash
chmod +x start.sh
./start.sh
```

#### Option 2: Manual Start (Two Terminals)

**Terminal 1 — Backend (Port 8000):**
```bash
cd backend
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 — Frontend (Port 3000):**
```bash
cd frontend
npm run dev -- -p 3000
```

---

## 5. Application Access URLs
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Interactive API Documentation (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)
