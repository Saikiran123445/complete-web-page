# DSK Interiors Backend

Node.js + Express + PostgreSQL backend for DSK Interiors website

## Setup Instructions

### 1. Install PostgreSQL
Download and install PostgreSQL from https://www.postgresql.org/download/

### 2. Create Database
Open PostgreSQL and run:
```sql
CREATE DATABASE dsk_interiors;
```

### 3. Create Tables
Run the schema.sql file:
```bash
psql -U postgres -d dsk_interiors -f schema.sql
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Configure Environment
Edit `.env` file with your PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dsk_interiors
PORT=5000
```

### 6. Run Server
```bash
npm start          # Production
npm run dev        # Development (with auto-reload)
```

Server will run on http://localhost:5000

## API Endpoints

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add new image
- `DELETE /api/gallery/:id` - Delete image

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Add new service

### Inquiries
- `POST /api/inquiry` - Submit inquiry
- `GET /api/inquiry` - Get all inquiries (admin)

## Example API Calls

```bash
# Get gallery
curl http://localhost:5000/api/gallery

# Add gallery image
curl -X POST http://localhost:5000/api/gallery \
  -H "Content-Type: application/json" \
  -d '{"title":"Kitchen","imageUrl":"kitchen.jpg","description":"Modern kitchen"}'

# Submit inquiry
curl -X POST http://localhost:5000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"John","phone":"9876543210","message":"Need a quote"}'
```
