const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Health', 'Finance', 'Other'],
        default: 'Other'
    },
    priority: {
        type: String,
        enum: ['Urgent & Important', 'Important Not Urgent', 'Urgent Not Important', 'Not Urgent & Not Important'],
        default: 'Important Not Urgent'
    },
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String, // In a real app, this would be an ObjectId referencing a User model
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
