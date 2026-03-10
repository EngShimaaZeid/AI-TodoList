const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // Contact information
  whatsappNumber: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        // Allow null or valid phone number format
        return v === null || /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: 'Please enter a valid WhatsApp number'
    }
  },
  // Registration info for theme selection
  birthYear: {
    type: Number,
    default: null
  },
  gender: {
    type: String,
    enum: ['female', 'male', 'non-binary', 'prefer-not-to-say', null],
    default: null
  },
  hobbies: {
    type: [String],
    default: []
  },
  preferredTheme: {
    type: String,
    enum: ['modern', 'boho', 'genz'],
    default: 'modern'
  },
  // Onboarding status
  storyCompleted: {
    type: Boolean,
    default: false
  },
  eisenhowerCompleted: {
    type: Boolean,
    default: false
  },
  // Profile information
  profile: {
    // Demographics
    age: String,
    gender: String,
    workStyle: String,
    dailyRoutine: String,
    commute: String,
    freeTime: String,
    
    // Psychological Models (AI-generated)
    personalityModel: String,
    emotionalBlueprint: String,
    motivationSystem: String,
    identityStructure: String,
    behavioralTendencies: String,
    stressResponse: String,
    
    // Values & Goals
    hobbies: String,
    goals: String,
    primaryValues: String,
    importantValues: String,
    struggles: String,
    
    // Energy Analysis
    emotionalModel: String,
    energyModel: String,
    
    // Eisenhower Integration
    eisenhowerLogic: String,
    urgentMatters: String,
    importantMatters: String,
    timeDrains: String,
    peacefulActivities: String,
    
    // Meta tracking
    storyUpdated: Boolean,
    storyLastUpdated: Date,
    eisenhowerUpdated: Boolean,
    eisenhowerLastUpdated: Date
  },
  // Theme preference
  uiMode: {
    type: String,
    enum: ['normal', 'boho'],
    default: 'normal'
  },
  // Stored conversation data
  storyAnswers: {
    type: Object,
    default: {}
  },
  eisenhowerAnswers: {
    type: Object,
    default: {}
  },
  // Task management
  taskHistory: [{
    taskId: String,
    title: String,
    category: String,
    priority: String,
    deadline: String,
    energyReq: String,
    completedAt: {
      type: Date,
      default: Date.now
    },
    reason: String
  }],
  // Task statistics
  taskStats: {
    totalCompleted: { type: Number, default: 0 },
    thisWeek: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    lastCompletedDate: Date,
    categoryBreakdown: {
      work: { type: Number, default: 0 },
      study: { type: Number, default: 0 },
      personal: { type: Number, default: 0 },
      health: { type: Number, default: 0 },
      family: { type: Number, default: 0 }
    }
  },
  weeklyPreference: {
    type: Object,
    default: {}
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
