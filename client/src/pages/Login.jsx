import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, LocalFlorist, Cake, Wc, Interests, Phone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Hobbies options
const HOBBIES_OPTIONS = [
  'Reading', 'Books', 'Journaling', 'Writing', 'Poetry',
  'Gaming', 'Sports', 'Fitness', 'Yoga', 'Meditation',
  'Music', 'Dancing', 'Art', 'Photography', 'Cooking',
  'Travel', 'Movies', 'Anime', 'Crafts', 'Gardening',
  'Technology', 'Coding', 'Social Media', 'Fashion', 'Beauty'
];

// Boho-associated hobbies
const BOHO_HOBBIES = ['Reading', 'Books', 'Journaling', 'Writing', 'Poetry', 'Yoga', 'Meditation', 'Art', 'Crafts', 'Gardening'];

// Helper to check if user is GenZ (born 1997-2012)
const isGenZByBirth = (birthYear) => {
  if (!birthYear) return false;
  const year = parseInt(birthYear);
  return year >= 1997 && year <= 2012;
};

// Helper to determine recommended theme
const determineDefaultTheme = (birthYear, gender, hobbies) => {
  const isGenZ = isGenZByBirth(birthYear);
  const isWoman = gender === 'female';
  const hasBohoHobbies = hobbies?.some(hobby => BOHO_HOBBIES.includes(hobby));
  
  // Priority 1: GenZ users get GenZ theme
  if (isGenZ) return 'genz';
  
  // Priority 2: Women (non-GenZ) get Boho theme
  if (isWoman) return 'boho';
  
  // Priority 3: Users with boho hobbies get Boho theme
  if (hasBohoHobbies) return 'boho';
  
  // Default: Modern theme
  return 'modern';
};

const Login = ({ isBoho, isGenz, currentTheme, onLogin, onThemeChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    whatsappNumber: '',
    birthYear: '',
    gender: '',
    hobbies: []
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user info
        localStorage.setItem('hayati_token', data.token);
        localStorage.setItem('hayati_user_id', data.userId);
        localStorage.setItem('hayati_user_name', data.name);
        
        // Apply user's preferred theme if available
        if (data.preferredTheme && onThemeChange) {
          onThemeChange(data.preferredTheme);
          localStorage.setItem('hayati-theme', data.preferredTheme);
        }
        
        // Call parent onLogin callback
        if (onLogin) {
          onLogin(data);
        }
        
        // Navigate based on user status
        if (data.storyCompleted && data.eisenhowerCompleted) {
          navigate('/todo');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Determine default theme based on user preferences
    const recommendedTheme = determineDefaultTheme(
      signupData.birthYear,
      signupData.gender,
      signupData.hobbies
    );

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          birthYear: signupData.birthYear,
          gender: signupData.gender,
          hobbies: signupData.hobbies,
          whatsappNumber: signupData.whatsappNumber,
          preferredTheme: recommendedTheme
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user info
        localStorage.setItem('hayati_token', data.token);
        localStorage.setItem('hayati_user_id', data.userId);
        localStorage.setItem('hayati_user_name', data.name);
        
        // Apply recommended theme
        if (onThemeChange) {
          onThemeChange(recommendedTheme);
          localStorage.setItem('hayati-theme', recommendedTheme);
        }
        
        // Call parent onLogin callback
        if (onLogin) {
          onLogin(data);
        }
        
        // Navigate to home
        navigate('/');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isGenz 
          ? 'linear-gradient(135deg, #0F0A1F 0%, #1A1033 50%, #0D1B2A 100%)'
          : (isBoho 
            ? 'linear-gradient(135deg, #F5F1E8 0%, #EDE7D9 50%, #E8DCC8 100%)'
            : 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'),
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': isGenz ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        } : (isBoho ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A577' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.4
        } : {})
      }}
    >
      {/* GenZ floating decorations */}
      {isGenz && (
        <>
          {['✨', '🚀', '💜', '⚡', '🔮'].map((emoji, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                fontSize: '1.5rem',
                opacity: 0.6,
                animation: `floatLogin ${3 + i * 0.5}s ease-in-out infinite`,
                '@keyframes floatLogin': {
                  '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                  '50%': { transform: 'translateY(-15px) rotate(5deg)' }
                },
                ...(i === 0 && { top: '15%', left: '10%' }),
                ...(i === 1 && { top: '20%', right: '15%' }),
                ...(i === 2 && { bottom: '25%', left: '15%' }),
                ...(i === 3 && { top: '40%', right: '8%' }),
                ...(i === 4 && { bottom: '15%', right: '20%' })
              }}
            >
              {emoji}
            </Box>
          ))}
        </>
      )}
      
      {/* Decorative botanical elements for boho style */}
      {isBoho && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: '10%',
              opacity: 0.15,
              transform: 'rotate(-15deg)'
            }}
          >
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
              <path d="M40 10 Q30 40, 40 60 T40 110" stroke="#8B6F47" strokeWidth="2.5" fill="none"/>
              <ellipse cx="30" cy="35" rx="12" ry="20" fill="#A0826D" opacity="0.6"/>
              <ellipse cx="50" cy="50" rx="10" ry="18" fill="#8B6F47" opacity="0.6"/>
              <ellipse cx="35" cy="75" rx="11" ry="19" fill="#A0826D" opacity="0.6"/>
              <ellipse cx="48" cy="85" rx="9" ry="16" fill="#8B6F47" opacity="0.6"/>
            </svg>
          </Box>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              right: '8%',
              opacity: 0.15,
              transform: 'rotate(25deg)'
            }}
          >
            <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
              <circle cx="45" cy="50" r="35" fill="none" stroke="#8B6F47" strokeWidth="2"/>
              <path d="M45 15 Q55 35, 45 50 Q35 35, 45 15" fill="#A0826D" opacity="0.7"/>
              <path d="M45 50 Q60 60, 70 70" stroke="#8B6F47" strokeWidth="2.5" fill="none"/>
              <path d="M45 50 Q30 60, 20 70" stroke="#8B6F47" strokeWidth="2.5" fill="none"/>
              <ellipse cx="72" cy="72" rx="6" ry="10" fill="#8B6F47" opacity="0.6"/>
              <ellipse cx="18" cy="72" rx="6" ry="10" fill="#A0826D" opacity="0.6"/>
            </svg>
          </Box>
        </>
      )}

      <Container maxWidth="sm">
        <Paper
          elevation={isGenz ? 0 : (isBoho ? 0 : 3)}
          sx={{
            p: isGenz ? 4 : (isBoho ? 5 : 4),
            borderRadius: isGenz ? '24px' : (isBoho ? '4px' : '24px'),
            border: isGenz 
              ? '1px solid rgba(16, 185, 129, 0.3)' 
              : (isBoho ? '1px solid #C9A577' : 'none'),
            bgcolor: isGenz 
              ? 'rgba(15, 10, 31, 0.8)' 
              : (isBoho ? 'rgba(255, 253, 248, 0.95)' : 'white'),
            boxShadow: isGenz
              ? '0 8px 32px rgba(16, 185, 129, 0.2), 0 0 60px rgba(16, 185, 129, 0.1)'
              : (isBoho 
                ? '0 8px 32px rgba(139, 111, 71, 0.15)' 
                : '0 8px 32px rgba(0,0,0,0.08)'),
            backdropFilter: isGenz ? 'blur(20px)' : (isBoho ? 'blur(10px)' : 'none'),
            position: 'relative',
            '&::before': isGenz ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '24px',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(34, 211, 238, 0.5), rgba(168, 85, 247, 0.3))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none'
            } : {}
          }}
        >
          {/* Logo/Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Decorative top element */}
            {isGenz && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: '2rem' }}>✨🔮✨</Typography>
              </Box>
            )}
            {isBoho && (
              <Box sx={{ mb: 2 }}>
                <svg width="60" height="40" viewBox="0 0 60 40" style={{ opacity: 0.7 }}>
                  <path d="M10 20 Q20 10, 30 20 Q40 10, 50 20" stroke="#8B6F47" strokeWidth="1.5" fill="none"/>
                  <circle cx="15" cy="25" r="2" fill="#A0826D"/>
                  <circle cx="30" cy="15" r="2.5" fill="#8B6F47"/>
                  <circle cx="45" cy="25" r="2" fill="#A0826D"/>
                  <path d="M30 15 L30 30" stroke="#8B6F47" strokeWidth="1" opacity="0.5"/>
                </svg>
              </Box>
            )}
            
            <Typography
              variant="h2"
              sx={{
                fontFamily: isGenz 
                  ? '"Space Grotesk", sans-serif' 
                  : (isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif'),
                fontWeight: isGenz ? 700 : (isBoho ? 700 : 800),
                color: isGenz ? 'transparent' : (isBoho ? '#8B6F47' : '#26BFF0'),
                background: isGenz ? 'linear-gradient(135deg, #10B981, #A855F7, #EC4899)' : 'none',
                backgroundClip: isGenz ? 'text' : 'unset',
                WebkitBackgroundClip: isGenz ? 'text' : 'unset',
                mb: 0.5,
                fontSize: isGenz ? '3rem' : (isBoho ? '3.5rem' : '3rem'),
                letterSpacing: isBoho ? '1px' : 'normal'
              }}
            >
              Hayati
            </Typography>
            
            {/* Decorative element replacing heart */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1.5 }}>
              {isGenz ? (
                <Typography sx={{ fontSize: '1.5rem' }}>💜</Typography>
              ) : isBoho ? (
                <>
                  <Box sx={{ width: 40, height: 1, bgcolor: '#C9A577', opacity: 0.4 }} />
                  <LocalFlorist sx={{ color: '#8B6F47', fontSize: '1.2rem', opacity: 0.7 }} />
                  <Box sx={{ width: 40, height: 1, bgcolor: '#C9A577', opacity: 0.4 }} />
                </>
              ) : (
                <Typography sx={{ fontSize: '1.5rem' }}>💙</Typography>
              )}
            </Box>
            
            <Typography
              variant="body1"
              sx={{
                color: isGenz ? 'rgba(255, 255, 255, 0.7)' : (isBoho ? '#6B5744' : '#757575'),
                fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                fontSize: isBoho ? '1rem' : '0.95rem',
                fontStyle: isBoho ? 'italic' : 'normal',
                letterSpacing: isBoho ? '0.5px' : 'normal'
              }}
            >
              {isGenz 
                ? "Your vibe-coded life assistant ✨"
                : (isBoho 
                  ? "Your gentle companion for a mindful life"
                  : "Your AI Life Management Assistant")}
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                textTransform: 'none',
                fontSize: isGenz ? '1rem' : (isBoho ? '1.05rem' : '1rem'),
                fontWeight: isGenz ? 600 : (isBoho ? 600 : 500),
                letterSpacing: isBoho ? '0.5px' : 'normal',
                color: isGenz ? 'rgba(255, 255, 255, 0.6)' : (isBoho ? '#8B6F47' : '#666')
              },
              '& .Mui-selected': {
                color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0'),
                fontWeight: isGenz ? 700 : (isBoho ? 700 : 600)
              },
              '& .MuiTabs-indicator': {
                bgcolor: isGenz 
                  ? 'linear-gradient(90deg, #10B981, #A855F7)' 
                  : (isBoho ? '#8B6F47' : '#26BFF0'),
                background: isGenz ? 'linear-gradient(90deg, #10B981, #A855F7)' : undefined,
                height: isGenz ? 3 : (isBoho ? 2 : 3)
              }
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                borderRadius: isGenz ? '12px' : (isBoho ? '4px' : '8px'),
                bgcolor: isGenz 
                  ? 'rgba(239, 68, 68, 0.15)' 
                  : (isBoho ? 'rgba(180, 83, 9, 0.1)' : undefined),
                color: isGenz ? '#F87171' : (isBoho ? '#8B4513' : undefined),
                border: isGenz ? '1px solid rgba(239, 68, 68, 0.3)' : undefined,
                '& .MuiAlert-icon': {
                  color: isGenz ? '#F87171' : (isBoho ? '#8B4513' : undefined)
                }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          {activeTab === 0 && (
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={handleLoginChange}
                required
                sx={{ 
                  mb: 3.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isBoho ? '#6B4423' : '#26BFF0'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#C9A577' : '#666') }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: isGenz ? 1.5 : (isBoho ? 1.3 : 1.5),
                  fontSize: isGenz ? '1.1rem' : (isBoho ? '1rem' : '1.1rem'),
                  fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                  background: isGenz 
                    ? 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)'
                    : (isBoho ? '#8B6F47' : '#26BFF0'),
                  letterSpacing: isBoho ? '1px' : 'normal',
                  border: isGenz ? 'none' : (isBoho ? '1px solid #8B6F47' : 'none'),
                  boxShadow: isGenz ? '0 4px 20px rgba(16, 185, 129, 0.4)' : 'none',
                  '&:hover': {
                    background: isGenz 
                      ? 'linear-gradient(135deg, #059669 0%, #9333EA 50%, #DB2777 100%)'
                      : (isBoho ? '#6B4423' : '#1EA5D4'),
                    boxShadow: isGenz ? '0 6px 30px rgba(16, 185, 129, 0.5)' : 'none',
                    transform: isGenz ? 'translateY(-2px)' : 'none',
                    border: isGenz ? 'none' : (isBoho ? '1px solid #6B4423' : 'none')
                  },
                  '&:active': {
                    transform: isGenz ? 'translateY(0)' : (isBoho ? 'scale(0.98)' : 'none')
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Signing in...' : (isGenz ? 'Let\'s Go! 🚀' : 'Sign In')}
              </Button>
            </Box>
          )}

          {/* Signup Form */}
          {activeTab === 1 && (
            <Box component="form" onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                required
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={signupData.password}
                onChange={handleSignupChange}
                required
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  },
                  '& .MuiFormHelperText-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: '0.85rem'
                  }
                }}
                helperText="Minimum 6 characters"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#C9A577' : '#666') }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                required
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  )
                }}
              />

              {/* Birth Year Field */}
              <TextField
                fullWidth
                label="Birth Year"
                name="birthYear"
                type="number"
                value={signupData.birthYear}
                onChange={handleSignupChange}
                placeholder="e.g., 2000"
                inputProps={{ min: 1940, max: 2015 }}
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  )
                }}
              />

              {/* Gender Field */}
              <FormControl 
                fullWidth 
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  },
                  '& .MuiSelect-icon': {
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : 'inherit'
                  }
                }}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={signupData.gender}
                  onChange={handleSignupChange}
                  label="Gender"
                  startAdornment={
                    <InputAdornment position="start">
                      <Wc sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  }
                  sx={{
                    color: isGenz ? 'white' : 'inherit',
                    '& .MuiSelect-select': {
                      color: isGenz ? 'white' : 'inherit'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: isGenz ? 'rgba(15, 10, 31, 0.95)' : (isBoho ? '#FFFDF8' : 'white'),
                        backdropFilter: isGenz ? 'blur(20px)' : 'none',
                        border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                        '& .MuiMenuItem-root': {
                          fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                          color: isGenz ? 'white' : 'inherit',
                          '&:hover': {
                            bgcolor: isGenz ? 'rgba(16, 185, 129, 0.2)' : undefined
                          },
                          '&.Mui-selected': {
                            bgcolor: isGenz ? 'rgba(16, 185, 129, 0.3)' : undefined
                          }
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="non-binary">Non-binary</MenuItem>
                  <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                </Select>
              </FormControl>

              {/* Hobbies Field */}
              <FormControl 
                fullWidth 
                sx={{ 
                  mb: 3.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  },
                  '& .MuiSelect-icon': {
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : 'inherit'
                  }
                }}
              >
                <InputLabel>Hobbies & Interests</InputLabel>
                <Select
                  multiple
                  name="hobbies"
                  value={signupData.hobbies}
                  onChange={(e) => setSignupData({ ...signupData, hobbies: e.target.value })}
                  input={<OutlinedInput label="Hobbies & Interests" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={value} 
                          size="small"
                          sx={{
                            bgcolor: isGenz 
                              ? 'rgba(16, 185, 129, 0.3)' 
                              : (isBoho ? 'rgba(201, 165, 119, 0.3)' : 'rgba(38, 191, 240, 0.2)'),
                            color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0'),
                            fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                            fontSize: '0.75rem',
                            '& .MuiChip-deleteIcon': {
                              color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                            }
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  startAdornment={
                    <InputAdornment position="start">
                      <Interests sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        bgcolor: isGenz ? 'rgba(15, 10, 31, 0.95)' : (isBoho ? '#FFFDF8' : 'white'),
                        backdropFilter: isGenz ? 'blur(20px)' : 'none',
                        border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                        '& .MuiMenuItem-root': {
                          fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                          color: isGenz ? 'white' : 'inherit',
                          '&:hover': {
                            bgcolor: isGenz ? 'rgba(16, 185, 129, 0.2)' : undefined
                          },
                          '&.Mui-selected': {
                            bgcolor: isGenz ? 'rgba(16, 185, 129, 0.3)' : undefined
                          }
                        }
                      }
                    }
                  }}
                >
                  {HOBBIES_OPTIONS.map((hobby) => (
                    <MenuItem key={hobby} value={hobby}>
                      {hobby}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ 
                  color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                  fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit')
                }}>
                  Select your interests to personalize your experience
                </FormHelperText>
              </FormControl>

              {/* WhatsApp Number Field (Optional) */}
              <TextField
                fullWidth
                label="WhatsApp Number (Optional)"
                name="whatsappNumber"
                type="tel"
                value={signupData.whatsappNumber}
                onChange={handleSignupChange}
                placeholder="e.g., +1234567890"
                helperText="For event reminders via WhatsApp"
                sx={{ 
                  mb: 3.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                    bgcolor: isGenz ? 'rgba(255, 255, 255, 0.05)' : (isBoho ? '#FFFDF8' : 'white'),
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    fontSize: isGenz ? '0.95rem' : (isBoho ? '0.95rem' : '1rem'),
                    color: isGenz ? 'white' : 'inherit',
                    '& fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#C9A577' : '#e0e0e0'),
                      borderWidth: '1px',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isGenz ? 'rgba(16, 185, 129, 0.6)' : (isBoho ? '#A0826D' : '#26BFF0')
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0'),
                      borderWidth: '1px'
                    },
                    '& input': {
                      padding: isBoho ? '14px 14px' : '16.5px 14px',
                      color: isGenz ? 'white' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: isBoho ? '0.95rem' : '1rem',
                    '&.Mui-focused': {
                      color: isGenz ? '#10B981' : (isBoho ? '#6B4423' : '#26BFF0')
                    }
                  },
                  '& .MuiFormHelperText-root': {
                    fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                    color: isGenz ? 'rgba(255, 255, 255, 0.5)' : (isBoho ? '#A0826D' : '#666'),
                    fontSize: '0.85rem'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: isGenz ? '#10B981' : (isBoho ? '#C9A577' : '#26BFF0'), fontSize: '1.2rem' }} />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: isGenz ? 1.5 : (isBoho ? 1.3 : 1.5),
                  fontSize: isGenz ? '1.1rem' : (isBoho ? '1rem' : '1.1rem'),
                  fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: isGenz ? '12px' : (isBoho ? '2px' : '8px'),
                  background: isGenz 
                    ? 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)'
                    : (isBoho ? '#8B6F47' : '#26BFF0'),
                  letterSpacing: isBoho ? '1px' : 'normal',
                  border: isGenz ? 'none' : (isBoho ? '1px solid #8B6F47' : 'none'),
                  boxShadow: isGenz ? '0 4px 20px rgba(16, 185, 129, 0.4)' : 'none',
                  '&:hover': {
                    background: isGenz 
                      ? 'linear-gradient(135deg, #059669 0%, #9333EA 50%, #DB2777 100%)'
                      : (isBoho ? '#6B4423' : '#1EA5D4'),
                    boxShadow: isGenz ? '0 6px 30px rgba(16, 185, 129, 0.5)' : 'none',
                    transform: isGenz ? 'translateY(-2px)' : 'none',
                    border: isGenz ? 'none' : (isBoho ? '1px solid #6B4423' : 'none')
                  },
                  '&:active': {
                    transform: isGenz ? 'translateY(0)' : (isBoho ? 'scale(0.98)' : 'none')
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading 
                  ? (isGenz ? 'Setting up your vibe... ✨' : 'Creating account...') 
                  : (isGenz ? 'Join the Squad! 🚀' : 'Create Account')}
              </Button>
            </Box>
          )}
        </Paper>

        {/* Footer Note with decorative element */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          {isGenz && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '1.2rem' }}>💜✨🔮</Typography>
            </Box>
          )}
          {isBoho && (
            <Box sx={{ mb: 2 }}>
              <svg width="50" height="30" viewBox="0 0 50 30" style={{ opacity: 0.6 }}>
                <path d="M5 15 Q15 5, 25 15 Q35 5, 45 15" stroke="#8B6F47" strokeWidth="1.5" fill="none"/>
                <circle cx="25" cy="10" r="2" fill="#A0826D"/>
              </svg>
            </Box>
          )}
          
          <Typography
            variant="body2"
            sx={{
              color: isGenz ? 'rgba(255, 255, 255, 0.6)' : (isBoho ? '#8B6F47' : '#757575'),
              fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
              fontSize: isGenz ? '0.9rem' : (isBoho ? '0.95rem' : '0.875rem'),
              fontStyle: isBoho ? 'italic' : 'normal',
              letterSpacing: isBoho ? '0.3px' : 'normal'
            }}
          >
            {isGenz
              ? "Your chaos? Organized. Your life? Elevated. fr fr 💫"
              : (isBoho
                ? "Your journey to a calmer, organized life begins here"
                : "Organize your life with AI-powered productivity 💙")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
