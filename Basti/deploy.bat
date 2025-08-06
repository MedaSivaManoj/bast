@echo off
echo 🚀 Building and preparing for deployment...

echo 📦 Building frontend...
cd frontend
call npm run build
cd ..

echo ✅ Build complete!
echo.
echo 🌐 DEPLOYMENT READY!
echo.
echo Next steps:
echo 1. Set up MongoDB Atlas at https://cloud.mongodb.com
echo 2. Deploy backend to Vercel/Railway/Render
echo 3. Deploy frontend build folder to Netlify/Vercel
echo 4. Update environment variables with your URLs
echo.
echo 📖 See DEPLOYMENT-GUIDE.md for detailed instructions
pause
