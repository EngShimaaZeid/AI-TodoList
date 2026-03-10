const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===================================
// MIDDLEWARE
// ===================================

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logger (development)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// ===================================
// DATABASE CONNECTION
// ===================================

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hayati';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
        console.log(`📊 Database: ${mongoose.connection.name}`);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️  Continuing without database connection for debugging...');
        // process.exit(1); // Temporarily disabled for debugging
    });

// Database error handling
mongoose.connection.on('error', (err) => {
    console.error('🔴 MongoDB Error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB Disconnected');
});

// ===================================
// ROUTES
// ===================================

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

const notesRoutes = require('./routes/notes');
// const calendarRoutes = require('./routes/calendar');

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notes', notesRoutes);
// app.use('/api/calendar', calendarRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Hayati API is running',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root Route
app.get('/', (req, res) => {
    res.json({
        message: 'Hayati AI Life Assistant API 💙',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            users: '/api/users',
            tasks: '/api/tasks',
            ai: '/api/ai'
        }
    });
});

// ===================================
// ERROR HANDLING
// ===================================

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString()
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('🔴 Server Error:', err);

    res.status(err.status || 500).json({
        error: err.name || 'Internal Server Error',
        message: process.env.NODE_ENV === 'production'
            ? 'An error occurred'
            : err.message,
        timestamp: new Date().toISOString()
    });
});

// ===================================
// START SERVER
// ===================================

const server = app.listen(PORT, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 Hayati API Server Started');
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Start WhatsApp reminder scheduler
    // const reminderScheduler = require('./services/reminderScheduler');
    // reminderScheduler.start();
    console.log('⏰ Reminder scheduler disabled for debugging');
});

// Extra logging for diagnostics
process.on('SIGINT', () => {
    console.log('Received SIGINT');
    try {
        console.log('Active handles:', process._getActiveHandles().length);
        console.log('Active requests:', process._getActiveRequests ? process._getActiveRequests().length : 'n/a');
        console.trace('SIGINT trace');
    } catch (e) {
        console.error('Error while inspecting handles:', e);
    }
});
process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
});
process.on('exit', (code) => {
    console.log('Process exit event with code:', code);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful Shutdown
// Graceful Shutdown
process.on('SIGTERM', async () => {
    console.log('⚠️  SIGTERM signal received');
    if (process.env.ENABLE_GRACEFUL_SHUTDOWN === '1') {
        console.log('Closing HTTP server (graceful shutdown enabled)');
        server.close(async () => {
            console.log('✅ HTTP server closed');
            await mongoose.connection.close();
            console.log('✅ MongoDB connection closed');
            process.exit(0);
        });
    } else {
        console.log('Graceful shutdown disabled (set ENABLE_GRACEFUL_SHUTDOWN=1 to enable) — ignoring SIGTERM');
    }
});

process.on('SIGINT', async () => {
    console.log('\n⚠️  SIGINT signal received');
    if (process.env.ENABLE_GRACEFUL_SHUTDOWN === '1') {
        console.log('Closing HTTP server (graceful shutdown enabled)');
        server.close(async () => {
            console.log('✅ HTTP server closed');
            await mongoose.connection.close();
            console.log('✅ MongoDB connection closed');
            process.exit(0);
        });
    } else {
        console.log('Graceful shutdown disabled (set ENABLE_GRACEFUL_SHUTDOWN=1 to enable) — ignoring SIGINT');
    }
});
