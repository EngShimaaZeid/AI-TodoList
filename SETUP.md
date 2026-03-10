# Hayati Backend Setup Guide

## Prerequisites Installation

### 1. Install MongoDB

**Option A: MongoDB Community Edition (Recommended)**
1. Download from: https://www.mongodb.com/try/download/community
2. Choose Windows version
3. Run the installer
4. During installation:
   - Choose "Complete" setup
   - Install MongoDB as a Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

**Option B: MongoDB Atlas (Cloud - No local install needed)**
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free M0 cluster
4. Get your connection string
5. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hayati
   ```

### 2. Verify MongoDB Installation

After installation, verify MongoDB is running:

```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Or test connection
mongosh
```

If MongoDB is not in PATH, add it:
1. Default MongoDB location: `C:\Program Files\MongoDB\Server\7.0\bin`
2. Add to System PATH environment variable

### 3. Start MongoDB (if not running as service)

```powershell
# Create data directory (first time only)
mkdir C:\data\db

# Start MongoDB server
mongod
```

## Project Setup

### 1. Install Backend Dependencies

```powershell
cd server
npm install
```

### 2. Configure Environment

Edit `server/.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hayati
JWT_SECRET=hayati-secret-key-change-in-production-2025
```

### 3. Start the Server

**Development Mode (with auto-reload):**
```powershell
cd server
npm run dev
```

**Production Mode:**
```powershell
cd server
npm start
```

### 4. Verify Server is Running

Open browser and visit:
- http://localhost:5000 - API root
- http://localhost:5000/health - Health check

You should see JSON responses.

## Testing the API

### Test Authentication

**Signup:**
```powershell
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}'
```

**Login:**
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"test123\"}'
```

### Test Tasks

**Create Task:**
```powershell
curl -X POST http://localhost:5000/api/tasks `
  -H "Content-Type: application/json" `
  -d '{\"title\":\"Test Task\",\"userId\":\"your-user-id\",\"priority\":\"Important Not Urgent\"}'
```

**Get Tasks:**
```powershell
curl http://localhost:5000/api/tasks?userId=your-user-id
```

## Frontend Setup

### Option 1: Simple HTTP Server

```powershell
# From project root directory
python -m http.server 8000
# Or
npx http-server -p 8000
```

Then open: http://localhost:8000

### Option 2: Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solutions:**
1. Check MongoDB is running:
   ```powershell
   Get-Service -Name MongoDB
   # If not running:
   Start-Service -Name MongoDB
   ```

2. Verify connection string in `.env`

3. Check MongoDB port (default: 27017):
   ```powershell
   netstat -ano | findstr :27017
   ```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Change PORT in `.env` to different number (e.g., 5001)
2. Or kill process using port 5000:
   ```powershell
   # Find process
   netstat -ano | findstr :5000
   # Kill process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

### CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:** Update `CLIENT_URL` in `server/.env`:
```
CLIENT_URL=http://localhost:8000
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```powershell
cd server
npm install
```

## Development Workflow

1. **Start MongoDB** (if not running as service)
2. **Start Backend Server:**
   ```powershell
   cd server
   npm run dev
   ```
3. **Start Frontend Server:**
   ```powershell
   # In new terminal, from project root
   npx http-server -p 8000
   ```
4. **Open Application:** http://localhost:8000

## Database Management

### View Database with MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `hayati`
4. Collections: `users`, `tasks`

### View Database with Mongosh (CLI)

```powershell
mongosh
use hayati
db.users.find()
db.tasks.find()
```

### Reset Database

```powershell
mongosh
use hayati
db.dropDatabase()
```

## Production Deployment

### Environment Variables for Production

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hayati
JWT_SECRET=super-secret-random-string-change-this
```

### Security Checklist

- [ ] Change JWT_SECRET to random secure string
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS
- [ ] Set specific CORS origins (not '*')
- [ ] Add rate limiting
- [ ] Add input validation middleware
- [ ] Set up monitoring and logging
- [ ] Regular security updates

## Next Steps

1. ✅ Install and verify MongoDB
2. ✅ Install server dependencies
3. ✅ Configure environment variables
4. ✅ Start the server
5. ✅ Test the API endpoints
6. ✅ Open the frontend
7. 🚀 Start building!

---

**Need Help?** Check the main README.md or open an issue.
