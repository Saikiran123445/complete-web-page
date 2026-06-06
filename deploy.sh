#!/bin/bash

# DSK Interiors - Deployment Setup for Nginx

echo "=== DSK Interiors Nginx Deployment ==="

# Update environment variable for production
echo "Setting up environment variables..."
cd backend
cat > .env << EOF
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dsk_interiors
PORT=5000
NODE_ENV=production
EOF

cd ../frontend
cat > .env << EOF
REACT_APP_API_URL=http://your_domain.com/api
EOF

# Build React app
echo "Building React application..."
cd frontend
npm run build

# Copy build to nginx directory
echo "Copying build to nginx..."
sudo mkdir -p /var/www/dsk-interiors/frontend
sudo cp -r build/* /var/www/dsk-interiors/frontend/

# Copy nginx config
echo "Setting up Nginx configuration..."
sudo cp nginx.conf /etc/nginx/sites-available/dsk-interiors

# Enable site
echo "Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/dsk-interiors /etc/nginx/sites-enabled/

# Test nginx config
echo "Testing Nginx configuration..."
sudo nginx -t

# Reload nginx
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "=== Deployment Complete ==="
echo "Frontend: http://your_domain.com"
echo "Backend API: http://your_domain.com/api"
