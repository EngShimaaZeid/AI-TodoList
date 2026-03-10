const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { verifyToken } = require('./auth');

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'hayati-secret-key-change-in-production-2025';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get all notes for user (optionally filter by pinned/archived/search)
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, pinned, archived } = req.query;
    let query = { userId: req.user.userId };
    if (pinned !== undefined) query.pinned = pinned === 'true';
    if (archived !== undefined) query.archived = archived === 'true';
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
    const notes = await Note.find(query).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Create a new note
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content, color, pinned, archived, reminder } = req.body;
    const note = new Note({
      userId: req.user.userId,
      title,
      content,
      color,
      pinned,
      archived,
      reminder
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
});

// Update a note
router.put('/:id', authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note' });
  }
});

// Delete a note
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

// Pin/unpin a note
router.patch('/:id/pin', authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { pinned: req.body.pinned },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error pinning note' });
  }
});

// Archive/unarchive a note
router.patch('/:id/archive', authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { archived: req.body.archived },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error archiving note' });
  }
});

module.exports = router;
