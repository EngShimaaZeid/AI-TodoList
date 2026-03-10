import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Refresh,
  RestartAlt,
  Psychology,
  Menu as MenuIcon,
  Home as HomeIcon,
  Timeline,
  Favorite,
  Settings,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isBoho, isGenz, onOpenChat }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sidebarWidth = 280;

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userId = localStorage.getItem('hayati_user_id');
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  const handleRerunStory = () => {
    localStorage.setItem('hayati_pending_action', 'story');
    navigate('/');
    setTimeout(() => onOpenChat?.(), 100);
  };

  const handleRedoEisenhower = async () => {
    if (!userData?.storyCompleted) {
      setToast({ open: true, message: 'Complete "Share Your Journey" first', severity: 'error' });
      return;
    }
    localStorage.setItem('hayati_pending_action', 'eisenhower');
    navigate('/');
    setTimeout(() => onOpenChat?.(), 100);
  };

  const handleResetProfile = async () => {
    if (!window.confirm('Reset your entire profile? This cannot be undone.')) return;
    try {
      const userId = localStorage.getItem('hayati_user_id');
      await fetch(`http://localhost:5001/api/users/${userId}/reset`, { method: 'POST' });
      setToast({ open: true, message: 'Profile reset successfully', severity: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setToast({ open: true, message: 'Failed to reset profile', severity: 'error' });
    }
  };

  // Menu Items
  const menuItems = [
    { id: 'overview', label: isGenz ? 'Overview ✨' : 'Overview', icon: <HomeIcon /> },
    { id: 'personality', label: isGenz ? 'Personality 🧠' : 'Personality', icon: <Psychology /> },
    { id: 'lifestyle', label: isGenz ? 'Lifestyle 💫' : 'Lifestyle', icon: <Favorite /> },
    { id: 'priorities', label: isGenz ? 'Priorities 🎯' : 'Priorities', icon: <Timeline /> },
    { id: 'settings', label: isGenz ? 'Settings ⚙️' : 'Settings', icon: <Settings /> },
  ];

  const primaryColor = isGenz ? '#10B981' : (isBoho ? '#8B6F47' : '#26BFF0');
  const secondaryColor = isGenz ? '#A855F7' : (isBoho ? '#964734' : '#1A1A2E');
  const accentColor = isGenz ? '#22D3EE' : primaryColor;

  // Sidebar Content
  const SidebarContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* User Info */}
      <Box sx={{ 
        p: 3, 
        textAlign: 'center', 
        borderBottom: `1px solid ${isGenz ? 'rgba(16, 185, 129, 0.2)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
        ...(isGenz && {
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)'
        })
      }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: isGenz ? 'transparent' : primaryColor,
            background: isGenz ? 'linear-gradient(135deg, #10B981 0%, #A855F7 100%)' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            fontSize: '2rem',
            color: 'white',
            fontWeight: 700,
            ...(isGenz && {
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            })
          }}
        >
          {userData?.name?.charAt(0)?.toUpperCase() || '?'}
        </Box>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: isGenz ? '#FFFFFF' : secondaryColor,
          ...(isGenz && {
            fontFamily: '"Space Grotesk", sans-serif'
          })
        }}>
          {userData?.name || 'User'}
        </Typography>
        <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.6)' : '#757575' }}>
          {userData?.email || ''}
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ px: 1 }}>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: '12px',
                mb: 0.5,
                ...(isGenz && {
                  '&.Mui-selected': {
                    bgcolor: 'rgba(16, 185, 129, 0.15)',
                    borderLeft: '3px solid #10B981',
                    '&:hover': {
                      bgcolor: 'rgba(16, 185, 129, 0.2)',
                    }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(168, 85, 247, 0.1)',
                  }
                }),
                ...(!isGenz && {
                  '&.Mui-selected': {
                    bgcolor: isBoho ? 'rgba(139, 111, 71, 0.1)' : 'rgba(38, 191, 240, 0.1)',
                    '&:hover': {
                      bgcolor: isBoho ? 'rgba(139, 111, 71, 0.15)' : 'rgba(38, 191, 240, 0.15)',
                    }
                  },
                  '&:hover': {
                    bgcolor: isBoho ? 'rgba(139, 111, 71, 0.05)' : 'rgba(38, 191, 240, 0.05)',
                  }
                })
              }}
            >
              <ListItemIcon sx={{ 
                color: activeSection === item.id 
                  ? (isGenz ? '#10B981' : primaryColor) 
                  : (isGenz ? 'rgba(255, 255, 255, 0.5)' : '#757575'), 
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontWeight: activeSection === item.id ? 600 : 400,
                  color: activeSection === item.id 
                    ? (isGenz ? '#10B981' : primaryColor) 
                    : (isGenz ? 'rgba(255, 255, 255, 0.8)' : 'inherit'),
                  fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Quick Actions */}
      <Box sx={{ p: 2, borderTop: `1px solid ${isGenz ? 'rgba(16, 185, 129, 0.2)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}` }}>
        <Stack spacing={1}>
          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={handleRerunStory}
            sx={{ 
              justifyContent: 'flex-start', 
              color: isGenz ? '#10B981' : primaryColor, 
              textTransform: 'none',
              fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit',
              '&:hover': isGenz ? {
                bgcolor: 'rgba(16, 185, 129, 0.1)'
              } : {}
            }}
          >
            {isGenz ? 'Re-run Story 🔄' : 'Re-run Story'}
          </Button>
          <Button
            size="small"
            startIcon={<RestartAlt />}
            onClick={handleResetProfile}
            sx={{ 
              justifyContent: 'flex-start', 
              color: isGenz ? '#EF4444' : '#d32f2f', 
              textTransform: 'none',
              fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
            }}
          >
            {isGenz ? 'Reset Profile 💀' : 'Reset Profile'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  // Content Sections
  const renderOverview = () => (
    <Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        color: isGenz ? '#FFFFFF' : secondaryColor,
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit',
        ...(isGenz && {
          background: 'linear-gradient(135deg, #10B981 0%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        })
      }}>
        {isGenz 
          ? `Yo ${userData?.name?.split(' ')[0] || 'there'}! ✨` 
          : `Welcome back, ${userData?.name?.split(' ')[0] || 'there'}! 👋`}
      </Typography>

      {/* Status Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mb: 4 }}>
        <StatusCard 
          title="Journey" 
          status={userData?.storyCompleted ? 'Completed' : 'Not Started'} 
          icon="📖" 
          color={userData?.storyCompleted ? (isGenz ? '#10B981' : '#4CAF50') : '#9E9E9E'}
          isBoho={isBoho}
          isGenz={isGenz}
        />
        <StatusCard 
          title="Eisenhower" 
          status={userData?.eisenhowerCompleted ? 'Completed' : 'Not Started'} 
          icon="🧭" 
          color={userData?.eisenhowerCompleted ? (isGenz ? '#A855F7' : '#4CAF50') : '#9E9E9E'}
          isBoho={isBoho}
          isGenz={isGenz}
        />
      </Box>

      {/* Quick Personality Summary */}
      {userData?.profile?.personalityModel && (
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: isGenz ? '20px' : '16px', 
          bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : (isBoho ? '#FDFBF7' : '#F8FAFE'), 
          border: `1px solid ${isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
          ...(isGenz && {
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)'
          })
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2, 
            color: isGenz ? '#10B981' : primaryColor,
            fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
          }}>
            {isGenz ? '🧠 Personality Snapshot' : '🧠 Quick Personality Snapshot'}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: isGenz ? 'rgba(255, 255, 255, 0.8)' : '#555', 
            lineHeight: 1.8 
          }}>
            {userData.profile.personalityModel.split('\n')[0]}
          </Typography>
          <Button 
            size="small" 
            onClick={() => setActiveSection('personality')}
            sx={{ 
              mt: 2, 
              color: isGenz ? '#A855F7' : primaryColor, 
              textTransform: 'none',
              fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit',
              '&:hover': isGenz ? {
                bgcolor: 'rgba(168, 85, 247, 0.1)'
              } : {}
            }}
          >
            {isGenz ? 'View Full Analysis 💜' : 'View Full Analysis →'}
          </Button>
        </Paper>
      )}
    </Box>
  );

  const renderPersonality = () => (
    <Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        color: isGenz ? '#FFFFFF' : secondaryColor,
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit',
        ...(isGenz && {
          background: 'linear-gradient(135deg, #A855F7 0%, #10B981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        })
      }}>
        {isGenz ? '🧠 Your Personality Vibe' : '🧠 Personality Analysis'}
      </Typography>

      {!userData?.profile?.personalityModel ? (
        <Alert severity="info" sx={{ 
          mb: 3,
          ...(isGenz && {
            bgcolor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            color: '#FFFFFF',
            '& .MuiAlert-icon': { color: '#10B981' }
          })
        }}>
          {isGenz ? 'Complete "Share Your Journey" to unlock your personality analysis! ✨' : 'Complete "Share Your Journey" to unlock your personality analysis.'}
          <Button size="small" onClick={handleRerunStory} sx={{ ml: 2, color: isGenz ? '#10B981' : undefined }}>Start Now</Button>
        </Alert>
      ) : (
        <Stack spacing={3}>
          <ProfileSection title="Personality Model" content={userData.profile.personalityModel} isBoho={isBoho} isGenz={isGenz} accentColor="#10B981" />
          <ProfileSection title="Emotional Blueprint" content={userData.profile.emotionalBlueprint} isBoho={isBoho} isGenz={isGenz} accentColor="#A855F7" />
          <ProfileSection title="Motivation System" content={userData.profile.motivationSystem} isBoho={isBoho} isGenz={isGenz} accentColor="#22D3EE" />
          <ProfileSection title="Identity Structure" content={userData.profile.identityStructure} isBoho={isBoho} isGenz={isGenz} accentColor="#10B981" />
          <ProfileSection title="Behavioral Tendencies" content={userData.profile.behavioralTendencies} isBoho={isBoho} isGenz={isGenz} accentColor="#A855F7" />
          <ProfileSection title="Stress Response" content={userData.profile.stressResponse} isBoho={isBoho} isGenz={isGenz} accentColor="#22D3EE" />
        </Stack>
      )}

      <Typography variant="caption" sx={{ 
        display: 'block', 
        mt: 3, 
        color: isGenz ? 'rgba(255, 255, 255, 0.5)' : '#999', 
        fontStyle: 'italic' 
      }}>
        {isGenz ? '⚠️ AI-generated vibes · Not a clinical diagnosis fr fr' : '⚠️ AI-generated analysis based on psychological frameworks. Not a clinical diagnosis.'}
      </Typography>
    </Box>
  );

  const renderLifestyle = () => (
    <Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        color: isGenz ? '#FFFFFF' : secondaryColor,
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit',
        ...(isGenz && {
          background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        })
      }}>
        {isGenz ? '💫 Lifestyle & Values' : '💖 Lifestyle & Values'}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        <InfoCard title="Work Style" value={userData?.profile?.workStyle} icon="💼" isBoho={isBoho} isGenz={isGenz} accentColor="#10B981" />
        <InfoCard title="Daily Routine" value={userData?.profile?.dailyRoutine} icon="🌅" isBoho={isBoho} isGenz={isGenz} accentColor="#A855F7" />
        <InfoCard title="Free Time" value={userData?.profile?.freeTime} icon="🎯" isBoho={isBoho} isGenz={isGenz} accentColor="#EC4899" />
        <InfoCard title="Energy Model" value={userData?.profile?.energyModel} icon="⚡" isBoho={isBoho} isGenz={isGenz} accentColor="#22D3EE" />
      </Box>

      {userData?.profile?.hobbies && (
        <Paper elevation={0} sx={{ 
          p: 3, 
          mt: 3, 
          borderRadius: isGenz ? '20px' : '16px', 
          bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
          border: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
          ...(isGenz && { backdropFilter: 'blur(20px)' })
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: isGenz ? '#EC4899' : 'inherit',
            fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
          }}>
            {isGenz ? '💖 Hobbies' : '❤️ Hobbies'}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {userData.profile.hobbies.split(',').map((hobby, i) => (
              <Chip 
                key={i} 
                label={hobby.trim()} 
                sx={{ 
                  bgcolor: isGenz 
                    ? `rgba(${[16, 168, 236][i % 3]}, ${[185, 85, 72][i % 3]}, ${[129, 247, 153][i % 3]}, 0.2)`
                    : (isBoho ? 'rgba(139, 111, 71, 0.1)' : 'rgba(38, 191, 240, 0.1)'),
                  color: isGenz ? '#FFFFFF' : 'inherit',
                  border: isGenz ? '1px solid rgba(168, 85, 247, 0.3)' : 'none'
                }} 
              />
            ))}
          </Box>
        </Paper>
      )}

      {userData?.profile?.goals && (
        <Paper elevation={0} sx={{ 
          p: 3, 
          mt: 3, 
          borderRadius: isGenz ? '20px' : '16px', 
          bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
          border: `1px solid ${isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
          ...(isGenz && { backdropFilter: 'blur(20px)' })
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: isGenz ? '#10B981' : 'inherit',
            fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
          }}>
            {isGenz ? '🎯 Life Goals' : '🎯 Life Goals'}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, color: isGenz ? 'rgba(255, 255, 255, 0.8)' : 'inherit' }}>{userData.profile.goals}</Typography>
        </Paper>
      )}

      {userData?.profile?.struggles && (
        <Paper elevation={0} sx={{ 
          p: 3, 
          mt: 3, 
          borderRadius: isGenz ? '20px' : '16px', 
          bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
          border: `1px solid ${isGenz ? 'rgba(236, 72, 153, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
          ...(isGenz && { backdropFilter: 'blur(20px)' })
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: isGenz ? '#EC4899' : 'inherit',
            fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
          }}>
            {isGenz ? '💭 Current Challenges' : '💭 Current Challenges'}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, color: isGenz ? 'rgba(255, 255, 255, 0.8)' : 'inherit' }}>{userData.profile.struggles}</Typography>
        </Paper>
      )}

      {userData?.profile?.values && (
        <Paper elevation={0} sx={{ 
          p: 3, 
          mt: 3, 
          borderRadius: isGenz ? '20px' : '16px', 
          bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
          border: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
          ...(isGenz && { backdropFilter: 'blur(20px)' })
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: isGenz ? '#A855F7' : 'inherit',
            fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
          }}>
            {isGenz ? '💎 Core Values' : '💎 Core Values'}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, color: isGenz ? 'rgba(255, 255, 255, 0.8)' : 'inherit' }}>{userData.profile.values}</Typography>
        </Paper>
      )}
    </Box>
  );

  const renderPriorities = () => (
    <Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        color: isGenz ? '#FFFFFF' : secondaryColor,
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit',
        ...(isGenz && {
          background: 'linear-gradient(135deg, #10B981 0%, #22D3EE 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        })
      }}>
        {isGenz ? '🎯 Your Priority System' : '🧭 Your Priority System'}
      </Typography>

      {!userData?.profile?.eisenhowerLogic ? (
        <Alert severity="info" sx={{
          ...(isGenz && {
            bgcolor: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            color: '#FFFFFF',
            '& .MuiAlert-icon': { color: '#A855F7' }
          })
        }}>
          {isGenz ? 'Complete "Eisenhower Mapping" to see your priority system! 🎯' : 'Complete "Eisenhower Mapping" to see your priority system.'}
          <Button size="small" onClick={handleRedoEisenhower} sx={{ ml: 2, color: isGenz ? '#A855F7' : undefined }}>Start Now</Button>
        </Alert>
      ) : (
        <>
          <Paper elevation={0} sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: isGenz ? '20px' : '16px', 
            bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
            border: `1px solid ${isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
            ...(isGenz && { backdropFilter: 'blur(20px)' })
          }}>
            <Typography variant="body1" sx={{ 
              lineHeight: 1.8, 
              whiteSpace: 'pre-line',
              color: isGenz ? 'rgba(255, 255, 255, 0.8)' : 'inherit'
            }}>
              {userData.profile.eisenhowerLogic}
            </Typography>
          </Paper>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
            <PriorityCard title="⚠️ Urgent Matters" content={userData.profile?.urgentMatters} isBoho={isBoho} isGenz={isGenz} accentColor="#EF4444" />
            <PriorityCard title="⭐ Important Matters" content={userData.profile?.importantMatters} isBoho={isBoho} isGenz={isGenz} accentColor="#10B981" />
            <PriorityCard title="⏰ Time Drains" content={userData.profile?.timeDrains} isBoho={isBoho} isGenz={isGenz} accentColor="#A855F7" />
            <PriorityCard title="🕊️ Peaceful Activities" content={userData.profile?.peacefulActivities} isBoho={isBoho} isGenz={isGenz} accentColor="#EC4899" />
          </Box>
        </>
      )}
    </Box>
  );

  const renderSettings = () => (
    <Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        color: isGenz ? '#FFFFFF' : secondaryColor,
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
      }}>
        {isGenz ? '⚙️ Settings' : '⚙️ Profile Settings'}
      </Typography>

      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: isGenz ? '20px' : '16px', 
        bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
        border: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`, 
        mb: 3,
        ...(isGenz && { backdropFilter: 'blur(20px)' })
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          mb: 2,
          color: isGenz ? '#A855F7' : 'inherit',
          fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
        }}>Account Info</Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary' }}>Name</Typography>
            <Typography variant="body1" sx={{ color: isGenz ? '#FFFFFF' : 'inherit' }}>{userData?.name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary' }}>Email</Typography>
            <Typography variant="body1" sx={{ color: isGenz ? '#FFFFFF' : 'inherit' }}>{userData?.email}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary' }}>Member Since</Typography>
            <Typography variant="body1" sx={{ color: isGenz ? '#FFFFFF' : 'inherit' }}>{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: isGenz ? '20px' : '16px', 
        bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
        border: `1px solid ${isGenz ? 'rgba(16, 185, 129, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`, 
        mb: 3,
        ...(isGenz && { backdropFilter: 'blur(20px)' })
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          mb: 2,
          color: isGenz ? '#10B981' : 'inherit',
          fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
        }}>Actions</Typography>
        <Stack spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />} 
            onClick={handleRerunStory} 
            sx={{ 
              justifyContent: 'flex-start',
              ...(isGenz && {
                borderColor: 'rgba(16, 185, 129, 0.5)',
                color: '#10B981',
                '&:hover': {
                  borderColor: '#10B981',
                  bgcolor: 'rgba(16, 185, 129, 0.1)'
                }
              })
            }}
          >
            {isGenz ? 'Re-run Journey 🔄' : 'Re-run Share Your Journey'}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Psychology />} 
            onClick={handleRedoEisenhower} 
            sx={{ 
              justifyContent: 'flex-start',
              ...(isGenz && {
                borderColor: 'rgba(168, 85, 247, 0.5)',
                color: '#A855F7',
                '&:hover': {
                  borderColor: '#A855F7',
                  bgcolor: 'rgba(168, 85, 247, 0.1)'
                }
              })
            }}
          >
            {isGenz ? 'Redo Eisenhower 🎯' : 'Redo Eisenhower Mapping'}
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<RestartAlt />} 
            onClick={handleResetProfile} 
            sx={{ 
              justifyContent: 'flex-start',
              ...(isGenz && {
                borderColor: 'rgba(239, 68, 68, 0.5)',
                color: '#EF4444',
                '&:hover': {
                  borderColor: '#EF4444',
                  bgcolor: 'rgba(239, 68, 68, 0.1)'
                }
              })
            }}
          >
            {isGenz ? 'Reset Profile 💀' : 'Reset Entire Profile'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'personality': return renderPersonality();
      case 'lifestyle': return renderLifestyle();
      case 'priorities': return renderPriorities();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      bgcolor: isGenz ? '#0F0A1F' : (isBoho ? '#FDFBF7' : '#F5F7FA'),
      ...(isGenz && {
        background: 'linear-gradient(180deg, #0F0A1F 0%, #1A1033 50%, #0D1B2A 100%)'
      })
    }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: sidebarWidth, 
            bgcolor: isGenz ? '#0F0A1F' : 'white',
            ...(isGenz && {
              background: 'linear-gradient(180deg, #0F0A1F 0%, #1A1033 100%)',
              borderRight: '1px solid rgba(168, 85, 247, 0.2)'
            })
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: isGenz ? '#FFFFFF' : 'inherit' }}><Close /></IconButton>
        </Box>
        <SidebarContent />
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: sidebarWidth },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: sidebarWidth,
            height: '100vh',
            position: 'fixed',
            borderRight: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.2)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
            bgcolor: isGenz ? '#0F0A1F' : 'white',
            overflowY: 'auto',
            ...(isGenz && {
              background: 'linear-gradient(180deg, #0F0A1F 0%, #1A1033 100%)'
            })
          }}
        >
          <SidebarContent />
        </Paper>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, maxWidth: '1000px' }}>
        {/* Mobile Header */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 2, color: isGenz ? '#FFFFFF' : 'inherit' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {menuItems.find(m => m.id === activeSection)?.label || 'Profile'}
            </Typography>
          </Box>
        )}

        {renderContent()}
      </Box>

      {/* Toast */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

// Helper Components
const StatusCard = ({ title, status, icon, color, isBoho, isGenz }) => (
  <Paper elevation={0} sx={{ 
    p: 2.5, 
    borderRadius: isGenz ? '20px' : '16px', 
    bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
    border: `1px solid ${isGenz ? 'rgba(168, 85, 247, 0.3)' : (isBoho ? '#E0D0C0' : '#E0E0E0')}`, 
    textAlign: 'center',
    ...(isGenz && {
      backdropFilter: 'blur(20px)',
      boxShadow: `0 8px 32px ${color}33`
    })
  }}>
    <Typography sx={{ fontSize: '2rem', mb: 1 }}>{icon}</Typography>
    <Typography variant="h5" sx={{ 
      fontWeight: 700, 
      color,
      fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
    }}>{status}</Typography>
    <Typography variant="caption" sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.6)' : '#757575' }}>{title}</Typography>
  </Paper>
);

const ProfileSection = ({ title, content, isBoho, isGenz, accentColor = '#10B981' }) => {
  if (!content) return null;
  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      borderRadius: isGenz ? '20px' : '16px', 
      bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
      border: `1px solid ${isGenz ? `${accentColor}4D` : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
      ...(isGenz && { backdropFilter: 'blur(20px)' })
    }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: 2, 
        color: isGenz ? accentColor : (isBoho ? '#964734' : '#26BFF0'),
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
      }}>{title}</Typography>
      <Typography variant="body2" sx={{ 
        lineHeight: 1.8, 
        whiteSpace: 'pre-line',
        color: isGenz ? 'rgba(255, 255, 255, 0.8)' : 'inherit'
      }}>{content}</Typography>
    </Paper>
  );
};

const InfoCard = ({ title, value, icon, isBoho, isGenz, accentColor = '#10B981' }) => {
  if (!value) return null;
  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      borderRadius: isGenz ? '20px' : '16px', 
      bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : 'white', 
      border: `1px solid ${isGenz ? `${accentColor}4D` : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
      ...(isGenz && { backdropFilter: 'blur(20px)' })
    }}>
      <Typography variant="caption" sx={{ color: isGenz ? accentColor : '#757575' }}>{icon} {title}</Typography>
      <Typography variant="body1" sx={{ 
        mt: 1, 
        fontWeight: 500,
        color: isGenz ? '#FFFFFF' : 'inherit'
      }}>{value}</Typography>
    </Paper>
  );
};

const PriorityCard = ({ title, content, isBoho, isGenz, accentColor = '#A855F7' }) => {
  if (!content) return null;
  return (
    <Paper elevation={0} sx={{ 
      p: 2.5, 
      borderRadius: isGenz ? '16px' : '12px', 
      bgcolor: isGenz ? 'rgba(15, 20, 35, 0.7)' : (isBoho ? '#FDFBF7' : '#F8FAFE'), 
      border: `1px solid ${isGenz ? `${accentColor}4D` : (isBoho ? '#E0D0C0' : '#E0E0E0')}`,
      ...(isGenz && { backdropFilter: 'blur(20px)' })
    }}>
      <Typography variant="subtitle2" sx={{ 
        fontWeight: 600, 
        mb: 1,
        color: isGenz ? accentColor : 'inherit',
        fontFamily: isGenz ? '"Space Grotesk", sans-serif' : 'inherit'
      }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: isGenz ? 'rgba(255, 255, 255, 0.7)' : '#555' }}>{content}</Typography>
    </Paper>
  );
};

export default Profile;
