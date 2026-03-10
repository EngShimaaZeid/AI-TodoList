const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  allDay: {
    type: Boolean,
    default: false
  },
  // Reminder settings
  reminderEnabled: {
    type: Boolean,
    default: false
  },
  reminderMinutes: {
    type: Number,
    default: 15, // minutes before event
    enum: [5, 10, 15, 30, 60, 120, 1440] // 5min, 10min, 15min, 30min, 1hr, 2hr, 1day
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: {
    type: Date,
    default: null
  },
  // Event type/category
  category: {
    type: String,
    enum: ['personal', 'work', 'health', 'family', 'birthday', 'meeting', 'appointment', 'other'],
    default: 'personal'
  },
  // Recurring events
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrenceRule: {
    type: String, // RRULE format for recurring events
    default: null
  },
  // Location
  location: {
    type: String,
    default: ''
  },
  // Color/theme
  color: {
    type: String,
    default: '#3788d8'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
CalendarEventSchema.index({ userId: 1, start: 1 });
CalendarEventSchema.index({ start: 1, reminderEnabled: 1, reminderSent: 1 });

// Update updatedAt on save
CalendarEventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);