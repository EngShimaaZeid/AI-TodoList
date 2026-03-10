// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 16px rgba(38, 191, 240, 0.12)';
        navbar.style.padding = '0.75rem 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '1.5rem 0';
    }

    lastScroll = currentScroll;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all step cards and feature cards
document.querySelectorAll('.step-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// ===================================
// BUTTON INTERACTIONS
// ===================================

const buttons = {
    designWeek: document.getElementById('designWeekBtn'),
    talkAssistant: document.getElementById('talkAssistantBtn'),
    startSmartLife: document.getElementById('startSmartLifeBtn')
};

// Design My Ideal Week Button
buttons.designWeek?.addEventListener('click', () => {
    showNotification('🎨 Designing Your Ideal Week...', 'Let\'s create your perfect schedule!');
});

// Talk to AI Assistant Button
buttons.talkAssistant?.addEventListener('click', () => {
    openChatInterface();
});

// Start My Smart Life Button
buttons.startSmartLife?.addEventListener('click', () => {
    showNotification('🚀 Welcome to Hayati!', 'Let\'s begin your journey to a smarter life.');
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(title, message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" aria-label="Close notification">×</button>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 2rem;
            background: white;
            padding: 1.5rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(38, 191, 240, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid #26BFF0;
        }
        
        .notification-content { margin-right: 1rem; }
        .notification-title { font-weight: 700; font-size: 1.125rem; color: #1A1A2E; margin-bottom: 0.5rem; }
        .notification-message { color: #6B7280; font-size: 0.875rem; }
        .notification-close {
            position: absolute; top: 1rem; right: 1rem; background: none; border: none;
            font-size: 1.5rem; color: #9CA3AF; cursor: pointer; width: 24px; height: 24px;
            display: flex; align-items: center; justify-content: center; border-radius: 50%;
            transition: all 0.2s;
        }
        .notification-close:hover { background: #F5F7FA; color: #1A1A2E; }
        
        @keyframes slideInRight { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
        
        @media (max-width: 768px) { .notification { right: 1rem; left: 1rem; max-width: none; } }
    `;

    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===================================
// SMOOTH TEXT-TO-SPEECH SYSTEM
// ===================================

const ttsState = {
    enabled: false, // TTS disabled by default - user can enable it
    speaking: false,
    voice: null,
    rate: 0.95,
    pitch: 1.0,
    volume: 1.0,
    utteranceQueue: [],
    initialized: false
};

// Initialize TTS and select the best available voice
function initializeTTS() {
    if (ttsState.initialized) return;
    
    const synth = window.speechSynthesis;
    
    function loadVoices() {
        const voices = synth.getVoices();
        if (voices.length === 0) return;
        
        // Priority order for natural-sounding voices
        const preferredVoices = [
            'Microsoft Zira',
            'Microsoft David',
            'Google US English',
            'Google UK English Female',
            'Samantha',
            'Karen',
            'Victoria',
            'Alex'
        ];
        
        // Find the best voice
        for (const preferred of preferredVoices) {
            const found = voices.find(v => v.name.includes(preferred));
            if (found) {
                ttsState.voice = found;
                break;
            }
        }
        
        // Fallback to first English voice or any voice
        if (!ttsState.voice) {
            ttsState.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        }
        
        ttsState.initialized = true;
        console.log('🔊 TTS initialized with voice:', ttsState.voice?.name);
    }
    
    // Load voices (handles async loading in Chrome)
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
}

// Speak text with smooth, natural delivery
function speakText(text) {
    if (!ttsState.enabled || !text) return;
    
    const synth = window.speechSynthesis;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    // Clean text for better speech
    const cleanText = text
        .replace(/💙/g, '')
        .replace(/[🎯📅❤️🧠⚙️📝🤖1️⃣2️⃣3️⃣4️⃣5️⃣]/g, '')
        .replace(/\n+/g, '. ')
        .replace(/—/g, ', ')
        .replace(/\s+/g, ' ')
        .trim();
    
    if (!cleanText) return;
    
    // Split into sentences for smoother delivery
    const sentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanText];
    
    sentences.forEach((sentence, index) => {
        const trimmedSentence = sentence.trim();
        if (!trimmedSentence) return;
        
        const utterance = new SpeechSynthesisUtterance(trimmedSentence);
        
        if (ttsState.voice) {
            utterance.voice = ttsState.voice;
        }
        
        utterance.rate = ttsState.rate;
        utterance.pitch = ttsState.pitch;
        utterance.volume = ttsState.volume;
        
        // Add slight pause between sentences for natural flow
        utterance.onend = () => {
            ttsState.speaking = synth.speaking;
            updateTTSButtonState();
        };
        
        utterance.onstart = () => {
            ttsState.speaking = true;
            updateTTSButtonState();
        };
        
        utterance.onerror = (e) => {
            if (e.error !== 'canceled') {
                console.error('TTS Error:', e.error);
            }
            ttsState.speaking = false;
            updateTTSButtonState();
        };
        
        synth.speak(utterance);
    });
}

// Stop current speech
function stopSpeaking() {
    const synth = window.speechSynthesis;
    synth.cancel();
    ttsState.speaking = false;
    updateTTSButtonState();
}

// Toggle TTS on/off
function toggleTTS() {
    ttsState.enabled = !ttsState.enabled;
    
    if (!ttsState.enabled) {
        stopSpeaking();
    }
    
    updateTTSButtonState();
    
    // Show feedback notification
    const status = ttsState.enabled ? 'Voice enabled 🔊' : 'Voice disabled 🔇';
    showNotification('Voice Assistant', status);
}

// Update TTS button visual state
function updateTTSButtonState() {
    const ttsBtn = document.getElementById('ttsToggleBtn');
    if (!ttsBtn) return;
    
    if (ttsState.enabled) {
        ttsBtn.classList.remove('tts-disabled');
        ttsBtn.classList.toggle('tts-speaking', ttsState.speaking);
        ttsBtn.title = ttsState.speaking ? 'Speaking... (click to stop)' : 'Voice enabled (click to disable)';
    } else {
        ttsBtn.classList.add('tts-disabled');
        ttsBtn.classList.remove('tts-speaking');
        ttsBtn.title = 'Voice disabled (click to enable)';
    }
}

// Initialize TTS on page load
initializeTTS();

// ===================================
// HAYATI CHAT INTERFACE
// ===================================

let chatState = {
    isOpen: false,
    conversationHistory: [],
    userProfile: {}
};

function openChatInterface() {
    if (chatState.isOpen) return;
    chatState.isOpen = true;

    const chatModal = document.createElement('div');
    chatModal.className = 'chat-modal';
    chatModal.id = 'hayatiChat';

    chatModal.innerHTML = `
        <div class="chat-overlay"></div>
        <div class="chat-container">
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar">💙</div>
                    <div class="chat-header-text">
                        <h3 class="chat-title">Hayati</h3>
                        <p class="chat-status">Your AI Life Assistant</p>
                    </div>
                </div>
                <div class="chat-header-actions">
                    <button class="tts-toggle-btn" id="ttsToggleBtn" aria-label="Toggle voice" title="Voice disabled (click to enable)">
                        <svg class="tts-icon-on" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                        <svg class="tts-icon-off" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                    </button>
                    <button class="chat-close" id="closeChatBtn" aria-label="Close chat">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" id="chatInput" placeholder="Type your message..." autocomplete="off" />
                <button class="chat-send-btn" id="sendMessageBtn" aria-label="Send message">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(chatModal);

    // Add chat styles
    addChatStyles();

    setTimeout(() => chatModal.classList.add('active'), 10);

    document.getElementById('closeChatBtn').addEventListener('click', closeChatInterface);
    document.querySelector('.chat-overlay').addEventListener('click', closeChatInterface);
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // TTS toggle button
    document.getElementById('ttsToggleBtn').addEventListener('click', () => {
        if (ttsState.speaking) {
            stopSpeaking();
        } else {
            toggleTTS();
        }
    });
    
    // Update TTS button state (starts disabled)
    updateTTSButtonState();
    
    // Re-initialize TTS on first enable
    if (!ttsState.initialized) {
        initializeTTS();
    }

    setTimeout(() => {
        addBotMessage("Hello, I'm Hayati 💙\n\nI'm here to organize your life — gently.\n\nLet's start simple 💙\n\nWhat does your typical weekday look like?\n\nA) I work full-time\nB) I study\nC) I work & study\nD) I'm not working right now");
    }, 500);
}

function closeChatInterface() {
    // Stop any ongoing speech
    stopSpeaking();
    
    const chatModal = document.getElementById('hayatiChat');
    if (chatModal) {
        chatModal.classList.remove('active');
        setTimeout(() => {
            chatModal.remove();
            chatState.isOpen = false;
        }, 300);
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    addUserMessage(message);
    chatState.conversationHistory.push({ role: 'user', content: message });
    input.value = '';

    showTypingIndicator();

    setTimeout(() => {
        const response = generateBotResponse(message);
        hideTypingIndicator();
        addBotMessage(response);
        chatState.conversationHistory.push({ role: 'assistant', content: response });
    }, 1000 + Math.random() * 1000);
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.innerHTML = `<div class="message-bubble user-bubble"><p>${escapeHtml(message)}</p></div>`;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    const formattedMessage = escapeHtml(message).replace(/\n/g, '<br>');
    messageDiv.innerHTML = `
        <div class="message-avatar">💙</div>
        <div class="message-bubble bot-bubble"><p>${formattedMessage}</p></div>
        <button class="message-speak-btn" aria-label="Read aloud" title="Read this message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
        </button>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Add click handler for individual message speak button
    const speakBtn = messageDiv.querySelector('.message-speak-btn');
    speakBtn.addEventListener('click', () => {
        speakText(message);
    });
    
    // Auto-speak new messages if TTS is enabled
    if (ttsState.enabled) {
        // Small delay to let the message appear first
        setTimeout(() => speakText(message), 100);
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">💙</div>
        <div class="message-bubble bot-bubble">
            <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.remove();
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// HAYATI ONBOARDING QUESTION FLOW
// ===================================

const onboardingFlow = {
    currentStep: 0,
    answers: {},
    tasks: [],
    completed: false,
    inTaskCapture: false,  // NEW: Track if we're in task capture mode
    awaitingMoreTasks: false,  // NEW: Track if we're waiting for yes/no
    awaitingDownload: false,  // NEW: Track if we're waiting for download response
    lastMatrix: null  // NEW: Store matrix data for PDF
};

const questions = [
    {
        id: 'daily_structure',
        text: "Let's start simple 💙\n\nWhat does your typical weekday look like?",
        options: [
            { key: 'A', text: 'I work full-time' },
            { key: 'B', text: 'I study' },
            { key: 'C', text: 'I work & study' },
            { key: 'D', text: "I'm not working right now" }
        ]
    },
    {
        id: 'time_boundaries',
        text: "When do you usually start your day?",
        options: [
            { key: 'A', text: 'Early morning' },
            { key: 'B', text: 'Late morning' },
            { key: 'C', text: 'Afternoon' },
            { key: 'D', text: 'It changes every day' }
        ]
    },
    {
        id: 'energy_pattern',
        text: "When do you feel most alive mentally?",
        options: [
            { key: 'A', text: 'Morning' },
            { key: 'B', text: 'Afternoon' },
            { key: 'C', text: 'Evening' },
            { key: 'D', text: 'My energy is always low' }
        ]
    },
    {
        id: 'pressure_source',
        text: "What mentally exhausts you most lately?\n\n(You can pick more than one)",
        options: [
            { key: 'A', text: 'Work' },
            { key: 'B', text: 'Family' },
            { key: 'C', text: 'Money' },
            { key: 'D', text: 'Health' },
            { key: 'E', text: 'No clear reason' },
            { key: 'F', text: 'Everything' }
        ],
        multi: true
    },
    {
        id: 'future_focus',
        text: "Which matters more to you right now?",
        options: [
            { key: 'A', text: 'Surviving the present' },
            { key: 'B', text: 'Building the future' },
            { key: 'C', text: 'Both, but I feel lost' }
        ]
    },
    {
        id: 'task_attitude',
        text: "When something is important but has no deadline, you usually:",
        options: [
            { key: 'A', text: 'Do it anyway' },
            { key: 'B', text: 'Delay it' },
            { key: 'C', text: 'Forget it' },
            { key: 'D', text: 'Feel guilty about it' }
        ]
    },
    {
        id: 'overload_check',
        text: "How full does your mind feel nowadays?",
        options: [
            { key: 'A', text: 'Calm' },
            { key: 'B', text: 'Busy' },
            { key: 'C', text: 'Overloaded' },
            { key: 'D', text: 'Close to burnout' }
        ]
    }
    // Task collection is now handled separately, not as a question
];

function formatQuestionWithOptions(question) {
    let message = question.text;
    
    if (question.options) {
        message += '\n\n';
        question.options.forEach(opt => {
            message += `${opt.key}) ${opt.text}\n`;
        });
    }
    
    return message;
}

function processUserAnswer(userMessage) {
    const currentQuestion = questions[onboardingFlow.currentStep];
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Store answer
    onboardingFlow.answers[currentQuestion.id] = userMessage;
    
    // Move to next step
    onboardingFlow.currentStep++;
    
    // Check if we've finished all questions (now 7 questions, then task capture mode)
    if (onboardingFlow.currentStep >= questions.length) {
        // Enter task capture mode
        onboardingFlow.inTaskCapture = true;
        onboardingFlow.awaitingMoreTasks = false;
        return "Now write ONE task at a time.\nBig or small.\nType it and send it.\n\nI will only save it for you 💙";
    }
    
    // Return next question
    return formatQuestionWithOptions(questions[onboardingFlow.currentStep]);
}

function generateEisenhowerMatrix() {
    const tasks = onboardingFlow.tasks;
    const answers = onboardingFlow.answers;
    
    // Analyze user profile from answers
    const isOverloaded = answers.overload_check?.toLowerCase().includes('c') || answers.overload_check?.toLowerCase().includes('d');
    const lowEnergy = answers.energy_pattern?.toLowerCase().includes('d');
    const survivalMode = answers.future_focus?.toLowerCase().includes('a');
    
    // Distribute tasks into quadrants
    const urgent_important = [];
    const important_not_urgent = [];
    const urgent_not_important = [];
    const neither = [];
    
    tasks.forEach((task, index) => {
        const taskLower = task.toLowerCase();
        
        // Keyword-based classification
        if (taskLower.includes('deadline') || taskLower.includes('urgent') || taskLower.includes('today') || taskLower.includes('meeting') || taskLower.includes('call') || taskLower.includes('appointment') || taskLower.includes('tomorrow') || taskLower.includes('due')) {
            urgent_important.push({ task, reason: 'deadline today' });
        } else if (taskLower.includes('gym') || taskLower.includes('health') || taskLower.includes('learn') || taskLower.includes('study') || taskLower.includes('read') || taskLower.includes('plan') || taskLower.includes('goal') || taskLower.includes('exercise') || taskLower.includes('english') || taskLower.includes('course')) {
            important_not_urgent.push({ task, reason: 'long-term goal' });
        } else if (taskLower.includes('email') || taskLower.includes('reply') || taskLower.includes('check') || taskLower.includes('social') || taskLower.includes('message') || taskLower.includes('notification')) {
            urgent_not_important.push({ task, reason: 'time-consuming' });
        } else if (taskLower.includes('browse') || taskLower.includes('scroll') || taskLower.includes('random') || taskLower.includes('watch')) {
            neither.push({ task, reason: 'steals focus' });
        } else if (index < 2) {
            urgent_important.push({ task, reason: 'priority item' });
        } else if (index < 4) {
            important_not_urgent.push({ task, reason: 'worth scheduling' });
        } else if (index < 6) {
            urgent_not_important.push({ task, reason: 'can batch later' });
        } else {
            neither.push({ task, reason: 'can wait' });
        }
    });
    
    // Store matrix data for PDF generation
    const energyTime = answers.energy_pattern?.toLowerCase().includes('a') ? 'morning' : 
                       answers.energy_pattern?.toLowerCase().includes('b') ? 'afternoon' : 'evening';
    
    let stressLevel = 'Low';
    if (isOverloaded) {
        stressLevel = 'High';
    } else if (answers.overload_check?.toLowerCase().includes('b')) {
        stressLevel = 'Medium';
    }
    
    const tips = [
        "Remember: You don't have to do everything today. Progress is progress. 💙",
        "Your energy is precious. Protect it like you protect your time. 💙",
        "Small steps forward are still steps forward. 💙",
        "It's okay to rest. Rest is productive too. 💙"
    ];
    const selectedTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Store for PDF
    onboardingFlow.lastMatrix = {
        urgent_important,
        important_not_urgent,
        urgent_not_important,
        neither,
        energyTime,
        stressLevel,
        tip: selectedTip,
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    // Build TEXT-BASED matrix output (no HTML cards)
    let output = "Here's your Eisenhower Matrix 💙\n\n";
    
    // 🔴 Urgent & Important
    output += "🔴 Urgent & Important:\n";
    if (urgent_important.length > 0) {
        urgent_important.forEach(item => {
            output += `• ${item.task} — ${item.reason}\n`;
        });
    } else {
        output += "• Nothing urgent right now 💙\n";
    }
    
    output += "\n";
    
    // 🟡 Important but Not Urgent
    output += "🟡 Important but Not Urgent:\n";
    if (important_not_urgent.length > 0) {
        important_not_urgent.forEach(item => {
            output += `• ${item.task} — ${item.reason}\n`;
        });
    } else {
        output += "• Add some future-building tasks\n";
    }
    
    output += "\n";
    
    // 🔵 Urgent but Not Important
    output += "🔵 Urgent but Not Important:\n";
    if (urgent_not_important.length > 0) {
        urgent_not_important.forEach(item => {
            output += `• ${item.task} — ${item.reason}\n`;
        });
    } else {
        output += "• No distractions identified\n";
    }
    
    output += "\n";
    
    // ⚪ Neither
    output += "⚪ Neither:\n";
    if (neither.length > 0) {
        neither.forEach(item => {
            output += `• ${item.task} — ${item.reason}\n`;
        });
    } else {
        output += "• Nothing to eliminate\n";
    }
    
    output += "\n━━━━━━━━━━━━━━━━━━\n\n";
    
    // Daily focus sentence
    output += `📅 Focus on your 🔴 tasks during your ${energyTime} peak energy.\n\n`;
    
    // Stress level
    output += `💭 Stress Level: ${stressLevel}\n\n`;
    
    // Life tip
    output += selectedTip;
    
    // Ask about download
    output += "\n\n━━━━━━━━━━━━━━━━━━\n\n";
    output += "Would you like to download your board as PDF? 📄\n\n";
    output += "A) Yes, download it\nB) No, thanks";
    
    // Set flag to await download response
    onboardingFlow.awaitingDownload = true;
    
    return output;
}

// Generate and download PDF
function downloadMatrixAsPDF() {
    const matrix = onboardingFlow.lastMatrix;
    if (!matrix) return;
    
    // Create a new window for the PDF content
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Eisenhower Matrix - Hayati</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            background: white;
            color: #1a1a2e;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #26BFF0;
        }
        .header h1 {
            font-size: 28px;
            color: #26BFF0;
            margin-bottom: 5px;
        }
        .header .date {
            color: #6b7280;
            font-size: 14px;
        }
        .matrix-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        .quadrant {
            border-radius: 12px;
            padding: 20px;
            min-height: 150px;
        }
        .quadrant h2 {
            font-size: 16px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .quadrant ul {
            list-style: none;
        }
        .quadrant li {
            padding: 8px 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            font-size: 14px;
        }
        .quadrant li:last-child { border-bottom: none; }
        .task-reason {
            color: #6b7280;
            font-size: 12px;
            font-style: italic;
        }
        .q1 { background: #fef2f2; border-left: 4px solid #ef4444; }
        .q1 h2 { color: #ef4444; }
        .q2 { background: #fefce8; border-left: 4px solid #eab308; }
        .q2 h2 { color: #eab308; }
        .q3 { background: #eff6ff; border-left: 4px solid #3b82f6; }
        .q3 h2 { color: #3b82f6; }
        .q4 { background: #f8fafc; border-left: 4px solid #94a3b8; }
        .q4 h2 { color: #64748b; }
        .summary {
            background: linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .summary h3 {
            color: #1e40af;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .summary p {
            color: #374151;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .tip {
            background: linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%);
            color: white;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 12px;
        }
        .empty-msg {
            color: #9ca3af;
            font-style: italic;
            font-size: 13px;
        }
        @media print {
            body { padding: 20px; }
            .matrix-grid { gap: 15px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 My Eisenhower Matrix</h1>
        <p class="date">${matrix.date}</p>
    </div>
    
    <div class="matrix-grid">
        <div class="quadrant q1">
            <h2>🔴 Urgent & Important</h2>
            <ul>
                ${matrix.urgent_important.length > 0 
                    ? matrix.urgent_important.map(item => `<li>${item.task} <span class="task-reason">— ${item.reason}</span></li>`).join('') 
                    : '<li class="empty-msg">Nothing urgent right now 💙</li>'}
            </ul>
        </div>
        
        <div class="quadrant q2">
            <h2>🟡 Important, Not Urgent</h2>
            <ul>
                ${matrix.important_not_urgent.length > 0 
                    ? matrix.important_not_urgent.map(item => `<li>${item.task} <span class="task-reason">— ${item.reason}</span></li>`).join('') 
                    : '<li class="empty-msg">Add some future-building tasks</li>'}
            </ul>
        </div>
        
        <div class="quadrant q3">
            <h2>🔵 Urgent, Not Important</h2>
            <ul>
                ${matrix.urgent_not_important.length > 0 
                    ? matrix.urgent_not_important.map(item => `<li>${item.task} <span class="task-reason">— ${item.reason}</span></li>`).join('') 
                    : '<li class="empty-msg">No distractions identified</li>'}
            </ul>
        </div>
        
        <div class="quadrant q4">
            <h2>⚪ Neither</h2>
            <ul>
                ${matrix.neither.length > 0 
                    ? matrix.neither.map(item => `<li>${item.task} <span class="task-reason">— ${item.reason}</span></li>`).join('') 
                    : '<li class="empty-msg">Nothing to eliminate</li>'}
            </ul>
        </div>
    </div>
    
    <div class="summary">
        <h3>📅 Daily Focus</h3>
        <p>Focus on your 🔴 tasks during your <strong>${matrix.energyTime}</strong> peak energy.</p>
        <p>💭 <strong>Stress Level:</strong> ${matrix.stressLevel}</p>
    </div>
    
    <div class="tip">
        ${matrix.tip}
    </div>
    
    <div class="footer">
        <p>Generated by Hayati - Your AI Life Assistant 💙</p>
    </div>
</body>
</html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
        printWindow.print();
    };
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Handle download response
    if (onboardingFlow.awaitingDownload) {
        onboardingFlow.awaitingDownload = false;
        
        if (lowerMessage === 'a' || lowerMessage === 'yes' || lowerMessage.includes('yes') || lowerMessage.includes('download')) {
            // Trigger PDF download
            downloadMatrixAsPDF();
            return "Your PDF is ready! 📄✨\n\nThe print dialog should open now. Just click 'Save as PDF' or 'Print' to save your board.\n\nI'm here for you 💙\n\nYou can:\n• Say \"show my board\" to see your matrix again\n• Say \"download\" to get another PDF\n• Say \"start over\" to update your tasks";
        }
        
        if (lowerMessage === 'b' || lowerMessage === 'no' || lowerMessage.includes('no')) {
            return "No problem! 💙\n\nYour board is saved here. You can always:\n• Say \"download\" to get the PDF later\n• Say \"show my board\" to see it again\n• Say \"start over\" to update your tasks";
        }
    }
    
    // Handle task capture mode
    if (onboardingFlow.inTaskCapture) {
        // Check if we're waiting for yes/no response
        if (onboardingFlow.awaitingMoreTasks) {
            if (lowerMessage === 'a' || lowerMessage === 'yes' || lowerMessage.includes('yes')) {
                // User wants to add more tasks
                onboardingFlow.awaitingMoreTasks = false;
                return "Write your next task 💙";
            }
            if (lowerMessage === 'b' || lowerMessage === 'no' || lowerMessage.includes('no') || lowerMessage.includes('done') || lowerMessage.includes('finish')) {
                // User is done - generate matrix
                onboardingFlow.inTaskCapture = false;
                onboardingFlow.awaitingMoreTasks = false;
                onboardingFlow.completed = true;
                return generateEisenhowerMatrix();
            }
            // If neither yes nor no, treat as a new task
            onboardingFlow.tasks.push(userMessage.trim());
            onboardingFlow.awaitingMoreTasks = true;
            return "Got it ✅\n\nDo you want to add another task?\n\nA) Yes\nB) No";
        }
        
        // User is entering a task
        onboardingFlow.tasks.push(userMessage.trim());
        onboardingFlow.awaitingMoreTasks = true;
        return "Got it ✅\n\nDo you want to add another task?\n\nA) Yes\nB) No";
    }
    
    // If onboarding is completed (matrix shown), handle post-matrix conversation
    if (onboardingFlow.completed) {
        // Handle download request
        if (lowerMessage.includes('download') || lowerMessage.includes('pdf')) {
            downloadMatrixAsPDF();
            return "Your PDF is ready! 📄✨\n\nThe print dialog should open now. Just click 'Save as PDF' or 'Print' to save your board.";
        }
        
        // Handle post-onboarding conversation
        if (lowerMessage.includes('board') || lowerMessage.includes('matrix') || lowerMessage.includes('show')) {
            return generateEisenhowerMatrix();
        }
        
        // Reset for new session if they want to start over
        if (lowerMessage.includes('start over') || lowerMessage.includes('reset')) {
            onboardingFlow.currentStep = 0;
            onboardingFlow.answers = {};
            onboardingFlow.tasks = [];
            onboardingFlow.completed = false;
            onboardingFlow.inTaskCapture = false;
            onboardingFlow.awaitingMoreTasks = false;
            onboardingFlow.awaitingDownload = false;
            onboardingFlow.lastMatrix = null;
            return formatQuestionWithOptions(questions[0]);
        }
        
        return "I'm here for you 💙\n\nYou can:\n• Say \"show my board\" to see your Eisenhower Matrix\n• Say \"download\" to get the PDF\n• Say \"start over\" to update your tasks";
    }
    
    // Continue onboarding flow (questions 1-7)
    if (onboardingFlow.currentStep < questions.length) {
        return processUserAnswer(userMessage);
    }
    
    return formatQuestionWithOptions(questions[0]);
}

function addChatStyles() {
    if (document.querySelector('style[data-chat-styles]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-chat-styles', 'true');
    style.textContent = `
        /* Chat Modal Base */
        .chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .chat-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Overlay */
        .chat-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
        }
        
        /* Chat Container */
        .chat-container {
            position: relative;
            background: white;
            width: 90%;
            max-width: 480px;
            height: 85vh;
            max-height: 650px;
            border-radius: 24px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.3s ease;
            overflow: hidden;
        }
        .chat-modal.active .chat-container {
            transform: scale(1) translateY(0);
        }
        
        /* Chat Header */
        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%);
            color: white;
            flex-shrink: 0;
        }
        .chat-header-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .chat-header-actions {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .chat-avatar {
            width: 44px;
            height: 44px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        .chat-header-text {
            display: flex;
            flex-direction: column;
        }
        .chat-title {
            font-size: 1.125rem;
            font-weight: 700;
            margin: 0;
            line-height: 1.2;
        }
        .chat-status {
            font-size: 0.8rem;
            opacity: 0.9;
            margin: 0;
        }
        
        /* Header Buttons */
        .chat-close,
        .tts-toggle-btn {
            width: 36px;
            height: 36px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
            transition: all 0.2s ease;
        }
        .chat-close:hover,
        .tts-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.35);
        }
        
        /* TTS Button States */
        .tts-toggle-btn .tts-icon-off { display: none; }
        .tts-toggle-btn.tts-disabled .tts-icon-on { display: none; }
        .tts-toggle-btn.tts-disabled .tts-icon-off { display: block; }
        .tts-toggle-btn.tts-disabled { opacity: 0.6; }
        .tts-toggle-btn.tts-speaking {
            animation: pulse-speak 1.5s ease-in-out infinite;
            background: rgba(255, 255, 255, 0.4);
        }
        
        @keyframes pulse-speak {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
        }
        
        /* Chat Messages Area */
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: #FAFBFC;
        }
        
        /* Message Bubbles */
        .chat-message {
            display: flex;
            gap: 10px;
            align-items: flex-end;
        }
        .user-message {
            flex-direction: row-reverse;
        }
        .message-avatar {
            width: 32px;
            height: 32px;
            background: #26BFF0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        .message-bubble {
            max-width: 75%;
            padding: 12px 16px;
            border-radius: 18px;
            animation: fadeInUp 0.3s ease;
            word-wrap: break-word;
        }
        .bot-bubble {
            background: white;
            color: #1A1A2E;
            border-bottom-left-radius: 6px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .user-bubble {
            background: linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%);
            color: white;
            border-bottom-right-radius: 6px;
        }
        .message-bubble p {
            margin: 0;
            line-height: 1.5;
            font-size: 0.95rem;
        }
        
        /* Message Speak Button */
        .message-speak-btn {
            opacity: 0;
            background: #E8F4F8;
            border: none;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #26BFF0;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }
        .bot-message:hover .message-speak-btn { opacity: 1; }
        .message-speak-btn:hover {
            background: #26BFF0;
            color: white;
        }
        
        /* Typing Indicator */
        .typing-dots {
            display: flex;
            gap: 4px;
            padding: 8px 4px;
        }
        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #B0B8C1;
            border-radius: 50%;
            animation: typingBounce 1.4s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        /* Chat Input Area */
        .chat-input-container {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
            background: white;
            border-top: 1px solid #E8ECF0;
            flex-shrink: 0;
        }
        .chat-input {
            flex: 1;
            padding: 12px 18px;
            border: 2px solid #E8ECF0;
            border-radius: 24px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s ease;
            font-family: inherit;
        }
        .chat-input:focus {
            border-color: #26BFF0;
        }
        .chat-input::placeholder {
            color: #9CA3AF;
        }
        .chat-send-btn {
            width: 46px;
            height: 46px;
            background: linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }
        .chat-send-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(38, 191, 240, 0.4);
        }
        .chat-send-btn:active {
            transform: scale(0.98);
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-8px); }
        }
        
        /* ============ EISENHOWER MATRIX STYLES ============ */
        .eisenhower-matrix {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin: 10px 0;
        }
        .matrix-section {
            background: white;
            border-radius: 12px;
            padding: 10px;
            border-left: 4px solid;
        }
        .matrix-section.urgent-important { border-left-color: #ef4444; background: #fef2f2; }
        .matrix-section.important-not-urgent { border-left-color: #22c55e; background: #f0fdf4; }
        .matrix-section.urgent-not-important { border-left-color: #f59e0b; background: #fffbeb; }
        .matrix-section.neither { border-left-color: #94a3b8; background: #f8fafc; }
        
        .matrix-header {
            font-weight: 700;
            font-size: 0.75rem;
            margin-bottom: 8px;
            color: #1a1a2e;
        }
        .matrix-task {
            font-size: 0.8rem;
            margin-bottom: 4px;
            color: #374151;
            line-height: 1.4;
        }
        .task-reason {
            font-size: 0.7rem;
            color: #9ca3af;
            font-style: italic;
        }
        .matrix-empty {
            font-size: 0.75rem;
            color: #9ca3af;
            font-style: italic;
        }
        .daily-flow {
            background: linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%);
            border-radius: 12px;
            padding: 12px;
            margin-top: 12px;
        }
        .flow-header {
            font-weight: 700;
            font-size: 0.85rem;
            color: #1e40af;
            margin-bottom: 6px;
        }
        .flow-content {
            font-size: 0.8rem;
            color: #374151;
            line-height: 1.5;
        }
        .stress-indicator {
            background: white;
            border-radius: 8px;
            padding: 10px 12px;
            margin-top: 10px;
            border-left: 4px solid;
            font-size: 0.85rem;
        }
        .life-tip {
            background: linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%);
            color: white;
            border-radius: 12px;
            padding: 12px;
            margin-top: 10px;
            font-size: 0.85rem;
            text-align: center;
        }
        
        @media (max-width: 400px) {
            .eisenhower-matrix {
                grid-template-columns: 1fr;
            }
        }
        
        /* ============ MOBILE RESPONSIVE ============ */
        @media (max-width: 600px) {
            .chat-modal {
                align-items: stretch;
            }
            .chat-container {
                width: 100%;
                height: 100%;
                max-width: none;
                max-height: none;
                border-radius: 0;
            }
            .chat-header {
                padding: 12px 16px;
                padding-top: max(12px, env(safe-area-inset-top));
            }
            .chat-avatar {
                width: 38px;
                height: 38px;
                font-size: 1.25rem;
            }
            .chat-title {
                font-size: 1rem;
            }
            .chat-status {
                font-size: 0.7rem;
            }
            .chat-close,
            .tts-toggle-btn {
                width: 34px;
                height: 34px;
            }
            .chat-close svg,
            .tts-toggle-btn svg {
                width: 18px;
                height: 18px;
            }
            .chat-messages {
                padding: 16px;
            }
            .message-bubble {
                max-width: 85%;
                padding: 10px 14px;
            }
            .message-bubble p {
                font-size: 0.9rem;
            }
            .message-avatar {
                width: 28px;
                height: 28px;
                font-size: 0.8rem;
            }
            .message-speak-btn {
                opacity: 0.6;
                width: 24px;
                height: 24px;
            }
            .chat-input-container {
                padding: 12px 16px;
                padding-bottom: max(12px, env(safe-area-inset-bottom));
            }
            .chat-input {
                font-size: 16px;
                padding: 10px 16px;
            }
            .chat-send-btn {
                width: 42px;
                height: 42px;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// READY STATE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Hayati landing page loaded successfully!');
    document.body.classList.add('loaded');
    
    // Initialize theme system
    initializeTheme();
});

// ===================================
// THEME TOGGLE SYSTEM - BOHO MODE 🍂
// ===================================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('hayati-theme');
    
    // Prevent transition on initial load
    document.body.classList.add('no-transition');
    
    // Apply saved theme
    if (savedTheme === 'boho') {
        document.documentElement.classList.add('boho-theme');
        document.body.classList.add('boho-theme');
        updateThemeButton(true);
    }
    
    // Remove no-transition class after a short delay
    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 100);
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const isBoho = document.body.classList.contains('boho-theme');
    
    if (isBoho) {
        // Switch to default theme
        document.documentElement.classList.remove('boho-theme');
        document.body.classList.remove('boho-theme');
        localStorage.setItem('hayati-theme', 'default');
        updateThemeButton(false);
        showNotification('🤖 Modern Mode', 'Switched to the modern tech theme!');
    } else {
        // Switch to Boho theme
        document.documentElement.classList.add('boho-theme');
        document.body.classList.add('boho-theme');
        localStorage.setItem('hayati-theme', 'boho');
        updateThemeButton(true);
        showNotification('🍂 Boho Vintage Mode', 'Welcome to your cozy journal space!');
    }
}

function updateThemeButton(isBoho) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    const text = themeToggle.querySelector('span:not(.theme-toggle-icon)');
    
    if (isBoho) {
        if (icon) icon.textContent = '🤖';
        if (text) text.textContent = 'Modern Mode';
        themeToggle.setAttribute('aria-label', 'Switch to Modern Mode');
    } else {
        if (icon) icon.textContent = '🍂';
        if (text) text.textContent = 'Boho Mode';
        themeToggle.setAttribute('aria-label', 'Switch to Boho Vintage Mode');
    }
}
