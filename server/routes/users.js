const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user profile by userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

// POST create or update user profile
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    
    // Find existing user or create new one
    let user = await User.findOne({ userId });
    
    if (user) {
      // Update existing user
      Object.keys(req.body).forEach(key => {
        if (key !== '_id' && key !== '__v') {
          user[key] = req.body[key];
        }
      });
      user.lastUpdated = new Date();
      await user.save();
    } else {
      // Create new user
      user = new User(req.body);
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error saving user profile', error: error.message });
  }
});

// DELETE user profile (reset)
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user profile', error: error.message });
  }
});

// PATCH update specific fields
router.patch('/:userId', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { ...req.body, lastUpdated: new Date() } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
});

// POST reset user profile (keep auth, clear onboarding)
router.post('/:userId/reset', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: {
          storyCompleted: false,
          eisenhowerCompleted: false,
          profile: {},
          storyAnswers: {},
          eisenhowerAnswers: {},
          taskHistory: [],
          taskStats: {
            totalCompleted: 0,
            thisWeek: 0,
            thisMonth: 0,
            streakDays: 0,
            lastCompletedDate: null,
            categoryBreakdown: { work: 0, study: 0, personal: 0, health: 0, family: 0 }
          },
          lastUpdated: new Date()
        }
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Profile reset successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting profile', error: error.message });
  }
});

// POST add completed task to history
router.post('/:userId/tasks/complete', async (req, res) => {
  try {
    const { task } = req.body;
    
    if (!task || !task.title) {
      return res.status(400).json({ message: 'Task data is required' });
    }

    const user = await User.findOne({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create task history entry
    const historyEntry = {
      taskId: task.id?.toString() || Date.now().toString(),
      title: task.title,
      category: task.category || 'personal',
      priority: task.priority || 'medium',
      deadline: task.deadline || 'none',
      energyReq: task.energyReq || 'medium',
      completedAt: new Date(),
      reason: task.reason || ''
    };

    // Add to history
    user.taskHistory = user.taskHistory || [];
    user.taskHistory.unshift(historyEntry); // Add to beginning

    // Keep only last 100 tasks
    if (user.taskHistory.length > 100) {
      user.taskHistory = user.taskHistory.slice(0, 100);
    }

    // Update stats
    user.taskStats = user.taskStats || {
      totalCompleted: 0,
      thisWeek: 0,
      thisMonth: 0,
      streakDays: 0,
      categoryBreakdown: { work: 0, study: 0, personal: 0, health: 0, family: 0 }
    };

    user.taskStats.totalCompleted = (user.taskStats.totalCompleted || 0) + 1;
    user.taskStats.thisWeek = (user.taskStats.thisWeek || 0) + 1;
    user.taskStats.thisMonth = (user.taskStats.thisMonth || 0) + 1;

    // Update category breakdown - dynamically handle any category
    const category = (task.category || 'personal').toLowerCase();
    if (!user.taskStats.categoryBreakdown) {
      user.taskStats.categoryBreakdown = {};
    }
    user.taskStats.categoryBreakdown[category] = (user.taskStats.categoryBreakdown[category] || 0) + 1;

    // Update streak
    const today = new Date().toDateString();
    const lastCompleted = user.taskStats.lastCompletedDate ? new Date(user.taskStats.lastCompletedDate).toDateString() : null;
    
    if (lastCompleted !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastCompleted === yesterday.toDateString()) {
        user.taskStats.streakDays = (user.taskStats.streakDays || 0) + 1;
      } else if (lastCompleted !== today) {
        user.taskStats.streakDays = 1;
      }
    }
    
    user.taskStats.lastCompletedDate = new Date();
    user.lastUpdated = new Date();

    await user.save();

    res.json({ 
      message: 'Task completed and saved to history!', 
      taskHistory: user.taskHistory.slice(0, 10),
      taskStats: user.taskStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving completed task', error: error.message });
  }
});

// GET task history for user
router.get('/:userId/tasks/history', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const taskHistory = user.taskHistory || [];
    
    // Recalculate stats from actual task history for accuracy
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Calculate category breakdown from actual history
    const categoryBreakdown = {};
    let thisWeek = 0;
    let thisMonth = 0;

    taskHistory.forEach(task => {
      // Category breakdown
      const cat = (task.category || 'personal').toLowerCase();
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;

      // Time-based stats
      if (task.completedAt) {
        const completedDate = new Date(task.completedAt);
        if (completedDate >= weekAgo) thisWeek++;
        if (completedDate >= monthAgo) thisMonth++;
      }
    });

    // Build accurate stats
    const taskStats = {
      totalCompleted: taskHistory.length,
      thisWeek,
      thisMonth,
      streakDays: user.taskStats?.streakDays || 0,
      lastCompletedDate: user.taskStats?.lastCompletedDate || null,
      categoryBreakdown
    };

    res.json({
      taskHistory,
      taskStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task history', error: error.message });
  }
});

// Update WhatsApp number
router.put('/:userId/whatsapp', async (req, res) => {
  try {
    const { whatsappNumber } = req.body;

    // Validate WhatsApp number if provided
    if (whatsappNumber && !/^\+?[1-9]\d{1,14}$/.test(whatsappNumber)) {
      return res.status(400).json({ message: 'Please enter a valid WhatsApp number' });
    }

    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.whatsappNumber = whatsappNumber || null;
    user.lastUpdated = new Date();
    await user.save();

    res.json({
      message: 'WhatsApp number updated successfully',
      whatsappNumber: user.whatsappNumber
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating WhatsApp number', error: error.message });
  }
});

module.exports = router;
