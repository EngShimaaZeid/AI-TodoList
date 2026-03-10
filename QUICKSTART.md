# 🚀 Hayati - Quick Start Guide

Get your Hayati AI Life Assistant up and running in minutes!

## ✅ Prerequisites Check

Before starting, you need:
- ✅ Node.js (v14+) - [Download](https://nodejs.org/)
- ✅ MongoDB - [Install Guide](./SETUP.md)
- ✅ A code editor (VS Code recommended)
- ✅ A web browser

## 🎯 Quick Setup (5 Minutes)

### Step 1: Check MongoDB

**Option A: Local MongoDB**
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB
```

**Option B: Use MongoDB Atlas (Cloud - FREE)**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account & cluster
3. Get connection string
4. Update `server/.env`:
   ```
   MONGODB_URI=your_atlas_connection_string
   ```

### Step 2: Install Server Dependencies

```powershell
cd server
npm install
```

### Step 3: Test Database Connection

```powershell
npm run test-db
```

If you see ✅ SUCCESS - you're good to go!

### Step 4: Start the Server

```powershell
# Development mode (auto-reload)
npm run dev

# OR production mode
npm start
```

You should see:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Hayati API Server Started
📍 Server: http://localhost:5000
🌍 Environment: development
📊 Database: hayati
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 5: Open the Frontend

**Option A: Simple HTTP Server**
```powershell
# In a NEW terminal, from project root
cd ..
npx http-server -p 8000
```

**Option B: Python Server**
```powershell
python -m http.server 8000
```

**Option C: VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `index.html`
3. "Open with Live Server"

### Step 6: Open Your Browser

Visit: **http://localhost:8000**

🎉 **You're all set!** Start chatting with Hayati!

## 🧪 Test Everything Works

Run the automatic test suite:

```powershell
# Make sure server is running first
cd server
node test-api.js
```

This will test all API endpoints and show you if everything works.

## 📱 Using Hayati

1. **Open the landing page** - Click "Talk to My AI Assistant"
2. **Start the conversation** - Answer Hayati's questions about your life
3. **Add your tasks** - Type tasks one at a time
4. **Get your plan** - Hayati creates your Eisenhower Matrix
5. **Organize your life** - Follow the AI-generated plan!

## 🎨 Themes

- **Modern Theme**: Clean, vibrant, tech-forward (default)
- **Boho Vintage Theme**: Click the "🍂 Boho Mode" button for a warm, journal-like experience

## 📁 Project Structure

```
hayati/
├── index.html          # 🌐 Landing page
├── script.js           # 💻 Frontend logic
├── index.css          # 🎨 Modern theme
├── boho-theme.css     # 🍂 Vintage theme
└── server/            # 🖥️ Backend
    ├── index.js       # Server entry
    ├── models/        # Database schemas
    ├── routes/        # API endpoints
    └── .env           # Configuration
```

## 🔧 Common Commands

### Server Commands
```powershell
cd server

npm start          # Start server (production)
npm run dev        # Start with auto-reload
npm run test-db    # Test database connection
node test-api.js   # Test all API endpoints
```

### Frontend Commands
```powershell
# From project root
npx http-server -p 8000        # Start HTTP server
python -m http.server 8000     # Python server
```

## 🆘 Troubleshooting

### Problem: Can't connect to MongoDB

**Solution:**
```powershell
# Check service
Get-Service -Name MongoDB

# Start service
Start-Service -Name MongoDB

# Or use MongoDB Atlas (cloud)
```

### Problem: Port 5000 already in use

**Solution:**
Edit `server/.env`:
```
PORT=5001
```

### Problem: CORS errors

**Solution:**
Update `server/.env`:
```
CLIENT_URL=http://localhost:8000
```

### Problem: Module not found

**Solution:**
```powershell
cd server
rm -r node_modules
npm install
```

## 📚 Next Steps

- ✅ **Create an account** - Start using authentication
- ✅ **Add tasks** - Build your Eisenhower Matrix
- ✅ **Track progress** - Complete tasks and see your stats
- ✅ **Plan your week** - Use AI-powered scheduling
- ✅ **Customize themes** - Switch between Modern and Boho

## 🌟 Features to Explore

1. **AI Chat Assistant** - Conversational onboarding
2. **Eisenhower Matrix** - Automatic task prioritization
3. **Task Management** - Create, update, complete tasks
4. **User Profiles** - Save your preferences and history
5. **Task Statistics** - Track streaks and completion rates
6. **Voice Assistant** - Text-to-speech for responses (enable in chat)

## 📖 Full Documentation

- [SETUP.md](./SETUP.md) - Complete setup guide
- [README.md](./README.md) - Full project documentation
- API Docs - Available in README.md

## 💡 Tips

- 💬 **Be honest in onboarding** - Better answers = Better plans
- 🎯 **Start small** - Add 5-10 tasks to begin
- ⚡ **Use energy patterns** - Schedule tasks when you're most productive
- 📊 **Review regularly** - Check your Eisenhower Matrix daily
- 💙 **Self-care first** - Hayati protects your wellbeing

## 🚀 You're Ready!

Everything is set up. Start organizing your life with AI! 💙

---

**Need help?** Check [SETUP.md](./SETUP.md) or open an issue.
