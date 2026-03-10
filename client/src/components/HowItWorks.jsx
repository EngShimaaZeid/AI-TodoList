import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

// GenZ Cyberpunk Icons
const GenzChatIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    <defs>
      <linearGradient id="chat-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="100%" stopColor="#22D3EE"/>
      </linearGradient>
      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="15" y="20" width="70" height="50" rx="12" fill="rgba(15, 10, 31, 0.8)" stroke="url(#chat-glow)" strokeWidth="2.5"/>
    <circle cx="35" cy="45" r="5" fill="#10B981" filter="url(#neon-glow)"/>
    <circle cx="50" cy="45" r="5" fill="#22D3EE" filter="url(#neon-glow)"/>
    <circle cx="65" cy="45" r="5" fill="#A855F7" filter="url(#neon-glow)"/>
    <polygon points="30,70 45,70 35,85" fill="url(#chat-glow)"/>
  </svg>
);

const GenzTargetIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    <defs>
      <linearGradient id="target-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="100%" stopColor="#22D3EE"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#target-glow)" strokeWidth="3" opacity="0.3"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="#10B981" strokeWidth="2.5" opacity="0.5"/>
    <circle cx="50" cy="50" r="20" fill="none" stroke="#22D3EE" strokeWidth="2.5" opacity="0.7"/>
    <circle cx="50" cy="50" r="10" fill="url(#target-glow)"/>
    <circle cx="50" cy="50" r="4" fill="#10B981"/>
    <line x1="50" y1="5" x2="50" y2="25" stroke="#10B981" strokeWidth="2" opacity="0.6"/>
    <line x1="50" y1="75" x2="50" y2="95" stroke="#10B981" strokeWidth="2" opacity="0.6"/>
    <line x1="5" y1="50" x2="25" y2="50" stroke="#10B981" strokeWidth="2" opacity="0.6"/>
    <line x1="75" y1="50" x2="95" y2="50" stroke="#10B981" strokeWidth="2" opacity="0.6"/>
  </svg>
);

const GenzFlowIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    <defs>
      <linearGradient id="flow-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="50%" stopColor="#22D3EE"/>
        <stop offset="100%" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
    <path d="M20 70 Q35 70 35 55 Q35 40 50 40 Q65 40 65 55 Q65 70 80 70" fill="none" stroke="url(#flow-glow)" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="20" cy="70" r="8" fill="#10B981"/>
    <circle cx="50" cy="40" r="8" fill="#22D3EE"/>
    <circle cx="80" cy="70" r="8" fill="#A855F7"/>
    <path d="M15 25 L25 25 L20 35 Z" fill="#10B981" opacity="0.6"/>
    <path d="M75 20 L85 20 L80 30 Z" fill="#22D3EE" opacity="0.6"/>
  </svg>
);

const GenzAIIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    <defs>
      <linearGradient id="ai-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="50%" stopColor="#22D3EE"/>
        <stop offset="100%" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="35" fill="rgba(15, 10, 31, 0.8)" stroke="url(#ai-glow)" strokeWidth="3"/>
    <circle cx="50" cy="50" r="25" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="40" r="6" fill="#10B981"/>
    <path d="M38 55 Q50 70 62 55" fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="35" cy="35" r="3" fill="#22D3EE" opacity="0.8"/>
    <circle cx="65" cy="35" r="3" fill="#10B981" opacity="0.8"/>
    <circle cx="30" cy="55" r="2" fill="#A855F7" opacity="0.6"/>
    <circle cx="70" cy="55" r="2" fill="#A855F7" opacity="0.6"/>
  </svg>
);

// Vintage Boho Icons with real colors including green (#243533)
const BohoJournalIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    {/* Book cover */}
    <rect x="15" y="10" width="70" height="80" rx="3" fill="#243533" stroke="#1a2624" strokeWidth="2"/>
    {/* Spine decoration */}
    <rect x="15" y="10" width="12" height="80" fill="#1a2624"/>
    <line x1="21" y1="15" x2="21" y2="85" stroke="#B78953" strokeWidth="1.5"/>
    {/* Pages */}
    <rect x="30" y="15" width="50" height="70" fill="#F5E6D3" rx="1"/>
    {/* Writing lines */}
    <line x1="35" y1="28" x2="72" y2="28" stroke="#C9A577" strokeWidth="1"/>
    <line x1="35" y1="38" x2="72" y2="38" stroke="#C9A577" strokeWidth="1"/>
    <line x1="35" y1="48" x2="72" y2="48" stroke="#C9A577" strokeWidth="1"/>
    <line x1="35" y1="58" x2="72" y2="58" stroke="#C9A577" strokeWidth="1"/>
    {/* Heart bookmark */}
    <path d="M55 12 L55 30 L60 25 L65 30 L65 12" fill="#964734"/>
    {/* Decorative flower on cover */}
    <circle cx="50" cy="50" r="8" fill="#B78953" opacity="0.3"/>
    <circle cx="50" cy="50" r="4" fill="#964734" opacity="0.5"/>
  </svg>
);

const BohoCompassIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    {/* Outer ring */}
    <circle cx="50" cy="50" r="40" fill="#F5E6D3" stroke="#243533" strokeWidth="4"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="#B78953" strokeWidth="2"/>
    {/* Direction markers */}
    <text x="50" y="22" textAnchor="middle" fill="#243533" fontSize="10" fontWeight="bold">N</text>
    <text x="50" y="85" textAnchor="middle" fill="#243533" fontSize="10" fontWeight="bold">S</text>
    <text x="15" y="54" textAnchor="middle" fill="#243533" fontSize="10" fontWeight="bold">W</text>
    <text x="85" y="54" textAnchor="middle" fill="#243533" fontSize="10" fontWeight="bold">E</text>
    {/* Compass needle */}
    <polygon points="50,20 45,50 50,55 55,50" fill="#964734"/>
    <polygon points="50,80 45,50 50,45 55,50" fill="#243533"/>
    {/* Center */}
    <circle cx="50" cy="50" r="6" fill="#B78953" stroke="#243533" strokeWidth="2"/>
    <circle cx="50" cy="50" r="2" fill="#243533"/>
    {/* Decorative dots */}
    <circle cx="50" cy="26" r="2" fill="#964734"/>
    <circle cx="50" cy="74" r="2" fill="#243533"/>
    <circle cx="26" cy="50" r="2" fill="#B78953"/>
    <circle cx="74" cy="50" r="2" fill="#B78953"/>
  </svg>
);

const BohoTeapotIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    {/* Teapot body */}
    <ellipse cx="45" cy="60" rx="30" ry="25" fill="#243533" stroke="#1a2624" strokeWidth="2"/>
    {/* Lid */}
    <ellipse cx="45" cy="38" rx="18" ry="6" fill="#243533" stroke="#1a2624" strokeWidth="2"/>
    <ellipse cx="45" cy="32" rx="6" ry="4" fill="#B78953"/>
    {/* Spout */}
    <path d="M75 55 Q90 50 88 40 Q86 32 80 35" fill="none" stroke="#243533" strokeWidth="6" strokeLinecap="round"/>
    <path d="M75 55 Q90 50 88 40 Q86 32 80 35" fill="none" stroke="#B78953" strokeWidth="2" strokeLinecap="round"/>
    {/* Handle */}
    <path d="M15 45 Q0 50 0 60 Q0 75 15 75" fill="none" stroke="#243533" strokeWidth="6" strokeLinecap="round"/>
    <path d="M15 45 Q0 50 0 60 Q0 75 15 75" fill="none" stroke="#B78953" strokeWidth="2" strokeLinecap="round"/>
    {/* Decorative pattern */}
    <ellipse cx="45" cy="60" rx="15" ry="12" fill="none" stroke="#B78953" strokeWidth="1.5" strokeDasharray="4,3"/>
    <circle cx="45" cy="60" r="5" fill="#964734"/>
    {/* Steam */}
    <path d="M40 25 Q38 15 42 8" fill="none" stroke="#B78953" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    <path d="M50 25 Q52 12 48 5" fill="none" stroke="#B78953" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
  </svg>
);

const BohoLanternIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }}>
    {/* Hook */}
    <path d="M50 5 Q60 5 60 12 L60 18" fill="none" stroke="#243533" strokeWidth="3" strokeLinecap="round"/>
    {/* Top cap */}
    <path d="M35 18 L65 18 L62 25 L38 25 Z" fill="#243533"/>
    {/* Lantern body */}
    <path d="M38 25 L35 75 Q35 82 50 82 Q65 82 65 75 L62 25 Z" fill="#F5E6D3" stroke="#243533" strokeWidth="2"/>
    {/* Glass panels */}
    <rect x="40" y="30" width="20" height="45" fill="#B78953" opacity="0.3" rx="2"/>
    {/* Frame lines */}
    <line x1="38" y1="40" x2="62" y2="40" stroke="#243533" strokeWidth="1.5"/>
    <line x1="38" y1="55" x2="62" y2="55" stroke="#243533" strokeWidth="1.5"/>
    <line x1="50" y1="25" x2="50" y2="75" stroke="#243533" strokeWidth="1.5"/>
    {/* Flame */}
    <ellipse cx="50" cy="52" rx="6" ry="10" fill="#964734"/>
    <ellipse cx="50" cy="50" rx="3" ry="6" fill="#C9A577"/>
    {/* Bottom */}
    <ellipse cx="50" cy="82" rx="12" ry="4" fill="#243533"/>
    {/* Glow effect */}
    <circle cx="50" cy="52" r="15" fill="#964734" opacity="0.15"/>
  </svg>
);

const steps = [
  {
    number: '01',
    title: 'Share Your Story',
    genzTitle: 'Spill the Tea ☕',
    description: 'Tell us about your work, sleep, energy, and daily routine',
    genzDescription: 'Tell us about your vibe, energy levels & daily chaos',
    modernIcon: '📝',
    bohoIcon: <BohoJournalIcon />,
    genzIcon: <GenzChatIcon />,
    bohoColor: '#243533'
  },
  {
    number: '02',
    title: 'Find Direction',
    genzTitle: 'Lock In Goals 🎯',
    description: 'Define your goals across all areas of life',
    genzDescription: 'Set your targets and watch the magic happen',
    modernIcon: '🎯',
    bohoIcon: <BohoCompassIcon />,
    genzIcon: <GenzTargetIcon />,
    bohoColor: '#243533'
  },
  {
    number: '03',
    title: 'Nurture Daily',
    genzTitle: 'Stay in Flow 🌊',
    description: 'Add your daily tasks and life happens',
    genzDescription: 'Drop your tasks, we handle the rest fr fr',
    modernIcon: '📅',
    bohoIcon: <BohoTeapotIcon />,
    genzIcon: <GenzFlowIcon />,
    bohoColor: '#243533'
  },
  {
    number: '04',
    title: 'Light Your Path',
    genzTitle: 'AI Does Its Thing 🤖',
    description: 'Hayati creates your perfect life plan',
    genzDescription: 'Watch AI cook up your perfect schedule no cap',
    modernIcon: '🤖',
    bohoIcon: <BohoLanternIcon />,
    genzIcon: <GenzAIIcon />,
    bohoColor: '#243533'
  }
];

const tapeColors = [
  '#964734', // Rust (Matches "Design my ideal week" button)
  '#C9A577', // Gold (Matches "Talk to my AI Assistant" button)
  '#964734',
  '#C9A577'
];

const HowItWorks = ({ isBoho, isGenz, currentTheme }) => {
  return (
      <Box
      id="how-it-works"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isGenz ? 'transparent' : (isBoho ? '#243533' : '#F5F7FA'),
        background: isGenz 
          ? 'linear-gradient(180deg, rgba(15, 10, 31, 0.95) 0%, rgba(26, 16, 51, 0.98) 100%)'
          : 'none',
        backgroundImage: 'none',
        position: 'relative'
      }}
    >
      {/* GenZ decorative elements */}
      {isGenz && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}
        />
      )}
      
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 800,
              color: isGenz ? '#FFFFFF' : (isBoho ? '#F5E6D3' : '#1A1A2E'),
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              ...(isGenz && {
                background: 'linear-gradient(135deg, #10B981 0%, #22D3EE 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              })
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              color: isGenz ? 'rgba(255, 255, 255, 0.7)' : (isBoho ? '#B78953' : '#757575'),
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            {isGenz ? 'Four easy steps to level up your life ✨' : 'Four simple steps to transform your life'}
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={step.number}>
              <Paper
                elevation={isBoho ? 0 : (isGenz ? 0 : 1)}
                sx={{
                  p: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: isGenz 
                    ? 'rgba(10, 10, 20, 0.9)' 
                    : (isBoho ? 'rgba(255,255,255,0.9)' : 'white'),
                  backdropFilter: isGenz ? 'blur(20px)' : 'none',
                  // NFT-style gradient border for GenZ
                  ...(isGenz && {
                    background: 'linear-gradient(rgba(10, 10, 20, 0.95), rgba(10, 10, 20, 0.95)) padding-box, linear-gradient(135deg, rgba(236, 72, 153, 0.6) 0%, rgba(168, 85, 247, 0.5) 50%, rgba(34, 211, 238, 0.6) 100%) border-box',
                    border: '2px solid transparent',
                  }),
                  ...(!isGenz && {
                    border: isBoho ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  }),
                  borderRadius: isGenz ? '20px' : (isBoho ? '4px' : '16px'),
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isBoho ? `rotate(${(index % 2 === 0 ? -1 : 1) * (Math.random() + 0.5)}deg)` : 'none',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: isBoho 
                      ? 'rotate(0deg) translateY(-4px)' 
                      : 'translateY(-8px) scale(1.02)',
                    boxShadow: isGenz 
                      ? '0 20px 60px rgba(236, 72, 153, 0.3), 0 0 40px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(236, 72, 153, 0.05)'
                      : (isBoho
                        ? '5px 10px 25px rgba(0,0,0,0.12)'
                        : '0 8px 32px rgba(38, 191, 240, 0.16)'),
                    ...(isGenz && {
                      background: 'linear-gradient(rgba(10, 10, 20, 0.9), rgba(10, 10, 20, 0.9)) padding-box, linear-gradient(135deg, rgba(236, 72, 153, 1) 0%, rgba(168, 85, 247, 0.8) 50%, rgba(34, 211, 238, 1) 100%) border-box',
                    })
                  },
                  '&::before': (!isBoho && !isGenz) ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 4,
                    background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease'
                  } : {},
                  '&:hover::before': {
                    transform: (!isBoho && !isGenz) ? 'scaleX(1)' : 'none'
                  }
                }}
              >
                {/* GenZ Top Glow Bar */}
                {isGenz && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: '10%',
                      right: '10%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.8), transparent)',
                      borderRadius: '0 0 10px 10px',
                      boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)'
                    }}
                  />
                )}

                {/* GenZ Corner Accents */}
                {isGenz && (
                  <>
                    <Box sx={{ position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderTop: '2px solid rgba(236, 72, 153, 0.6)', borderLeft: '2px solid rgba(236, 72, 153, 0.6)', borderRadius: '4px 0 0 0' }} />
                    <Box sx={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderTop: '2px solid rgba(34, 211, 238, 0.6)', borderRight: '2px solid rgba(34, 211, 238, 0.6)', borderRadius: '0 4px 0 0' }} />
                    <Box sx={{ position: 'absolute', bottom: 8, left: 8, width: 20, height: 20, borderBottom: '2px solid rgba(16, 185, 129, 0.6)', borderLeft: '2px solid rgba(16, 185, 129, 0.6)', borderRadius: '0 0 0 4px' }} />
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20, borderBottom: '2px solid rgba(168, 85, 247, 0.6)', borderRight: '2px solid rgba(168, 85, 247, 0.6)', borderRadius: '0 0 4px 0' }} />
                  </>
                )}
                
                {/* Boho Tape Decoration */}
                {isBoho && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-3deg)',
                      width: 60,
                      height: 25,
                      bgcolor: tapeColors[index % tapeColors.length],
                      borderRadius: '2px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                )}

                {/* Step Number - Top Right */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: isBoho ? 20 : 16,
                    right: 16,
                    fontSize: '3rem',
                    fontWeight: 800,
                    fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
                    color: isGenz 
                      ? 'rgba(236, 72, 153, 0.2)' 
                      : (isBoho ? 'rgba(150, 71, 52, 0.15)' : 'rgba(38, 191, 240, 0.1)'),
                    zIndex: 1
                  }}
                >
                  {step.number}
                </Typography>

                {/* GenZ Icon Container - NFT Style */}
                {isGenz && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 4,
                      px: 3,
                      width: '100%',
                      background: `radial-gradient(ellipse at center, ${['rgba(236, 72, 153, 0.15)', 'rgba(168, 85, 247, 0.15)', 'rgba(34, 211, 238, 0.15)', 'rgba(16, 185, 129, 0.15)'][index % 4]} 0%, transparent 70%)`,
                      borderBottom: '1px solid rgba(236, 72, 153, 0.2)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '20%',
                        right: '20%',
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${['rgba(236, 72, 153, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(34, 211, 238, 0.5)', 'rgba(16, 185, 129, 0.5)'][index % 4]}, transparent)`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        transform: 'scale(1.1)',
                        filter: `drop-shadow(0 0 20px ${['rgba(236, 72, 153, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(34, 211, 238, 0.6)', 'rgba(16, 185, 129, 0.6)'][index % 4]})`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.2)'
                        }
                      }}
                    >
                      {step.genzIcon}
                    </Box>
                  </Box>
                )}

                {/* Non-GenZ Icon */}
                {!isGenz && (
                  <Box
                    sx={{
                      fontSize: '3rem',
                      mb: 2,
                      mt: 4,
                      color: isBoho ? '#964734' : 'inherit'
                    }}
                  >
                    {isBoho ? step.bohoIcon : step.modernIcon}
                  </Box>
                )}

                {/* Content Container */}
                <Box sx={{ p: isGenz ? 3 : 4, pt: isGenz ? 2 : 0 }}>
                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif'),
                      fontSize: isGenz ? '1.2rem' : (isBoho ? '1.6rem' : '1.25rem'),
                      fontWeight: 700,
                      color: isGenz ? '#FFFFFF' : (isBoho ? '#243533' : '#1A1A2E'),
                      mb: 1,
                      ...(isGenz && {
                        textShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
                      })
                    }}
                  >
                    {isGenz ? step.genzTitle : step.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                      color: isGenz ? 'rgba(255, 255, 255, 0.6)' : (isBoho ? '#4C563F' : '#757575'),
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      mb: isGenz ? 2 : 0
                    }}
                  >
                    {isGenz ? step.genzDescription : step.description}
                  </Typography>

                  {/* GenZ Step Indicator */}
                  {isGenz && (
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5
                      }}
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            width: i === index ? 24 : 8,
                            height: 4,
                            borderRadius: '2px',
                            background: i === index 
                              ? 'linear-gradient(90deg, #EC4899, #22D3EE)' 
                              : 'rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
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
            style={{ width: '100%', height: '60px', display: 'block' }}
          >
            <path
              fill="#F0EFE7"
              d="M0,40 C180,100 360,10 540,70 C720,130 900,30 1080,90 C1260,130 1350,50 1440,40 L1440,120 L0,120 Z"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default HowItWorks;
