
import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Paper, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// GenZ calendar style overrides
const genzCalendarStyles = {
  '.rbc-calendar': {
    background: 'rgba(10,10,20,0.95)',
    borderRadius: '20px',
    border: '2px solid transparent',
    boxShadow: '0 8px 32px 0 rgba(34,211,238,0.10), 0 0 40px rgba(236,72,153,0.10)',
    color: '#fff',
    fontFamily: '"Space Grotesk", "Inter", sans-serif',
  },
  '.rbc-toolbar': {
    background: 'rgba(20,20,40,0.7)',
    borderRadius: '16px',
    marginBottom: '16px',
    color: '#22D3EE',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '1.5px',
    boxShadow: '0 0 16px #22D3EE',
  },
  '.rbc-header': {
    background: 'linear-gradient(90deg, #22D3EE 0%, #A855F7 100%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '12px',
    letterSpacing: '1.5px',
    boxShadow: '0 0 8px #A855F7',
  },
  '.rbc-date-cell': {
    color: '#A855F7',
    fontWeight: 600,
    fontSize: '1.05rem',
    background: 'rgba(34,211,238,0.08)',
    borderRadius: '8px',
  },
  '.rbc-today': {
    background: 'rgba(236,72,153,0.15) !important',
    border: '2px solid #EC4899',
    boxShadow: '0 0 12px #EC4899',
  },
  '.rbc-event': {
    background: 'linear-gradient(90deg, #22D3EE 0%, #A855F7 100%)',
    color: '#fff',
    borderRadius: '8px',
    border: '2px solid #A855F7',
    fontWeight: 700,
    fontFamily: '"Space Grotesk", "Inter", sans-serif',
    boxShadow: '0 0 12px #22D3EE',
  },
  '.rbc-agenda-table': {
    background: 'rgba(10,10,20,0.95)',
    color: '#fff',
  },
  '.rbc-agenda-date-cell': {
    color: '#22D3EE',
    fontWeight: 700,
  },
  '.rbc-agenda-time-cell': {
    color: '#A855F7',
    fontWeight: 700,
  },
};

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const initialEvents = [
  {
    id: 1,
    title: 'Demo Event',
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    desc: 'This is a sample event.'
  }
];

const Calendar = ({ isBoho, isGenz, currentTheme }) => {
  const [events, setEvents] = useState(initialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', desc: '', start: null, end: null });
  const [editEvent, setEditEvent] = useState(null);

  // MUI/GenZ/Boho styling
  const paperSx = useMemo(() => ({
    p: 2,
    bgcolor: isGenz
      ? 'rgba(10,10,20,0.95)'
      : isBoho
        ? 'rgba(255,255,255,0.9)'
        : 'white',
    border: isGenz
      ? '2px solid transparent'
      : isBoho
        ? '2px solid #B78953'
        : 'none',
    borderRadius: isGenz ? '20px' : isBoho ? '8px' : '16px',
    boxShadow: isGenz
      ? '0 8px 32px 0 rgba(34,211,238,0.10), 0 0 40px rgba(236,72,153,0.10)'
      : undefined,
    backdropFilter: isGenz ? 'blur(18px)' : undefined,
    mt: 4
  }), [isGenz, isBoho]);

  // Add new event
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setNewEvent({ title: '', desc: '', start: slotInfo.start, end: slotInfo.end });
    setDialogOpen(true);
  };

  // Edit event
  const handleSelectEvent = (event) => {
    setEditEvent(event);
    setDialogOpen(true);
  };

  // Save event (add or edit)
  const handleSaveEvent = () => {
    if (editEvent) {
      setEvents(events.map(ev => ev.id === editEvent.id ? { ...editEvent, ...newEvent } : ev));
    } else {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    setDialogOpen(false);
    setEditEvent(null);
    setNewEvent({ title: '', desc: '', start: null, end: null });
    setSelectedSlot(null);
  };

  // Delete event
  const handleDeleteEvent = () => {
    if (editEvent) {
      setEvents(events.filter(ev => ev.id !== editEvent.id));
      setDialogOpen(false);
      setEditEvent(null);
    }
  };

  // Dialog content
  const renderDialog = () => (
    <Dialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditEvent(null); }}>
      <DialogTitle>{editEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            value={editEvent ? editEvent.title : newEvent.title}
            onChange={e => editEvent ? setEditEvent({ ...editEvent, title: e.target.value }) : setNewEvent({ ...newEvent, title: e.target.value })}
            autoFocus
          />
          <TextField
            label="Description"
            value={editEvent ? editEvent.desc : newEvent.desc}
            onChange={e => editEvent ? setEditEvent({ ...editEvent, desc: e.target.value }) : setNewEvent({ ...newEvent, desc: e.target.value })}
            multiline
            minRows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        {editEvent && <Button color="error" onClick={handleDeleteEvent}>Delete</Button>}
        <Button onClick={() => { setDialogOpen(false); setEditEvent(null); }}>Cancel</Button>
        <Button variant="contained" onClick={handleSaveEvent}>{editEvent ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: isGenz ? 'rgba(10,10,20,0.95)' : undefined }}>
      {isGenz && (
        <style>{Object.entries(genzCalendarStyles).map(([selector, styles]) => `${selector} {${Object.entries(styles).map(([k, v]) => `${k}:${v};`).join('')}}`).join(' ')}</style>
      )}
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontFamily: isGenz
              ? '"Space Grotesk", sans-serif'
              : isBoho
                ? '"Caveat", cursive'
                : '"Roboto", sans-serif',
            color: isGenz
              ? '#22D3EE'
              : isBoho
                ? '#243533'
                : '#1A1A2E',
            mb: 4,
            textAlign: 'center',
            letterSpacing: isGenz ? '2px' : undefined,
            textShadow: isGenz ? '0 0 30px rgba(34,211,238,0.5)' : undefined
          }}
        >
          My Calendar
        </Typography>
        <Paper sx={paperSx}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, background: 'transparent' }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            popup
            eventPropGetter={event => ({})}
            views={['month', 'week', 'day', 'agenda']}
            defaultView="month"
            popupOffset={{ x: 30, y: 20 }}
            messages={{
              today: 'Today',
              previous: '<',
              next: '>',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              agenda: 'Agenda',
              showMore: total => `+${total} more`
            }}
            onDoubleClickEvent={handleSelectEvent}
            resizable
          />
        </Paper>
        {renderDialog()}
      </Container>
    </Box>
  );
};

export default Calendar;
