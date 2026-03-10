import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RobotVisual from './RobotVisual';
import BohoVisual from './BohoVisual';

const Hero = ({ isBoho, isGenz, currentTheme, onOpenChat, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLetsStart = async () => {
    // For guests or logged-in users, navigate to todo list directly
    navigate('/todo');
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 10 },
        overflow: 'hidden',
        bgcolor: isGenz ? 'transparent' : (isBoho ? '#F0EFE7' : '#ffffff'),
        background: isGenz 
          ? 'linear-gradient(135deg, #0F0A1F 0%, #1A1033 50%, #0D1B2A 100%)'
          : 'none',
        backgroundImage: 'none'
      }}
    >
      {/* GenZ Background Elements */}
      {isGenz && (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}
          />
          {/* Floating stars */}
          {[...Array(12)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                borderRadius: '50%',
                bgcolor: ['#A855F7', '#EC4899', '#22D3EE'][i % 3],
                boxShadow: `0 0 ${6 + Math.random() * 10}px ${['#A855F7', '#EC4899', '#22D3EE'][i % 3]}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                '@keyframes twinkle': {
                  '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' }
                }
              }}
            />
          ))}
        </>
      )}
      
      {/* Boho Background Elements */}
      {isBoho && (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(183, 137, 83, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />
          {/* Floating dust particles */}
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 4 + Math.random() * 4,
                height: 4 + Math.random() * 4,
                borderRadius: '50%',
                bgcolor: 'rgba(183, 137, 83, 0.3)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatDust ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                '@keyframes floatDust': {
                  '0%, 100%': { transform: 'translate(0, 0)', opacity: 0.3 },
                  '50%': { transform: 'translate(10px, -20px)', opacity: 0.7 }
                }
              }}
            />
          ))}
        </>
      )}

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Hero Text */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: 'fadeInUp 1s ease-out',
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(30px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
                  lineHeight: 1.1,
                  mb: 2,
                  transform: isBoho ? 'rotate(-2deg)' : 'none',
                  color: isGenz ? '#FFFFFF' : (isBoho ? '#243533' : '#1A1A2E')
                }}
              >
                Let AI Run Your To-Do List
                <br />
                <Box
                  component="span"
                  sx={{
                    background: isGenz 
                      ? 'linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #22D3EE 100%)'
                      : (isBoho ? 'none' : 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)'),
                    WebkitBackgroundClip: (isBoho && !isGenz) ? 'unset' : 'text',
                    WebkitTextFillColor: (isBoho && !isGenz) ? '#964734' : 'transparent',
                    backgroundClip: (isBoho && !isGenz) ? 'unset' : 'text'
                  }}
                >
                  While You Run Your Life
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: isGenz ? 'rgba(255, 255, 255, 0.8)' : (isBoho ? '#4C563F' : '#757575'),
                  fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                {isGenz 
                  ? "Your vibe, your goals, your AI bestie. Let's make productivity aesthetic ✨"
                  : (isBoho
                    ? "A cozy, nostalgic way to organize your life. Like journaling, but smarter."
                    : "Hayati turns your goals, routines, and daily chaos into a smart life plan.")}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {isGenz ? (
                  // GenZ Vibrant Buttons
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleLetsStart}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: '12px',
                        textTransform: 'none',
background: 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #059669 0%, #9333EA 50%, #DB2777 100%)',
                          boxShadow: '0 6px 30px rgba(168, 85, 247, 0.6)',
                          transform: 'translateY(-3px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Let's Goooo 🚀
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={onOpenChat}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: '12px',
                        textTransform: 'none',
                        borderColor: 'rgba(16, 185, 129, 0.5)',
                        borderWidth: 2,
                        color: '#FFFFFF',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                          borderColor: '#10B981',
                          borderWidth: 2,
                          background: 'rgba(16, 185, 129, 0.2)',
                          transform: 'translateY(-3px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Chat with AI ✨
                    </Button>
                  </>
                ) : isBoho ? (
                  // Boho Vintage Buttons
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleLetsStart}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.3rem',
                        fontFamily: '"Caveat", cursive',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        borderRadius: '4px',
                        textTransform: 'none',
                        bgcolor: '#964734',
                        color: 'white',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                          bgcolor: '#7a3a2b',
                          boxShadow: 'none',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.2s ease',
                        '&::after': {
                          content: '"→"',
                          marginLeft: '8px',
                          fontSize: '1.4rem'
                        }
                      }}
                    >
                      Let's Start
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={onOpenChat}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.3rem',
                        fontFamily: '"Caveat", cursive',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        borderRadius: '4px',
                        textTransform: 'none',
                        bgcolor: '#C9A577',
                        color: '#3D2914',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                          bgcolor: '#b8956a',
                          boxShadow: 'none',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.2s ease',
                        '&::after': {
                          content: '"🕐"',
                          marginLeft: '8px',
                          fontSize: '1.1rem'
                        }
                      }}
                    >
                      Talk to my AI Assistant
                    </Button>
                  </>
                ) : (
                  // Modern Buttons
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={handleLetsStart}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '9999px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
                        boxShadow: '0 4px 16px rgba(38, 191, 240, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 32px rgba(38, 191, 240, 0.4)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Let's Start
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ChatBubbleOutlineIcon />}
                      onClick={onOpenChat}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '9999px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderColor: '#26BFF0',
                        borderWidth: 2,
                        color: '#26BFF0',
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: '#26BFF0',
                          bgcolor: 'rgba(38, 191, 240, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Talk to My AI Assistant
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </Grid>

          {/* Hero Visual */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'fadeIn 1s ease-out 0.3s both',
                '@keyframes fadeIn': {
                  from: { opacity: 0 },
                  to: { opacity: 1 }
                }
              }}
            >
              {isGenz ? (
                // GenZ Visual - Cosmic/Neon style
                <Box
                  sx={{
                    width: 350,
                    height: 350,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Glowing orb */}
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #22D3EE 100%)',
                      boxShadow: '0 0 60px rgba(168, 85, 247, 0.6), 0 0 100px rgba(236, 72, 153, 0.4)',
                      animation: 'pulse 3s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)' },
                        '50%': { transform: 'scale(1.05)', boxShadow: '0 0 80px rgba(168, 85, 247, 0.8)' }
                      }
                    }}
                  />
                  {/* Orbiting elements */}
                  {[0, 1, 2].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        background: ['#A855F7', '#EC4899', '#10B981'][i],
                        boxShadow: `0 0 20px ${['#A855F7', '#EC4899', '#10B981'][i]}`,
                        animation: `orbit${i} ${4 + i}s linear infinite`,
                        [`@keyframes orbit${i}`]: {
                          '0%': { transform: `rotate(${i * 120}deg) translateX(130px) rotate(-${i * 120}deg)` },
                          '100%': { transform: `rotate(${i * 120 + 360}deg) translateX(130px) rotate(-${i * 120 + 360}deg)` }
                        }
                      }}
                    />
                  ))}
                  {/* Center icon */}
                  <Box
                    sx={{
                      position: 'absolute',
                      fontSize: '4rem',
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-10px)' }
                      }
                    }}
                  >
                    🚀
                  </Box>
                </Box>
              ) : isBoho ? <BohoVisual /> : <RobotVisual />}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Wave Transition (Boho only) */}
      {isBoho && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            lineHeight: 0
          }}
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '80px' }}
          >
            <path
              fill="#F0EFE7"
              d="M0,60 C150,120 350,0 500,60 C650,120 800,20 1000,80 C1150,120 1300,40 1440,60 L1440,120 L0,120 Z"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
