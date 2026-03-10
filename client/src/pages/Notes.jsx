import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, IconButton, TextField, Button, Tooltip, Menu, MenuItem, Fab, InputAdornment
} from '@mui/material';
import { Add, PushPin, Archive, Unarchive, Delete, Palette, Search } from '@mui/icons-material';
import axios from 'axios';

const COLORS = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8'];

const Notes = ({ isBoho, isGenz, currentTheme }) => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '', color: COLORS[0] });
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorTarget, setColorTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/notes', {
      headers: { Authorization: `Bearer ${token}` },
      params: search ? { search } : {}
    });
    setNotes(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, [search]);

  // Add note
  const handleAddNote = async () => {
    if (!newNote.title && !newNote.content) return;
    const token = localStorage.getItem('token');
    await axios.post('/api/notes', newNote, { headers: { Authorization: `Bearer ${token}` } });
    setNewNote({ title: '', content: '', color: COLORS[0] });
    fetchNotes();
  };

  // Delete note
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  };

  // Pin/unpin note
  const handlePin = async (id, pinned) => {
    const token = localStorage.getItem('token');
    await axios.patch(`/api/notes/${id}/pin`, { pinned: !pinned }, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  };

  // Archive/unarchive note
  const handleArchive = async (id, archived) => {
    const token = localStorage.getItem('token');
    await axios.patch(`/api/notes/${id}/archive`, { archived: !archived }, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  };

  // Color menu
  const handleColorClick = (event, noteId) => {
    setAnchorEl(event.currentTarget);
    setColorTarget(noteId);
  };
  const handleColorClose = () => {
    setAnchorEl(null);
    setColorTarget(null);
  };
  const handleColorChange = async (color) => {
    const token = localStorage.getItem('token');
    await axios.put(`/api/notes/${colorTarget}`, { color }, { headers: { Authorization: `Bearer ${token}` } });
    handleColorClose();
    fetchNotes();
  };

  // Internationalization-ready labels
  const labels = {
    notes: 'Notes',
    search: 'Search notes...',
    title: 'Title',
    content: 'Take a note...',
    add: 'Add',
    pin: 'Pin',
    unpin: 'Unpin',
    archive: 'Archive',
    unarchive: 'Unarchive',
    delete: 'Delete',
    changeColor: 'Change color',
  };

  // Style palettes
  const bohoColors = ['#F0EFE7', '#B78953', '#964734', '#243533', '#4C563F', '#692721'];
  const genzColors = ['#fff', '#f472b6', '#22d3ee', '#a855f7', '#10b981', '#fbbf24'];
  const modernColors = COLORS;
  const palette = isBoho ? bohoColors : isGenz ? genzColors : modernColors;

  // Card style helpers
  const getCardSx = (color, isNew) => {
    if (isBoho) {
      return {
        bgcolor: color,
        minHeight: 140,
        border: '2px solid #B78953',
        borderRadius: '12px',
        fontFamily: 'Caveat, Quicksand, Arial, sans-serif',
        boxShadow: '0 2px 8px rgba(183,137,83,0.08)',
        p: 1.5,
      };
    }
    if (isGenz) {
      return {
        bgcolor: color,
        minHeight: 140,
        borderRadius: '20px',
        fontFamily: 'Space Grotesk, Quicksand, Arial, sans-serif',
        boxShadow: '0 4px 24px rgba(16,185,129,0.10)',
        p: 2,
      };
    }
    return {
      bgcolor: color,
      minHeight: 140,
      borderRadius: '8px',
      fontFamily: 'Roboto, Arial, sans-serif',
      boxShadow: '0 2px 8px rgba(63,81,181,0.08)',
      p: 2,
    };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2} sx={{ fontFamily: isBoho ? 'Caveat, cursive' : isGenz ? 'Space Grotesk, sans-serif' : 'Roboto, sans-serif' }}>{labels.notes}</Typography>
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <TextField
          variant="outlined"
          placeholder={labels.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={getCardSx(newNote.color, true)}>
            <CardContent>
              <TextField
                fullWidth
                placeholder={labels.title}
                variant="standard"
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                InputProps={{ disableUnderline: true }}
                sx={{ mb: 1, fontWeight: 600 }}
              />
              <TextField
                fullWidth
                placeholder={labels.content}
                variant="standard"
                value={newNote.content}
                onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                InputProps={{ disableUnderline: true }}
                multiline
                minRows={2}
                sx={{ mb: 1 }}
              />
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title={labels.changeColor}>
                  <IconButton size="small" onClick={e => handleColorClick(e, null)}>
                    <Palette />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && colorTarget === null} onClose={handleColorClose}>
                  {palette.map(color => (
                    <MenuItem key={color} onClick={() => setNewNote({ ...newNote, color })}>
                      <Box sx={{ width: 24, height: 24, bgcolor: color, borderRadius: '50%' }} />
                    </MenuItem>
                  ))}
                </Menu>
                <Button onClick={handleAddNote} variant="contained" size="small" sx={{ ml: 'auto' }}>
                  <Add fontSize="small" /> {labels.add}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
            <Card sx={getCardSx(note.color)}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontFamily: isBoho ? 'Caveat, cursive' : isGenz ? 'Space Grotesk, sans-serif' : 'Roboto, sans-serif' }}>{note.title}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{note.content}</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <Tooltip title={note.pinned ? labels.unpin : labels.pin}>
                    <IconButton size="small" onClick={() => handlePin(note._id, note.pinned)}>
                      <PushPin color={note.pinned ? 'primary' : 'inherit'} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={note.archived ? labels.unarchive : labels.archive}>
                    <IconButton size="small" onClick={() => handleArchive(note._id, note.archived)}>
                      {note.archived ? <Unarchive /> : <Archive />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={labels.changeColor}>
                    <IconButton size="small" onClick={e => handleColorClick(e, note._id)}>
                      <Palette />
                    </IconButton>
                  </Tooltip>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && colorTarget === note._id} onClose={handleColorClose}>
                    {palette.map(color => (
                      <MenuItem key={color} onClick={() => handleColorChange(color)}>
                        <Box sx={{ width: 24, height: 24, bgcolor: color, borderRadius: '50%' }} />
                      </MenuItem>
                    ))}
                  </Menu>
                  <Tooltip title={labels.delete}>
                    <IconButton size="small" onClick={() => handleDelete(note._id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Add />
      </Fab>
    </Box>
  );
};

export default Notes;
