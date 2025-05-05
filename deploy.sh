#!/bin/bash

# === CONFIG ===
CUSTOM_DOMAIN="nashera-miabari.shahbazkhan.co.uk"
DIST_DIR="dist"

# === PREP ===
echo "🧹 Cleaning old dist folder..."
rm -rf $DIST_DIR

echo "📦 Building project..."
npm run build

echo "🌐 Ensuring CNAME is set..."
echo $CUSTOM_DOMAIN > $DIST_DIR/CNAME

echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d $DIST_DIR

echo "✅ Deployed! Now wait 2–5 mins for GitHub Pages to refresh..."
echo "🔗 Visit: https://$CUSTOM_DOMAIN"
