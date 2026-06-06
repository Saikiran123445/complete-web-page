# DSK Interiors Frontend

React-based frontend for DSK Interiors website

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Endpoint
Edit `.env` file (already configured for localhost):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Ensure Backend is Running
Make sure the backend server is running on port 5000:
```bash
cd ../backend
npm start
```

### 4. Start Development Server
```bash
npm start
```

The app will open at http://localhost:3000

### 5. Build for Production
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      - React components
│   ├── services/        - API integration
│   ├── App.jsx         - Main app component
│   ├── index.js        - Entry point
│   └── index.css       - Styles
├── public/             - Static files
└── package.json
```

## Features

- ✅ Gallery with backend integration
- ✅ Services listing
- ✅ Contact form with inquiry submission
- ✅ Responsive design
- ✅ WhatsApp integration
- ✅ Real-time data from backend

## API Integration

All API calls are handled through `src/services/api.js`:
- Fetches gallery images from backend
- Retrieves services list
- Submits contact inquiries
- Built with Axios for HTTP requests

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL (default: http://localhost:5000/api)
