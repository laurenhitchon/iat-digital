#!/bin/bash

# Script to set up Nginx for IAT Digital Application
# Run with sudo: sudo bash setup-nginx.sh

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Detect OS
if [ -f /etc/debian_version ]; then
  # Debian/Ubuntu
  echo "Detected Debian/Ubuntu system"
  
  # Install Nginx if not already installed
  if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get update
    apt-get install -y nginx
  else
    echo "Nginx is already installed"
  fi
  
  # Nginx config path
  NGINX_CONF_PATH="/etc/nginx/sites-available"
  NGINX_ENABLED_PATH="/etc/nginx/sites-enabled"
  
elif [ -f /etc/redhat-release ]; then
  # RHEL/CentOS/Fedora
  echo "Detected RHEL/CentOS/Fedora system"
  
  # Install Nginx if not already installed
  if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    yum install -y nginx
  else
    echo "Nginx is already installed"
  fi
  
  # Nginx config path
  NGINX_CONF_PATH="/etc/nginx/conf.d"
  NGINX_ENABLED_PATH=$NGINX_CONF_PATH
  
else
  echo "Unsupported operating system"
  exit 1
fi

# Create Nginx configuration
echo "Setting up Nginx configuration..."

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Path to the Nginx configuration file
CONF_FILE="$SCRIPT_DIR/nginx/iat-digital.conf"

# Check if the configuration file exists
if [ ! -f "$CONF_FILE" ]; then
  echo "Configuration file not found: $CONF_FILE"
  exit 1
fi

# Copy the configuration file to the Nginx directory
cp "$CONF_FILE" "$NGINX_CONF_PATH/iat-digital.conf"

# For Debian/Ubuntu, create symlink in sites-enabled
if [ -d "$NGINX_ENABLED_PATH" ] && [ "$NGINX_CONF_PATH" != "$NGINX_ENABLED_PATH" ]; then
  # Remove default site if it exists
  if [ -f "$NGINX_ENABLED_PATH/default" ]; then
    rm "$NGINX_ENABLED_PATH/default"
  fi
  
  # Create symlink
  ln -sf "$NGINX_CONF_PATH/iat-digital.conf" "$NGINX_ENABLED_PATH/iat-digital.conf"
fi

# Create log directories if they don't exist
mkdir -p /var/log/nginx

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
  # Reload Nginx to apply changes
  echo "Reloading Nginx..."
  systemctl reload nginx
  echo "Nginx configuration completed successfully!"
else
  echo "Nginx configuration test failed. Please check the configuration file."
  exit 1
fi

echo "Setup complete! Nginx is now configured to load balance the IAT Digital API."
echo "Make sure your PM2 instances are running on ports 3001-3004."

