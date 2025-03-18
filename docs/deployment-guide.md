# Deployment Guide

## Overview

This guide covers the deployment process for the JH Studio Backend application. It includes both manual deployment steps and automated deployment configurations.

## Deployment Environments

### 1. Development
- Local development environment
- Used for active development and testing
- Features hot reloading and debugging tools

### 2. Staging
- Pre-production environment
- Mirrors production configuration
- Used for QA and testing

### 3. Production
- Live environment
- Optimized for performance and security
- Requires strict deployment procedures

## Prerequisites

- Node.js v16.x or higher
- PM2 or similar process manager
- MySQL v8.x
- Nginx (for reverse proxy)
- SSL certificate
- Access to production server
- CI/CD pipeline access (if applicable)

## Production Server Setup

### 1. Server Requirements
```
- CPU: 2+ cores
- RAM: 4GB minimum
- Storage: 20GB minimum
- OS: Ubuntu 20.04 LTS or similar
```

### 2. Install Dependencies
```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx
```

### 3. Configure Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. SSL Configuration
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com
```

## Application Deployment

### 1. Clone and Setup
```bash
# Clone repository
git clone [repository-url]
cd backend-jhstudio

# Install dependencies
npm install --production

# Build application
npm run build
```

### 2. Environment Configuration
```bash
# Create production environment file
cat > .env.production << EOL
NODE_ENV=production
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=prod_user
DB_PASSWORD=secure_password
DB_DATABASE=jhstudio_prod

# JWT
JWT_SECRET=your_secure_secret
JWT_EXPIRATION=24h

# Email
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
EOL
```

### 3. Database Setup
```bash
# Create production database
mysql -u root -p
CREATE DATABASE jhstudio_prod;
CREATE USER 'prod_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON jhstudio_prod.* TO 'prod_user'@'localhost';
FLUSH PRIVILEGES;

# Run migrations
NODE_ENV=production npm run typeorm migration:run
```

### 4. PM2 Configuration
```json
{
  "apps": [{
    "name": "jhstudio-backend",
    "script": "dist/index.js",
    "instances": "max",
    "exec_mode": "cluster",
    "env_production": {
      "NODE_ENV": "production",
      "PORT": 3000
    }
  }]
}
```

### 5. Start Application
```bash
# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

## CI/CD Pipeline

### GitHub Actions Configuration
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/app
            git pull
            npm ci --production
            npm run build
            pm2 reload all
```

## Monitoring and Maintenance

### 1. PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Check status
pm2 status
```

### 2. Nginx Logs
```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

### 3. Application Logs
```bash
# View application logs
tail -f /path/to/app/logs/app.log

# View error logs
tail -f /path/to/app/logs/error.log
```

## Backup Procedures

### 1. Database Backup
```bash
# Create backup script
cat > backup.sh << EOL
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/path/to/backups"
mysqldump -u prod_user -p jhstudio_prod > "$BACKUP_DIR/backup_$TIMESTAMP.sql"
EOL

# Make script executable
chmod +x backup.sh

# Add to crontab (daily backup at 2 AM)
0 2 * * * /path/to/backup.sh
```

### 2. Application Backup
```bash
# Backup application files
tar -czf /path/to/backups/app_backup_$(date +"%Y%m%d").tar.gz /path/to/app
```

## Rollback Procedures

### 1. Code Rollback
```bash
# Switch to previous version
git checkout <previous-commit>
npm ci --production
npm run build
pm2 reload all
```

### 2. Database Rollback
```bash
# Revert last migration
NODE_ENV=production npm run typeorm migration:revert

# Restore from backup
mysql -u prod_user -p jhstudio_prod < backup.sql
```

## Security Considerations

1. **Firewall Configuration**
```bash
# Allow only necessary ports
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

2. **SSL/TLS Configuration**
- Enforce HTTPS
- Use strong SSL configuration
- Regular certificate renewal

3. **Database Security**
- Regular security updates
- Strong password policies
- Limited network access

4. **Application Security**
- Regular dependency updates
- Security headers configuration
- Rate limiting implementation
- Input validation

## Troubleshooting

1. **Application Issues**
- Check application logs
- Verify environment variables
- Check process status
- Monitor system resources

2. **Database Issues**
- Check connection settings
- Verify credentials
- Monitor query performance
- Check disk space

3. **Server Issues**
- Monitor server resources
- Check system logs
- Verify network connectivity
- Check service status

## Contact Information

For deployment issues or assistance:
- Technical Lead: [contact information]
- DevOps Team: [contact information]
- Emergency Contact: [contact information] 