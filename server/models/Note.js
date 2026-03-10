const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  color: { type: String, default: '#fff' },
  pinned: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  reminder: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);