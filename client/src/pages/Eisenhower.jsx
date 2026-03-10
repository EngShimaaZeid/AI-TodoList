import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Eisenhower = ({ isBoho, isGenz }) => {
  const [quadrants, setQuadrants] = useState([
    { title: 'Do First', color: '#ff4d4d', tasks: [] },
    { title: 'Schedule', color: '#4dff4d', tasks: [] },
    { title: 'Delegate', color: '#4d4dff', tasks: [] },
    { title: "Don't Do", color: '#808080', tasks: [] },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    deadline: null,
    priority: null,
    energyReq: null,
    category: null,
    flexibility: 'flexible',
    recurrence: 'once'
  });
  const [userProfile, setUserProfile] = useState(null);
  const [clarifyOpen, setClarifyOpen] = useState(false);
  const [clarifyMsg, setClarifyMsg] = useState('');
  const [clarifyCallback, setClarifyCallback] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Fetch user profile (Shared Story, goals) from API/localStorage
  useEffect(() => {
    async function fetchProfile() {
      try {
        const userId = localStorage.getItem('hayati_user_id');
        if (!userId) return;
        const response = await fetch(`http://localhost:5001/api/users/${userId}`);
        const data = await response.json();
        setUserProfile(data?.profile || {});
      } catch (e) {
        setUserProfile({});
      }
    }
    fetchProfile();
  }, []);

  // GenZ style overrides
  const genzQuadGradients = [
    'linear-gradient(135deg, #ff4d4d 0%, #f472b6 100%)',
    'linear-gradient(135deg, #4dff4d 0%, #22d3ee 100%)',
    'linear-gradient(135deg, #4d4dff 0%, #a855f7 100%)',
    'linear-gradient(135deg, #808080 0%, #64748b 100%)',
  ];


  // AI Assistant for Eisenhower Matrix Task Classification
  function aiClassifyTask(taskData) {
    const { title, deadline, priority, energyReq, category, flexibility } = taskData;
    
    // Step 1: Check if User Story exists
    const userStory = userProfile?.sharedStory || userProfile?.story || '';
    const hasUserStory = userStory.trim().length > 0;
    
    // Step 2: Determine URGENCY
    let isUrgent = false;
    const urgencyReasons = [];
    
    // Check deadline-based urgency (24-72 hours)
    if (deadline === 'today') {
      isUrgent = true;
      urgencyReasons.push('deadline within 24 hours');
    } else if (deadline === 'tomorrow') {
      isUrgent = true;
      urgencyReasons.push('deadline within 24-48 hours');
    }
    
    // Check flexibility-based urgency
    if (flexibility === 'fixed') {
      isUrgent = true;
      urgencyReasons.push('fixed schedule requirement');
    }
    
    // Check for immediate consequences
    const urgentKeywords = ['urgent', 'asap', 'now', 'immediately', 'deadline', 'fix', 'emergency', 'crisis', 'waiting'];
    if (urgentKeywords.some(keyword => title.toLowerCase().includes(keyword))) {
      isUrgent = true;
      urgencyReasons.push('contains urgent keywords');
    }
    
    // Step 3: Determine IMPORTANCE
    let isImportant = false;
    const importanceReasons = [];
    
    if (hasUserStory) {
      // With User Story: Use story as context for goals, priorities, values
      const storyLower = userStory.toLowerCase();
      const titleLower = title.toLowerCase();
      
      // First apply base Eisenhower criteria
      const importantCategories = ['work', 'study', 'health', 'family'];
      if (importantCategories.includes(category)) {
        isImportant = true;
        importanceReasons.push(`belongs to ${category} category`);
      }
      
      if (priority === 'heavy') {
        isImportant = true;
        importanceReasons.push('high emotional weight/priority');
      }
      
      // Check for long-term impact
      const impactKeywords = ['career', 'growth', 'development', 'future', 'long-term', 'investment', 'planning'];
      if (impactKeywords.some(keyword => title.toLowerCase().includes(keyword))) {
        isImportant = true;
        importanceReasons.push('potential long-term impact');
      }
      
      // Then refine with User Story alignment
      const storyWords = storyLower.split(/\s+/).filter(word => word.length > 3);
      const alignmentScore = storyWords.filter(word => titleLower.includes(word)).length;
      
      if (alignmentScore > 0) {
        isImportant = true;
        importanceReasons.push(`aligns with your story (${alignmentScore} matching elements)`);
      }
      
      // Check for conflict with story
      const conflictKeywords = ['distraction', 'waste', 'unproductive', 'busywork'];
      if (conflictKeywords.some(keyword => titleLower.includes(keyword))) {
        isImportant = false;
        importanceReasons.push('may conflict with story priorities');
      }
    } else {
      // WITHOUT User Story: Depend ONLY on Eisenhower rules - no assumptions about goals
      // A task is IMPORTANT if it has significant impact on results or affects key responsibilities
      
      // Check for significant impact on key life areas
      const importantCategories = ['work', 'study', 'health', 'family'];
      if (importantCategories.includes(category)) {
        isImportant = true;
        importanceReasons.push(`affects ${category} responsibilities`);
      }
      
      // High priority indicates significant impact
      if (priority === 'heavy') {
        isImportant = true;
        importanceReasons.push('high emotional weight indicates significant impact');
      }
      
      // Tasks with long-term consequences
      const longTermKeywords = ['career', 'growth', 'development', 'future', 'long-term', 'investment', 'planning', 'financial', 'relationship', 'health'];
      if (longTermKeywords.some(keyword => title.toLowerCase().includes(keyword))) {
        isImportant = true;
        importanceReasons.push('involves long-term consequences');
      }
      
      // Tasks that could cause significant negative outcomes if not done
      const criticalKeywords = ['deadline', 'payment', 'contract', 'legal', 'medical', 'emergency', 'critical', 'essential'];
      if (criticalKeywords.some(keyword => title.toLowerCase().includes(keyword))) {
        isImportant = true;
        importanceReasons.push('could cause significant negative consequences if not completed');
      }
      
      // A task is NOT IMPORTANT if it has low impact or is mostly busywork/distraction
      const lowImpactKeywords = ['scroll', 'social media', 'entertainment', 'leisure', 'casual', 'optional', 'nice to have'];
      if (lowImpactKeywords.some(keyword => title.toLowerCase().includes(keyword)) && !importantCategories.includes(category)) {
        isImportant = false;
        importanceReasons.push('appears to be low-impact or distraction');
      }
    }
    
    // Step 4: Classify into Eisenhower Quadrant
    let quadrantIndex;
    let quadrantName;
    let explanation;
    let nextAction;
    
    if (isImportant && isUrgent) {
      // Quadrant 1: Do First (Urgent & Important)
      quadrantIndex = 0;
      quadrantName = 'Do First';
      explanation = hasUserStory 
        ? `This task is both urgent (${urgencyReasons.join(', ')}) and important (${importanceReasons.join(', ')}), requiring immediate attention.`
        : `This task is both urgent (${urgencyReasons.join(', ')}) and important (${importanceReasons.join(', ')}), requiring immediate attention based on Eisenhower principles.`;
      nextAction = 'Start immediately - this needs your focus now.';
    } else if (isImportant && !isUrgent) {
      // Quadrant 2: Schedule (Important but Not Urgent)
      quadrantIndex = 1;
      quadrantName = 'Schedule';
      explanation = hasUserStory
        ? `This task is important (${importanceReasons.join(', ')}) but not urgent, making it perfect for scheduled time.`
        : `This task is important (${importanceReasons.join(', ')}) but not urgent, making it perfect for scheduled time based on Eisenhower principles.`;
      nextAction = 'Schedule for a specific date and time in your calendar.';
    } else if (!isImportant && isUrgent) {
      // Quadrant 3: Delegate (Urgent but Not Important)
      quadrantIndex = 2;
      quadrantName = 'Delegate';
      explanation = hasUserStory
        ? `This task feels urgent (${urgencyReasons.join(', ')}) but lacks importance, making it a good candidate for delegation.`
        : `This task feels urgent (${urgencyReasons.join(', ')}) but lacks importance, making it a good candidate for delegation based on Eisenhower principles.`;
      nextAction = 'Delegate to someone else, automate it, or minimize the effort required.';
    } else {
      // Quadrant 4: Don't Do (Not Urgent & Not Important)
      quadrantIndex = 3;
      quadrantName = "Don't Do";
      explanation = hasUserStory
        ? `This task is neither urgent nor important, suggesting it may be unnecessary or distracting.`
        : `This task is neither urgent nor important based on Eisenhower principles, suggesting it may be unnecessary or distracting.`;
      nextAction = 'Consider eliminating this task or strictly limiting time spent on it.';
    }
    
    return {
      quadrantIndex,
      quadrantName,
      explanation,
      nextAction,
      analysis: {
        isUrgent,
        isImportant,
        urgencyReasons,
        importanceReasons,
        hasUserStory
      }
    };
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewTask({
      title: '',
      deadline: null,
      priority: null,
      energyReq: null,
      category: null,
      flexibility: 'flexible',
      recurrence: 'once'
    });
  };


  // Clarification dialog logic
  const askForClarification = (msg, callback) => {
    setClarifyMsg(msg);
    setClarifyCallback(() => callback);
    setClarifyOpen(true);
  };

  const handleClarifyClose = () => {
    setClarifyOpen(false);
    setClarifyMsg('');
    setClarifyCallback(null);
  };

  // Main add task logic with AI assistant classification
  const handleTaskAdd = (skipStoryPrompt = false) => {
    if (!newTask.title.trim()) {
      handleDialogClose();
      return;
    }

    // Check for missing critical details
    if (!newTask.deadline) {
      askForClarification('When is this due? (This helps determine urgency)', (response) => {
        setNewTask({...newTask, deadline: response});
        setClarifyOpen(false);
        setTimeout(() => handleTaskAdd(skipStoryPrompt), 100);
      });
      return;
    }
    if (!newTask.priority) {
      askForClarification('How stressful is this for you? (heavy/medium/light)', (response) => {
        setNewTask({...newTask, priority: response});
        setClarifyOpen(false);
        setTimeout(() => handleTaskAdd(skipStoryPrompt), 100);
      });
      return;
    }

    // Step 1: Check Shared Story/goals loaded (for AI context)
    if (!skipStoryPrompt && (!userProfile || (!userProfile.sharedStory && !userProfile.story && !userProfile.goals))) {
      askForClarification('Your Shared Story or goals are missing. Please update your profile for better task classification. Would you like to continue anyway?', (response) => {
        if (response.toLowerCase().includes('yes') || response.toLowerCase().includes('continue')) {
          setClarifyOpen(false);
          setTimeout(() => handleTaskAdd(true), 100); // Pass true to skip story prompt
        } else {
          handleDialogClose();
        }
      });
      return;
    }

    // Step 2: Use AI Assistant to classify the task
    const classification = aiClassifyTask(newTask);

    // Step 3: Add task to the appropriate quadrant
    setQuadrants(prev => prev.map((q, i) =>
      i === classification.quadrantIndex
        ? { ...q, tasks: [...q.tasks, {
            title: newTask.title,
            explanation: classification.explanation,
            nextAction: classification.nextAction,
            analysis: classification.analysis,
            timestamp: new Date().toISOString()
          }] }
        : q
    ));

    // Step 4: Show AI feedback
    setSnackbarMessage(`🤖 AI Analysis: "${newTask.title}" → ${classification.quadrantName}\n${classification.explanation}\n💡 ${classification.nextAction}`);
    setSnackbarOpen(true);

    // Step 5: Reset form
    setNewTask({
      title: '',
      deadline: null,
      priority: null,
      energyReq: null,
      category: null,
      flexibility: 'flexible',
      recurrence: 'once'
    });

    handleDialogClose();
  };

  return (
    <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: isGenz ? 'rgba(10,10,20,0.95)' : undefined }}>
      {isGenz && (
        <style>{`
          .genz-eisenhower-paper {
            background: rgba(20,20,40,0.85) !important;
            border-radius: 20px !important;
            box-shadow: 0 8px 32px 0 rgba(34,211,238,0.10), 0 0 40px rgba(236,72,153,0.10) !important;
            border: 2px solid transparent !important;
            position: relative;
            overflow: hidden;
          }
          .genz-eisenhower-gradient {
            position: absolute;
            top: 0; left: 0; right: 0; height: 12px;
            border-radius: 20px 20px 0 0;
            z-index: 1;
          }
        `}</style>
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
          Eisenhower Matrix
        </Typography>

        {/* General Add Task Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant={isGenz ? 'outlined' : 'contained'}
            sx={{
              color: isGenz ? '#A855F7' : undefined,
              borderColor: isGenz ? '#A855F7' : undefined,
              fontFamily: isGenz ? '"Space Grotesk", sans-serif' : undefined,
              fontWeight: 700,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              boxShadow: isGenz ? '0 0 12px #A855F7' : undefined,
              background: isGenz ? 'rgba(34,211,238,0.10)' : undefined,
              letterSpacing: isGenz ? '1.5px' : undefined,
              textShadow: isGenz ? '0 0 8px #A855F7' : undefined,
              '&:hover': {
                background: isGenz ? 'rgba(168,85,247,0.25)' : undefined,
                color: isGenz ? '#22D3EE' : undefined,
                borderColor: isGenz ? '#22D3EE' : undefined,
              }
            }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add Task
          </Button>
        </Box>

        <Grid container spacing={3}>
          {quadrants.map((quad, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={isBoho ? 0 : 6}
                className={isGenz ? 'genz-eisenhower-paper' : ''}
                sx={{
                  p: 3,
                  height: '320px',
                  bgcolor: isGenz
                    ? 'rgba(20,20,40,0.85)'
                    : isBoho
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'white',
                  border: isBoho ? `2px solid ${quad.color}` : 'none',
                  borderTop: isBoho ? `8px solid ${quad.color}` : 'none',
                  borderRadius: isBoho ? '4px' : '20px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isGenz && (
                  <Box className="genz-eisenhower-gradient" sx={{ background: genzQuadGradients[index] }} />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 2, position: 'relative' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: isGenz
                        ? '"Space Grotesk", sans-serif'
                        : isBoho
                          ? '"Caveat", cursive'
                          : 'inherit',
                      color: isGenz
                        ? '#fff'
                        : isBoho
                          ? '#243533'
                          : 'text.primary',
                      fontWeight: 700,
                      flexGrow: 1,
                      letterSpacing: isGenz ? '1.5px' : undefined,
                      textShadow: isGenz ? '0 0 12px #22D3EE' : undefined
                    }}
                  >
                    {quad.title}
                  </Typography>
                </Box>
                <Box sx={{ zIndex: 2, position: 'relative', maxHeight: '220px', overflowY: 'auto' }}>
                  {quad.tasks.map((task, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                      <Typography
                        sx={{
                          fontFamily: isGenz
                            ? '"Quicksand", sans-serif'
                            : isBoho
                              ? '"Quicksand", sans-serif'
                              : 'inherit',
                          mb: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          color: isGenz ? '#fff' : undefined,
                          fontWeight: isGenz ? 500 : undefined,
                          fontSize: isGenz ? '1.08rem' : undefined,
                          letterSpacing: isGenz ? '1px' : undefined,
                          textShadow: isGenz ? '0 0 8px #22D3EE' : undefined,
                          '&::before': {
                            content: '"•"',
                            mr: 1,
                            color: isGenz ? quad.color : quad.color
                          },
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          // Toggle task details
                          setQuadrants(prev => prev.map((q, qIdx) => 
                            qIdx === quadIdx ? { 
                              ...q, 
                              tasks: q.tasks.map((t, tIdx) => 
                                tIdx === i ? { ...t, showDetails: !t.showDetails } : t
                              )
                            } : q
                          ));
                        }}
                      >
                        {typeof task === 'string' ? task : task.title}
                      </Typography>
                      
                      {/* AI Analysis Details */}
                      {typeof task === 'object' && task.showDetails && (
                        <Box sx={{ 
                          ml: 3, 
                          mt: 1, 
                          p: 2, 
                          bgcolor: isGenz ? 'rgba(20,20,40,0.8)' : (isBoho ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.04)'), 
                          borderRadius: '8px',
                          border: isGenz ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(0,0,0,0.1)'
                        }}>
                          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: isGenz ? '#A855F7' : 'primary.main' }}>
                            🤖 AI Analysis:
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
                            {task.explanation}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: isGenz ? '#22D3EE' : 'secondary.main' }}>
                            💡 {task.nextAction}
                          </Typography>
                          
                          {/* Detailed Analysis */}
                          <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                              <strong>Urgency:</strong> {task.analysis.isUrgent ? 'Yes' : 'No'} 
                              {task.analysis.urgencyReasons.length > 0 && ` (${task.analysis.urgencyReasons.join(', ')})`}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                              <strong>Importance:</strong> {task.analysis.isImportant ? 'Yes' : 'No'} 
                              {task.analysis.importanceReasons.length > 0 && ` (${task.analysis.importanceReasons.join(', ')})`}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              <strong>Classification Method:</strong> {task.analysis.hasUserStory ? 'Eisenhower + User Story context' : 'Eisenhower principles only'}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* General Add Task Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: isBoho ? '"Caveat", cursive' : (isGenz ? '"Space Grotesk", sans-serif' : undefined), color: isGenz ? '#A855F7' : (isBoho ? '#964734' : undefined) }}>
            Add New Task
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField 
                label="Task Title" 
                fullWidth 
                value={newTask.title} 
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                variant="outlined"
                size="small"
                autoFocus
              />
              
              <Box>
                <Typography variant="caption" color="text.secondary">Deadline</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {['today', 'tomorrow', 'week', 'none'].map(opt => (
                    <Chip 
                      key={opt} 
                      label={opt}
                      onClick={() => setNewTask({...newTask, deadline: opt})}
                      color={!isBoho && newTask.deadline === opt ? 'primary' : 'default'}
                      sx={isBoho && newTask.deadline === opt ? { bgcolor: '#964734', color: 'white' } : {}}
                      variant={newTask.deadline === opt ? 'filled' : 'outlined'}
                      size="small"
                      clickable
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Priority (Emotional Weight)</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {['heavy', 'medium', 'light'].map(opt => (
                    <Chip 
                      key={opt} 
                      label={opt}
                      onClick={() => setNewTask({...newTask, priority: opt})}
                      color={!isBoho && newTask.priority === opt ? 'error' : 'default'}
                      sx={isBoho && newTask.priority === opt ? { bgcolor: '#A63A3A', color: 'white' } : {}}
                      variant={newTask.priority === opt ? 'filled' : 'outlined'}
                      size="small"
                      clickable
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Energy Required</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {['high', 'medium', 'low'].map(opt => (
                    <Chip 
                      key={opt} 
                      label={opt}
                      onClick={() => setNewTask({...newTask, energyReq: opt})}
                      color={!isBoho && newTask.energyReq === opt ? 'warning' : 'default'}
                      sx={isBoho && newTask.energyReq === opt ? { bgcolor: '#D97706', color: 'white' } : {}}
                      variant={newTask.energyReq === opt ? 'filled' : 'outlined'}
                      size="small"
                      clickable
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Category</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {['work', 'study', 'personal', 'health', 'family'].map(opt => (
                    <Chip 
                      key={opt} 
                      label={opt}
                      onClick={() => setNewTask({...newTask, category: opt})}
                      color={!isBoho && newTask.category === opt ? 'info' : 'default'}
                      sx={isBoho && newTask.category === opt ? { bgcolor: '#5D4037', color: 'white' } : {}}
                      variant={newTask.category === opt ? 'filled' : 'outlined'}
                      size="small"
                      clickable
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Repeat?</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {['once', 'daily', 'weekly', 'monthly'].map(opt => (
                    <Chip 
                      key={opt} 
                      label={opt}
                      onClick={() => setNewTask({...newTask, recurrence: opt})}
                      color={!isBoho && newTask.recurrence === opt ? 'secondary' : 'default'}
                      sx={isBoho && newTask.recurrence === opt ? { bgcolor: '#B78953', color: 'white' } : {}}
                      variant={newTask.recurrence === opt ? 'filled' : 'outlined'}
                      size="small"
                      clickable
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} sx={{ color: isGenz ? '#64748b' : undefined }}>Cancel</Button>
            <Button onClick={handleTaskAdd} sx={{ color: isGenz ? '#22D3EE' : undefined }} variant={isGenz ? 'outlined' : 'contained'}>Add Task</Button>
          </DialogActions>
        </Dialog>

        {/* Clarification Dialog */}
        <Dialog open={clarifyOpen} onClose={handleClarifyClose}>
          <DialogTitle sx={{ fontFamily: isGenz ? '"Space Grotesk", sans-serif' : undefined, color: isGenz ? '#A855F7' : undefined }}>Clarification Needed</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>{clarifyMsg}</Typography>
            {clarifyCallback && (
              <TextField
                autoFocus
                margin="dense"
                label="Your answer"
                fullWidth
                variant="outlined"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    clarifyCallback(e.target.value);
                  }
                }}
                onBlur={e => clarifyCallback(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClarifyClose} sx={{ color: isGenz ? '#64748b' : undefined }}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* AI Feedback Snackbar */}
        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={8000} 
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="info" 
            sx={{ 
              width: '100%',
              maxWidth: '500px',
              whiteSpace: 'pre-line',
              fontFamily: isBoho ? '"Caveat", cursive' : 'inherit'
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Eisenhower;
