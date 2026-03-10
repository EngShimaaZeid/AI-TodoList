import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Snackbar,
  LinearProgress
} from '@mui/material';
import {
  Person,
  Edit,
  Refresh,
  RestartAlt,
  Palette,
  WorkOutline,
  FavoriteBorder,
  EmojiEvents,
  Psychology,
  Download,
  CheckCircle,
  TrendingUp,
  LocalFireDepartment,
  Star
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isBoho, onOpenChat }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [taskHistory, setTaskHistory] = useState([]);
  const [taskStats, setTaskStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
    loadTaskHistory();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userId = localStorage.getItem('hayati_user_id');
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const data = await response.json();
      console.log('Profile data loaded:', data);
      console.log('Profile object:', data.profile);
      setUserData(data);
    } catch (error) {
      setError('Failed to load profile');
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTaskHistory = async () => {
    try {
      const userId = localStorage.getItem('hayati_user_id');
      const response = await fetch(`http://localhost:5001/api/users/${userId}/tasks/history`);
      const data = await response.json();
      setTaskHistory(data.taskHistory || []);
      setTaskStats(data.taskStats || null);
    } catch (error) {
      console.error('Error loading task history:', error);
    }
  };

  const downloadStoryPDF = () => {
    if (!userData?.storyAnswers) {
      alert('No story data available to download.');
      return;
    }

    // Create HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: ${isBoho ? "'Georgia', serif" : "'Arial', sans-serif"};
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: ${isBoho ? '#3D2914' : '#1A1A2E'};
            background: ${isBoho ? '#FFFDF8' : '#FFFFFF'};
        }
        h1 {
            color: ${isBoho ? '#8B6F47' : '#26BFF0'};
            font-size: 32px;
            margin-bottom: 10px;
            ${isBoho ? "font-family: 'Georgia', serif; font-style: italic;" : ''}
        }
        .subtitle {
            color: #757575;
            font-size: 14px;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid ${isBoho ? '#C9A577' : '#26BFF0'};
        }
        .section {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .section-title {
            color: ${isBoho ? '#964734' : '#26BFF0'};
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid ${isBoho ? '#D4C4A8' : '#E0E0E0'};
        }
        .item {
            margin: 12px 0;
            line-height: 1.8;
        }
        .label {
            font-weight: bold;
            color: ${isBoho ? '#6B4423' : '#1A1A2E'};
            display: block;
            margin-bottom: 5px;
            font-size: 13px;
        }
        .content {
            color: #444;
            padding-left: 15px;
            font-size: 15px;
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid ${isBoho ? '#C9A577' : '#26BFF0'};
            text-align: center;
            color: #999;
            font-size: 12px;
        }
        .decorative {
            text-align: center;
            font-size: 24px;
            margin: 20px 0;
            color: ${isBoho ? '#C9A577' : '#26BFF0'};
        }
    </style>
</head>
<body>
    <h1>My Life Story</h1>
    <div class="subtitle">
        ${userData.name} • ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </div>

    ${userData.profile?.age || userData.profile?.gender ? `
    <div class="section">
        <div class="section-title">📋 Basic Information</div>
        ${userData.profile?.age ? `<div class="item"><span class="label">Age</span><div class="content">${userData.profile.age}</div></div>` : ''}
        ${userData.profile?.gender ? `<div class="item"><span class="label">Gender</span><div class="content">${userData.profile.gender}</div></div>` : ''}
    </div>
    ` : ''}

    <div class="section">
        <div class="section-title">🌅 Daily Life</div>
        ${userData.storyAnswers.daily_routine ? `<div class="item"><span class="label">Daily Routine</span><div class="content">${userData.storyAnswers.daily_routine}</div></div>` : ''}
        ${userData.storyAnswers.work_type ? `<div class="item"><span class="label">Work/Study</span><div class="content">${userData.storyAnswers.work_type}</div></div>` : ''}
        ${userData.storyAnswers.commute ? `<div class="item"><span class="label">Commute</span><div class="content">${userData.storyAnswers.commute}</div></div>` : ''}
        ${userData.storyAnswers.free_time ? `<div class="item"><span class="label">Free Time</span><div class="content">${userData.storyAnswers.free_time}</div></div>` : ''}
    </div>

    <div class="section">
        <div class="section-title">⚡ Energy & Wellbeing</div>
        ${userData.storyAnswers.sleep_energy ? `<div class="item"><span class="label">Sleep & Energy</span><div class="content">${userData.storyAnswers.sleep_energy}</div></div>` : ''}
        ${userData.storyAnswers.emotional_state ? `<div class="item"><span class="label">Emotional State</span><div class="content">${userData.storyAnswers.emotional_state}</div></div>` : ''}
    </div>

    <div class="section">
        <div class="section-title">💭 Challenges & Struggles</div>
        ${userData.storyAnswers.stress_sources ? `<div class="item"><span class="label">Stress Sources</span><div class="content">${userData.storyAnswers.stress_sources}</div></div>` : ''}
        ${userData.storyAnswers.current_struggles ? `<div class="item"><span class="label">Current Struggles</span><div class="content">${userData.storyAnswers.current_struggles}</div></div>` : ''}
        ${userData.storyAnswers.heavy_feeling ? `<div class="item"><span class="label">Heavy Feelings</span><div class="content">${userData.storyAnswers.heavy_feeling}</div></div>` : ''}
    </div>

    <div class="section">
        <div class="section-title">❤️ Joy & Happiness</div>
        ${userData.storyAnswers.happiness_sources ? `<div class="item"><span class="label">What Brings Joy</span><div class="content">${userData.storyAnswers.happiness_sources}</div></div>` : ''}
        ${userData.storyAnswers.important_feeling ? `<div class="item"><span class="label">What Matters Most</span><div class="content">${userData.storyAnswers.important_feeling}</div></div>` : ''}
    </div>

    <div class="section">
        <div class="section-title">🎯 Goals & Dreams</div>
        ${userData.storyAnswers.long_term_dreams ? `<div class="item"><span class="label">Future Vision</span><div class="content">${userData.storyAnswers.long_term_dreams}</div></div>` : ''}
        ${userData.storyAnswers.urgent_feeling ? `<div class="item"><span class="label">Current Priorities</span><div class="content">${userData.storyAnswers.urgent_feeling}</div></div>` : ''}
    </div>

    ${userData.profile?.personalityModel ? `
    <div class="decorative">✦ ✦ ✦</div>
    
    <div class="section">
        <div class="section-title">🧠 Psychological Profile Analysis</div>
        ${userData.profile?.personalityModel ? `<div class="item"><span class="label">Personality Model</span><div class="content" style="white-space: pre-line;">${userData.profile.personalityModel}</div></div>` : ''}
        ${userData.profile?.emotionalBlueprint ? `<div class="item"><span class="label">Emotional Blueprint</span><div class="content" style="white-space: pre-line;">${userData.profile.emotionalBlueprint}</div></div>` : ''}
        ${userData.profile?.motivationSystem ? `<div class="item"><span class="label">Motivation System</span><div class="content" style="white-space: pre-line;">${userData.profile.motivationSystem}</div></div>` : ''}
        ${userData.profile?.identityStructure ? `<div class="item"><span class="label">Identity Structure</span><div class="content" style="white-space: pre-line;">${userData.profile.identityStructure}</div></div>` : ''}
        ${userData.profile?.behavioralTendencies ? `<div class="item"><span class="label">Behavioral Patterns</span><div class="content" style="white-space: pre-line;">${userData.profile.behavioralTendencies}</div></div>` : ''}
    </div>
    ` : ''}

    <div class="decorative">${isBoho ? '✿ ❀ ✿' : '• • •'}</div>
    
    <div class="footer">
        <strong>Created with Hayati - Your Life Companion 💙</strong><br/><br/>
        <em style="font-size: 11px; line-height: 1.6;">
        This profile is generated using AI-based personality analysis informed by established psychological research frameworks, 
        including cognitive science, behavioral psychology, and emotional intelligence models. This is not a medical diagnosis.
        </em>
    </div>
</body>
</html>
    `;

    // Convert HTML to PDF using browser print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const downloadPersonalityPDF = () => {
    if (!userData?.profile?.personalityModel) {
      alert('No personality analysis available to download. Complete "Share Your Journey" first.');
      return;
    }

    // Create HTML content for Personality Analysis PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: ${isBoho ? "'Georgia', serif" : "'Arial', sans-serif"};
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: ${isBoho ? '#3D2914' : '#1A1A2E'};
            background: ${isBoho ? '#FFFDF8' : '#FFFFFF'};
        }
        h1 {
            color: ${isBoho ? '#8B6F47' : '#26BFF0'};
            font-size: 36px;
            margin-bottom: 5px;
            ${isBoho ? "font-family: 'Georgia', serif; font-style: italic;" : ''}
        }
        .subtitle {
            color: #757575;
            font-size: 14px;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid ${isBoho ? '#C9A577' : '#26BFF0'};
        }
        .section {
            margin: 30px 0;
            page-break-inside: avoid;
        }
        .section-title {
            color: ${isBoho ? '#964734' : '#26BFF0'};
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid ${isBoho ? '#D4C4A8' : '#E0E0E0'};
        }
        .content {
            color: #444;
            line-height: 1.9;
            font-size: 15px;
            white-space: pre-line;
        }
        .decorative {
            text-align: center;
            font-size: 24px;
            margin: 30px 0;
            color: ${isBoho ? '#C9A577' : '#26BFF0'};
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid ${isBoho ? '#C9A577' : '#26BFF0'};
            text-align: center;
            color: #999;
            font-size: 12px;
        }
        .disclaimer {
            background: ${isBoho ? '#F9F7F0' : '#F8FAFE'};
            border-left: 4px solid ${isBoho ? '#C9A577' : '#26BFF0'};
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 13px;
            line-height: 1.7;
        }
    </style>
</head>
<body>
    <h1>🧠 Psychological Personality Analysis</h1>
    <div class="subtitle">
        ${userData.name} • Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </div>

    ${userData.profile?.personalityModel ? `
    <div class="section">
        <div class="section-title">🧠 Personality Model</div>
        <div class="content">${userData.profile.personalityModel}</div>
    </div>
    ` : ''}

    ${userData.profile?.emotionalBlueprint ? `
    <div class="section">
        <div class="section-title">💖 Emotional Blueprint</div>
        <div class="content">${userData.profile.emotionalBlueprint}</div>
    </div>
    ` : ''}

    ${userData.profile?.motivationSystem ? `
    <div class="section">
        <div class="section-title">🎯 Motivation System</div>
        <div class="content">${userData.profile.motivationSystem}</div>
    </div>
    ` : ''}

    ${userData.profile?.identityStructure ? `
    <div class="section">
        <div class="section-title">🌟 Identity Structure</div>
        <div class="content">${userData.profile.identityStructure}</div>
    </div>
    ` : ''}

    ${userData.profile?.behavioralTendencies ? `
    <div class="section">
        <div class="section-title">🔄 Behavioral Tendencies</div>
        <div class="content">${userData.profile.behavioralTendencies}</div>
    </div>
    ` : ''}

    ${userData.profile?.stressResponse ? `
    <div class="section">
        <div class="section-title">⚡ Stress Response Pattern</div>
        <div class="content">${userData.profile.stressResponse}</div>
    </div>
    ` : ''}

    <div class="decorative">${isBoho ? '✿ ❀ ✿' : '• • •'}</div>

    <div class="disclaimer">
        <strong>Important Disclaimer:</strong><br/><br/>
        This psychological profile is generated using AI-based personality analysis informed by established psychological research frameworks, 
        including trait psychology, attachment theory, cognitive science, behavioral psychology, and emotional intelligence models.
        <br/><br/>
        <strong>This is not a medical diagnosis, clinical assessment, or substitute for professional psychological evaluation.</strong>
        For clinical concerns, please consult a licensed mental health professional.
    </div>
    
    <div class="footer">
        <strong>Created with Hayati - Your Life Companion 💙</strong><br/>
        <em style="font-size: 11px;">AI Life Management & Personal Psychology Assistant</em>
    </div>
</body>
</html>
    `;

    // Convert HTML to PDF using browser print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const downloadEisenhowerPDF = () => {
    if (!userData?.eisenhowerAnswers) {
      alert('No Eisenhower mapping data available to download.');
      return;
    }

    // Create HTML content for Eisenhower PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: ${isBoho ? "'Georgia', serif" : "'Arial', sans-serif"};
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: ${isBoho ? '#3D2914' : '#1A1A2E'};
            background: ${isBoho ? '#FFFDF8' : '#FFFFFF'};
        }
        h1 {
            color: ${isBoho ? '#8B6F47' : '#26BFF0'};
            font-size: 32px;
            margin-bottom: 10px;
            ${isBoho ? "font-family: 'Georgia', serif; font-style: italic;" : ''}
        }
        .subtitle {
            color: #757575;
            font-size: 14px;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid ${isBoho ? '#C9A577' : '#26BFF0'};
        }
        .section {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .section-title {
            color: ${isBoho ? '#964734' : '#26BFF0'};
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid ${isBoho ? '#D4C4A8' : '#E0E0E0'};
        }
        .priority-box {
            background: ${isBoho ? '#F9F7F0' : '#F8FAFE'};
            border-left: 4px solid ${isBoho ? '#C9A577' : '#26BFF0'};
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        .priority-label {
            font-weight: bold;
            color: ${isBoho ? '#964734' : '#26BFF0'};
            margin-bottom: 8px;
        }
        .decorative {
            text-align: center;
            color: ${isBoho ? '#C9A577' : '#26BFF0'};
            margin: 30px 0;
            font-size: 20px;
        }
        .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E0E0E0;
        }
    </style>
</head>
<body>
    <h1>\ud83e\udded Your Eisenhower Priority Map</h1>
    <div class="subtitle">
        Created on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
    </div>
    
    ${userData.profile?.eisenhowerLogic ? `
    <div class="section">
        <div class="section-title">\ud83c\udfaf Your Personal Priority System</div>
        <p style="line-height: 1.8; white-space: pre-line;">${userData.profile.eisenhowerLogic}</p>
    </div>
    ` : ''}
    
    <div class="section">
        <div class="section-title">Priority Categories</div>
        
        ${userData.profile?.urgentMatters ? `
        <div class="priority-box">
            <div class="priority-label">\u26a0\ufe0f Urgent Matters</div>
            <p>${userData.profile.urgentMatters}</p>
        </div>
        ` : ''}
        
        ${userData.profile?.importantMatters ? `
        <div class="priority-box">
            <div class="priority-label">\u2b50 Important Matters</div>
            <p>${userData.profile.importantMatters}</p>
        </div>
        ` : ''}
        
        ${userData.profile?.timeDrains ? `
        <div class="priority-box">
            <div class="priority-label">\u23f0 Time Drains</div>
            <p>${userData.profile.timeDrains}</p>
        </div>
        ` : ''}
        
        ${userData.profile?.peacefulActivities ? `
        <div class="priority-box">
            <div class="priority-label">\ud83d\udd4a\ufe0f Peaceful Activities</div>
            <p>${userData.profile.peacefulActivities}</p>
        </div>
        ` : ''}
    </div>
    
    <div class="decorative">${isBoho ? '\u2727 \u273f \u2727' : '\u2022 \u2022 \u2022'}</div>
    
    <div class="footer">
        Created with Hayati - Your Life Companion \ud83d\udc99
    </div>
</body>
</html>
    `;

    // Convert HTML to PDF using browser print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const handleRerunStory = async () => {
    // Store flag to indicate story is being re-run (not first time)
    localStorage.setItem('hayati_rerun_story', 'true');
    localStorage.setItem('hayati_story_update_time', new Date().toISOString());
    
    // Store the action for ChatInterface to pick up
    localStorage.setItem('hayati_pending_action', 'story');
    
    // Navigate to home and open chat
    navigate('/');
    
    // Use setTimeout to ensure navigation completes before opening chat
    setTimeout(() => {
      if (onOpenChat) {
        onOpenChat();
      }
    }, 100);
  };

  const handleRedoEisenhower = async () => {
    // Reload user data to ensure we have latest status
    try {
      const userId = localStorage.getItem('hayati_user_id');
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const latestData = await response.json();
      
      // Check if story exists
      if (!latestData?.storyCompleted) {
        setToast({
          open: true,
          message: 'You cannot do Eisenhower mapping before sharing your journey. Please complete "Share Your Journey" first, as Eisenhower depends on it.',
          severity: 'error'
        });
        return;
      }
    } catch (error) {
      console.error('Error checking story status:', error);
      setToast({
        open: true,
        message: 'Failed to verify story status. Please try again.',
        severity: 'error'
      });
      return;
    }
    
    // Store flag to indicate Eisenhower is being re-done
    localStorage.setItem('hayati_redo_eisenhower', 'true');
    localStorage.setItem('hayati_eisenhower_update_time', new Date().toISOString());
    
    // Store the action for ChatInterface to pick up
    localStorage.setItem('hayati_pending_action', 'eisenhower');
    
    // Navigate to home and open chat
    navigate('/');
    
    // Use setTimeout to ensure navigation completes before opening chat
    setTimeout(() => {
      if (onOpenChat) {
        onOpenChat();
      }
    }, 100);
  };

  const handleResetProfile = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      '⚠️ WARNING: This will permanently delete:\n\n' +
      '• Your life story\n' +
      '• Your emotional model\n' +
      '• Your Eisenhower priority map\n' +
      '• Your task history\n' +
      '• All generated PDFs\n\n' +
      'You will need to complete the full onboarding again.\n\n' +
      'Are you absolutely sure?'
    );
    
    if (!confirmed) {
      return;
    }
    
    try {
      setLoading(true);
      const userId = localStorage.getItem('hayati_user_id');
      
      // Perform full reset
      const response = await fetch(`http://localhost:5001/api/users/${userId}/reset`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Clear local storage flags
        localStorage.removeItem('hayati_rerun_story');
        localStorage.removeItem('hayati_redo_eisenhower');
        localStorage.removeItem('hayati_story_update_time');
        localStorage.removeItem('hayati_eisenhower_update_time');
        
        // Show success toast
        setToast({
          open: true,
          message: 'Profile reset successfully. Starting fresh onboarding... 🕊️',
          severity: 'success'
        });
        
        // Redirect to home after a brief delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        throw new Error('Reset failed');
      }
    } catch (error) {
      console.error('Reset error:', error);
      setToast({
        open: true,
        message: 'Failed to reset profile. Please try again.',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: isBoho ? '#964734' : '#26BFF0' }} />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">Failed to load profile data</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isBoho ? '#F8F6F0' : '#F5F7FA',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={isBoho ? 0 : 2}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: isBoho ? '4px' : '16px',
            border: isBoho ? '1px solid #C9A577' : 'none',
            bgcolor: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Person sx={{ fontSize: '3rem', color: isBoho ? '#964734' : '#26BFF0' }} />
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
                  fontWeight: 700,
                  color: isBoho ? '#243533' : '#1A1A2E'
                }}
              >
                {userData.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isBoho ? '#4C563F' : '#757575',
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit'
                }}
              >
                {userData.email}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Pinned Onboarding Status & Personality Analysis Summary */}
        <Paper
          elevation={isBoho ? 0 : 4}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: isBoho ? '8px' : '20px',
            border: isBoho ? '3px solid #8B6F47' : '3px solid #26BFF0',
            bgcolor: isBoho ? 'linear-gradient(135deg, #FFFDF8 0%, #F9F7F0 100%)' : 'linear-gradient(135deg, #F8FAFE 0%, #E3F7FF 100%)',
            background: isBoho ? 'linear-gradient(135deg, #FFFDF8 0%, #F9F7F0 100%)' : 'linear-gradient(135deg, #F8FAFE 0%, #E3F7FF 100%)',
            boxShadow: isBoho ? '0 8px 24px rgba(139, 111, 71, 0.15)' : '0 8px 24px rgba(38, 191, 240, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: isBoho ? 'linear-gradient(90deg, #8B6F47 0%, #C9A577 50%, #8B6F47 100%)' : 'linear-gradient(90deg, #26BFF0 0%, #1EA5D4 50%, #26BFF0 100%)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: isBoho ? 'rgba(139, 111, 71, 0.15)' : 'rgba(38, 191, 240, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}
            >
              ✨
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                  fontWeight: 700,
                  color: isBoho ? '#8B6F47' : '#26BFF0',
                  mb: 0.5
                }}
              >
                Your Journey & Psychological Profile
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                Complete onboarding stages to unlock your full personality analysis
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3, borderColor: isBoho ? 'rgba(139, 111, 71, 0.2)' : 'rgba(38, 191, 240, 0.2)' }} />

          {/* Onboarding Progress */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  border: userData.storyCompleted ? (isBoho ? '2px solid #8B6F47' : '2px solid #26BFF0') : '2px dashed #ccc',
                  bgcolor: userData.storyCompleted ? (isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)') : 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: isBoho ? '#964734' : '#26BFF0' }}>
                    📖 Share Your Journey
                  </Typography>
                  <Chip
                    label={userData.storyCompleted ? (userData.profile?.storyUpdated ? 'Updated 🧩' : 'Completed ✅') : 'Not Started 🕊️'}
                    size="small"
                    color={userData.storyCompleted ? 'success' : 'default'}
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                  />
                </Box>
                {userData.profile?.storyLastUpdated && (
                  <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.7rem', display: 'block', mb: 1 }}>
                    Last modified: {new Date(userData.profile.storyLastUpdated).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                )}
                {userData.storyCompleted && (
                  <Button
                    size="small"
                    fullWidth
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={downloadStoryPDF}
                    sx={{
                      mt: 1,
                      borderColor: isBoho ? '#8B6F47' : '#26BFF0',
                      color: isBoho ? '#964734' : '#26BFF0',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: isBoho ? '#6B4423' : '#1EA5D4',
                        bgcolor: isBoho ? 'rgba(139, 111, 71, 0.05)' : 'rgba(38, 191, 240, 0.05)'
                      }
                    }}
                  >
                    Download Story
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  border: userData.eisenhowerCompleted ? (isBoho ? '2px solid #8B6F47' : '2px solid #26BFF0') : '2px dashed #ccc',
                  bgcolor: userData.eisenhowerCompleted ? (isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)') : 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: isBoho ? '#964734' : '#26BFF0' }}>
                    🧭 Eisenhower Mapping
                  </Typography>
                  <Chip
                    label={userData.eisenhowerCompleted ? (userData.profile?.eisenhowerUpdated ? 'Updated 🧩' : 'Completed ✅') : 'Not Started 🕊️'}
                    size="small"
                    color={userData.eisenhowerCompleted ? 'success' : 'default'}
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                  />
                </Box>
                {userData.profile?.eisenhowerLastUpdated && (
                  <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.7rem', display: 'block', mb: 1 }}>
                    Last modified: {new Date(userData.profile.eisenhowerLastUpdated).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                )}
                {userData.eisenhowerCompleted && (
                  <Button
                    size="small"
                    fullWidth
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={downloadEisenhowerPDF}
                    sx={{
                      mt: 1,
                      borderColor: isBoho ? '#8B6F47' : '#26BFF0',
                      color: isBoho ? '#964734' : '#26BFF0',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: isBoho ? '#6B4423' : '#1EA5D4',
                        bgcolor: isBoho ? 'rgba(139, 111, 71, 0.05)' : 'rgba(38, 191, 240, 0.05)'
                      }
                    }}
                  >
                    Download Mapping
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  border: userData.profile?.personalityModel ? (isBoho ? '2px solid #8B6F47' : '2px solid #26BFF0') : '2px dashed #ccc',
                  bgcolor: userData.profile?.personalityModel ? (isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)') : 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: isBoho ? '#964734' : '#26BFF0' }}>
                    🧠 Personality Analysis
                  </Typography>
                  <Chip
                    label={userData.profile?.personalityModel ? 'Generated ✅' : 'Pending 🕊️'}
                    size="small"
                    color={userData.profile?.personalityModel ? 'success' : 'default'}
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.7rem', display: 'block', mb: 1 }}>
                  {userData.profile?.personalityModel ? 'AI-powered psychological insights ready' : 'Complete "Share Your Journey" to unlock'}
                </Typography>
                {userData.profile?.personalityModel && (
                  <Button
                    size="small"
                    fullWidth
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={downloadPersonalityPDF}
                    sx={{
                      mt: 1,
                      borderColor: isBoho ? '#8B6F47' : '#26BFF0',
                      color: isBoho ? '#964734' : '#26BFF0',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: isBoho ? '#6B4423' : '#1EA5D4',
                        bgcolor: isBoho ? 'rgba(139, 111, 71, 0.05)' : 'rgba(38, 191, 240, 0.05)'
                      }
                    }}
                  >
                    Download Analysis
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Personality Summary (if available) */}
          {userData.profile?.personalityModel && (
            <Box
              sx={{
                mt: 2,
                p: 3,
                borderRadius: '12px',
                bgcolor: isBoho ? 'rgba(139, 111, 71, 0.05)' : 'rgba(38, 191, 240, 0.05)',
                border: isBoho ? '1px solid rgba(139, 111, 71, 0.2)' : '1px solid rgba(38, 191, 240, 0.2)'
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: isBoho ? '#964734' : '#26BFF0',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Psychology /> Quick Personality Insights
              </Typography>
              <Grid container spacing={2}>
                {userData.profile?.personalityModel && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, display: 'block', mb: 0.5 }}>
                        🧠 Personality Traits
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {userData.profile.personalityModel.split('\n')[0].substring(0, 80)}...
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {userData.profile?.emotionalBlueprint && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, display: 'block', mb: 0.5 }}>
                        💖 Emotional Style
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {userData.profile.emotionalBlueprint.split('\n')[0].substring(0, 80)}...
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {userData.profile?.motivationSystem && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, display: 'block', mb: 0.5 }}>
                        🎯 Motivation Type
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {userData.profile.motivationSystem.split('\n')[0].substring(0, 80)}...
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 2,
                  color: '#999',
                  fontStyle: 'italic',
                  fontSize: '0.7rem',
                  textAlign: 'center'
                }}
              >
                AI-generated psychological analysis • Not a medical diagnosis • Scroll down for full details
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Profile Details */}
        <Grid container spacing={3}>
          {/* Basic Info */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={isBoho ? 0 : 2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: isBoho ? '4px' : '16px',
                border: isBoho ? '1px solid #C9A577' : 'none',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                  fontWeight: 600,
                  color: isBoho ? '#964734' : '#26BFF0',
                  mb: 2
                }}
              >
                📋 Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                {userData.profile?.age && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575' }}>Age</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{userData.profile.age}</Typography>
                  </Box>
                )}
                {userData.profile?.gender && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575' }}>Gender</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{userData.profile.gender}</Typography>
                  </Box>
                )}
                {userData.profile?.workStyle && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575' }}>Work Style</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{userData.profile.workStyle}</Typography>
                  </Box>
                )}
                {userData.profile?.dailyRoutine && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575' }}>Daily Routine</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{userData.profile.dailyRoutine}</Typography>
                  </Box>
                )}
                {userData.profile?.commute && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575' }}>Commute</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{userData.profile.commute}</Typography>
                  </Box>
                )}
                {userData.profile?.freeTime && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575' }}>Free Time</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{userData.profile.freeTime}</Typography>
                  </Box>
                )}
                {!userData.profile?.age && !userData.profile?.gender && !userData.profile?.workStyle && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Complete "Share Your Journey" to populate your basic information. Click "Re-run Story" below to update your profile.
                  </Alert>
                )}
              </Stack>
            </Paper>
          </Grid>

          {/* Life Goals */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={isBoho ? 0 : 2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: isBoho ? '4px' : '16px',
                border: isBoho ? '1px solid #C9A577' : 'none',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                  fontWeight: 600,
                  color: isBoho ? '#964734' : '#26BFF0',
                  mb: 2
                }}
              >
                🎯 Life Goals
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {userData.profile?.goals ? (
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  {userData.profile.goals}
                </Typography>
              ) : (
                <Alert severity="info">
                  Your life goals will appear here after completing "Share Your Journey". Click "Re-run Story" below.
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Hobbies */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={isBoho ? 0 : 2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: isBoho ? '4px' : '16px',
                border: isBoho ? '1px solid #C9A577' : 'none',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                  fontWeight: 600,
                  color: isBoho ? '#964734' : '#26BFF0',
                  mb: 2
                }}
              >
                ❤️ Hobbies & Interests
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {userData.profile?.hobbies ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {userData.profile.hobbies.split(',').map((hobby, index) => (
                    <Chip
                      key={index}
                      label={hobby.trim()}
                      sx={{
                        bgcolor: isBoho ? 'rgba(201, 165, 119, 0.2)' : 'rgba(38, 191, 240, 0.1)',
                        color: isBoho ? '#964734' : '#26BFF0',
                        fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit'
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Alert severity="info">
                  Your hobbies and interests will appear here after completing "Share Your Journey".
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Energy & Wellbeing */}
          {(userData.profile?.energyModel || userData.profile?.emotionalModel) && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  ⚡ Energy & Wellbeing
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Stack spacing={2}>
                  {userData.profile?.energyModel && (
                    <Box>
                      <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>Energy Pattern</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                        {userData.profile.energyModel}
                      </Typography>
                    </Box>
                  )}
                  {userData.profile?.emotionalModel && (
                    <Box>
                      <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>Emotional State</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                        {userData.profile.emotionalModel}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Grid>
          )}

          {/* Struggles & Challenges */}
          {userData.profile?.struggles && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  💭 Current Challenges
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  {userData.profile.struggles.split(' | ').map((struggle, index) => (
                    <Box key={index} sx={{ mb: 1.5 }}>
                      • {struggle}
                    </Box>
                  ))}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Important Values */}
          {userData.profile?.importantValues && (
            <Grid item xs={12}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  💖 What Matters Most
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  {userData.profile.importantValues}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Eisenhower Insights */}
          {userData.profile?.eisenhowerLogic && (
            <Grid item xs={12}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  🧭 Your Priority System
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 3, whiteSpace: 'pre-line' }}>
                  {userData.profile.eisenhowerLogic}
                </Typography>
                
                <Grid container spacing={2}>
                  {userData.profile?.urgentMatters && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, bgcolor: isBoho ? 'rgba(201, 165, 119, 0.1)' : 'rgba(38, 191, 240, 0.05)', borderRadius: '8px' }}>
                        <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>⚠️ Urgent Matters</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>{userData.profile.urgentMatters}</Typography>
                      </Box>
                    </Grid>
                  )}
                  {userData.profile?.importantMatters && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, bgcolor: isBoho ? 'rgba(201, 165, 119, 0.1)' : 'rgba(38, 191, 240, 0.05)', borderRadius: '8px' }}>
                        <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>⭐ Important Matters</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>{userData.profile.importantMatters}</Typography>
                      </Box>
                    </Grid>
                  )}
                  {userData.profile?.timeDrains && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, bgcolor: isBoho ? 'rgba(201, 165, 119, 0.1)' : 'rgba(38, 191, 240, 0.05)', borderRadius: '8px' }}>
                        <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>⏰ Time Drains</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>{userData.profile.timeDrains}</Typography>
                      </Box>
                    </Grid>
                  )}
                  {userData.profile?.peacefulActivities && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, bgcolor: isBoho ? 'rgba(201, 165, 119, 0.1)' : 'rgba(38, 191, 240, 0.05)', borderRadius: '8px' }}>
                        <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>🕊️ Peaceful Activities</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>{userData.profile.peacefulActivities}</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          )}

          {/* Personality & Psychological Profile */}
          {userData.profile?.personalityModel && (
            <Grid item xs={12}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  🧠 Personality Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line', mb: 2 }}>
                  {userData.profile.personalityModel}
                </Typography>
                
                <Typography variant="caption" sx={{ color: '#757575', fontStyle: 'italic', display: 'block', mt: 2, fontSize: '0.7rem' }}>
                  Generated using AI-based personality analysis informed by established psychological research frameworks, including cognitive science, behavioral psychology, and emotional intelligence models. This is not a medical diagnosis.
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Emotional Blueprint */}
          {userData.profile?.emotionalBlueprint && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  💖 Emotional Blueprint
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {userData.profile.emotionalBlueprint}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Motivation System */}
          {userData.profile?.motivationSystem && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  🎯 Motivation System
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {userData.profile.motivationSystem}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Identity Structure & Behavioral Patterns */}
          {(userData.profile?.identityStructure || userData.profile?.behavioralTendencies) && (
            <Grid item xs={12}>
              <Paper
                elevation={isBoho ? 0 : 2}
                sx={{
                  p: 3,
                  borderRadius: isBoho ? '4px' : '16px',
                  border: isBoho ? '1px solid #C9A577' : 'none',
                  bgcolor: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                    fontWeight: 600,
                    color: isBoho ? '#964734' : '#26BFF0',
                    mb: 2
                  }}
                >
                  🌟 Identity & Behavioral Patterns
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={3}>
                  {userData.profile?.identityStructure && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isBoho ? '#964734' : '#26BFF0', mb: 1 }}>
                        Identity Structure
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                        {userData.profile.identityStructure}
                      </Typography>
                    </Grid>
                  )}
                  {userData.profile?.behavioralTendencies && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isBoho ? '#964734' : '#26BFF0', mb: 1 }}>
                        Behavioral Tendencies
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                        {userData.profile.behavioralTendencies}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* 🏆 Accomplishments Section */}
        <Paper
          elevation={isBoho ? 0 : 4}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: isBoho ? '8px' : '20px',
            border: isBoho ? '3px solid #8B6F47' : '3px solid #26BFF0',
            background: isBoho ? 'linear-gradient(135deg, #FFFDF8 0%, #F9F7F0 100%)' : 'linear-gradient(135deg, #F8FAFE 0%, #E3F7FF 100%)',
            boxShadow: isBoho ? '0 8px 24px rgba(139, 111, 71, 0.15)' : '0 8px 24px rgba(38, 191, 240, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: isBoho ? 'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)' : 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: isBoho ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 215, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}
            >
              🏆
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                  fontWeight: 700,
                  color: isBoho ? '#8B6F47' : '#26BFF0',
                  mb: 0.5
                }}
              >
                Your Accomplishments
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                Celebrate your completed tasks and track your progress
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3, borderColor: isBoho ? 'rgba(139, 111, 71, 0.2)' : 'rgba(38, 191, 240, 0.2)' }} />

          {/* Stats Cards */}
          {taskStats && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)',
                    borderRadius: '12px',
                    border: isBoho ? '1px solid rgba(139, 111, 71, 0.2)' : '1px solid rgba(38, 191, 240, 0.2)'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, color: isBoho ? '#964734' : '#26BFF0' }}>
                    {taskStats.totalCompleted || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575' }}>
                    Total Tasks
                  </Typography>
                  <CheckCircle sx={{ fontSize: 20, color: isBoho ? '#556B2F' : '#4CAF50', display: 'block', mx: 'auto', mt: 0.5 }} />
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)',
                    borderRadius: '12px',
                    border: isBoho ? '1px solid rgba(139, 111, 71, 0.2)' : '1px solid rgba(38, 191, 240, 0.2)'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, color: isBoho ? '#964734' : '#26BFF0' }}>
                    {taskStats.thisWeek || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575' }}>
                    This Week
                  </Typography>
                  <TrendingUp sx={{ fontSize: 20, color: isBoho ? '#B78953' : '#2196F3', display: 'block', mx: 'auto', mt: 0.5 }} />
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)',
                    borderRadius: '12px',
                    border: isBoho ? '1px solid rgba(139, 111, 71, 0.2)' : '1px solid rgba(38, 191, 240, 0.2)'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, color: isBoho ? '#964734' : '#26BFF0' }}>
                    {taskStats.streakDays || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575' }}>
                    Day Streak
                  </Typography>
                  <LocalFireDepartment sx={{ fontSize: 20, color: '#FF5722', display: 'block', mx: 'auto', mt: 0.5 }} />
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: isBoho ? 'rgba(139, 111, 71, 0.08)' : 'rgba(38, 191, 240, 0.08)',
                    borderRadius: '12px',
                    border: isBoho ? '1px solid rgba(139, 111, 71, 0.2)' : '1px solid rgba(38, 191, 240, 0.2)'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, color: isBoho ? '#964734' : '#26BFF0' }}>
                    {taskStats.thisMonth || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575' }}>
                    This Month
                  </Typography>
                  <Star sx={{ fontSize: 20, color: '#FFD700', display: 'block', mx: 'auto', mt: 0.5 }} />
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Category Breakdown */}
          {taskStats?.categoryBreakdown && taskStats.totalCompleted > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: isBoho ? '#964734' : '#26BFF0' }}>
                📊 Category Breakdown
              </Typography>
              <Grid container spacing={1}>
                {Object.entries(taskStats.categoryBreakdown).map(([category, count]) => {
                  const percentage = taskStats.totalCompleted > 0 ? (count / taskStats.totalCompleted) * 100 : 0;
                  const categoryEmojis = {
                    work: isBoho ? '🛖' : '💼',
                    study: isBoho ? '📜' : '📚',
                    personal: isBoho ? '⛺' : '🏠',
                    health: isBoho ? '🌿' : '🧘',
                    family: isBoho ? '🌳' : '👨‍👩‍👧'
                  };
                  return (
                    <Grid item xs={12} sm={6} key={category}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="caption" sx={{ minWidth: 80, textTransform: 'capitalize' }}>
                          {categoryEmojis[category]} {category}
                        </Typography>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: isBoho ? 'rgba(139, 111, 71, 0.1)' : 'rgba(38, 191, 240, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                bgcolor: isBoho ? '#964734' : '#26BFF0'
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ minWidth: 30, textAlign: 'right', fontWeight: 600 }}>
                          {count}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {/* Recent Accomplishments */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: isBoho ? '#964734' : '#26BFF0' }}>
              ✅ Recent Accomplishments
            </Typography>
            {taskHistory.length === 0 ? (
              <Alert 
                severity="info" 
                sx={{ 
                  bgcolor: isBoho ? 'rgba(139, 111, 71, 0.05)' : 'rgba(38, 191, 240, 0.05)',
                  border: isBoho ? '1px solid rgba(139, 111, 71, 0.2)' : '1px solid rgba(38, 191, 240, 0.2)'
                }}
              >
                No completed tasks yet. Complete tasks in your To-Do List to see them here! 🎯
              </Alert>
            ) : (
              <Stack spacing={1.5}>
                {taskHistory.slice(0, 10).map((task, index) => (
                  <Paper
                    key={task.taskId || index}
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: 'white',
                      borderRadius: '12px',
                      border: isBoho ? '1px solid #E0D0C0' : '1px solid #E0E0E0',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        boxShadow: 1
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: isBoho ? 'rgba(85, 107, 47, 0.15)' : 'rgba(76, 175, 80, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CheckCircle sx={{ color: isBoho ? '#556B2F' : '#4CAF50' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {task.title}
                      </Typography>
                      <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
                        <Chip
                          label={task.category || 'personal'}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            bgcolor: isBoho ? 'rgba(201, 165, 119, 0.2)' : 'rgba(38, 191, 240, 0.1)',
                            color: isBoho ? '#964734' : '#26BFF0',
                            textTransform: 'capitalize'
                          }}
                        />
                        <Chip
                          label={task.priority || 'medium'}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            bgcolor: task.priority === 'heavy' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                            color: task.priority === 'heavy' ? '#c62828' : '#757575',
                            textTransform: 'capitalize'
                          }}
                        />
                      </Stack>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#999', whiteSpace: 'nowrap' }}>
                      {task.completedAt ? new Date(task.completedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : ''}
                    </Typography>
                  </Paper>
                ))}
                {taskHistory.length > 10 && (
                  <Typography variant="caption" sx={{ textAlign: 'center', color: '#999', display: 'block', mt: 1 }}>
                    + {taskHistory.length - 10} more accomplishments
                  </Typography>
                )}
              </Stack>
            )}
          </Box>
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRerunStory}
            sx={{
              borderColor: isBoho ? '#C9A577' : '#26BFF0',
              color: isBoho ? '#964734' : '#26BFF0',
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              textTransform: 'none',
              '&:hover': {
                borderColor: isBoho ? '#964734' : '#1EA5D4',
                bgcolor: isBoho ? 'rgba(150, 71, 52, 0.05)' : 'rgba(38, 191, 240, 0.05)'
              }
            }}
          >
            Re-run Story
          </Button>

          <Button
            variant="outlined"
            startIcon={<Psychology />}
            onClick={handleRedoEisenhower}
            sx={{
              borderColor: isBoho ? '#C9A577' : '#26BFF0',
              color: isBoho ? '#964734' : '#26BFF0',
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              textTransform: 'none',
              '&:hover': {
                borderColor: isBoho ? '#964734' : '#1EA5D4',
                bgcolor: isBoho ? 'rgba(150, 71, 52, 0.05)' : 'rgba(38, 191, 240, 0.05)'
              }
            }}
          >
            Redo Eisenhower
          </Button>

          <Button
            variant="outlined"
            startIcon={<RestartAlt />}
            onClick={handleResetProfile}
            sx={{
              borderColor: '#d32f2f',
              color: '#d32f2f',
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#b71c1c',
                bgcolor: 'rgba(211, 47, 47, 0.05)'
              }
            }}
          >
            Reset Life Profile
          </Button>
        </Box>

        {/* Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseToast}
            severity={toast.severity}
            sx={{
              width: '100%',
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              '& .MuiAlert-icon': {
                fontSize: '1.5rem'
              }
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Profile;
