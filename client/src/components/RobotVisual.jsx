import React from 'react';
import { Box } from '@mui/material';

const RobotVisual = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 280, md: 400 },
        height: { xs: 280, md: 400 }
      }}
    >
      {/* Robot Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(38, 191, 240, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5, transform: 'translate(-50%, -50%) scale(1)' },
            '50%': { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1.1)' }
          }
        }}
      />

      {/* Robot Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      >
        {/* Robot Head */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 140, md: 180 },
            height: { xs: 140, md: 180 },
            background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
            borderRadius: '24px',
            margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(38, 191, 240, 0.16)'
          }}
        >
          {/* Antenna */}
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 30,
              bgcolor: '#1DA8D4',
              borderRadius: '9999px',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 16,
                height: 16,
                bgcolor: '#26BFF0',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(38, 191, 240, 0.8)',
                animation: 'blink 2s ease-in-out infinite',
                '@keyframes blink': {
                  '0%, 90%, 100%': { opacity: 1 },
                  '95%': { opacity: 0.3 }
                }
              }
            }}
          />

          {/* Eyes */}
          <Box
            sx={{
              position: 'absolute',
              top: 50,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '40px'
            }}
          >
            {[0, 1].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: 'white',
                  borderRadius: '50%',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 12,
                    height: 12,
                    bgcolor: '#1A1A2E',
                    borderRadius: '50%',
                    animation: 'eyeMove 4s ease-in-out infinite',
                    '@keyframes eyeMove': {
                      '0%, 100%': { transform: 'translate(-50%, -50%)' },
                      '25%': { transform: 'translate(-40%, -50%)' },
                      '75%': { transform: 'translate(-60%, -50%)' }
                    }
                  }
                }}
              />
            ))}
          </Box>

          {/* Mouth */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 40,
              border: '4px solid white',
              borderTop: 'none',
              borderRadius: '0 0 40px 40px'
            }}
          />
        </Box>

        {/* Robot Body */}
        <Box
          sx={{
            width: { xs: 160, md: 200 },
            height: { xs: 110, md: 140 },
            background: 'linear-gradient(135deg, #1DA8D4 0%, #26BFF0 100%)',
            borderRadius: '16px',
            margin: '0 auto',
            boxShadow: '0 8px 32px rgba(38, 191, 240, 0.16)',
            position: 'relative'
          }}
        >
          {/* Chest */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 60,
              height: 60,
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              border: '3px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              animation: 'heartbeat 1.5s ease-in-out infinite',
              '@keyframes heartbeat': {
                '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
                '50%': { transform: 'translate(-50%, -50%) scale(1.1)' }
              }
            }}
          >
            ❤️
          </Box>
        </Box>

        {/* Arms */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 160, md: 200 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 200, md: 240 },
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 100,
              background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(38, 191, 240, 0.12)',
              transformOrigin: 'top center',
              animation: 'waveLeft 2s ease-in-out infinite',
              '@keyframes waveLeft': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '50%': { transform: 'rotate(-15deg)' }
              }
            }}
          />
          <Box
            sx={{
              width: 30,
              height: 100,
              background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(38, 191, 240, 0.12)',
              transformOrigin: 'top center',
              animation: 'waveRight 2s ease-in-out infinite 1s',
              '@keyframes waveRight': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '50%': { transform: 'rotate(15deg)' }
              }
            }}
          />
        </Box>
      </Box>

      {/* Floating Icons */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {['📅', '🎯', '❤️', '🧠'].map((icon, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              fontSize: { xs: '2rem', md: '3rem' },
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
              animation: `floatAround 4s ease-in-out infinite ${i}s`,
              '@keyframes floatAround': {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '25%': { transform: 'translate(10px, -10px)' },
                '50%': { transform: 'translate(-10px, -20px)' },
                '75%': { transform: 'translate(-10px, 10px)' }
              },
              ...(i === 0 && { top: '10%', left: '10%' }),
              ...(i === 1 && { top: '15%', right: '10%' }),
              ...(i === 2 && { bottom: '20%', left: '5%' }),
              ...(i === 3 && { bottom: '15%', right: '5%' })
            }}
          >
            {icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RobotVisual;
