import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CTA = ({ isBoho, isGenz, currentTheme, onOpenChat }) => {
  return (
    <Box
      id="cta"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: isGenz ? 'transparent' : (isBoho ? '#A3472A' : 'transparent'),
        background: isGenz 
          ? 'linear-gradient(180deg, rgba(15, 10, 31, 0.95) 0%, rgba(26, 16, 51, 1) 100%)'
          : 'none',
        backgroundImage: 'none'
      }}
    >
      {/* Gradient Background (Modern) */}
      {!isBoho && !isGenz && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(38, 191, 240, 0.1) 0%, rgba(77, 203, 243, 0.1) 100%)',
            zIndex: -1
          }}
        />
      )}

      {/* GenZ Decorative Elements */}
      {isGenz && (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 60%)',
              pointerEvents: 'none'
            }}
          />
          {/* Floating emojis */}
          {['🚀', '✨', '💫', '🔥', '💜'].map((emoji, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                fontSize: '2rem',
                opacity: 0.8,
                animation: `floatGenz ${3 + i * 0.5}s ease-in-out infinite`,
                '@keyframes floatGenz': {
                  '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                  '50%': { transform: 'translateY(-20px) rotate(10deg)' }
                },
                ...(i === 0 && { top: '20%', left: '10%' }),
                ...(i === 1 && { top: '30%', right: '15%' }),
                ...(i === 2 && { bottom: '25%', left: '20%' }),
                ...(i === 3 && { top: '15%', right: '25%' }),
                ...(i === 4 && { bottom: '30%', right: '10%' })
              }}
            >
              {emoji}
            </Box>
          ))}
        </>
      )}

      {/* Boho Decorative Elements */}
      {isBoho && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: '5%',
              width: 100,
              height: 100,
              border: '3px dashed rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              transform: 'rotate(15deg)'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '15%',
              right: '8%',
              width: 80,
              height: 80,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              transform: 'rotate(-10deg)'
            }}
          />
          {/* Floating stickers */}
          {['✨', '🌟', '💫'].map((emoji, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                fontSize: '2rem',
                opacity: 0.9,
                animation: `float ${3 + i}s ease-in-out infinite`,
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-20px)' }
                },
                ...(i === 0 && { top: '30%', left: '15%' }),
                ...(i === 1 && { top: '20%', right: '20%' }),
                ...(i === 2 && { bottom: '30%', left: '25%' })
              }}
            >
              {emoji}
            </Box>
          ))}
        </>
      )}

      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 800,
              color: isGenz ? '#FFFFFF' : (isBoho ? '#F0EFE7' : '#1A1A2E'),
              mb: 2,
              lineHeight: 1.2,
              transform: isBoho ? 'rotate(-1deg)' : 'none',
              ...(isGenz && {
                background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #22D3EE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              })
            }}
          >
            {isGenz ? 'Ready to Level Up? 🚀' : 'Let AI Run Your To-Do List'}
            <br />
            {isGenz ? 'Let\'s Make It Happen' : 'While You Run Your Life'}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              color: isGenz ? 'rgba(255, 255, 255, 0.7)' : (isBoho ? '#E6D2B5' : '#757575'),
              fontSize: { xs: '1rem', md: '1.25rem' },
              mb: 5
            }}
          >
            {isGenz 
              ? 'Join the vibe tribe and slay your goals ✨' 
              : 'Join thousands who\'ve reclaimed their time and energy'}
          </Typography>

          {isGenz ? (
            // GenZ Vibrant Buttons
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={onOpenChat}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: '16px',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)',
                  boxShadow: '0 4px 30px rgba(168, 85, 247, 0.5)',
                  animation: 'glowPulse 2s ease-in-out infinite',
                  '@keyframes glowPulse': {
                    '0%, 100%': { boxShadow: '0 4px 30px rgba(168, 85, 247, 0.5)' },
                    '50%': { boxShadow: '0 8px 50px rgba(236, 72, 153, 0.6)' }
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #9333EA 50%, #DB2777 100%)',
                    transform: 'translateY(-3px) scale(1.02)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Let's Goooo 🔥
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={onOpenChat}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: '16px',
                  textTransform: 'none',
                  borderColor: 'rgba(168, 85, 247, 0.5)',
                  borderWidth: 2,
                  color: '#FFFFFF',
                  background: 'rgba(168, 85, 247, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    borderColor: '#EC4899',
                    borderWidth: 2,
                    background: 'rgba(236, 72, 153, 0.2)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Chat with AI ✨
              </Button>
            </Box>
          ) : isBoho ? (
            // Boho Vintage Buttons
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={onOpenChat}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.4rem',
                  fontFamily: '"Caveat", cursive',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  textTransform: 'none',
                  bgcolor: '#F0EFE7',
                  color: '#964734',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#e0ded5',
                    boxShadow: 'none',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease',
                  '&::after': {
                    content: '"→"',
                    marginLeft: '8px',
                    fontSize: '1.5rem'
                  }
                }}
              >
                Design my ideal week
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={onOpenChat}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.4rem',
                  fontFamily: '"Caveat", cursive',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  textTransform: 'none',
                  bgcolor: '#C9A577',
                  color: '#3D2914',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#b8956a',
                    boxShadow: 'none',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease',
                  '&::after': {
                    content: '"🕐"',
                    marginLeft: '8px',
                    fontSize: '1.2rem'
                  }
                }}
              >
                Talk to my AI Assistant
              </Button>
            </Box>
          ) : (
            // Modern Button
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={onOpenChat}
              sx={{
                px: 5,
                py: 2,
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
                boxShadow: '0 4px 20px rgba(38, 191, 240, 0.4)',
                animation: 'glow 2s ease-in-out infinite',
                '@keyframes glow': {
                  '0%, 100%': { 
                    boxShadow: '0 4px 20px rgba(38, 191, 240, 0.4)' 
                  },
                  '50%': { 
                    boxShadow: '0 0 40px rgba(38, 191, 240, 0.6)' 
                  }
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 40px rgba(38, 191, 240, 0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start My Smart Life
            </Button>
          )}
        </Box>
      </Container>

      {/* Wave Transition to Footer (Boho only) */}
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
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '50px' }}
          >
            <path
              fill="#243533"
              d="M0,30 C300,90 600,10 900,50 C1200,90 1350,30 1440,40 L1440,100 L0,100 Z"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default CTA;
