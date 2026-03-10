import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CTA from '../components/CTA';

const Home = ({ isBoho, isGenz, currentTheme, onOpenChat, isAuthenticated }) => {
  return (
    <>
      <Hero isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} onOpenChat={onOpenChat} isAuthenticated={isAuthenticated} />
      
      {/* Curved transition */}
      {isBoho && (
        <Box
          sx={{
            height: '100px',
            overflow: 'hidden',
            bgcolor: '#F0EFE7',
            position: 'relative',
            marginTop: '-1px',
            zIndex: 2
          }}
        >
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path
              d="M0,50 C480,100 960,0 1440,50 L1440,100 L0,100 Z"
              fill="#243533"
            />
          </svg>
        </Box>
      )}

      <HowItWorks isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} />
      <Features isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} />
      <CTA isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} onOpenChat={onOpenChat} />
    </>
  );
};

export default Home;
