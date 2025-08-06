#!/bin/bash

echo "🚀 Deploying MERN Stack Application..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

echo "✅ Frontend built successfully!"

# Instructions for deployment
echo "
🌐 DEPLOYMENT INSTRUCTIONS:

1. BACKEND DEPLOYMENT (Vercel/Railway/Render):
   - cd backend
   - Deploy to your chosen platform
   - Set environment variables (MONGO_URI, PORT)

2. FRONTEND DEPLOYMENT (Netlify/Vercel):
   - cd frontend  
   - Deploy the 'build' folder
   - Set REACT_APP_API_URL to your backend URL

3. DATABASE (MongoDB Atlas):
   - Create account at cloud.mongodb.com
   - Create cluster and get connection string
   - Update MONGO_URI in backend environment

📝 Detailed steps in deployment-guide.md
"
