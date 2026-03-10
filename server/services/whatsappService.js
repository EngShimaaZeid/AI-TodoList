const axios = require('axios');

// WhatsApp service for sending reminders
class WhatsAppService {
  constructor() {
    // In production, you'd use WhatsApp Business API
    // For now, we'll use a mock implementation
    this.apiKey = process.env.WHATSAPP_API_KEY;
    this.apiUrl = process.env.WHATSAPP_API_URL || 'https://api.whatsapp.com/send';
  }

  // Send a reminder message
  async sendReminder(phoneNumber, message) {
    try {
      // Validate phone number
      if (!phoneNumber || !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        throw new Error('Invalid phone number format');
      }

      // Remove any non-numeric characters except +
      const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');

      console.log(`📱 Sending WhatsApp reminder to ${cleanNumber}: ${message}`);

      // Mock implementation - in production, you'd call WhatsApp Business API
      if (process.env.NODE_ENV === 'production' && this.apiKey) {
        // Production implementation with WhatsApp Business API
        const response = await axios.post(this.apiUrl, {
          to: cleanNumber,
          message: message,
          apiKey: this.apiKey
        });

        return {
          success: true,
          messageId: response.data?.messageId,
          status: 'sent'
        };
      } else {
        // Development/mock implementation
        console.log(`📱 [MOCK] WhatsApp message would be sent to ${cleanNumber}:`);
        console.log(`📱 [MOCK] Message: ${message}`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          success: true,
          messageId: `mock_${Date.now()}`,
          status: 'sent'
        };
      }
    } catch (error) {
      console.error('❌ WhatsApp sending error:', error.message);
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  // Format reminder message
  formatReminderMessage(event, minutesBefore) {
    const eventTime = new Date(event.start).toLocaleString();
    const timePhrase = minutesBefore === 1440 ? 'tomorrow' :
                      minutesBefore === 60 ? 'in 1 hour' :
                      minutesBefore === 120 ? 'in 2 hours' :
                      `in ${minutesBefore} minutes`;

    let message = `🔔 Reminder: "${event.title}" ${timePhrase}\n`;
    message += `📅 ${eventTime}\n`;

    if (event.location) {
      message += `📍 ${event.location}\n`;
    }

    if (event.description) {
      message += `📝 ${event.description}\n`;
    }

    message += `\nSent by Hayati AI Assistant 💙`;

    return message;
  }

  // Send event reminder
  async sendEventReminder(event, user) {
    if (!user.whatsappNumber) {
      return { success: false, error: 'No WhatsApp number configured' };
    }

    const message = this.formatReminderMessage(event, event.reminderMinutes);
    return await this.sendReminder(user.whatsappNumber, message);
  }
}

module.exports = new WhatsAppService();