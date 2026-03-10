const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent');
const User = require('../models/User');
const { verifyToken } = require('./auth');

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'hayati-secret-key-change-in-production';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get all events for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const events = await CalendarEvent.find({ userId: req.user.userId })
      .sort({ start: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Create a new event
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, start, end, allDay, reminderEnabled, reminderMinutes, category, isRecurring, recurrenceRule, location, color } = req.body;

    // Validate required fields
    if (!title || !start || !end) {
      return res.status(400).json({ message: 'Title, start, and end are required' });
    }

    const newEvent = new CalendarEvent({
      userId: req.user.userId,
      title,
      description: description || '',
      start: new Date(start),
      end: new Date(end),
      allDay: allDay || false,
      reminderEnabled: reminderEnabled || false,
      reminderMinutes: reminderMinutes || 15,
      category: category || 'personal',
      isRecurring: isRecurring || false,
      recurrenceRule: recurrenceRule || null,
      location: location || '',
      color: color || '#3788d8'
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Update an event
router.put('/:id', authenticate, async (req, res) => {
  try {
    const event = await CalendarEvent.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, description, start, end, allDay, reminderEnabled, reminderMinutes, category, isRecurring, recurrenceRule, location, color } = req.body;

    event.title = title || event.title;
    event.description = description !== undefined ? description : event.description;
    event.start = start ? new Date(start) : event.start;
    event.end = end ? new Date(end) : event.end;
    event.allDay = allDay !== undefined ? allDay : event.allDay;
    event.reminderEnabled = reminderEnabled !== undefined ? reminderEnabled : event.reminderEnabled;
    event.reminderMinutes = reminderMinutes || event.reminderMinutes;
    event.category = category || event.category;
    event.isRecurring = isRecurring !== undefined ? isRecurring : event.isRecurring;
    event.recurrenceRule = recurrenceRule !== undefined ? recurrenceRule : event.recurrenceRule;
    event.location = location !== undefined ? location : event.location;
    event.color = color || event.color;

    await event.save();
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete an event
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const event = await CalendarEvent.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// Get events for reminder scheduling (internal use)
router.get('/reminders/pending', async (req, res) => {
  try {
    const now = new Date();
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

    const events = await CalendarEvent.find({
      reminderEnabled: true,
      reminderSent: false,
      start: {
        $gte: now,
        $lte: fifteenMinutesFromNow
      }
    }).populate('userId', 'whatsappNumber name');

    res.json(events);
  } catch (error) {
    console.error('Error fetching pending reminders:', error);
    res.status(500).json({ message: 'Error fetching pending reminders' });
  }
});

// Mark reminder as sent
router.post('/:id/reminder-sent', authenticate, async (req, res) => {
  try {
    const event = await CalendarEvent.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.reminderSent = true;
    event.reminderSentAt = new Date();
    await event.save();

    res.json({ message: 'Reminder marked as sent' });
  } catch (error) {
    console.error('Error marking reminder as sent:', error);
    res.status(500).json({ message: 'Error marking reminder as sent' });
  }
});

module.exports = router;