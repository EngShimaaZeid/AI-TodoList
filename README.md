# Hayati - AI Life Assistant 💙

Hayati is an AI-powered life organization assistant that helps you design your life, not just organize tasks. Using the Eisenhower Matrix and intelligent planning, Hayati transforms your goals, routines, and daily chaos into a smart life plan.

## Features

✨ **AI Life Organization** - Smart algorithms that understand your life, not just your tasks  
📊 **Eisenhower Automation** - Color-coded priority matrix that adapts to your goals  
📅 **Daily & Weekly Planning** - Hour-by-hour schedules that balance urgency and importance  
🎯 **Long-term Goal Alignment** - Every day moves you closer to your vision  
⚡ **Energy-Aware Scheduling** - Tasks scheduled when you have the right energy  
🔄 **Automatic Rescheduling** - Life happens. Hayati adapts your plan instantly  
💬 **Friendly AI Assistant** - Chat with your companion anytime you need guidance  
❤️ **Wellbeing First** - Stress alerts and overload warnings to protect your health

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Modern responsive design with dual themes (Modern & Boho Vintage)
- Progressive Web App capabilities

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT-based authentication
- RESTful API architecture

## Project Structure

```
hayati/
├── index.html              # Landing page
├── index.css              # Main styles (Modern theme)
├── boho-theme.css         # Boho vintage theme
├── script.js              # Frontend logic & chat interface
├── package.json           # Frontend dependencies
├── server/                # Backend application
│   ├── index.js          # Server entry point
│   ├── package.json      # Backend dependencies
│   ├── .env              # Environment variables (not in git)
│   ├── models/           # Database models
│   │   ├── User.js       # User schema
│   │   └── Task.js       # Task schema
│   └── routes/           # API routes
│       ├── auth.js       # Authentication endpoints
│       ├── users.js      # User profile endpoints
│       └── tasks.js      # Task management endpoints
└── README.md             # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update the values as needed:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/hayati
     JWT_SECRET=your-secret-key-here
     ```

4. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

5. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Open the project:**
   - Simply open `index.html` in a modern web browser, or
   - Use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server -p 8000
     ```

2. **Access the application:**
   - Open `http://localhost:8000` in your browser

## API Documentation

### Authentication Endpoints

**POST** `/api/auth/signup`
- Register a new user
- Body: `{ name, email, password }`

**POST** `/api/auth/login`
- Login existing user
- Body: `{ email, password }`
- Returns: JWT token

**GET** `/api/auth/me`
- Get current user info (requires auth token)
- Headers: `Authorization: Bearer <token>`

### User Endpoints

**GET** `/api/users/:userId`
- Get user profile

**POST** `/api/users`
- Create or update user profile

**PATCH** `/api/users/:userId`
- Update specific user fields

**POST** `/api/users/:userId/tasks/complete`
- Mark task as complete and add to history

**GET** `/api/users/:userId/tasks/history`
- Get task completion history and stats

### Task Endpoints

**GET** `/api/tasks?userId=xxx`
- Get all tasks for user

**POST** `/api/tasks`
- Create new task
- Body: `{ title, description, category, priority, userId }`

**PUT** `/api/tasks/:id`
- Update existing task

**DELETE** `/api/tasks/:id`
- Delete task

## Database Schema

### User Model
```javascript
{
  userId: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  storyCompleted: Boolean,
  eisenhowerCompleted: Boolean,
  profile: {
    // Demographics & routine
    // Psychological models (AI-generated)
    // Goals & values
    // Energy patterns
    // Eisenhower categorization
  },
  taskHistory: Array,
  taskStats: {
    totalCompleted, thisWeek, thisMonth,
    streakDays, categoryBreakdown
  },
  uiMode: String (normal/boho),
  createdAt: Date,
  lastUpdated: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  category: String,
  priority: String (Eisenhower quadrant),
  dueDate: Date,
  completed: Boolean,
  userId: String,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Features in Detail

### Eisenhower Matrix
Tasks are automatically categorized into four quadrants:
- 🔴 **Urgent & Important** - Do first
- 🟡 **Important but Not Urgent** - Schedule
- 🔵 **Urgent but Not Important** - Delegate if possible
- ⚪ **Neither** - Eliminate

### AI Chat Interface
The AI assistant helps you through:
1. Life setup (work, sleep, energy patterns)
2. Future vision (goals across life areas)
3. Daily reality (current tasks and commitments)
4. Intelligent planning (AI-generated schedule)

### Themes
- **Modern Theme**: Clean, vibrant, tech-forward design
- **Boho Vintage Theme**: Warm, journal-like, emotional experience

## Development

### Adding New Features

1. **Backend**: Add routes in `server/routes/`, models in `server/models/`
2. **Frontend**: Update `script.js` for functionality, `index.css`/`boho-theme.css` for styles
3. **Database**: Update models as needed, MongoDB will auto-migrate

### Environment Variables

Key variables in `server/.env`:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `OPENAI_API_KEY` - (Optional) For AI features

## Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**CORS errors:**
- Update CORS settings in `server/index.js`
- Set correct CLIENT_URL in `.env`

**Authentication issues:**
- Check JWT_SECRET is set
- Verify token is sent in Authorization header

## Future Enhancements

- [ ] OpenAI integration for intelligent task analysis
- [ ] Mobile app (React Native)
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Team/family shared planning
- [ ] Analytics dashboard
- [ ] Voice interface
- [ ] Smart notifications
- [ ] Habit tracking

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.

---

**Made with 💙 to help you run your life, not just your to-do list.**
