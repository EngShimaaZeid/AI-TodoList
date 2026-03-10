import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  IconButton, 
  Stack, 
  Grid,
  Button,
  Chip,
  Divider,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Checkbox,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Collapse,
  Pagination,
  Tabs,
  Tab
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RepeatIcon from '@mui/icons-material/Repeat';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ToDoList = ({ isBoho, isGenz, currentTheme }) => {
  const [step, setStep] = useState('init'); // init, builder, result
  const [messages, setMessages] = useState([]);
  const [userEnergy, setUserEnergy] = useState('');
  const [tasks, setTasks] = useState([]);
  const [plan, setPlan] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'matrix' or 'list'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [taskHistory, setTaskHistory] = useState([]);
  const [taskStats, setTaskStats] = useState(null);
  const [showAccomplishments, setShowAccomplishments] = useState(false);
  // Pagination & Filter state for accomplishments
  const [accomplishmentPage, setAccomplishmentPage] = useState(1);
  const [accomplishmentFilter, setAccomplishmentFilter] = useState('all'); // all, today, week, month
  const [accomplishmentCategory, setAccomplishmentCategory] = useState('all');
  const [accomplishmentTab, setAccomplishmentTab] = useState(0); // 0: Stats, 1: History
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    // Load user name from localStorage
    const name = localStorage.getItem('hayati_user_name');
    if (name) {
      setUserName(name);
    }
    // Load task history
    loadTaskHistory();
  }, []);

  const loadTaskHistory = async () => {
    try {
      const userId = localStorage.getItem('hayati_user_id');
      if (!userId) return;
      const response = await fetch(`http://localhost:5001/api/users/${userId}/tasks/history`);
      const data = await response.json();
      setTaskHistory(data.taskHistory || []);
      setTaskStats(data.taskStats || null);
    } catch (error) {
      console.error('Error loading task history:', error);
    }
  };

  // Helper to render a single chat message (keeps JSX simpler in renderBuilder)
  const renderMessage = (msg) => {
    return (
      <Box key={msg.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}>
        <Paper sx={{
          p: 1.5,
          bgcolor: msg.sender === 'ai'
            ? (isGenz ? 'rgba(15, 20, 35, 0.6)' : (isBoho ? '#F5E6D3' : '#F0F2F5'))
            : (isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#964734' : '#26BFF0')),
          background: msg.sender === 'user' && isGenz ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)' : undefined,
          color: msg.sender === 'ai' ? (isGenz ? '#FFFFFF' : 'text.primary') : 'white',
          borderRadius: '15px',
          border: isGenz ? `1px solid ${msg.sender === 'ai' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(236, 72, 153, 0.3)'}` : 'none',
          backdropFilter: isGenz ? 'blur(10px)' : 'none'
        }}>
          <Typography variant="body2">{msg.text}</Typography>
        </Paper>

        {msg.options && (
          <Stack direction="row" gap={1} mt={1} flexWrap="wrap">
            {msg.options.map(opt => (
              <Button
                key={opt.value}
                size="small"
                variant={isGenz ? 'contained' : 'outlined'}
                onClick={() => handleOptionClick(opt.value, opt.label)}
                sx={isGenz ? {
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                  border: '1px solid rgba(168, 85, 247, 0.5)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(10px)',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5) 0%, rgba(236, 72, 153, 0.5) 100%)',
                    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                  }
                } : {}}
              >
                {opt.label}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    );
  };
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [clarification, setClarification] = useState(null); // { field, question, options }
  
  // Theme Configuration
  const themeConfig = {
    emojis: {
      energy: {
        high: isGenz ? '⚡' : (isBoho ? '🌞' : '⚡'),
        medium: isGenz ? '✨' : (isBoho ? '🌿' : '🌱'),
        low: isGenz ? '😴' : (isBoho ? '🍂' : '🌙')
      },
      deadline: {
        today: isGenz ? '🔥' : (isBoho ? '🕰️' : '📅'),
        tomorrow: isGenz ? '⏰' : (isBoho ? '🌅' : '🗓️'),
        week: isGenz ? '📅' : (isBoho ? '📅' : '📆'),
        none: isGenz ? '♾️' : (isBoho ? '♾️' : '🚫')
      },
      priority: {
        heavy: isGenz ? '💀' : (isBoho ? '🪨' : '🔴'),
        medium: isGenz ? '😬' : (isBoho ? '🪵' : '🟡'),
        light: isGenz ? '😎' : (isBoho ? '🪶' : '🟢')
      },
      energyReq: {
        high: isGenz ? '🔥' : (isBoho ? '🔥' : '⚡'),
        medium: isGenz ? '💪' : (isBoho ? '🍵' : '😐'),
        low: isGenz ? '🧘' : (isBoho ? '🕯️' : '🥱')
      },
      category: {
        work: isGenz ? '💼' : (isBoho ? '🛖' : '💼'),
        study: isGenz ? '📚' : (isBoho ? '📜' : '📚'),
        personal: isGenz ? '🏠' : (isBoho ? '⛺' : '🏠'),
        health: isGenz ? '💪' : (isBoho ? '🌿' : '🧘'),
        family: isGenz ? '❤️' : (isBoho ? '🌳' : '👨‍👩‍👧')
      },
      recurrence: {
        once: isGenz ? '1️⃣' : (isBoho ? '1️⃣' : '1️⃣'),
        daily: isGenz ? '🔁' : (isBoho ? '☀️' : '🔁'),
        weekly: isGenz ? '📅' : (isBoho ? '🌙' : '📅'),
        monthly: isGenz ? '🗓️' : (isBoho ? '🌑' : '📆')
      }
    },
    ui: {
        greetingEmoji: isGenz ? '✨' : (isBoho ? '🌿' : '👋'),
        successEmoji: isGenz ? '🎉' : (isBoho ? '🌿' : '✅'),
        dialogEmoji: isGenz ? '🤔' : (isBoho ? '🌿' : '🤔'),
        builderEmoji: isGenz ? '🚀' : (isBoho ? '📝' : '📋')
    },
    buttons: {
        addTask: {
            label: isGenz ? 'Add Task 🔥' : (isBoho ? 'Plant Task' : 'Add Task'),
            icon: isBoho ? <SpaIcon /> : <AddCircleIcon />
        },
        generate: {
            label: isGenz ? 'Let\'s Go! 🚀' : (isBoho ? 'Create My Flow 🌿' : 'Generate Schedule 🚀')
        },
        startOver: {
            label: isGenz ? 'Reset 🔄' : (isBoho ? 'New Day 🌱' : 'Start Over')
        }
    },
    colors: {
      primary: isGenz ? '#A855F7' : (isBoho ? '#964734' : 'primary.main'),
      secondary: isGenz ? '#EC4899' : (isBoho ? '#B78953' : 'secondary.main'),
      error: isGenz ? '#EF4444' : (isBoho ? '#A63A3A' : 'error.main'),
      warning: isGenz ? '#F59E0B' : (isBoho ? '#D97706' : 'warning.main'),
      info: isGenz ? '#22D3EE' : (isBoho ? '#5D4037' : 'info.main'),
      success: isGenz ? '#10B981' : (isBoho ? '#556B2F' : 'success.main')
    }
  };

  // Task Builder State
  const [newTask, setNewTask] = useState({
    title: '',
    deadline: null,
    priority: null,
    energyReq: null,
    category: null,
    flexibility: 'flexible',
    recurrence: 'once'
  });

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Greeting
  useEffect(() => {
    let timeoutId;
    if (step === 'init') {
      timeoutId = setTimeout(() => {
        addMessage('ai', `Hello! I'm Hayati. Before we organize your day, I'd love to know: How is your energy level today? ${themeConfig.ui.greetingEmoji}`, [
            { label: `High Energy ${themeConfig.emojis.energy.high}`, value: 'high' },
            { label: `Medium ${themeConfig.emojis.energy.medium}`, value: 'medium' },
            { label: `Low / Tired ${themeConfig.emojis.energy.low}`, value: 'low' }
        ]);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [step]);

  const addMessage = (sender, text, options = null) => {
    setMessages(prev => [...prev, { sender, text, options, id: Date.now() }]);
  };

  const handleOptionClick = (value, label) => {
    if (step === 'init') {
        addMessage('user', label);
        setUserEnergy(value);
        setTimeout(() => {
            addMessage('ai', `Got it. Now, let's build your list. Add your tasks below, and I'll organize them for you. ${themeConfig.ui.builderEmoji}`);
            setStep('builder');
        }, 500);
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    // Check for missing critical details
    // Hierarchy: Deadline > Priority > Energy > Category
    if (!newTask.deadline) {
        setClarification({
            field: 'deadline',
            question: "When is this due?",
            options: ['today', 'tomorrow', 'week', 'none']
        });
        return;
    }
    if (!newTask.priority) {
        setClarification({
            field: 'priority',
            question: "How stressful is this for you?",
            options: ['heavy', 'medium', 'light']
        });
        return;
    }
    // If we have deadline and priority, we can infer/default the rest to avoid annoyance
    // But if you want to be strict, uncomment below:
    /*
    if (!newTask.energyReq) {
        setClarification({
            field: 'energyReq',
            question: "How much energy does this take?",
            options: ['high', 'medium', 'low']
        });
        return;
    }
    */

    finalizeTask(newTask);
  };

  const handleClarificationAnswer = (value) => {
      const updatedTask = { ...newTask, [clarification.field]: value };
      setClarification(null);
      
      // Apply defaults for anything else missing to keep it to ONE question
      const finalTask = {
          ...updatedTask,
          deadline: updatedTask.deadline || 'today',
          priority: updatedTask.priority || 'medium',
          energyReq: updatedTask.energyReq || 'medium',
          category: updatedTask.category || 'personal',
          flexibility: updatedTask.flexibility || 'flexible'
      };

      finalizeTask(finalTask);
  };

  const finalizeTask = (taskToSave) => {
    setTasks(prev => [...prev, { ...taskToSave, id: Date.now() }]);
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

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedTaskIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
    // Add visual feedback
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedTaskIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedTaskIndex === null || draggedTaskIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedTaskIndex === null || draggedTaskIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newTasks = [...tasks];
    const draggedTask = newTasks[draggedTaskIndex];
    
    // Remove from old position
    newTasks.splice(draggedTaskIndex, 1);
    // Insert at new position
    newTasks.splice(dropIndex, 0, draggedTask);
    
    setTasks(newTasks);
    setDraggedTaskIndex(null);
    setDragOverIndex(null);
  };

  const handleTaskCompletion = async (taskId) => {
    // 1. Find the task to complete
    const taskToComplete = tasks.find(t => t.id === taskId) || 
                          (plan?.matrix && [...plan.matrix.doFirst, ...plan.matrix.schedule, ...plan.matrix.delegate, ...plan.matrix.dontDo].find(t => t.id === taskId));
    if (!taskToComplete) return;

    // 2. Save to backend task history
    const userId = localStorage.getItem('hayati_user_id');
    if (userId) {
      try {
        const response = await fetch(`http://localhost:5001/api/users/${userId}/tasks/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskToComplete })
        });
        const data = await response.json();
        console.log('Task completion response:', data);
      } catch (error) {
        console.error('Error saving task to history:', error);
      }
    } else {
      console.warn('No hayati_user_id found in localStorage');
    }

    // 3. Mark done in main list
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));

    // 4. Update Plan (remove from matrix arrays visually)
    if (plan) {
        const newMatrix = { ...plan.matrix };
        ['doFirst', 'schedule', 'delegate', 'dontDo'].forEach(key => {
            newMatrix[key] = newMatrix[key].filter(t => t.id !== taskId);
        });
        setPlan({ ...plan, matrix: newMatrix });
    }
    // 5. Show Toast/Message
    setSnackbarMessage(`🎉 Task completed! Added to your accomplishments. ${themeConfig.ui.successEmoji}`);
    setSnackbarOpen(true);

    // 6. Reload task history to update stats
    loadTaskHistory();
  };

  const generatePlan = () => {
    // Eisenhower Logic with Structured Data
    const categorized = {
      doFirst: [],   // Urgent & Important (Q1)
      schedule: [],  // Not Urgent & Important (Q2)
      delegate: [],  // Urgent & Not Important (Q3)
      dontDo: []     // Not Urgent & Not Important (Q4)
    };

    tasks.forEach(task => {
      let processedTask = { ...task };
      
      // 1. Determine Urgency
      // Rules: Deadline today/tomorrow OR Fixed flexibility
      const isUrgent = ['today', 'tomorrow'].includes(task.deadline) || task.flexibility === 'fixed';

      // 2. Determine Importance
      // Rules: Priority heavy/medium OR Category work/health/family/study
      const isImportant = ['heavy', 'medium'].includes(task.priority) || ['work', 'health', 'family', 'study'].includes(task.category);

      // 3. Strict Classification Logic
      if (isUrgent && isImportant) {
        // Q1: Urgent & Important
        processedTask.reason = "Deadline is close & high impact.";
        processedTask.suggestedAction = "Do this immediately.";
        categorized.doFirst.push(processedTask);
      } else if (!isUrgent && isImportant) {
        // Q2: Important but Not Urgent
        processedTask.reason = "Builds long-term success without immediate pressure.";
        processedTask.suggestedAction = "Schedule a specific time block.";
        categorized.schedule.push(processedTask);
      } else if (isUrgent && !isImportant) {
        // Q3: Urgent but Not Important
        processedTask.reason = "Requires quick action but has lower life impact.";
        processedTask.suggestedAction = "Delegate or do quickly.";
        categorized.delegate.push(processedTask);
      } else {
        // Q4: Not Urgent & Not Important
        processedTask.reason = "Low impact & no immediate deadline.";
        processedTask.suggestedAction = "Do if time permits or skip.";
        categorized.dontDo.push(processedTask);
      }
    });

    // Energy Balancing
    if (userEnergy === 'low') {
        const newDoFirst = [];
        const movedToSchedule = [];
        
        categorized.doFirst.forEach(t => {
            if (t.flexibility === 'fixed' || t.energyReq === 'low') {
                newDoFirst.push(t);
            } else {
                movedToSchedule.push(t);
            }
        });
        
        categorized.doFirst = newDoFirst;
        categorized.schedule = [...categorized.schedule, ...movedToSchedule];
    }

    setPlan({
      energyLevel: userEnergy,
      matrix: categorized
    });

    setTimeout(() => {
      setStep('result');
      setViewMode('list'); // Default to list view
    }, 1000);
  };

    // Render Builder (simplified for stability)
    const renderBuilder = () => (
    <Box sx={{ animation: 'fadeIn 0.5s' }}>
      {/* Clarification Dialog */}
      <Dialog open={!!clarification} onClose={() => setClarification(null)}>
      <DialogTitle>
        One quick question... {themeConfig.ui.dialogEmoji}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>{clarification?.question}</Typography>
        <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
        {(clarification?.options || []).map(opt => (
          <Button key={opt} variant="outlined" onClick={() => handleClarificationAnswer(opt)}>
          {opt}
          </Button>
        ))}
        </Stack>
      </DialogContent>
      </Dialog>

      {/* Chat Context */}
      <Box sx={{ mb: 3, maxHeight: '150px', overflowY: 'auto' }} ref={chatContainerRef}>
      {messages.map(renderMessage)}
      </Box>

      {/* Builder placeholder: original complex layout temporarily simplified */}
      {step === 'builder' && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Add New Task</Typography>
          <Stack spacing={2}>
          <TextField label="Task Title" fullWidth value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} size="small" />
          <Button variant="contained" onClick={handleAddTask}>{themeConfig.buttons.addTask.label}</Button>
          </Stack>
        </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Your Tasks ({tasks.length})</Typography>
          <Stack spacing={1} sx={{ mt: 2 }}>
          {tasks.map((t, i) => (
            <Paper key={t.id} sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2">{t.title}</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button size="small" onClick={() => handleTaskCompletion(t.id)}>Complete</Button>
              <IconButton size="small" onClick={() => handleDeleteTask(t.id)}><DeleteIcon /></IconButton>
            </Stack>
            </Paper>
          ))}
          </Stack>
        </Paper>
        </Grid>
      </Grid>
      )}
    </Box>
    );

  // Render the Result (Eisenhower Matrix)
  const renderResult = () => {
    if (!plan) return null;

    const renderTaskCard = (task) => (
        <Paper key={task.id} sx={{ 
            p: 1.5, 
            mb: 1, 
            bgcolor: isGenz ? 'rgba(15, 20, 35, 0.6)' : (isBoho ? 'rgba(255,255,255,0.8)' : 'white'), 
            borderLeft: `4px solid ${isGenz ? '#A855F7' : (isBoho ? '#964734' : '#26BFF0')}`,
            borderRadius: isGenz ? '8px' : '4px',
            backdropFilter: isGenz ? 'blur(10px)' : 'none'
        }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: isGenz ? '#FFFFFF' : 'inherit' }}>{task.title}</Typography>
            <Typography variant="caption" display="block" sx={{ fontStyle: 'italic', mb: 0.5, color: isGenz ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}>
                {task.reason}
            </Typography>
            <Stack direction="row" gap={1} mt={0.5}>
                <Chip label={`${task.deadline} ${themeConfig.emojis.deadline[task.deadline]}`} size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: isGenz ? 'rgba(16, 185, 129, 0.2)' : undefined, color: isGenz ? '#10B981' : undefined }} variant={isGenz ? 'outlined' : 'filled'} />
                <Chip label={`${task.energyReq} ${themeConfig.emojis.energyReq[task.energyReq]}`} size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: isGenz ? 'rgba(236, 72, 153, 0.2)' : undefined, color: isGenz ? '#EC4899' : undefined }} variant={isGenz ? 'outlined' : 'filled'} />
            </Stack>
        </Paper>
    );

    const renderChecklistItem = (task, type) => (
        <Paper 
            key={task.id} 
            elevation={0}
            sx={{ 
                p: 2, 
                mb: 1.5, 
                bgcolor: isGenz ? 'rgba(15, 20, 35, 0.5)' : (isBoho ? 'rgba(255,255,255,0.6)' : 'white'), 
                border: isGenz ? '1px solid rgba(168, 85, 247, 0.2)' : (isBoho ? '1px solid #E0D0C0' : '1px solid #eee'),
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: isGenz ? 'blur(10px)' : 'none',
                '&:hover': { 
                    transform: 'translateX(5px)', 
                    bgcolor: isGenz ? 'rgba(168, 85, 247, 0.15)' : (isBoho ? 'rgba(255,255,255,0.9)' : '#fafafa'),
                    borderColor: isGenz ? 'rgba(168, 85, 247, 0.4)' : undefined
                }
            }}
        >
            <Checkbox 
                checked={false}
                onChange={() => handleTaskCompletion(task.id)}
                sx={{ 
                    color: isGenz ? '#A855F7' : (isBoho ? '#964734' : 'primary.main'),
                    '&.Mui-checked': { color: isGenz ? '#10B981' : (isBoho ? '#964734' : 'primary.main') }
                }}
            />
            <Box sx={{ flexGrow: 1, ml: 1 }}>
                <Typography variant="body1" sx={{ textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 500, color: isGenz ? '#FFFFFF' : 'inherit' }}>
                    {task.title}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 0.5, color: isGenz ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}>
                    {task.reason}
                </Typography>
                <Stack direction="row" gap={1} mt={0.5} alignItems="center">
                    <Chip 
                        label={type} 
                        size="small" 
                        sx={{ 
                            height: 20, 
                            fontSize: '0.65rem', 
                            bgcolor: isGenz 
                                ? (type === 'Do First' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(168, 85, 247, 0.15)')
                                : (type === 'Do First' ? (isBoho ? '#ffcdd2' : '#ffebee') : 'default'),
                            color: isGenz 
                                ? (type === 'Do First' ? '#EC4899' : '#A855F7')
                                : (type === 'Do First' ? '#c62828' : 'text.secondary'),
                            borderColor: isGenz ? (type === 'Do First' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(168, 85, 247, 0.3)') : undefined
                        }} 
                        variant={isGenz ? 'outlined' : 'filled'}
                    />
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isGenz ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}>
                        {themeConfig.emojis.energyReq[task.energyReq]} {task.energyReq} energy
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    );

    return (
      <Box sx={{ animation: 'fadeIn 1s ease-in' }}>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h5" sx={{ 
                fontFamily: isBoho ? '"Caveat", cursive' : 'inherit', 
                color: isGenz ? '#FFFFFF' : (isBoho ? '#964734' : 'primary.main'),
                ...(isGenz && {
                    background: 'linear-gradient(90deg, #10B981, #A855F7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                })
            }}>
                Your Daily Flow
            </Typography>
            <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}>
                {plan.energyLevel === 'low' ? "Gentle schedule for a low energy day 🌙" : "Optimized for your energy levels ⚡"}
            </Typography>
          </Box>
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => { if(newMode) setViewMode(newMode); }}
            size="small"
            sx={{ 
                bgcolor: isGenz ? 'rgba(15, 20, 35, 0.6)' : (isBoho ? 'rgba(255,255,255,0.5)' : 'white'),
                borderRadius: isGenz ? '12px' : '4px',
                border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none',
                '& .MuiToggleButton-root': { 
                    color: isGenz ? '#A855F7' : (isBoho ? '#964734' : 'primary.main'),
                    borderColor: isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#C9A577' : 'rgba(0, 0, 0, 0.12)'),
                    '&.Mui-selected': {
                        bgcolor: isGenz ? 'rgba(168, 85, 247, 0.2)' : (isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(25, 118, 210, 0.08)'),
                        color: isGenz ? '#EC4899' : (isBoho ? '#964734' : 'primary.main'),
                    }
                }
            }}
          >
            <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="matrix" aria-label="matrix view">
                <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        
        {viewMode === 'matrix' ? (
            <Grid container spacing={3}>
            {/* Q1: Urgent & Important */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ 
                    p: 2, 
                    height: '100%', 
                    bgcolor: isGenz ? 'rgba(236, 72, 153, 0.1)' : '#ffebee', 
                    border: isGenz ? '1px solid rgba(236, 72, 153, 0.3)' : '1px solid #ffcdd2',
                    borderRadius: isGenz ? '16px' : '4px',
                    backdropFilter: isGenz ? 'blur(10px)' : 'none'
                }}>
                <Typography variant="h6" sx={{ color: isGenz ? '#EC4899' : 'error.main' }} gutterBottom>🟥 Do First (Urgent & Important)</Typography>
                {plan.matrix.doFirst.map(renderTaskCard)}
                {plan.matrix.doFirst.length === 0 && <Typography variant="body2" sx={{ color: isGenz ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}>Nothing here! Great job.</Typography>}
                </Paper>
            </Grid>

            {/* Q2: Not Urgent & Important */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ 
                    p: 2, 
                    height: '100%', 
                    bgcolor: isGenz ? 'rgba(168, 85, 247, 0.1)' : '#fff3e0', 
                    border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid #ffe0b2',
                    borderRadius: isGenz ? '16px' : '4px',
                    backdropFilter: isGenz ? 'blur(10px)' : 'none'
                }}>
                <Typography variant="h6" sx={{ color: isGenz ? '#A855F7' : 'warning.main' }} gutterBottom>🟧 Schedule (Important, Not Urgent)</Typography>
                {plan.matrix.schedule.map(renderTaskCard)}
                </Paper>
            </Grid>

            {/* Q3: Urgent & Not Important */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ 
                    p: 2, 
                    height: '100%', 
                    bgcolor: isGenz ? 'rgba(34, 211, 238, 0.1)' : '#fffde7', 
                    border: isGenz ? '1px solid rgba(34, 211, 238, 0.3)' : '1px solid #fff9c4',
                    borderRadius: isGenz ? '16px' : '4px',
                    backdropFilter: isGenz ? 'blur(10px)' : 'none'
                }}>
                <Typography variant="h6" sx={{ color: isGenz ? '#22D3EE' : '#fbc02d' }} gutterBottom>🟨 Delegate (Urgent, Not Important)</Typography>
                {plan.matrix.delegate.map(renderTaskCard)}
                </Paper>
            </Grid>

            {/* Q4: Not Urgent & Not Important */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ 
                    p: 2, 
                    height: '100%', 
                    bgcolor: isGenz ? 'rgba(16, 185, 129, 0.1)' : '#e8f5e9', 
                    border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #c8e6c9',
                    borderRadius: isGenz ? '16px' : '4px',
                    backdropFilter: isGenz ? 'blur(10px)' : 'none'
                }}>
                <Typography variant="h6" sx={{ color: isGenz ? '#10B981' : 'success.main' }} gutterBottom>🟩 Don't Do (Not Urgent, Not Important)</Typography>
                {plan.matrix.dontDo.map(renderTaskCard)}
                </Paper>
            </Grid>
            </Grid>
        ) : (
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                {plan.matrix.doFirst.length > 0 && (
                    <Box mb={3}>
                        <Typography variant="h6" sx={{ mb: 2, color: isGenz ? '#EC4899' : '#d32f2f', display: 'flex', alignItems: 'center', gap: 1 }}>
                            🔥 Do First <Typography variant="caption" sx={{ bgcolor: isGenz ? 'rgba(236, 72, 153, 0.2)' : '#ffebee', px: 1, borderRadius: 1, color: isGenz ? '#EC4899' : '#d32f2f', border: isGenz ? '1px solid rgba(236, 72, 153, 0.3)' : 'none' }}>High Priority</Typography>
                        </Typography>
                        {plan.matrix.doFirst.map(t => renderChecklistItem(t, 'Do First'))}
                    </Box>
                )}

                {plan.matrix.schedule.length > 0 && (
                    <Box mb={3}>
                        <Typography variant="h6" sx={{ mb: 2, color: isGenz ? '#A855F7' : '#ed6c02', display: 'flex', alignItems: 'center', gap: 1 }}>
                            📅 Schedule <Typography variant="caption" sx={{ bgcolor: isGenz ? 'rgba(168, 85, 247, 0.2)' : '#fff3e0', px: 1, borderRadius: 1, color: isGenz ? '#A855F7' : '#ed6c02', border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none' }}>Plan for later</Typography>
                        </Typography>
                        {plan.matrix.schedule.map(t => renderChecklistItem(t, 'Schedule'))}
                    </Box>
                )}

                {plan.matrix.delegate.length > 0 && (
                    <Box mb={3}>
                        <Typography variant="h6" sx={{ mb: 2, color: isGenz ? '#22D3EE' : '#f57f17', display: 'flex', alignItems: 'center', gap: 1 }}>
                            🤝 Delegate <Typography variant="caption" sx={{ bgcolor: isGenz ? 'rgba(34, 211, 238, 0.2)' : '#fffde7', px: 1, borderRadius: 1, color: isGenz ? '#22D3EE' : '#f57f17', border: isGenz ? '1px solid rgba(34, 211, 238, 0.3)' : 'none' }}>Quick / Low Impact</Typography>
                        </Typography>
                        {plan.matrix.delegate.map(t => renderChecklistItem(t, 'Delegate'))}
                    </Box>
                )}

                {plan.matrix.dontDo.length > 0 && (
                    <Box mb={3}>
                        <Typography variant="h6" sx={{ mb: 2, color: isGenz ? '#10B981' : '#2e7d32', display: 'flex', alignItems: 'center', gap: 1 }}>
                            🌱 Optional <Typography variant="caption" sx={{ bgcolor: isGenz ? 'rgba(16, 185, 129, 0.2)' : '#e8f5e9', px: 1, borderRadius: 1, color: isGenz ? '#10B981' : '#2e7d32', border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none' }}>Low Priority</Typography>
                        </Typography>
                        {plan.matrix.dontDo.map(t => renderChecklistItem(t, 'Optional'))}
                    </Box>
                )}

                {Object.values(plan.matrix).flat().length === 0 && (
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: isGenz ? 'rgba(16, 185, 129, 0.1)' : 'transparent', border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none', borderRadius: isGenz ? '16px' : '8px' }} elevation={0}>
                        <Typography variant="h5" gutterBottom sx={{ color: isGenz ? '#10B981' : 'inherit' }}>🎉 All Done!</Typography>
                        <Typography sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>You've completed everything for today. Enjoy your rest!</Typography>
                    </Paper>
                )}
            </Box>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            sx={{ 
                mt: 2, 
                color: isGenz ? '#A855F7' : (isBoho ? '#964734' : 'primary.main'), 
                borderColor: isGenz ? '#A855F7' : (isBoho ? '#964734' : 'primary.main'),
                '&:hover': {
                    borderColor: isGenz ? '#EC4899' : undefined,
                    bgcolor: isGenz ? 'rgba(168, 85, 247, 0.1)' : undefined
                }
            }}
            onClick={() => {
              setStep('init');
              setMessages([]);
              setUserEnergy('');
              setTasks([]);
              setPlan(null);
            }}
          >
            {themeConfig.buttons.startOver.label}
          </Button>
        </Box>

        <Snackbar 
            open={snackbarOpen} 
            autoHideDuration={4000} 
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert 
                onClose={() => setSnackbarOpen(false)} 
                severity="success" 
                sx={{ 
                    width: '100%', 
                    bgcolor: isGenz ? 'rgba(16, 185, 129, 0.9)' : (isBoho ? '#F5E6D3' : undefined), 
                    color: isGenz ? '#FFFFFF' : (isBoho ? '#5D4037' : undefined),
                    backdropFilter: isGenz ? 'blur(10px)' : 'none',
                    border: isGenz ? '1px solid rgba(16, 185, 129, 0.5)' : 'none',
                    borderRadius: isGenz ? '12px' : '4px',
                    '& .MuiAlert-icon': {
                        color: isGenz ? '#FFFFFF' : undefined
                    }
                }}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
      </Box>
    );
  };

  return (
    <Box sx={{ 
      pt: 12, 
      pb: 8, 
      minHeight: '100vh',
      bgcolor: isGenz ? 'transparent' : 'inherit',
      background: isGenz 
        ? 'linear-gradient(135deg, #0F0A1F 0%, #1A1033 50%, #0D1B2A 100%)'
        : 'none',
      position: 'relative'
    }}>
      {/* GenZ background effect */}
      {isGenz && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Welcome Message for Returning Users */}
        {showWelcome && userName && (
          <Alert 
            severity="success" 
            onClose={() => setShowWelcome(false)}
            sx={{ 
              mb: 3,
              bgcolor: isGenz 
                ? 'rgba(16, 185, 129, 0.2)' 
                : (isBoho ? 'rgba(201, 165, 119, 0.1)' : 'rgba(38, 191, 240, 0.1)'),
              color: isGenz ? '#FFFFFF' : (isBoho ? '#6B4423' : '#1976d2'),
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              fontSize: isBoho ? '1rem' : '0.95rem',
              borderRadius: isGenz ? '12px' : (isBoho ? '4px' : '8px'),
              border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
              '& .MuiAlert-icon': {
                color: isGenz ? '#10B981' : (isBoho ? '#964734' : '#26BFF0')
              }
            }}
          >
            {isGenz 
              ? `Hey ${userName}! Let's crush it today! 🔥✨`
              : (isBoho 
                ? `Welcome back, ${userName}! Ready to craft another beautiful day? 🌿`
                : `Welcome back, ${userName}! Let's organize your day together! 🎯`)}
          </Alert>
        )}

        <Typography
          variant="h2"
          sx={{
            fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
            color: isGenz ? '#FFFFFF' : (isBoho ? '#243533' : '#1A1A2E'),
            mb: 4,
            textAlign: 'center',
            ...(isGenz && {
              background: 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(168, 85, 247, 0.3)'
            })
          }}
        >
          {step === 'result' ? 'Your Personalized Plan' : 'Design Your Day'}
        </Typography>

        <Paper
          elevation={isGenz ? 0 : (isBoho ? 0 : 3)}
          sx={{
            p: 4,
            bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : (isBoho ? 'rgba(255, 255, 255, 0.9)' : 'white'),
            backdropFilter: isGenz ? 'blur(20px)' : 'none',
            border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : (isBoho ? '2px dashed rgba(183, 137, 83, 0.3)' : 'none'),
            borderRadius: isGenz ? '24px' : (isBoho ? '8px' : '16px'),
            minHeight: '60vh',
            boxShadow: isGenz ? '0 8px 32px rgba(168, 85, 247, 0.2)' : undefined,
            color: isGenz ? '#FFFFFF' : 'inherit'
          }}
        >
          {step === 'result' ? renderResult() : renderBuilder()}
        </Paper>

        {/* Accomplishments Section - Collapsible & Scalable */}
        <Paper
          elevation={isGenz ? 0 : (isBoho ? 0 : 2)}
          sx={{
            mt: 3,
            bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : (isBoho ? 'rgba(255, 255, 255, 0.95)' : 'white'),
            backdropFilter: isGenz ? 'blur(20px)' : 'none',
            border: isGenz ? '1px solid rgba(236, 72, 153, 0.3)' : (isBoho ? '1px solid #C9A577' : '1px solid #E0E0E0'),
            borderRadius: isGenz ? '24px' : (isBoho ? '8px' : '16px'),
            overflow: 'hidden',
            boxShadow: isGenz ? '0 8px 32px rgba(236, 72, 153, 0.15)' : undefined
          }}
        >
          {/* Header - Always visible */}
          <Box
            onClick={() => setShowAccomplishments(!showAccomplishments)}
            sx={{
              p: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              bgcolor: isGenz ? 'rgba(168, 85, 247, 0.1)' : (isBoho ? 'rgba(150, 71, 52, 0.05)' : 'rgba(38, 191, 240, 0.03)'),
              '&:hover': {
                bgcolor: isGenz ? 'rgba(168, 85, 247, 0.2)' : (isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(38, 191, 240, 0.08)'),
              },
              transition: 'background-color 0.2s'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmojiEventsIcon sx={{ color: isGenz ? '#EC4899' : (isBoho ? '#964734' : '#26BFF0'), fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ fontFamily: isBoho ? '"Caveat", cursive' : 'inherit', color: isGenz ? '#FFFFFF' : (isBoho ? '#964734' : '#1A1A2E'), fontWeight: 600 }}>
                  Your Accomplishments
                </Typography>
                <Typography variant="body2" sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>
                  {taskStats?.totalCompleted || 0} tasks completed • {taskStats?.streakDays || 0} day streak 🔥
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" sx={{ color: isGenz ? '#A855F7' : 'inherit' }}>
              {showAccomplishments ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Collapsible Content */}
          <Collapse in={showAccomplishments}>
            <Box sx={{ borderTop: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.2)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}` }}>
              {/* Tabs for Stats vs History */}
              <Tabs 
                value={accomplishmentTab} 
                onChange={(e, v) => { setAccomplishmentTab(v); setAccomplishmentPage(1); }}
                sx={{ 
                  borderBottom: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.2)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
                  '& .MuiTab-root': { 
                    color: isGenz ? 'rgba(255,255,255,0.6)' : (isBoho ? '#8B6F47' : '#666'),
                    '&.Mui-selected': { color: isGenz ? '#EC4899' : (isBoho ? '#964734' : '#26BFF0') }
                  },
                  '& .MuiTabs-indicator': { bgcolor: isGenz ? '#EC4899' : (isBoho ? '#964734' : '#26BFF0') }
                }}
              >
                <Tab label="📊 Overview" />
                <Tab label={`📋 History (${taskStats?.totalCompleted || 0})`} />
              </Tabs>

              {/* Tab 0: Stats Overview */}
              {accomplishmentTab === 0 && (
                <Box sx={{ p: 3 }}>
                  {/* Stats Row */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: isGenz ? 'rgba(16, 185, 129, 0.15)' : (isBoho ? '#FDFBF7' : '#F5F7FA'), borderRadius: '12px', border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: isGenz ? '#10B981' : '#4CAF50' }}>{taskStats?.totalCompleted || 0}</Typography>
                        <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>Total Done</Typography>
                        <CheckCircleIcon sx={{ display: 'block', mx: 'auto', mt: 0.5, color: isGenz ? '#10B981' : '#4CAF50', fontSize: 18 }} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: isGenz ? 'rgba(168, 85, 247, 0.15)' : (isBoho ? '#FDFBF7' : '#F5F7FA'), borderRadius: '12px', border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: isGenz ? '#A855F7' : '#2196F3' }}>{taskStats?.thisWeek || 0}</Typography>
                        <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>This Week</Typography>
                        <TrendingUpIcon sx={{ display: 'block', mx: 'auto', mt: 0.5, color: isGenz ? '#A855F7' : '#2196F3', fontSize: 18 }} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: isGenz ? 'rgba(236, 72, 153, 0.15)' : (isBoho ? '#FDFBF7' : '#F5F7FA'), borderRadius: '12px', border: isGenz ? '1px solid rgba(236, 72, 153, 0.3)' : 'none' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: isGenz ? '#EC4899' : '#FF5722' }}>{taskStats?.streakDays || 0}</Typography>
                        <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>Day Streak</Typography>
                        <LocalFireDepartmentIcon sx={{ display: 'block', mx: 'auto', mt: 0.5, color: isGenz ? '#EC4899' : '#FF5722', fontSize: 18 }} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: isGenz ? 'rgba(34, 211, 238, 0.15)' : (isBoho ? '#FDFBF7' : '#F5F7FA'), borderRadius: '12px', border: isGenz ? '1px solid rgba(34, 211, 238, 0.3)' : 'none' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: isGenz ? '#22D3EE' : '#FFD700' }}>{taskStats?.thisMonth || 0}</Typography>
                        <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>This Month</Typography>
                        <StarIcon sx={{ display: 'block', mx: 'auto', mt: 0.5, color: isGenz ? '#22D3EE' : '#FFD700', fontSize: 18 }} />
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Category Breakdown */}
                  {taskStats?.categoryBreakdown && taskStats.totalCompleted > 0 && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: isGenz ? '#FFFFFF' : (isBoho ? '#964734' : '#1A1A2E') }}>
                        Category Breakdown
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(taskStats.categoryBreakdown).map(([cat, count]) => (
                          <Grid item xs={12} sm={6} key={cat}>
                            <Box sx={{ mb: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ textTransform: 'capitalize', color: isGenz ? 'rgba(255,255,255,0.9)' : 'inherit' }}>{cat}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: isGenz ? '#A855F7' : 'inherit' }}>{count} ({Math.round((count / taskStats.totalCompleted) * 100)}%)</Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={(count / taskStats.totalCompleted) * 100} 
                                sx={{ 
                                  height: 6, 
                                  borderRadius: 3, 
                                  bgcolor: isGenz ? 'rgba(168, 85, 247, 0.2)' : (isBoho ? '#F5E6D3' : '#E3F2FD'), 
                                  '& .MuiLinearProgress-bar': { 
                                    background: isGenz ? 'linear-gradient(90deg, #10B981 0%, #A855F7 50%, #EC4899 100%)' : (isBoho ? '#964734' : '#26BFF0'),
                                    borderRadius: 3 
                                  } 
                                }}
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {taskStats?.totalCompleted === 0 && (
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: isGenz ? 'rgba(168, 85, 247, 0.1)' : (isBoho ? '#FDFBF7' : '#F5F7FA'), borderRadius: '12px', border: isGenz ? '1px solid rgba(168, 85, 247, 0.2)' : 'none' }}>
                      <Typography sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>No completed tasks yet. Start checking off tasks to build your stats! ✨</Typography>
                    </Paper>
                  )}
                </Box>
              )}

              {/* Tab 1: Paginated History */}
              {accomplishmentTab === 1 && (
                <Box sx={{ p: 3 }}>
                  {/* Filters */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Time</InputLabel>
                      <Select 
                        value={accomplishmentFilter} 
                        label="Time"
                        onChange={(e) => { setAccomplishmentFilter(e.target.value); setAccomplishmentPage(1); }}
                      >
                        <MenuItem value="all">All Time</MenuItem>
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="week">This Week</MenuItem>
                        <MenuItem value="month">This Month</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Category</InputLabel>
                      <Select 
                        value={accomplishmentCategory} 
                        label="Category"
                        onChange={(e) => { setAccomplishmentCategory(e.target.value); setAccomplishmentPage(1); }}
                      >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="work">Work</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="study">Study</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  {/* Filtered & Paginated Task List */}
                  {(() => {
                    // Filter tasks
                    const now = new Date();
                    const filtered = taskHistory.filter(task => {
                      // Time filter
                      if (accomplishmentFilter !== 'all' && task.completedAt) {
                        const completedDate = new Date(task.completedAt);
                        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                        
                        if (accomplishmentFilter === 'today' && completedDate < today) return false;
                        if (accomplishmentFilter === 'week' && completedDate < weekAgo) return false;
                        if (accomplishmentFilter === 'month' && completedDate < monthAgo) return false;
                      }
                      // Category filter
                      if (accomplishmentCategory !== 'all' && task.category !== accomplishmentCategory) return false;
                      return true;
                    });

                    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
                    const paginatedTasks = filtered.slice((accomplishmentPage - 1) * ITEMS_PER_PAGE, accomplishmentPage * ITEMS_PER_PAGE);

                    return (
                      <>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          Showing {paginatedTasks.length} of {filtered.length} tasks
                        </Typography>

                        {paginatedTasks.length === 0 ? (
                          <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: isBoho ? '#FDFBF7' : '#F5F7FA', borderRadius: '12px' }}>
                            <Typography color="text.secondary">No tasks match your filters.</Typography>
                          </Paper>
                        ) : (
                          <Stack spacing={1}>
                            {paginatedTasks.map((task, i) => (
                              <Paper 
                                key={task.taskId || i} 
                                elevation={0} 
                                sx={{ 
                                  p: 2, 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 2, 
                                  borderRadius: '10px', 
                                  border: `1px solid ${isBoho ? '#E0D0C0' : '#E0E0E0'}`,
                                  bgcolor: 'white'
                                }}
                              >
                                <CheckCircleIcon sx={{ color: '#4CAF50', flexShrink: 0 }} />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {task.title}
                                  </Typography>
                                  <Stack direction="row" spacing={0.5} mt={0.5}>
                                    <Chip label={task.category || 'personal'} size="small" sx={{ fontSize: '0.65rem', height: 18 }} />
                                    <Chip label={task.priority || 'medium'} size="small" sx={{ fontSize: '0.65rem', height: 18 }} />
                                  </Stack>
                                </Box>
                                <Typography variant="caption" sx={{ color: '#999', flexShrink: 0 }}>
                                  {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : ''}
                                </Typography>
                              </Paper>
                            ))}
                          </Stack>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Pagination 
                              count={totalPages} 
                              page={accomplishmentPage} 
                              onChange={(e, page) => setAccomplishmentPage(page)}
                              color="primary"
                              size="small"
                              sx={{
                                '& .MuiPaginationItem-root': {
                                  color: isBoho ? '#964734' : '#26BFF0',
                                },
                                '& .Mui-selected': {
                                  bgcolor: isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(38, 191, 240, 0.1)',
                                }
                              }}
                            />
                          </Box>
                        )}
                      </>
                    );
                  })()}
                </Box>
              )}
            </Box>
          </Collapse>
        </Paper>
      </Container>
    </Box>
  );
};

export default ToDoList;
