import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  TextField,
  Paper,
  Fade,
  Button,
  Stack,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DownloadIcon from '@mui/icons-material/Download';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// ===========================================
// HAYATI AI LIFE ASSISTANT - COMPLETE SYSTEM
// ===========================================

// THREE-BUTTON SYSTEM
const PHASES = {
  WELCOME: 'welcome',
  SHARE_STORY: 'share_story',
  EISENHOWER_MAPPING: 'eisenhower_mapping',
  TODO_LIST: 'todo_list',
  COMPLETED: 'completed'
};

// SHARE YOUR STORY Questions (one at a time, emotional)
const storyQuestions = {
  normal: [
    { id: 'age', text: "How old are you?" },
    { id: 'gender', text: "How do you identify? (male/female/non-binary/prefer not to say)" },
    { id: 'daily_routine', text: "What does your typical day look like?" },
    { id: 'sleep_energy', text: "How's your sleep and energy levels?" },
    { id: 'work_type', text: "What's your work situation? (remote/onsite/hybrid/studying/other)" },
    { id: 'commute', text: "Do you have a commute? How long?" },
    { id: 'free_time', text: "How much free time do you have in a day?" },
    { id: 'stress_sources', text: "What's stressing you out lately?" },
    { id: 'happiness_sources', text: "What brings you joy? What are your hobbies?" },
    { id: 'current_struggles', text: "What feels hardest right now?" },
    { id: 'long_term_dreams', text: "Where do you see yourself in 1, 3, or 5 years?" },
    { id: 'heavy_feeling', text: "What feels heavy in your life?" },
    { id: 'important_feeling', text: "What feels truly important to you?" },
    { id: 'urgent_feeling', text: "What feels urgent right now?" },
    { id: 'emotional_state', text: "How are you feeling emotionally these days?" }
  ],
  boho: [
    { id: 'age', text: "May I ask your age?" },
    { id: 'gender', text: "How do you identify? (This helps me understand you better)" },
    { id: 'daily_routine', text: "Tell me about your days... how do they usually unfold?" },
    { id: 'sleep_energy', text: "How are you sleeping? How does your body feel?" },
    { id: 'work_type', text: "What fills your days? Work, study, something else?" },
    { id: 'commute', text: "Do you travel for work or school? How does that feel?" },
    { id: 'free_time', text: "When do you breathe? When is time truly yours?" },
    { id: 'stress_sources', text: "What weighs on your heart lately?" },
    { id: 'happiness_sources', text: "What makes your soul feel light? What do you love doing?" },
    { id: 'current_struggles', text: "What's been the hardest part of your days?" },
    { id: 'long_term_dreams', text: "If you close your eyes and imagine your future... what do you see?" },
    { id: 'heavy_feeling', text: "What feels like a weight you're carrying?" },
    { id: 'important_feeling', text: "Deep down, what really matters to you?" },
    { id: 'urgent_feeling', text: "What's calling for your attention right now?" },
    { id: 'emotional_state', text: "How's your heart feeling these days?" }
  ],
  genz: [
    { id: 'age', text: "Quick q - how old are you? 🎂" },
    { id: 'gender', text: "How do you identify? (whatever feels right to you!) 💫" },
    { id: 'daily_routine', text: "Walk me through your typical day - the vibes, the chaos, all of it 🌀" },
    { id: 'sleep_energy', text: "Be real - how's your sleep schedule? Are we thriving or surviving? 😴" },
    { id: 'work_type', text: "What's your main thing rn? Work, school, hustle? 💼" },
    { id: 'commute', text: "Do you have to commute? How's that going for your sanity? 🚗" },
    { id: 'free_time', text: "When do you actually get ME time? How much of that do you have? ⏰" },
    { id: 'stress_sources', text: "What's living rent-free in your head rn? What's stressing you? 😤" },
    { id: 'happiness_sources', text: "What makes you genuinely happy? Like, serotonin boost level happy? ✨" },
    { id: 'current_struggles', text: "No cap - what's been the hardest thing lately? 💭" },
    { id: 'long_term_dreams', text: "Dream life check - where do you see yourself in a few years? 🚀" },
    { id: 'heavy_feeling', text: "What's weighing on you? The mental load stuff? 🎒" },
    { id: 'important_feeling', text: "Deep down, what actually matters to you? Core values vibes 💜" },
    { id: 'urgent_feeling', text: "What feels like it needs attention ASAP? 🔥" },
    { id: 'emotional_state', text: "Mental health check - how are you actually doing emotionally? 🫂" }
  ]
};

// EISENHOWER MAPPING Questions (psychological classification)
const eisenhowerQuestions = {
  normal: [
    { id: 'fear_delay', text: "Which things in your life scare you if delayed?" },
    { id: 'future_matter', text: "What would still matter in 10 years?" },
    { id: 'time_drain', text: "What drains your time without real value?" },
    { id: 'peace_tasks', text: "What gives peace but not pressure?" }
  ],
  boho: [
    { id: 'fear_delay', text: "What keeps you awake at night if left undone?" },
    { id: 'future_matter', text: "When you imagine yourself older, what will you be glad you did?" },
    { id: 'time_drain', text: "What steals your time but leaves you empty?" },
    { id: 'peace_tasks', text: "What activities fill your heart without demanding urgency?" }
  ],
  genz: [
    { id: 'fear_delay', text: "What gives you anxiety if you don't do it soon? Like, panic mode stuff? 😰" },
    { id: 'future_matter', text: "Fast forward 10 years - what will you be glad you worked on? 🔮" },
    { id: 'time_drain', text: "What's a total time suck that doesn't even help you? Like doom scrolling energy 📱" },
    { id: 'peace_tasks', text: "What chills you out without the pressure? Self-care type things? 🧘" }
  ]
};

// Gentle life tips
const lifeTips = [
  "Remember: You don't have to do everything today. Progress is progress.",
  "Your energy is precious. Protect it like you protect your time.",
  "Small steps forward are still steps forward.",
  "It's okay to rest. Rest is productive too.",
  "You're doing better than you think. Keep going.",
  "Your wellbeing matters as much as your productivity.",
  "Balance is not perfect. Balance is intentional."
];

const ChatInterface = ({ open, onClose, isBoho, isGenz }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const messagesEndRef = useRef(null);
  
  // User Profile State (Backend Integration)
  const [userProfile, setUserProfile] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  
  // Three-button system state
  const [systemState, setSystemState] = useState({
    phase: PHASES.WELCOME,
    storyCompleted: false,
    eisenhowerCompleted: false,
    todoCompleted: false,
    
    // Story data
    storyAnswers: {},
    currentStoryQuestion: 0,
    
    // Eisenhower mapping data
    eisenhowerAnswers: {},
    currentEisenhowerQuestion: 0,
    personalizedLogic: null,
    
    // To-Do data
    tasks: [],
    taskCollectionMode: false,
    awaitingMoreTasks: false,
    
    // Output
    generatedMatrix: null,
    generatedSchedule: null,
    stressLevel: null
  });

  // ===========================================
  // USER PROFILE & BACKEND INTEGRATION
  // ===========================================

  // Get or create user ID
  const getUserId = () => {
    let userId = localStorage.getItem('hayati_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('hayati_user_id', userId);
    }
    return userId;
  };

  // Load user profile from backend
  const loadUserProfile = async () => {
    const userId = getUserId();
    
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
        setIsFirstLogin(false);
        
        // Load saved state
        setSystemState(prev => ({
          ...prev,
          storyCompleted: profile.storyCompleted || false,
          eisenhowerCompleted: profile.eisenhowerCompleted || false,
          storyAnswers: profile.storyAnswers || {},
          eisenhowerAnswers: profile.eisenhowerAnswers || {},
          personalizedLogic: profile.personalizedLogic || null
        }));
        
        setProfileLoaded(true);
        return profile;
      } else {
        // New user - no profile exists
        setIsFirstLogin(true);
        setProfileLoaded(true);
        return null;
      }
    } catch (error) {
      console.log('No existing profile or server offline, starting fresh');
      setIsFirstLogin(true);
      setProfileLoaded(true);
      return null;
    }
  };

  // Save user profile to backend
  const saveUserProfile = async (updates) => {
    const userId = getUserId();
    
    // Merge profile data intelligently
    const currentProfile = userProfile?.profile || {};
    const updatedProfile = updates.profile ? {
      ...currentProfile,
      ...updates.profile
    } : currentProfile;
    
    const profileData = {
      userId,
      name: updates.name || userProfile?.name || localStorage.getItem('hayati_user_name') || '',
      uiMode: isBoho ? 'boho' : 'normal',
      storyCompleted: updates.storyCompleted !== undefined ? updates.storyCompleted : systemState.storyCompleted,
      eisenhowerCompleted: updates.eisenhowerCompleted !== undefined ? updates.eisenhowerCompleted : systemState.eisenhowerCompleted,
      storyAnswers: updates.storyAnswers || systemState.storyAnswers,
      eisenhowerAnswers: updates.eisenhowerAnswers || systemState.eisenhowerAnswers,
      profile: updatedProfile,
      weeklyPreference: updates.weeklyPreference || userProfile?.weeklyPreference || {},
      taskHistory: updates.taskHistory || userProfile?.taskHistory || [],
      lastUpdated: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        const savedProfile = await response.json();
        setUserProfile(savedProfile);
        console.log('Profile saved successfully:', savedProfile);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load profile on mount
  useEffect(() => {
    if (open && !profileLoaded) {
      loadUserProfile();
    }
  }, [open]);

  // Initial welcome with context awareness
  useEffect(() => {
    if (open && messages.length === 0 && profileLoaded) {
      setTimeout(() => {
        // Check for pending actions from Profile page buttons
        const pendingAction = localStorage.getItem('hayati_pending_action');
        
        if (pendingAction === 'story') {
          // Clear the pending action
          localStorage.removeItem('hayati_pending_action');
          
          // Start Share Your Journey flow
          const isRerun = localStorage.getItem('hayati_rerun_story') === 'true';
          const welcomeMsg = isBoho
            ? (isRerun 
              ? "Let's refresh your story 🌿\n\nTake your time. I'm here to listen."
              : "Let's begin with your story 💙\n\nTake your time. I'm here to listen.")
            : (isRerun
              ? "Let's update your story. I'm listening."
              : "Let's start with your story. Tell me about yourself.");
          
          addBotMessage(welcomeMsg);
          setSystemState(prev => ({ ...prev, phase: PHASES.SHARE_STORY }));
          
          // Start first question with stop instruction
          const questions = isGenz ? storyQuestions.genz : (isBoho ? storyQuestions.boho : storyQuestions.normal);
          setTimeout(() => {
            const firstQ = isGenz
              ? `${questions[0].text}\n\n(Say "stop" whenever you're done! 👋)`
              : (isBoho
                ? `${questions[0].text}\n\n(Type "stop" anytime to finish early)`
                : `${questions[0].text}\n\n(Type "stop" to finish)`);
            addBotMessage(firstQ);
          }, 800);
          return;
        }
        
        if (pendingAction === 'eisenhower') {
          // Clear the pending action
          localStorage.removeItem('hayati_pending_action');
          
          // Start Eisenhower Mapping flow
          const isRedo = localStorage.getItem('hayati_redo_eisenhower') === 'true';
          const welcomeMsg = isBoho
            ? (isRedo
              ? "Let's rebuild your priority map 🧭\n\nWhat matters to you now?"
              : "Now let's understand what truly matters 🧭\n\nI'll ask you a few deeper questions.")
            : (isRedo
              ? "Let's update your Eisenhower Matrix. What are your priorities now?"
              : "Now I'll help you build your personal Eisenhower Matrix.");
          
          addBotMessage(welcomeMsg);
          setSystemState(prev => ({ ...prev, phase: PHASES.EISENHOWER }));
          
          // Start first question
          const questions = isGenz ? eisenhowerQuestions.genz : (isBoho ? eisenhowerQuestions.boho : eisenhowerQuestions.normal);
          setTimeout(() => addBotMessage(questions[0].text), 800);
          return;
        }
        
        // Normal flow - no pending action
        let welcomeMsg = '';
        
        // RETURNING USER
        if (!isFirstLogin && userProfile) {
          const userName = userProfile.name || 'friend';
          
          if (systemState.storyCompleted && systemState.eisenhowerCompleted) {
            // Skip onboarding, go straight to To-Do
            welcomeMsg = isBoho
              ? `Welcome back, ${userName} 🌿\n\nI remember you.\nI remember your story.\n\nLet's organize your day gently.`
              : `Welcome back, ${userName} 💙\n\nI remember your priorities.\nLet's organize your tasks.`;
            
            setSystemState(prev => ({ ...prev, phase: PHASES.TODO_LIST }));
          } else {
            // Continue onboarding
            welcomeMsg = isBoho
              ? `Welcome back, ${userName} 🌿\n\nLet's continue where we left off.`
              : `Welcome back, ${userName} 💙\n\nLet's complete your setup.`;
          }
        } 
        // NEW USER (FIRST LOGIN)
        else {
          welcomeMsg = isBoho 
            ? "Hello, I'm Hayati 💙\n\nI'm here with you.\n\nLet's breathe and organize your life gently.\n\nI'm not just a task manager. I'm here to understand you, support you, and help you build a life that feels lighter.\n\nLet's start with your story first."
            : "Hello, I'm Hayati 💙\n\nI'm here to organize your life.\n\nI'm not just a task manager. I'm your life organizer, emotional support system, and personal productivity companion.\n\nTo give you the best support, I need to understand you first.";
        }
        
        addBotMessage(welcomeMsg, true);
      }, 500);
    }
  }, [open, profileLoaded]);

  const addBotMessage = (text, showButtons = false) => {
    setMessages(prev => [...prev, { type: 'bot', text, showButtons }]);
    if (ttsEnabled) {
      speakText(text);
    }
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const speakText = (text) => {
    const cleanText = text.replace(/[💙🎯📅❤️🧠⚙️📝🤖🔴🟡🔵⚪🔥🌱⚡🧊✅🟥🟦🟨⬜📊📥]/g, '').replace(/\n+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // ===========================================
  // BUTTON HANDLERS
  // ===========================================

  const handleShareStoryClick = () => {
    if (!systemState.storyCompleted) {
      setSystemState(prev => ({ ...prev, phase: PHASES.SHARE_STORY }));
      const questions = isGenz ? storyQuestions.genz : (isBoho ? storyQuestions.boho : storyQuestions.normal);
      const intro = isGenz
        ? `Bet! Let's get to know you ✨\n\nI'll ask you some questions one at a time.\nKeep it real, no judgment here!\n\nSay "stop" whenever you're done.\n\n${questions[0].text}\n\n(Say "stop" when you're done! 👋)`
        : (isBoho
          ? `Thank you for trusting me 💙\n\nLet's start gently.\n\nI'll ask you one question at a time.\nTake your time. There's no rush.\n\nYou can type "stop" anytime if you want to finish early.\n\n${questions[0].text}\n\n(Type "stop" to finish anytime)`
          : `Let's understand your life.\n\nI'll ask you one question at a time.\nAnswer freely.\n\nType "stop" anytime to finish early.\n\n${questions[0].text}\n\n(Type "stop" to finish)`);
      addBotMessage(intro);
    }
  };

  const handleEisenhowerClick = () => {
    if (systemState.storyCompleted && !systemState.eisenhowerCompleted) {
      setSystemState(prev => ({ ...prev, phase: PHASES.EISENHOWER_MAPPING }));
      const questions = isGenz ? eisenhowerQuestions.genz : (isBoho ? eisenhowerQuestions.boho : eisenhowerQuestions.normal);
      const intro = isGenz
        ? "Okay now let's figure out your priorities 🎯\n\nI'll ask you a few questions to understand what's actually important vs what's just noise.\n\n" + questions[0].text
        : (isBoho
          ? "Now let's understand what truly matters to you 💙\n\nNot mechanically — but from your heart.\n\n" + questions[0].text
          : "Now let's understand how you naturally think about responsibility.\n\n" + questions[0].text);
      addBotMessage(intro);
    }
  };

  const handleToDoListClick = () => {
    if (systemState.storyCompleted && systemState.eisenhowerCompleted && !systemState.todoCompleted) {
      setSystemState(prev => ({ ...prev, phase: PHASES.TODO_LIST, taskCollectionMode: true }));
      const intro = isGenz
        ? "Alright let's dump all your tasks! 📝✨\n\nJust type whatever's on your plate.\nHit send after each one.\nSay \"done\" when you've got them all!"
        : (isBoho
          ? "Now, tell me what's on your mind 💙\n\nType your tasks freely.\nPress send after each one.\nTell me when you're done."
          : "Type your tasks freely.\nPress send after each one.\nTell me when you're done.");
      addBotMessage(intro);
    }
  };

  // ===========================================
  // PSYCHOLOGICAL ANALYSIS ENGINE
  // ===========================================

  const analyzePersonalityProfile = (answers) => {
    // 1️⃣ PERSONALITY MODEL ANALYSIS
    const personalityTraits = [];
    let cognitiveStyle = '';
    let emotionalStyle = '';
    let stressPattern = '';
    
    // Analyze daily routine for personality traits
    const routine = (answers.daily_routine || '').toLowerCase();
    if (routine.includes('plan') || routine.includes('schedule') || routine.includes('organize')) {
      personalityTraits.push('structured');
      cognitiveStyle = 'Analytical and Planning-Oriented';
    } else if (routine.includes('flow') || routine.includes('flexible') || routine.includes('spontaneous')) {
      personalityTraits.push('adaptive');
      cognitiveStyle = 'Intuitive and Flexible';
    }
    
    // Analyze emotional patterns
    const emotional = (answers.emotional_state || '').toLowerCase();
    if (emotional.includes('anxious') || emotional.includes('worried') || emotional.includes('stress')) {
      emotionalStyle = 'High-sensitivity to environmental stressors';
      stressPattern = 'Anxiety-driven response';
    } else if (emotional.includes('calm') || emotional.includes('peaceful') || emotional.includes('content')) {
      emotionalStyle = 'Emotionally regulated';
      stressPattern = 'Resilient coping mechanism';
    } else if (emotional.includes('overwhelm') || emotional.includes('tired') || emotional.includes('exhaust')) {
      emotionalStyle = 'Emotional fatigue present';
      stressPattern = 'Burnout risk detected';
    }
    
    // 2️⃣ MOTIVATION SYSTEM
    let motivationType = '';
    let rewardStyle = '';
    
    const dreams = (answers.long_term_dreams || '').toLowerCase();
    const important = (answers.important_feeling || '').toLowerCase();
    
    if (dreams.includes('success') || dreams.includes('achieve') || dreams.includes('career')) {
      motivationType = 'Achievement-oriented';
      rewardStyle = 'External validation and accomplishment';
    } else if (dreams.includes('peace') || dreams.includes('happy') || dreams.includes('content')) {
      motivationType = 'Fulfillment-seeking';
      rewardStyle = 'Internal satisfaction and harmony';
    } else if (dreams.includes('help') || dreams.includes('family') || dreams.includes('others')) {
      motivationType = 'Altruistic and relational';
      rewardStyle = 'Connection and contribution';
    }
    
    // 3️⃣ ENERGY PROFILE
    const sleep = (answers.sleep_energy || '').toLowerCase();
    let energyPattern = '';
    let burnoutRisk = 'Low';
    
    if (sleep.includes('tired') || sleep.includes('exhaust') || sleep.includes('drain')) {
      energyPattern = 'Chronic fatigue detected';
      burnoutRisk = 'High';
    } else if (sleep.includes('okay') || sleep.includes('manage') || sleep.includes('cope')) {
      energyPattern = 'Moderate energy levels';
      burnoutRisk = 'Medium';
    } else {
      energyPattern = 'Healthy energy balance';
      burnoutRisk = 'Low';
    }
    
    // 4️⃣ VALUES MAPPING
    const values = [];
    if (important.includes('family')) values.push('Family connection');
    if (important.includes('health')) values.push('Physical wellbeing');
    if (important.includes('career') || important.includes('work')) values.push('Professional growth');
    if (important.includes('peace') || important.includes('calm')) values.push('Inner peace');
    if (important.includes('time')) values.push('Time autonomy');
    if (important.includes('creative') || important.includes('art')) values.push('Creative expression');
    
    // 5️⃣ STRESS & CONFLICT PATTERNS
    const struggles = (answers.current_struggles || '').toLowerCase();
    const heavy = (answers.heavy_feeling || '').toLowerCase();
    const stressors = (answers.stress_sources || '').toLowerCase();
    
    const conflictPatterns = [];
    if (struggles.includes('time') || heavy.includes('time')) conflictPatterns.push('Time pressure conflict');
    if (struggles.includes('balance') || heavy.includes('balance')) conflictPatterns.push('Work-life balance tension');
    if (struggles.includes('decision') || heavy.includes('choice')) conflictPatterns.push('Decision paralysis');
    if (stressors.includes('expectation') || stressors.includes('pressure')) conflictPatterns.push('External pressure sensitivity');
    
    // 6️⃣ BEHAVIORAL TENDENCIES
    let timeOrientation = '';
    if (dreams.includes('future') || dreams.includes('plan') || dreams.includes('year')) {
      timeOrientation = 'Future-oriented planner';
    } else if (dreams.includes('now') || dreams.includes('today') || dreams.includes('present')) {
      timeOrientation = 'Present-focused';
    } else {
      timeOrientation = 'Balanced time perspective';
    }
    
    return {
      // Core psychological profile
      personalityTraits: personalityTraits.join(', ') || 'Exploring self-awareness',
      cognitiveStyle: cognitiveStyle || 'Developing cognitive patterns',
      emotionalStyle: emotionalStyle || 'Building emotional awareness',
      stressPattern: stressPattern || 'Adaptive stress response',
      
      // Motivation & values
      motivationType: motivationType || 'Multi-faceted motivation',
      rewardStyle: rewardStyle || 'Intrinsic satisfaction',
      primaryValues: values.length > 0 ? values.slice(0, 3).join(', ') : 'Self-discovery in progress',
      
      // Energy & wellbeing
      energyPattern: energyPattern || 'Energy awareness developing',
      burnoutRisk: burnoutRisk,
      
      // Behavioral patterns
      timeOrientation: timeOrientation,
      conflictPatterns: conflictPatterns.join(', ') || 'Manageable life tensions',
      
      // Identity structure
      coreIdentity: motivationType ? `${motivationType} individual with ${emotionalStyle}` : 'Evolving self-concept',
      growthDirection: dreams ? 'Clear future vision' : 'Exploring possibilities'
    };
  };

  // ===========================================
  // PHASE-SPECIFIC RESPONSE HANDLERS
  // ===========================================

  const handleShareStoryResponse = (userMessage) => {
    const questions = isGenz ? storyQuestions.genz : (isBoho ? storyQuestions.boho : storyQuestions.normal);
    const currentQ = systemState.currentStoryQuestion;
    
    // Check if user wants to stop
    const lowerMsg = userMessage.toLowerCase().trim();
    if (lowerMsg === 'stop' || lowerMsg === 'finish' || lowerMsg === 'done' || lowerMsg === 'skip' || lowerMsg === 'that\'s enough') {
      // Extract profile from partial answers
      const partialAnswers = systemState.storyAnswers;
      const psychProfile = analyzePersonalityProfile(partialAnswers);
      const isRerun = localStorage.getItem('hayati_rerun_story') === 'true';
      
      const extractedProfile = {
        age: partialAnswers.age || '',
        gender: partialAnswers.gender || '',
        workStyle: partialAnswers.work_type || '',
        dailyRoutine: psychProfile.cognitiveStyle ? `${psychProfile.cognitiveStyle} - ${psychProfile.timeOrientation}` : '',
        commute: partialAnswers.commute || '',
        freeTime: partialAnswers.free_time || '',
        personalityModel: `${psychProfile.personalityTraits}\n${psychProfile.cognitiveStyle}\n${psychProfile.emotionalStyle}`,
        emotionalBlueprint: `Emotional Style: ${psychProfile.emotionalStyle}\nStress Pattern: ${psychProfile.stressPattern}\nBurnout Risk: ${psychProfile.burnoutRisk}`,
        motivationSystem: `Motivation Type: ${psychProfile.motivationType}\nReward Style: ${psychProfile.rewardStyle}`,
        identityStructure: `Core Identity: ${psychProfile.coreIdentity}\nGrowth Direction: ${psychProfile.growthDirection}`,
        energyModel: `${psychProfile.energyPattern} | Burnout Risk: ${psychProfile.burnoutRisk}`,
        emotionalModel: psychProfile.emotionalStyle,
        goals: partialAnswers.long_term_dreams || '',
        primaryValues: psychProfile.primaryValues,
        importantValues: psychProfile.primaryValues,
        behavioralTendencies: `${psychProfile.timeOrientation} | ${psychProfile.conflictPatterns}`,
        stressResponse: psychProfile.stressPattern,
        struggles: psychProfile.conflictPatterns || 'Navigating life transitions',
        hobbies: partialAnswers.happiness_sources || '',
        storyUpdated: isRerun,
        storyLastUpdated: new Date().toISOString()
      };
      
      setSystemState(prev => ({
        ...prev,
        storyCompleted: true,
        phase: PHASES.WELCOME
      }));
      
      if (isRerun) {
        localStorage.removeItem('hayati_rerun_story');
      }
      
      saveUserProfile({
        storyCompleted: true,
        storyAnswers: partialAnswers,
        profile: extractedProfile
      });
      
      const stopMsg = isGenz
        ? `Got it! 👍\n\nI've saved everything you shared.\nYour profile is updated based on what you told me!\n\n✅ Eisenhower Mapping is now unlocked - let's figure out your priorities!`
        : (isBoho
          ? `I understand 🌿\n\nI've saved what you've shared with me.\nYour profile has been updated based on your story so far.\n\nYou can continue anytime.\n\n✅ Button 2 is now unlocked.`
          : `Profile saved successfully.\nI've analyzed what you've shared so far.\n\n✅ You can now proceed to Eisenhower Mapping.`);
      addBotMessage(stopMsg, true);
      return;
    }
    
    // Save answer
    const newAnswers = { ...systemState.storyAnswers };
    newAnswers[questions[currentQ].id] = userMessage;
    
    const nextQ = currentQ + 1;
    
    if (nextQ < questions.length) {
      // Continue with next question
      setSystemState(prev => ({
        ...prev,
        storyAnswers: newAnswers,
        currentStoryQuestion: nextQ
      }));
      const nextMsg = isBoho 
        ? `${questions[nextQ].text}\n\n(Type "stop" anytime to finish early)`
        : `${questions[nextQ].text}\n\n(Type "stop" to finish)`;
      addBotMessage(nextMsg);
    } else {
      // Story completed - PERFORM PSYCHOLOGICAL ANALYSIS
      setSystemState(prev => ({
        ...prev,
        storyAnswers: newAnswers,
        storyCompleted: true,
        phase: PHASES.WELCOME
      }));
      
      // PSYCHOLOGICAL ANALYSIS ENGINE
      const psychProfile = analyzePersonalityProfile(newAnswers);
      const isRerun = localStorage.getItem('hayati_rerun_story') === 'true';
      
      const extractedProfile = {
        // Basic demographic information
        age: newAnswers.age || '',
        gender: newAnswers.gender || '',
        
        // Lifestyle context (not copied directly)
        workStyle: newAnswers.work_type || '',
        dailyRoutine: `${psychProfile.cognitiveStyle} - ${psychProfile.timeOrientation}`,
        commute: newAnswers.commute || '',
        freeTime: newAnswers.free_time || '',
        
        // PSYCHOLOGICAL MODELS (AI-generated)
        personalityModel: `${psychProfile.personalityTraits}\n${psychProfile.cognitiveStyle}\n${psychProfile.emotionalStyle}`,
        emotionalBlueprint: `Emotional Style: ${psychProfile.emotionalStyle}\nStress Pattern: ${psychProfile.stressPattern}\nBurnout Risk: ${psychProfile.burnoutRisk}`,
        motivationSystem: `Motivation Type: ${psychProfile.motivationType}\nReward Style: ${psychProfile.rewardStyle}`,
        identityStructure: `Core Identity: ${psychProfile.coreIdentity}\nGrowth Direction: ${psychProfile.growthDirection}`,
        
        // Energy profile
        energyModel: `${psychProfile.energyPattern} | Burnout Risk: ${psychProfile.burnoutRisk}`,
        emotionalModel: psychProfile.emotionalStyle,
        
        // Values & goals (analyzed, not copied)
        goals: newAnswers.long_term_dreams || '',
        primaryValues: psychProfile.primaryValues,
        importantValues: psychProfile.primaryValues,
        
        // Behavioral patterns
        behavioralTendencies: `${psychProfile.timeOrientation} | ${psychProfile.conflictPatterns}`,
        stressResponse: psychProfile.stressPattern,
        
        // Life challenges (summarized psychologically)
        struggles: psychProfile.conflictPatterns || 'Navigating life transitions',
        
        // Happiness sources (not direct copy)
        hobbies: newAnswers.happiness_sources || '',
        
        // Meta tracking
        storyUpdated: isRerun,
        storyLastUpdated: new Date().toISOString()
      };
      
      // Clear rerun flag
      if (isRerun) {
        localStorage.removeItem('hayati_rerun_story');
      }
      
      // Prepare backend update
      const profileUpdates = {
        storyCompleted: true,
        storyAnswers: newAnswers,
        profile: extractedProfile
      };
      
      // Save to backend
      saveUserProfile(profileUpdates);
      
      const completionMsg = isBoho
        ? (isRerun 
          ? "Your story has been refreshed successfully 🌿\n\nI understand your life now.\nI see you.\nI'm here for you."
          : "Thank you for sharing your story with me 💙\n\nI understand your life now.\nI see you.\nI'm here for you.\n\n✅ Button 2 is now unlocked.")
        : (isRerun
          ? "Your story has been refreshed successfully 🌿\n\nI understand your life now."
          : "Thank you for sharing your story.\nI understand your life now.\n\n✅ You can now proceed to Eisenhower Mapping.");
      addBotMessage(completionMsg, true);
    }
  };

  const handleEisenhowerResponse = (userMessage) => {
    const questions = isBoho ? eisenhowerQuestions.boho : eisenhowerQuestions.normal;
    const currentQ = systemState.currentEisenhowerQuestion;
    
    // Save answer
    const newAnswers = { ...systemState.eisenhowerAnswers };
    newAnswers[questions[currentQ].id] = userMessage;
    
    const nextQ = currentQ + 1;
    
    if (nextQ < questions.length) {
      // Continue with next question
      setSystemState(prev => ({
        ...prev,
        eisenhowerAnswers: newAnswers,
        currentEisenhowerQuestion: nextQ
      }));
      addBotMessage(questions[nextQ].text);
    } else {
      // Build personalized logic and extract additional profile data
      const isRedo = localStorage.getItem('hayati_redo_eisenhower') === 'true';
      const logic = buildPersonalizedLogic(newAnswers, systemState.storyAnswers);
      setSystemState(prev => ({
        ...prev,
        eisenhowerAnswers: newAnswers,
        eisenhowerCompleted: true,
        personalizedLogic: logic,
        phase: PHASES.WELCOME
      }));
      
      // Extract Eisenhower-specific profile insights
      const eisenhowerProfile = {
        eisenhowerLogic: logic,
        urgentMatters: newAnswers.fear_delay || '',
        importantMatters: newAnswers.future_matter || '',
        timeDrains: newAnswers.time_drain || '',
        peacefulActivities: newAnswers.peace_tasks || '',
        eisenhowerUpdated: isRedo,
        eisenhowerLastUpdated: new Date().toISOString()
      };
      
      // Clear redo flag
      if (isRedo) {
        localStorage.removeItem('hayati_redo_eisenhower');
      }
      
      // Save to backend - merge with existing profile
      saveUserProfile({
        eisenhowerCompleted: true,
        eisenhowerAnswers: newAnswers,
        profile: {
          ...eisenhowerProfile
        }
      });
      
      const completionMsg = isBoho
        ? (isRedo
          ? `Your priority map has been updated ✅\n\n${logic}`
          : `I have now built your personal priority system 💙\n\n${logic}\n\n✅ Button 3 is now unlocked.`)
        : (isRedo
          ? `Your priority map has been updated ✅\n\n${logic}`
          : `I have now built your personal priority system.\n\n${logic}\n\n✅ You can now proceed to your To-Do List.`);
      addBotMessage(completionMsg, true);
    }
  };

  const handleToDoListResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase().trim();
    
    if (systemState.awaitingMoreTasks) {
      if (lowerMsg.includes('no') || lowerMsg.includes('done') || lowerMsg.includes('finish')) {
        // Generate full output
        generateCompleteOutput();
      } else if (lowerMsg.includes('yes') || lowerMsg.includes('add') || lowerMsg.includes('more')) {
        setSystemState(prev => ({ ...prev, awaitingMoreTasks: false }));
        const msg = isBoho ? "What's next on your mind? 💙" : "Next task?";
        addBotMessage(msg);
      } else {
        // Treat as new task
        const newTasks = [...systemState.tasks, userMessage.trim()];
        setSystemState(prev => ({ ...prev, tasks: newTasks, awaitingMoreTasks: true }));
        addBotMessage("Got it ✅\n\nAdd another?\nSay 'yes' or 'no' (or type your next task)");
      }
    } else {
      // Collecting task
      const newTasks = [...systemState.tasks, userMessage.trim()];
      setSystemState(prev => ({ ...prev, tasks: newTasks, awaitingMoreTasks: true }));
      addBotMessage("Got it ✅\n\nAdd another?\nSay 'yes' or 'no' (or type your next task)");
    }
  };

  // ===========================================
  // PERSONALIZED LOGIC BUILDER
  // ===========================================

  const buildPersonalizedLogic = (eisenhowerAnswers, storyAnswers) => {
    const logic = [];
    
    logic.push("📊 Your Personal Priority System:");
    logic.push("\n🔴 Important = " + (eisenhowerAnswers.future_matter || "values + future"));
    logic.push("🟡 Urgent = " + (eisenhowerAnswers.fear_delay || "deadlines + fear"));
    logic.push("🔵 Not Important = " + (eisenhowerAnswers.time_drain || "guilt tasks"));
    logic.push("⚪ Not Urgent = " + (eisenhowerAnswers.peace_tasks || "dreams + health"));
    
    return logic.join("\n");
  };

  // ===========================================
  // STRESS LEVEL & ENERGY CALCULATION
  // ===========================================

  const calculateStressLevel = (storyAnswers) => {
    let stressScore = 0;
    const allText = Object.values(storyAnswers).join(' ').toLowerCase();
    
    // High stress keywords
    const highStressWords = ['burnout', 'exhausted', 'overwhelmed', 'can\'t handle', 'breaking', 'too much', 'drowning'];
    const mediumStressWords = ['stressed', 'tired', 'busy', 'pressure', 'heavy', 'struggle', 'hard'];
    
    highStressWords.forEach(word => {
      if (allText.includes(word)) stressScore += 3;
    });
    
    mediumStressWords.forEach(word => {
      if (allText.includes(word)) stressScore += 1;
    });
    
    if (stressScore >= 6) return 'High';
    if (stressScore >= 3) return 'Medium';
    return 'Low';
  };

  const analyzeEnergyPattern = (storyAnswers) => {
    const sleepAnswer = (storyAnswers.sleep_energy || '').toLowerCase();
    
    if (sleepAnswer.includes('good') || sleepAnswer.includes('fine') || sleepAnswer.includes('well')) {
      return 'morning';
    } else if (sleepAnswer.includes('bad') || sleepAnswer.includes('poor') || sleepAnswer.includes('tired')) {
      return 'afternoon';
    } else if (sleepAnswer.includes('night') || sleepAnswer.includes('evening')) {
      return 'evening';
    }
    
    return 'morning';
  };

  // ===========================================
  // EISENHOWER MATRIX GENERATION (AI-Powered)
  // ===========================================

  const classifyTask = (task, personalizedLogic, storyAnswers) => {
    const taskLower = task.toLowerCase();
    
    // Keywords for classification
    const urgentImportantKW = ['deadline', 'urgent', 'today', 'meeting', 'call', 'appointment', 'due', 'emergency', 'asap', 'now', 'bill', 'payment', 'doctor', 'interview'];
    const importantNotUrgentKW = ['gym', 'health', 'learn', 'study', 'read', 'plan', 'goal', 'future', 'growth', 'exercise', 'project', 'course', 'family time', 'kids', 'relationship', 'save money', 'invest'];
    const urgentNotImportantKW = ['email', 'reply', 'check', 'social', 'notification', 'message', 'scroll', 'call back', 'grocery', 'shopping'];
    const neitherKW = ['maybe', 'someday', 'consider', 'think about', 'browse', 'watch'];
    
    // Check for patterns
    if (urgentImportantKW.some(kw => taskLower.includes(kw))) {
      return { category: 'urgent_important', reason: 'has deadline/urgency' };
    } else if (importantNotUrgentKW.some(kw => taskLower.includes(kw))) {
      return { category: 'important_not_urgent', reason: 'supports long-term growth' };
    } else if (urgentNotImportantKW.some(kw => taskLower.includes(kw))) {
      return { category: 'urgent_not_important', reason: 'time-consuming distraction' };
    } else if (neitherKW.some(kw => taskLower.includes(kw))) {
      return { category: 'neither', reason: 'can wait or eliminate' };
    }
    
    // Default: important not urgent (growth-oriented)
    return { category: 'important_not_urgent', reason: 'worth scheduling' };
  };

  const generateEisenhowerMatrix = (tasks, personalizedLogic, storyAnswers) => {
    const matrix = {
      urgent_important: [],
      important_not_urgent: [],
      urgent_not_important: [],
      neither: []
    };
    
    tasks.forEach(task => {
      const classification = classifyTask(task, personalizedLogic, storyAnswers);
      matrix[classification.category].push({
        task,
        reason: classification.reason
      });
    });
    
    return matrix;
  };

  const generateDailySchedule = (matrix, energyTime) => {
    const schedule = [];
    
    schedule.push("📅 SUGGESTED DAILY SCHEDULE:\n");
    schedule.push(`🌅 ${energyTime === 'morning' ? '6:00-10:00' : '12:00-16:00'} AM — Peak Energy Block`);
    schedule.push("   Focus on 🟥 Urgent & Important tasks");
    if (matrix.urgent_important.length > 0) {
      matrix.urgent_important.slice(0, 2).forEach(t => {
        schedule.push(`   • ${t.task}`);
      });
    }
    
    schedule.push("\n☀️ Midday — Balance Block");
    schedule.push("   Mix of 🟦 Important Not Urgent");
    if (matrix.important_not_urgent.length > 0) {
      matrix.important_not_urgent.slice(0, 2).forEach(t => {
        schedule.push(`   • ${t.task}`);
      });
    }
    
    schedule.push("\n🌙 Evening — Low Energy Block");
    schedule.push("   Batch 🟨 Urgent Not Important tasks");
    if (matrix.urgent_not_important.length > 0) {
      matrix.urgent_not_important.slice(0, 2).forEach(t => {
        schedule.push(`   • ${t.task}`);
      });
    }
    
    schedule.push("\n🧘 Rest & Flex Time");
    schedule.push("   Protect time for yourself");
    
    return schedule.join("\n");
  };

  const generateWeekOverview = (matrix, stressLevel) => {
    const overview = [];
    
    overview.push("📊 WEEK OVERVIEW:\n");
    
    const urgentCount = matrix.urgent_important.length;
    const importantCount = matrix.important_not_urgent.length;
    
    if (urgentCount > 5) {
      overview.push("⚠️ High urgency week — prioritize ruthlessly");
    } else if (urgentCount > 2) {
      overview.push("⚡ Moderate urgency — stay focused");
    } else {
      overview.push("✨ Light urgency — great for long-term work");
    }
    
    overview.push(`\n📈 ${importantCount} future-building tasks identified`);
    overview.push(`⚡ Stress level: ${stressLevel}`);
    
    if (stressLevel === 'High') {
      overview.push("\n💙 Recommendation: Reduce load by 30%");
    }
    
    return overview.join("\n");
  };

  const generateGoalAlignment = (matrix, storyAnswers) => {
    const dreams = storyAnswers.long_term_dreams || '';
    const important = storyAnswers.important_feeling || '';
    
    const alignment = [];
    alignment.push("🎯 GOAL ALIGNMENT REPORT:\n");
    alignment.push("How today supports your future self:\n");
    
    if (matrix.important_not_urgent.length > 0) {
      alignment.push(`✅ ${matrix.important_not_urgent.length} tasks directly support your long-term vision`);
    } else {
      alignment.push("⚠️ No long-term tasks scheduled — your future needs attention");
    }
    
    if (matrix.urgent_important.length > 3) {
      alignment.push("⚠️ High urgency = low strategic work");
      alignment.push("   Consider: What caused these urgencies?");
    }
    
    return alignment.join("\n");
  };

  const generateGentleAdvice = (matrix, stressLevel, storyAnswers) => {
    const advice = [];
    
    advice.push("💙 GENTLE ADVICE:\n");
    
    if (stressLevel === 'High') {
      advice.push("You're carrying a lot right now.");
      advice.push("It's okay to do less.");
      advice.push("Your wellbeing is the foundation of everything.");
    } else if (stressLevel === 'Medium') {
      advice.push("You're doing well, but watch your energy.");
      advice.push("Make sure to schedule rest.");
    } else {
      advice.push("You're in a good place.");
      advice.push("This is a great time to invest in your future.");
    }
    
    const randomTip = lifeTips[Math.floor(Math.random() * lifeTips.length)];
    advice.push(`\n${randomTip}`);
    
    return advice.join("\n");
  };

  // ===========================================
  // COMPLETE OUTPUT GENERATION
  // ===========================================

  const generateCompleteOutput = () => {
    const matrix = generateEisenhowerMatrix(
      systemState.tasks, 
      systemState.personalizedLogic, 
      systemState.storyAnswers
    );
    
    const stressLevel = calculateStressLevel(systemState.storyAnswers);
    const energyTime = analyzeEnergyPattern(systemState.storyAnswers);
    
    let output = [];
    
    output.push("✨ YOUR LIFE, ORGANIZED 💙\n");
    output.push("━━━━━━━━━━━━━━━━━━\n");
    
    // 1. EISENHOWER MATRIX
    output.push("📊 1. EISENHOWER MATRIX:\n");
    
    output.push("🟥 [RED] Urgent & Important (Do Now):");
    if (matrix.urgent_important.length > 0) {
      matrix.urgent_important.forEach(item => {
        output.push(`   • ${item.task} — ${item.reason}`);
      });
    } else {
      output.push("   • Nothing urgent right now 💙");
    }
    
    output.push("\n🟦 [BLUE] Important, Not Urgent (Plan):");
    if (matrix.important_not_urgent.length > 0) {
      matrix.important_not_urgent.forEach(item => {
        output.push(`   • ${item.task} — ${item.reason}`);
      });
    } else {
      output.push("   • Add some future-building tasks");
    }
    
    output.push("\n🟨 [YELLOW] Urgent, Not Important (Batch):");
    if (matrix.urgent_not_important.length > 0) {
      matrix.urgent_not_important.forEach(item => {
        output.push(`   • ${item.task} — ${item.reason}`);
      });
    } else {
      output.push("   • No distractions identified");
    }
    
    output.push("\n⬜ [GRAY] Neither (Eliminate):");
    if (matrix.neither.length > 0) {
      matrix.neither.forEach(item => {
        output.push(`   • ${item.task} — ${item.reason}`);
      });
    } else {
      output.push("   • Nothing to eliminate");
    }
    
    output.push("\n━━━━━━━━━━━━━━━━━━\n");
    
    // 2. DAILY SCHEDULE
    output.push(generateDailySchedule(matrix, energyTime));
    
    output.push("\n━━━━━━━━━━━━━━━━━━\n");
    
    // 3. WEEK OVERVIEW
    output.push(generateWeekOverview(matrix, stressLevel));
    
    output.push("\n━━━━━━━━━━━━━━━━━━\n");
    
    // 4. GOAL ALIGNMENT
    output.push(generateGoalAlignment(matrix, systemState.storyAnswers));
    
    output.push("\n━━━━━━━━━━━━━━━━━━\n");
    
    // 5. STRESS LEVEL
    output.push(`⚡ 5. STRESS LEVEL: ${stressLevel}`);
    if (stressLevel === 'High') {
      output.push("   Your load is heavy. Consider reducing tasks by 30%.");
    } else if (stressLevel === 'Medium') {
      output.push("   You're managing well. Keep boundaries strong.");
    } else {
      output.push("   You're in a good place. Well done.");
    }
    
    output.push("\n━━━━━━━━━━━━━━━━━━\n");
    
    // 6. GENTLE ADVICE
    output.push(generateGentleAdvice(matrix, stressLevel, systemState.storyAnswers));
    
    const fullOutput = output.join("\n");
    
    // Update state
    setSystemState(prev => ({
      ...prev,
      todoCompleted: true,
      generatedMatrix: matrix,
      generatedSchedule: fullOutput,
      stressLevel: stressLevel,
      phase: PHASES.COMPLETED,
      taskCollectionMode: false,
      awaitingMoreTasks: false
    }));
    
    // Save to backend
    saveTasksToBackend(systemState.tasks, matrix);
    
    // Display output
    addBotMessage(fullOutput);
    
    // Offer download
    setTimeout(() => {
      addBotMessage("\n📥 Would you like to download this as a file?\nType 'yes' or 'no'");
    }, 1000);
  };

  const saveTasksToBackend = async (tasks, matrix) => {
    const userId = getUserId();
    
    // Flatten matrix back to tasks with priority
    const tasksToSave = [];
    
    matrix.urgent_important.forEach(t => tasksToSave.push({ 
      title: t.task, 
      priority: 'Urgent & Important',
      category: 'Work',
      userId 
    }));
    
    matrix.important_not_urgent.forEach(t => tasksToSave.push({ 
      title: t.task, 
      priority: 'Important Not Urgent',
      category: 'Personal',
      userId 
    }));
    
    matrix.urgent_not_important.forEach(t => tasksToSave.push({ 
      title: t.task, 
      priority: 'Urgent Not Important',
      category: 'Other',
      userId 
    }));
    
    matrix.neither.forEach(t => tasksToSave.push({ 
      title: t.task, 
      priority: 'Not Urgent & Not Important',
      category: 'Other',
      userId 
    }));

    try {
      await Promise.all(tasksToSave.map(task => 
        fetch('http://localhost:5001/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        })
      ));
      console.log('Tasks saved to backend successfully');
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Generate PDF/Text File
  const generatePDF = () => {
    if (!systemState.generatedSchedule) return false;
    
    const content = systemState.generatedSchedule;
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hayati-life-plan-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  };

  // ===========================================
  // MAIN MESSAGE PROCESSOR
  // ===========================================

  const processResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Handle profile commands (available anytime)
    if (lowerMessage.includes('reset profile') || lowerMessage.includes('reset story')) {
      // Reset profile
      setSystemState({
        phase: PHASES.WELCOME,
        storyCompleted: false,
        eisenhowerCompleted: false,
        todoCompleted: false,
        storyAnswers: {},
        currentStoryQuestion: 0,
        eisenhowerAnswers: {},
        currentEisenhowerQuestion: 0,
        personalizedLogic: null,
        tasks: [],
        taskCollectionMode: false,
        awaitingMoreTasks: false,
        generatedMatrix: null,
        generatedSchedule: null,
        stressLevel: null
      });
      
      saveUserProfile({
        storyCompleted: false,
        eisenhowerCompleted: false,
        storyAnswers: {},
        eisenhowerAnswers: {},
        personalizedLogic: null
      });
      
      setIsFirstLogin(true);
      
      const msg = isBoho 
        ? "Your profile has been reset 💙\n\nLet's start fresh, like opening a new page in your journal."
        : "Your profile has been reset 💙\n\nLet's start fresh.";
      return msg;
    }
    
    if (lowerMessage.includes('my profile') || lowerMessage.includes('show profile')) {
      if (userProfile && systemState.storyCompleted) {
        const profileMsg = `📋 Your Profile:\n\n` +
          `Story Complete: ${systemState.storyCompleted ? '✅' : '❌'}\n` +
          `Eisenhower Mapping: ${systemState.eisenhowerCompleted ? '✅' : '❌'}\n` +
          `Work Type: ${userProfile.workType || 'Not set'}\n` +
          `Energy Pattern: ${userProfile.energyPattern || 'Not set'}\n` +
          `UI Mode: ${isBoho ? 'Boho 🌿' : 'Normal 💙'}`;
        return profileMsg;
      } else {
        return "You haven't completed your profile yet. Let's start with your story! 💙";
      }
    }
    
    // Handle download request
    if (systemState.phase === PHASES.COMPLETED) {
      if (lowerMessage.includes('yes') || lowerMessage.includes('download')) {
        generatePDF();
        return "Your life plan has been downloaded! 📥\n\nI'm here for you anytime 💙";
      } else if (lowerMessage.includes('no')) {
        return "No problem! 💙\n\nI'm here for you anytime.\n\nYou can say 'show my plan' to see it again.";
      }
      
      // Other commands when completed
      if (lowerMessage.includes('plan') || lowerMessage.includes('matrix') || lowerMessage.includes('show')) {
        return systemState.generatedSchedule;
      }
      
      if (lowerMessage.includes('start over')) {
        setSystemState(prev => ({
          ...prev,
          phase: PHASES.TODO_LIST,
          taskCollectionMode: true,
          tasks: [],
          awaitingMoreTasks: false,
          todoCompleted: false
        }));
        const msg = isBoho 
          ? "Let's organize a new day 💙\n\nTell me what's on your mind."
          : "Let's organize new tasks 💙\n\nType your tasks freely.";
        return msg;
      }
      
      return "I'm here for you 💙\n\nYou can:\n• Say 'show my plan'\n• Say 'download'\n• Say 'start over'\n• Say 'reset profile'";
    }
    
    // Route to appropriate phase handler
    switch (systemState.phase) {
      case PHASES.SHARE_STORY:
        handleShareStoryResponse(userMessage);
        return null;
        
      case PHASES.EISENHOWER_MAPPING:
        handleEisenhowerResponse(userMessage);
        return null;
        
      case PHASES.TODO_LIST:
        handleToDoListResponse(userMessage);
        return null;
        
      default:
        return "Please select one of the buttons above to continue.";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processResponse(userMessage);
      setIsTyping(false);
      if (response) {
        addBotMessage(response);
      }
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isGenz ? '28px' : '24px',
          height: '85vh',
          maxHeight: 650,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ...(isGenz && {
            bgcolor: 'rgba(15, 20, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
          })
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: isGenz
            ? 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)'
            : (isBoho 
              ? 'linear-gradient(135deg, #964734 0%, #B78953 100%)'
              : 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)'),
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              bgcolor: isGenz ? 'rgba(15, 20, 35, 0.8)' : 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: isGenz ? '2px solid rgba(168, 85, 247, 0.5)' : 'none',
              boxShadow: isGenz ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
            }}
          >
            {isGenz ? '✨' : '💙'}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Hayati
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {isGenz ? 'Your AI Bestie' : 'Your AI Life Assistant'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => {
              setTtsEnabled(!ttsEnabled);
              if (ttsEnabled) window.speechSynthesis.cancel();
            }}
            sx={{
              color: 'white',
              bgcolor: isGenz ? 'rgba(15, 20, 35, 0.4)' : 'rgba(255,255,255,0.2)',
              border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none',
              '&:hover': { 
                bgcolor: isGenz ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255,255,255,0.3)',
                borderColor: isGenz ? 'rgba(168, 85, 247, 0.5)' : 'transparent'
              }
            }}
            title={ttsEnabled ? 'Disable voice' : 'Enable voice'}
          >
            {ttsEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              bgcolor: isGenz ? 'rgba(15, 20, 35, 0.4)' : 'rgba(255,255,255,0.2)',
              border: isGenz ? '1px solid rgba(236, 72, 153, 0.3)' : 'none',
              '&:hover': { 
                bgcolor: isGenz ? 'rgba(236, 72, 153, 0.3)' : 'rgba(255,255,255,0.3)',
                borderColor: isGenz ? 'rgba(236, 72, 153, 0.5)' : 'transparent'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Messages */}
      <DialogContent
        sx={{
          flex: 1,
          bgcolor: isGenz ? 'transparent' : (isBoho ? '#FAF8F5' : '#FAFBFC'),
          background: isGenz 
            ? 'linear-gradient(180deg, rgba(15, 20, 35, 0.95) 0%, rgba(26, 16, 51, 0.95) 100%)'
            : 'none',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto'
        }}
      >
        {messages.map((message, index) => (
          <Fade in key={index}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  gap: 1,
                  alignItems: 'flex-end'
                }}
              >
                {message.type === 'bot' && (
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#964734' : '#26BFF0'),
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      border: isGenz ? '1px solid rgba(168, 85, 247, 0.5)' : 'none',
                      boxShadow: isGenz ? '0 0 10px rgba(168, 85, 247, 0.3)' : 'none'
                    }}
                  >
                    {isGenz ? '✨' : '💙'}
                  </Box>
                )}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    px: 2,
                    maxWidth: '75%',
                    borderRadius: '18px',
                    borderBottomLeftRadius: message.type === 'bot' ? '6px' : '18px',
                    borderBottomRightRadius: message.type === 'user' ? '6px' : '18px',
                    bgcolor: message.type === 'user'
                      ? (isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#964734' : '#26BFF0'))
                      : (isGenz ? 'rgba(15, 20, 35, 0.6)' : 'white'),
                    background: message.type === 'user'
                      ? (isGenz 
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)'
                        : (isBoho ? 'linear-gradient(135deg, #964734 0%, #B78953 100%)' : 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)'))
                      : (isGenz ? 'rgba(15, 20, 35, 0.6)' : 'white'),
                    color: message.type === 'user' 
                      ? 'white' 
                      : (isGenz ? '#FFFFFF' : '#1A1A2E'),
                    boxShadow: message.type === 'bot' 
                      ? (isGenz ? '0 4px 15px rgba(168, 85, 247, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)') 
                      : (isGenz ? '0 4px 15px rgba(236, 72, 153, 0.2)' : 'none'),
                    border: isGenz 
                      ? (message.type === 'bot' ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid rgba(236, 72, 153, 0.3)')
                      : (isBoho && message.type === 'bot' ? '1px solid rgba(150, 71, 52, 0.1)' : 'none'),
                    backdropFilter: isGenz ? 'blur(10px)' : 'none'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit'
                    }}
                  >
                    {message.text}
                  </Typography>
                </Paper>
              </Box>
              
              {/* Three-Button System */}
              {message.showButtons && message.type === 'bot' && (
                <Stack spacing={1.5} sx={{ mt: 2, ml: 5 }}>
                  {/* Button 1: Share Your Story */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={systemState.storyCompleted}
                    onClick={handleShareStoryClick}
                    startIcon={systemState.storyCompleted ? <CheckCircleIcon /> : null}
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontFamily: isBoho ? '"Caveat", cursive' : 'inherit',
                      fontWeight: isBoho ? 700 : 600,
                      bgcolor: systemState.storyCompleted 
                        ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                        : (isGenz ? 'transparent' : (isBoho ? '#964734' : '#26BFF0')),
                      background: !systemState.storyCompleted && isGenz
                        ? 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
                        : undefined,
                      color: 'white',
                      border: isGenz ? '1px solid rgba(168, 85, 247, 0.5)' : 'none',
                      boxShadow: isGenz ? '0 4px 15px rgba(168, 85, 247, 0.3)' : 'none',
                      '&:hover': {
                        bgcolor: systemState.storyCompleted 
                          ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                          : (isGenz ? 'transparent' : (isBoho ? '#7a3a2b' : '#1EA5D4')),
                        background: !systemState.storyCompleted && isGenz
                          ? 'linear-gradient(135deg, #9333EA 0%, #DB2777 100%)'
                          : undefined,
                        boxShadow: isGenz ? '0 6px 20px rgba(168, 85, 247, 0.4)' : 'none'
                      },
                      '&:disabled': {
                        bgcolor: isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'),
                        color: 'white',
                        border: isGenz ? '1px solid rgba(16, 185, 129, 0.5)' : 'none'
                      }
                    }}
                  >
                    📝 {systemState.storyCompleted ? '✓ Story Shared' : 'Share Your Story'}
                  </Button>

                  {/* Button 2: Eisenhower Mapping */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!systemState.storyCompleted || systemState.eisenhowerCompleted}
                    onClick={handleEisenhowerClick}
                    startIcon={
                      systemState.eisenhowerCompleted ? <CheckCircleIcon /> : 
                      !systemState.storyCompleted ? <LockIcon /> : null
                    }
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontFamily: isBoho ? '"Caveat", cursive' : 'inherit',
                      fontWeight: isBoho ? 700 : 600,
                      bgcolor: systemState.eisenhowerCompleted 
                        ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                        : (isGenz ? 'transparent' : (isBoho ? '#964734' : '#26BFF0')),
                      background: !systemState.eisenhowerCompleted && systemState.storyCompleted && isGenz
                        ? 'linear-gradient(135deg, #10B981 0%, #A855F7 100%)'
                        : undefined,
                      color: 'white',
                      border: isGenz ? '1px solid rgba(168, 85, 247, 0.5)' : 'none',
                      boxShadow: isGenz && systemState.storyCompleted ? '0 4px 15px rgba(16, 185, 129, 0.3)' : 'none',
                      opacity: !systemState.storyCompleted ? 0.5 : 1,
                      '&:hover': {
                        bgcolor: systemState.eisenhowerCompleted 
                          ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                          : (isGenz ? 'transparent' : (isBoho ? '#7a3a2b' : '#1EA5D4')),
                        background: !systemState.eisenhowerCompleted && systemState.storyCompleted && isGenz
                          ? 'linear-gradient(135deg, #059669 0%, #9333EA 100%)'
                          : undefined,
                        boxShadow: isGenz && systemState.storyCompleted ? '0 6px 20px rgba(16, 185, 129, 0.4)' : 'none'
                      },
                      '&:disabled': {
                        bgcolor: systemState.eisenhowerCompleted 
                          ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                          : (isGenz ? 'rgba(168, 85, 247, 0.2)' : 'rgba(0,0,0,0.12)'),
                        color: systemState.eisenhowerCompleted ? 'white' : (isGenz ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.26)'),
                        border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none'
                      }
                    }}
                  >
                    🗂️ {systemState.eisenhowerCompleted ? '✓ Mapping Complete' : 'Eisenhower Mapping'}
                  </Button>

                  {/* Button 3: To-Do List */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!systemState.eisenhowerCompleted || systemState.todoCompleted}
                    onClick={handleToDoListClick}
                    startIcon={
                      systemState.todoCompleted ? <CheckCircleIcon /> : 
                      !systemState.eisenhowerCompleted ? <LockIcon /> : null
                    }
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontFamily: isBoho ? '"Caveat", cursive' : 'inherit',
                      fontWeight: isBoho ? 700 : 600,
                      bgcolor: systemState.todoCompleted 
                        ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                        : (isGenz ? 'transparent' : (isBoho ? '#964734' : '#26BFF0')),
                      background: !systemState.todoCompleted && systemState.eisenhowerCompleted && isGenz
                        ? 'linear-gradient(135deg, #EC4899 0%, #22D3EE 100%)'
                        : undefined,
                      color: 'white',
                      border: isGenz ? '1px solid rgba(236, 72, 153, 0.5)' : 'none',
                      boxShadow: isGenz && systemState.eisenhowerCompleted ? '0 4px 15px rgba(236, 72, 153, 0.3)' : 'none',
                      opacity: !systemState.eisenhowerCompleted ? 0.5 : 1,
                      '&:hover': {
                        bgcolor: systemState.todoCompleted 
                          ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                          : (isGenz ? 'transparent' : (isBoho ? '#7a3a2b' : '#1EA5D4')),
                        background: !systemState.todoCompleted && systemState.eisenhowerCompleted && isGenz
                          ? 'linear-gradient(135deg, #DB2777 0%, #06B6D4 100%)'
                          : undefined,
                        boxShadow: isGenz && systemState.eisenhowerCompleted ? '0 6px 20px rgba(236, 72, 153, 0.4)' : 'none'
                      },
                      '&:disabled': {
                        bgcolor: systemState.todoCompleted 
                          ? (isGenz ? '#10B981' : (isBoho ? '#8B9A7A' : '#4CAF50'))
                          : (isGenz ? 'rgba(236, 72, 153, 0.2)' : 'rgba(0,0,0,0.12)'),
                        color: systemState.todoCompleted ? 'white' : (isGenz ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.26)'),
                        border: isGenz ? '1px solid rgba(236, 72, 153, 0.3)' : 'none'
                      }
                    }}
                  >
                    ✅ {systemState.todoCompleted ? '✓ Tasks Organized' : 'To-Do List'}
                  </Button>
                </Stack>
              )}
            </Box>
          </Fade>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#964734' : '#26BFF0'),
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                border: isGenz ? '1px solid rgba(168, 85, 247, 0.5)' : 'none'
              }}
            >
              {isGenz ? '✨' : '💙'}
            </Box>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                px: 2,
                borderRadius: '18px',
                borderBottomLeftRadius: '6px',
                bgcolor: isGenz ? 'rgba(15, 20, 35, 0.6)' : 'white',
                border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none',
                backdropFilter: isGenz ? 'blur(10px)' : 'none'
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: isGenz ? '#A855F7' : (isBoho ? '#964734' : '#26BFF0'),
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite',
                      animationDelay: `${i * 0.2}s`,
                      boxShadow: isGenz ? '0 0 8px rgba(168, 85, 247, 0.5)' : 'none',
                      '@keyframes bounce': {
                        '0%, 60%, 100%': { transform: 'translateY(0)' },
                        '30%': { transform: 'translateY(-8px)' }
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </DialogContent>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          bgcolor: isGenz ? 'rgba(15, 20, 35, 0.9)' : 'white',
          borderTop: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid #E8ECF0',
          display: 'flex',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          placeholder={isGenz ? "What's on your mind? ✨" : "Type your message..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              bgcolor: isGenz ? 'rgba(15, 20, 35, 0.6)' : 'transparent',
              color: isGenz ? '#FFFFFF' : 'inherit',
              '& fieldset': {
                borderColor: isGenz ? 'rgba(168, 85, 247, 0.3)' : 'rgba(0, 0, 0, 0.23)'
              },
              '&:hover fieldset': {
                borderColor: isGenz ? 'rgba(168, 85, 247, 0.5)' : 'rgba(0, 0, 0, 0.87)'
              },
              '&.Mui-focused fieldset': {
                borderColor: isGenz ? '#A855F7' : (isBoho ? '#964734' : '#26BFF0')
              }
            },
            '& .MuiOutlinedInput-input': {
              color: isGenz ? '#FFFFFF' : 'inherit',
              '&::placeholder': {
                color: isGenz ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.54)',
                opacity: 1
              }
            }
          }}
        />
        <IconButton
          onClick={handleSend}
          sx={{
            background: isGenz
              ? 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
              : (isBoho 
                ? 'linear-gradient(135deg, #964734 0%, #B78953 100%)'
                : 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)'),
            color: 'white',
            width: 46,
            height: 46,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: isGenz
                ? '0 4px 20px rgba(168, 85, 247, 0.5)'
                : (isBoho 
                  ? '0 4px 15px rgba(150, 71, 52, 0.4)'
                  : '0 4px 15px rgba(38, 191, 240, 0.4)')
            },
            transition: 'all 0.2s ease'
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default ChatInterface;

