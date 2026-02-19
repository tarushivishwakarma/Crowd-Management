# Pilgrims Window Backend Deployment Guide

Complete guide for deploying the Pilgrims Window backend in production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [Security Checklist](#security-checklist)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Python**: 3.9 or higher
- **MongoDB**: 5.0 or higher
- **Redis**: 6.0 or higher (optional but recommended)
- **Docker**: 20.10+ and Docker Compose 1.29+ (for containerized deployment)
- **Nginx**: Latest version (for reverse proxy)
- **SSL Certificate**: For HTTPS (Let's Encrypt recommended)

### Server Requirements

**Minimum (Development/Testing):**
- 2 CPU cores
- 4 GB RAM
- 20 GB storage

**Recommended (Production):**
- 4 CPU cores
- 8 GB RAM
- 50 GB storage (SSD)
- Load balancer

## Local Development Setup

### 1. Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` file:

```bash
# Generate a secure secret key
python -c "import secrets; print(secrets.token_hex(32))"

# Update .env with the generated key
SECRET_KEY=<generated-key>

# Configure MongoDB
MONGODB_URL=mongodb://localhost:27017

# Configure other settings as needed
```

### 3. Start MongoDB and Redis

```bash
# Start MongoDB
mongod --dbpath /path/to/data

# Start Redis (in another terminal)
redis-server
```

### 4. Run the Application

```bash
# Development mode with auto-reload
uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000

# Access API docs
# http://localhost:8000/api/docs
```

## Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Stop and remove volumes (careful - deletes data!)
docker-compose down -v
```

### Production Docker Deployment

1. **Update docker-compose.yml** for production:

```yaml
services:
  backend:
    environment:
      DEBUG: "False"
      SECRET_KEY: "${SECRET_KEY}"  # Use env variable
      MONGODB_URL: "mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017"
      ALLOWED_ORIGINS: "https://yourdomain.com"
```

2. **Create production .env file**:

```bash
# Generate secure passwords
SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
MONGO_USER=admin
MONGO_PASS=$(python -c "import secrets; print(secrets.token_urlsafe(32))")

# Save to .env file
echo "SECRET_KEY=$SECRET_KEY" > .env
echo "MONGO_USER=$MONGO_USER" >> .env
echo "MONGO_PASS=$MONGO_PASS" >> .env
```

3. **Start services**:

```bash
docker-compose --env-file .env up -d
```

## Cloud Deployment

### AWS Deployment

#### Using EC2

1. **Launch EC2 Instance**:
   - Ubuntu 20.04 LTS
   - t3.medium or larger
   - Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)

2. **Install Docker**:

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Deploy Application**:

```bash
# Clone repository
git clone <repository-url>
cd backend

# Set up environment
cp .env.example .env
nano .env  # Edit configuration

# Start services
docker-compose up -d
```

4. **Set up Nginx Reverse Proxy**:

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/pilgrims-window
```

Add configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /socket.io {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pilgrims-window /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Set up SSL with Let's Encrypt**:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is set up automatically
```

#### Using ECS (Elastic Container Service)

1. **Build and push Docker image**:

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t pilgrims-window-backend .

# Tag image
docker tag pilgrims-window-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/pilgrims-window-backend:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/pilgrims-window-backend:latest
```

2. **Create ECS Task Definition** (use AWS Console or CLI)

3. **Create ECS Service** with load balancer

4. **Set up MongoDB Atlas** for managed database

### Google Cloud Platform (GCP)

#### Using Compute Engine

Similar to AWS EC2 deployment above.

#### Using Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/pilgrims-window-backend
gcloud run deploy pilgrims-window-backend \
  --image gcr.io/PROJECT-ID/pilgrims-window-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### DigitalOcean

#### Using Droplet

1. **Create Droplet** (Ubuntu 20.04, 4GB RAM)
2. Follow same steps as AWS EC2 deployment

#### Using App Platform

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

## Security Checklist

### Pre-Deployment

- [ ] Change default SECRET_KEY
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set DEBUG=False in production
- [ ] Remove default/test accounts
- [ ] Enable rate limiting
- [ ] Configure firewall rules
- [ ] Set up backup strategy

### MongoDB Security

```bash
# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "strong-password",
  roles: ["root"]
})

# Create application user
use pilgrims_window
db.createUser({
  user: "app_user",
  pwd: "strong-password",
  roles: [
    { role: "readWrite", db: "pilgrims_window" }
  ]
})

# Enable authentication in mongod.conf
security:
  authorization: enabled
```

### Firewall Configuration

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# Don't expose MongoDB/Redis ports publicly
# Access them only through application
```

## Monitoring & Maintenance

### Health Checks

```bash
# Check application health
curl http://localhost:8000/health

# Check MongoDB
mongo --eval "db.adminCommand('ping')"

# Check Redis
redis-cli ping
```

### Logging

```bash
# View application logs
docker-compose logs -f backend

# View MongoDB logs
docker-compose logs -f mongodb

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backup Strategy

#### MongoDB Backup

```bash
# Create backup
mongodump --uri="mongodb://user:pass@localhost:27017/pilgrims_window" --out=/backup/$(date +%Y%m%d)

# Restore backup
mongorestore --uri="mongodb://user:pass@localhost:27017/pilgrims_window" /backup/20240101

# Automated daily backup script
cat > /usr/local/bin/backup-mongodb.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://user:pass@localhost:27017/pilgrims_window" --out="$BACKUP_DIR/$DATE"
find $BACKUP_DIR -mtime +7 -delete  # Delete backups older than 7 days
EOF

chmod +x /usr/local/bin/backup-mongodb.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-mongodb.sh
```

### Monitoring Setup

#### Using Prometheus

```yaml
# Add to docker-compose.yml
prometheus:
  image: prom/prometheus
  ports:
    - "9090:9090"
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml

grafana:
  image: grafana/grafana
  ports:
    - "3000:3000"
```

### Performance Tuning

#### MongoDB Optimization

```javascript
// Create necessary indexes (already done in code)
// Monitor slow queries
db.setProfilingLevel(1, { slowms: 100 })
db.system.profile.find().sort({ ts: -1 }).limit(5)
```

#### Application Scaling

```bash
# Increase Uvicorn workers
uvicorn backend.api.main:app --workers 8

# Or use Gunicorn
gunicorn backend.api.main:app \
  -w 4 \
  -k uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

## Troubleshooting

### Common Issues

**Issue: Can't connect to MongoDB**
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
mongosh "mongodb://localhost:27017"
```

**Issue: WebSocket not working**
```bash
# Check Nginx WebSocket configuration
# Ensure upgrade headers are set correctly

# Test WebSocket connection
wscat -c ws://localhost:8000/socket.io
```

**Issue: High memory usage**
```bash
# Check container stats
docker stats

# Increase container limits in docker-compose.yml
services:
  backend:
    mem_limit: 2g
    cpus: 2
```

**Issue: Slow API responses**
```bash
# Check MongoDB indexes
# Enable query profiling
# Monitor application logs
# Check network latency
```

### Support

For additional support:
- Check API documentation: `/api/docs`
- Review application logs
- Check MongoDB slow query log
- Monitor system resources

## Updates and Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild Docker images
docker-compose build

# Restart services
docker-compose up -d

# Check logs
docker-compose logs -f backend
```

### Database Migrations

When schema changes are needed:

```python
# Create migration script
# backend/scripts/migrations/001_add_field.py

from backend.database.mongodb_connection import MongoDB
import asyncio

async def migrate():
    # Add new field to existing documents
    await MongoDB.users.update_many(
        {"new_field": {"$exists": False}},
        {"$set": {"new_field": "default_value"}}
    )

if __name__ == "__main__":
    asyncio.run(migrate())
```

---

**Last Updated**: October 2025
**Version**: 1.0.0