import React from 'react';
import { Box, Typography } from '@mui/material';
import heroImage from '../assets/boho-hero.jpg';

const BohoVisual = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: 400, md: 550 },
        width: { xs: 350, md: 500 },
        perspective: '1000px'
      }}
    >
      {/* Background Texture Card */}
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 280, md: 380 },
          height: { xs: 340, md: 460 },
          bgcolor: '#F5E6D3',
          transform: 'rotate(-8deg) translateZ(-20px)',
          boxShadow: '10px 10px 30px rgba(0,0,0,0.1)',
          zIndex: 1,
          borderRadius: '2px',
          border: '1px solid rgba(0,0,0,0.05)',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 15,
            border: '2px dashed rgba(150, 71, 52, 0.2)',
            borderRadius: '2px'
          }
        }}
      />

      {/* Main Image Card */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: 260, md: 360 },
          height: { xs: 320, md: 440 },
          bgcolor: 'white',
          p: 2,
          pb: 8,
          transform: 'rotate(4deg)',
          boxShadow: '15px 15px 40px rgba(0,0,0,0.15)',
          zIndex: 2,
          borderRadius: '2px',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(2deg) scale(1.02)'
          }
        }}
      >
        {/* Photo */}
        <Box
          component="img"
          src={heroImage}
          alt="Cozy Coffee and Journal"
          sx={{
            width: '100%',
            height: { xs: 240, md: 340 },
            objectFit: 'cover',
            borderRadius: '2px'
          }}
        />

        {/* Handwritten Caption */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: '"Caveat", cursive',
            fontSize: { xs: '1.5rem', md: '2rem' },
            color: '#4a4a4a',
            whiteSpace: 'nowrap',
            letterSpacing: '1px'
          }}
        >
          Design Your Life ✨
        </Typography>

        {/* Washi Tape */}
        <Box
          sx={{
            position: 'absolute',
            top: -18,
            left: '50%',
            transform: 'translateX(-50%) rotate(-2deg)',
            width: 100,
            height: 35,
            bgcolor: 'rgba(183, 137, 83, 0.6)',
            opacity: 0.8,
            borderRadius: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </Box>

      {/* Decorative Dried Flower/Leaf Element */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -20,
          right: -20,
          width: 100,
          height: 100,
          zIndex: 3,
          opacity: 0.8,
          transform: 'rotate(15deg)',
          pointerEvents: 'none'
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#964734" strokeWidth="1">
          <path d="M50 100 Q50 50 80 20 M50 100 Q50 60 20 30 M50 100 Q50 70 50 10" />
          <circle cx="80" cy="20" r="3" fill="#964734" opacity="0.5"/>
          <circle cx="20" cy="30" r="3" fill="#964734" opacity="0.5"/>
          <circle cx="50" cy="10" r="3" fill="#964734" opacity="0.5"/>
        </svg>
      </Box>
    </Box>
  );
};

export default BohoVisual;
