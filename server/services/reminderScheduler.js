const CalendarEvent = require('../models/CalendarEvent');
const User = require('../models/User');
const whatsappService = require('./whatsappService');

class ReminderScheduler {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
    this.checkInterval = 60 * 1000; // Check every minute
  }

  // Start the reminder scheduler
  start() {
    if (this.isRunning) {
      console.log('⏰ Reminder scheduler is already running');
      return;
    }

    console.log('⏰ Starting WhatsApp reminder scheduler...');
    this.isRunning = true;

    // Initial check
    this.checkAndSendReminders();

    // Set up periodic checks
    this.intervalId = setInterval(() => {
      this.checkAndSendReminders();
    }, this.checkInterval);
  }

  // Stop the reminder scheduler
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('⏰ Reminder scheduler stopped');
  }

  // Check for events that need reminders and send them
  async checkAndSendReminders() {
    try {
      const now = new Date();

      // Find events that need reminders in the next 15 minutes
      // We'll check up to 15 minutes in advance to catch all reminder times
      const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

      const eventsToRemind = await CalendarEvent.find({
        reminderEnabled: true,
        reminderSent: false,
        start: {
          $gte: now,
          $lte: fifteenMinutesFromNow
        }
      }).populate('userId', 'whatsappNumber name');

      if (eventsToRemind.length === 0) {
        return;
      }

      console.log(`⏰ Found ${eventsToRemind.length} events that need reminders`);

      for (const event of eventsToRemind) {
        try {
          // Calculate exact reminder time
          const reminderTime = new Date(event.start.getTime() - (event.reminderMinutes * 60 * 1000));

          // Check if it's time to send the reminder (within 1 minute window)
          const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
          const oneMinute = 60 * 1000;

          if (timeDiff <= oneMinute) {
            // Check if user has WhatsApp number
            if (!event.userId || !event.userId.whatsappNumber) {
              console.log(`⚠️  Skipping reminder for event "${event.title}" - no WhatsApp number`);
              continue;
            }

            // Send WhatsApp reminder
            console.log(`📱 Sending reminder for event: "${event.title}"`);
            const result = await whatsappService.sendEventReminder(event, event.userId);

            if (result.success) {
              // Mark reminder as sent
              event.reminderSent = true;
              event.reminderSentAt = new Date();
              await event.save();

              console.log(`✅ Reminder sent successfully for "${event.title}"`);
            } else {
              console.error(`❌ Failed to send reminder for "${event.title}":`, result.error);
            }
          }
        } catch (error) {
          console.error(`❌ Error processing reminder for event "${event.title}":`, error.message);
        }
      }
    } catch (error) {
      console.error('❌ Error in reminder scheduler:', error.message);
    }
  }

  // Get status of the scheduler
  getStatus() {
    return {
      isRunning: this.isRunning,
      checkInterval: this.checkInterval,
      nextCheckIn: this.intervalId ? Math.ceil((this.checkInterval - (Date.now() % this.checkInterval)) / 1000) : null
    };
  }
}

module.exports = new ReminderScheduler();