# Nginx + Node.js Deployment Guide for DSK Interiors

## Prerequisites
- VPS/Server with Ubuntu/Debian
- Nginx installed: `sudo apt install nginx`
- Node.js installed: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -; sudo apt install nodejs`
- PostgreSQL installed: `sudo apt install postgresql postgresql-contrib`

## Step 1: Upload Files to Server

```bash
# From your local machine
scp -r complete-web-page user@your_server_ip:/home/user/
```

## Step 2: Database Setup

```bash
sudo -u postgres psql
CREATE DATABASE dsk_interiors;
\q

# Run schema
psql -U postgres -d dsk_interiors -f /home/user/complete-web-page/backend/schema.sql
```

## Step 3: Build Frontend

```bash
cd /home/user/complete-web-page/frontend
npm install
npm run build
```

## Step 4: Setup Nginx

```bash
# Copy nginx config
sudo cp /home/user/complete-web-page/nginx.conf /etc/nginx/sites-available/dsk-interiors

# Enable the site
sudo ln -s /etc/nginx/sites-available/dsk-interiors /etc/nginx/sites-enabled/

# Copy built frontend
sudo mkdir -p /var/www/dsk-interiors/frontend
sudo cp -r /home/user/complete-web-page/frontend/build/* /var/www/dsk-interiors/frontend/

# Test Nginx
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 5: Start Backend (Node.js)

### Option A: Using PM2 (Recommended)
```bash
cd /home/user/complete-web-page/backend
npm install
npm install -g pm2
pm2 start server.js --name "dsk-backend"
pm2 startup
pm2 save
```

### Option B: Using Systemd Service

Create `/etc/systemd/system/dsk-backend.service`:
```ini
[Unit]
Description=DSK Interiors Backend
After=network.target

[Service]
Type=simple
User=user
WorkingDirectory=/home/user/complete-web-page/backend
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl start dsk-backend
sudo systemctl enable dsk-backend
```

## Step 6: Update Nginx Config

Edit `/etc/nginx/sites-available/dsk-interiors`:
- Change `your_domain.com` to your actual domain
- Update `REACT_APP_API_URL` in frontend/.env

## Step 7: SSL Certificate (Optional but Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your_domain.com
```

Then update nginx.conf with SSL settings (commented in nginx.conf).

## Step 8: Verify Everything

```bash
# Check Nginx
sudo systemctl status nginx

# Check Backend (if using PM2)
pm2 list

# Check Backend (if using systemd)
sudo systemctl status dsk-backend

# Check database
psql -U postgres -d dsk_interiors -c "SELECT * FROM services;"

# Test API
curl http://localhost:5000/api/health

# Test frontend
curl http://your_domain.com
```

## Directory Structure on Server

```
/home/user/complete-web-page/
├── backend/
├── frontend/
│   └── build/
└── nginx.conf

/var/www/dsk-interiors/
└── frontend/
    └── (React build files)
```

## Maintenance

### Update Frontend
```bash
cd /home/user/complete-web-page/frontend
git pull
npm run build
sudo cp -r build/* /var/www/dsk-interiors/frontend/
```

### View Backend Logs
```bash
# With PM2
pm2 logs dsk-backend

# With Systemd
sudo journalctl -u dsk-backend -f
```

### Restart Services
```bash
# Nginx
sudo systemctl restart nginx

# Backend (PM2)
pm2 restart dsk-backend

# Backend (Systemd)
sudo systemctl restart dsk-backend
```

## Troubleshooting

**Nginx not serving React:**
- Check path: `sudo ls -la /var/www/dsk-interiors/frontend/`
- Check permissions: `sudo chown -R www-data:www-data /var/www/dsk-interiors/`

**API not connecting:**
- Test backend: `curl http://localhost:5000/api/health`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

**Database connection error:**
- Verify PostgreSQL: `sudo systemctl status postgresql`
- Check credentials in backend/.env
