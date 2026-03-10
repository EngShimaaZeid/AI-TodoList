import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

// GenZ Cyberpunk Neon Icons
const GenzIcons = {
  // To Do List - Neon checklist with glow
  checklist: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <defs>
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#22D3EE"/>
        </linearGradient>
      </defs>
      <rect x="10" y="5" width="40" height="50" rx="6" fill="rgba(15, 10, 31, 0.8)" stroke="url(#neon-gradient)" strokeWidth="2"/>
      <path d="M18 20 L23 25 L32 16" stroke="#10B981" strokeWidth="2.5" fill="none" filter="url(#glow-cyan)" strokeLinecap="round"/>
      <line x1="37" y1="20" x2="45" y2="20" stroke="#10B981" strokeWidth="2" opacity="0.6"/>
      <rect x="18" y="30" width="5" height="5" rx="1" stroke="#22D3EE" strokeWidth="1.5" fill="none"/>
      <line x1="27" y1="32" x2="45" y2="32" stroke="#22D3EE" strokeWidth="2" opacity="0.6"/>
      <rect x="18" y="42" width="5" height="5" rx="1" stroke="#A855F7" strokeWidth="1.5" fill="none"/>
      <line x1="27" y1="44" x2="42" y2="44" stroke="#A855F7" strokeWidth="2" opacity="0.6"/>
    </svg>
  ),
  // Notes - Futuristic tablet/note
  journal: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <defs>
        <linearGradient id="note-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE"/>
          <stop offset="100%" stopColor="#10B981"/>
        </linearGradient>
      </defs>
      <rect x="8" y="5" width="44" height="50" rx="8" fill="rgba(15, 10, 31, 0.8)" stroke="url(#note-glow)" strokeWidth="2"/>
      <line x1="15" y1="18" x2="45" y2="18" stroke="#10B981" strokeWidth="1.5" opacity="0.8"/>
      <line x1="15" y1="28" x2="40" y2="28" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6"/>
      <line x1="15" y1="38" x2="35" y2="38" stroke="#A855F7" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="45" cy="45" r="6" fill="none" stroke="#10B981" strokeWidth="1.5"/>
      <path d="M43 45 L45 47 L48 43" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  // Calendar - Cyber calendar
  calendar: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <defs>
        <linearGradient id="cal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="50%" stopColor="#22D3EE"/>
          <stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
      <rect x="8" y="10" width="44" height="42" rx="6" fill="rgba(15, 10, 31, 0.8)" stroke="url(#cal-gradient)" strokeWidth="2"/>
      <rect x="8" y="10" width="44" height="12" rx="6" fill="url(#cal-gradient)" opacity="0.3"/>
      <line x1="16" y1="5" x2="16" y2="15" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
      <line x1="44" y1="5" x2="44" y2="15" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="20" cy="35" r="4" fill="#10B981" opacity="0.8"/>
      <circle cx="30" cy="35" r="4" fill="#22D3EE" opacity="0.8"/>
      <circle cx="40" cy="35" r="4" fill="#A855F7" opacity="0.8"/>
      <circle cx="25" cy="45" r="3" fill="#10B981" opacity="0.5"/>
      <circle cx="35" cy="45" r="3" fill="#22D3EE" opacity="0.5"/>
    </svg>
  ),
  // Eisenhower - Priority matrix with neon
  chart: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <defs>
        <linearGradient id="matrix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#22D3EE"/>
        </linearGradient>
      </defs>
      <rect x="5" y="5" width="50" height="50" rx="8" fill="rgba(15, 10, 31, 0.8)" stroke="url(#matrix-gradient)" strokeWidth="2"/>
      <line x1="30" y1="10" x2="30" y2="50" stroke="#10B981" strokeWidth="1.5" opacity="0.5"/>
      <line x1="10" y1="30" x2="50" y2="30" stroke="#10B981" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="20" cy="20" r="5" fill="#EF4444" opacity="0.9"/>
      <circle cx="40" cy="20" r="5" fill="#22D3EE" opacity="0.9"/>
      <circle cx="20" cy="40" r="5" fill="#A855F7" opacity="0.9"/>
      <circle cx="40" cy="40" r="5" fill="#10B981" opacity="0.9"/>
    </svg>
  )
};

// Vintage Boho Icons
const BohoIcons = {
  // To Do List (Checklist)
  checklist: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <rect x="10" y="5" width="40" height="50" rx="2" fill="#F5E6D3" stroke="#964734" strokeWidth="2"/>
      <line x1="20" y1="15" x2="40" y2="15" stroke="#C9A577" strokeWidth="2"/>
      <line x1="20" y1="25" x2="40" y2="25" stroke="#C9A577" strokeWidth="2"/>
      <line x1="20" y1="35" x2="40" y2="35" stroke="#C9A577" strokeWidth="2"/>
      <rect x="15" y="14" width="3" height="3" fill="#964734"/>
      <rect x="15" y="24" width="3" height="3" fill="#964734"/>
      <rect x="15" y="34" width="3" height="3" fill="#964734"/>
    </svg>
  ),
  // Notes (Journal)
  journal: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <rect x="10" y="5" width="40" height="50" rx="3" fill="#243533" stroke="#1a2624" strokeWidth="2"/>
      <rect x="12" y="5" width="8" height="50" fill="#1a2624"/>
      <rect x="22" y="10" width="25" height="40" fill="#F5E6D3" rx="1"/>
      <line x1="25" y1="20" x2="44" y2="20" stroke="#C9A577" strokeWidth="1"/>
      <line x1="25" y1="30" x2="44" y2="30" stroke="#C9A577" strokeWidth="1"/>
      <circle cx="35" cy="30" r="4" fill="#964734" opacity="0.5"/>
    </svg>
  ),
  // Calendar (Existing)
  calendar: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <circle cx="30" cy="30" r="8" fill="#C9A577"/>
      <g fill="#F5E6D3" stroke="#964734" strokeWidth="1.5">
        <ellipse cx="30" cy="12" rx="6" ry="10"/>
        <ellipse cx="30" cy="48" rx="6" ry="10"/>
        <ellipse cx="12" cy="30" rx="10" ry="6"/>
        <ellipse cx="48" cy="30" rx="10" ry="6"/>
        <ellipse cx="17" cy="17" rx="6" ry="8" transform="rotate(-45 17 17)"/>
        <ellipse cx="43" cy="43" rx="6" ry="8" transform="rotate(-45 43 43)"/>
        <ellipse cx="43" cy="17" rx="6" ry="8" transform="rotate(45 43 17)"/>
        <ellipse cx="17" cy="43" rx="6" ry="8" transform="rotate(45 17 43)"/>
      </g>
    </svg>
  ),
  // Eisenhower (Chart - Existing)
  chart: (
    <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
      <circle cx="30" cy="30" r="25" fill="#F5E6D3" stroke="#964734" strokeWidth="2"/>
      <circle cx="22" cy="25" r="3" fill="#964734"/>
      <circle cx="38" cy="25" r="3" fill="#964734"/>
      <path d="M20 38 Q30 48 40 38" fill="none" stroke="#964734" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
};

const features = [
  {
    icon: '📝',
    bohoIcon: BohoIcons.checklist,
    genzIcon: GenzIcons.checklist,
    title: 'To Do List',
    genzTitle: 'Task Slayer ⚡',
    description: 'A personalized task list that adapts to your daily flow and energy levels.',
    genzDescription: 'Crush your goals with a task list that hits different 💪',
    link: '/todo'
  },
  {
    icon: '📓',
    bohoIcon: BohoIcons.journal,
    genzIcon: GenzIcons.journal,
    title: 'Notes',
    genzTitle: 'Brain Dump 🧠',
    description: 'Capture your thoughts, ideas, and reflections in your own digital sanctuary.',
    genzDescription: 'Drop your thoughts, ideas & big brain moments ✨',
    link: '/notes'
  },
  {
    icon: '📅',
    bohoIcon: BohoIcons.calendar,
    genzIcon: GenzIcons.calendar,
    title: 'Calendar',
    genzTitle: 'Time Bender 🗓️',
    description: 'Your schedule, intelligently organized to balance productivity and wellbeing.',
    genzDescription: 'Master your timeline like a main character 🎬',
    link: '/calendar'
  },
  {
    icon: '📊',
    bohoIcon: BohoIcons.chart,
    genzIcon: GenzIcons.chart,
    title: 'Eisenhower Automation',
    genzTitle: 'Priority Matrix 🎯',
    description: 'Smart prioritization matrix that automatically sorts tasks by urgency and importance.',
    genzDescription: 'AI sorts your chaos so you can focus on what slaps 🔥',
    link: '/eisenhower'
  }
];

const tapeColors = [
  '#964734', // Rust (Matches "Design my ideal week" button)
  '#C9A577', // Gold (Matches "Talk to my AI Assistant" button)
  '#964734',
  '#C9A577'
];

const Features = ({ isBoho, isGenz, currentTheme }) => {
  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isGenz ? 'transparent' : (isBoho ? '#F0EFE7' : '#ffffff'),
        background: isGenz 
          ? 'linear-gradient(180deg, rgba(26, 16, 51, 0.98) 0%, rgba(15, 10, 31, 0.95) 100%)'
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
            background: 'radial-gradient(ellipse at 70% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
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
              color: isGenz ? '#FFFFFF' : (isBoho ? '#243533' : '#1A1A2E'),
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              ...(isGenz && {
                background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #22D3EE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }),
              '&::after': isBoho ? {
                content: '""',
                display: 'block',
                width: '100%',
                height: 10,
                background: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'><path d='M0 5 Q 50 10 100 5' stroke='%23B78953' fill='none' stroke-width='2'/></svg>\")",
                backgroundSize: '100% 100%',
                marginTop: '-5px'
              } : {}
            }}
          >
            {isGenz ? 'Your Productivity Suite ✨' : 'Designed for Your Whole Life'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
              color: isGenz ? 'rgba(255, 255, 255, 0.7)' : (isBoho ? '#4C563F' : '#757575'),
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            {isGenz ? 'Everything you need to slay your goals 💅' : 'Not just tasks. Your entire life, organized intelligently.'}
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Link
                to={feature.link}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    height: '100%',
                    bgcolor: isGenz 
                      ? 'rgba(10, 10, 20, 0.9)' 
                      : (isBoho ? 'rgba(240, 239, 231, 0.5)' : 'white'),
                    backdropFilter: isGenz ? 'blur(20px)' : 'none',
                    border: isGenz 
                      ? '1px solid transparent' 
                      : (isBoho 
                        ? '2px dashed rgba(183, 137, 83, 0.3)' 
                        : '2px solid transparent'),
                    borderRadius: isGenz ? '20px' : (isBoho ? '8px' : '16px'),
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    // NFT-style gradient border for GenZ
                    ...(isGenz && {
                      background: 'linear-gradient(rgba(10, 10, 20, 0.95), rgba(10, 10, 20, 0.95)) padding-box, linear-gradient(135deg, rgba(34, 211, 238, 0.6) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(168, 85, 247, 0.6) 100%) border-box',
                      border: '2px solid transparent',
                    }),
                    '&:hover': {
                      transform: isGenz ? 'translateY(-8px) scale(1.02)' : 'translateY(-4px)',
                      boxShadow: isGenz
                        ? '0 20px 60px rgba(34, 211, 238, 0.3), 0 0 40px rgba(16, 185, 129, 0.2), inset 0 0 30px rgba(34, 211, 238, 0.05)'
                        : (isBoho
                          ? '3px 5px 15px rgba(0,0,0,0.1)'
                          : '0 4px 16px rgba(38, 191, 240, 0.12)'),
                      ...(isGenz && {
                        background: 'linear-gradient(rgba(10, 10, 20, 0.9), rgba(10, 10, 20, 0.9)) padding-box, linear-gradient(135deg, rgba(34, 211, 238, 1) 0%, rgba(16, 185, 129, 0.8) 50%, rgba(236, 72, 153, 0.8) 100%) border-box',
                      }),
                      borderColor: isBoho ? '#B78953' : 'transparent'
                    },
                    '&::before': (!isBoho && !isGenz) ? {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  } : {},
                  '&:hover::before': {
                    opacity: 1
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
                      background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.8), transparent)',
                      borderRadius: '0 0 10px 10px',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)'
                    }}
                  />
                )}

                {/* GenZ Corner Accents */}
                {isGenz && (
                  <>
                    <Box sx={{ position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderTop: '2px solid rgba(34, 211, 238, 0.6)', borderLeft: '2px solid rgba(34, 211, 238, 0.6)', borderRadius: '4px 0 0 0' }} />
                    <Box sx={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderTop: '2px solid rgba(236, 72, 153, 0.6)', borderRight: '2px solid rgba(236, 72, 153, 0.6)', borderRadius: '0 4px 0 0' }} />
                    <Box sx={{ position: 'absolute', bottom: 8, left: 8, width: 20, height: 20, borderBottom: '2px solid rgba(168, 85, 247, 0.6)', borderLeft: '2px solid rgba(168, 85, 247, 0.6)', borderRadius: '0 0 0 4px' }} />
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20, borderBottom: '2px solid rgba(16, 185, 129, 0.6)', borderRight: '2px solid rgba(16, 185, 129, 0.6)', borderRadius: '0 0 4px 0' }} />
                  </>
                )}
                
                {/* Boho Tape Decoration */}
                {isBoho && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(' + (index % 2 === 0 ? '-2deg' : '1deg') + ')',
                      width: 50,
                      height: 20,
                      bgcolor: tapeColors[index % tapeColors.length],
                      borderRadius: '2px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      zIndex: 1
                    }}
                  />
                )}

                {/* GenZ Icon Container - NFT Style */}
                {isGenz && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 4,
                      px: 3,
                      background: `radial-gradient(ellipse at center, ${['rgba(34, 211, 238, 0.15)', 'rgba(16, 185, 129, 0.15)', 'rgba(168, 85, 247, 0.15)', 'rgba(236, 72, 153, 0.15)'][index % 4]} 0%, transparent 70%)`,
                      borderBottom: '1px solid rgba(34, 211, 238, 0.2)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '20%',
                        right: '20%',
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${['rgba(34, 211, 238, 0.5)', 'rgba(16, 185, 129, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(236, 72, 153, 0.5)'][index % 4]}, transparent)`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        transform: 'scale(1.3)',
                        filter: `drop-shadow(0 0 20px ${['rgba(34, 211, 238, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(236, 72, 153, 0.6)'][index % 4]})`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.4)'
                        }
                      }}
                    >
                      {feature.genzIcon}
                    </Box>
                  </Box>
                )}

                {/* Content Container */}
                <Box sx={{ p: isGenz ? 3 : 3 }}>
                  {/* Non-GenZ Icon */}
                  {!isGenz && (
                    <Box
                      sx={{
                        fontSize: '2.5rem',
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        display: 'inline-block',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)'
                        }
                      }}
                    >
                      {isBoho ? feature.bohoIcon : feature.icon}
                    </Box>
                  )}

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif'),
                      fontSize: isGenz ? '1.15rem' : (isBoho ? '1.4rem' : '1.1rem'),
                      fontWeight: 700,
                      color: isGenz ? '#FFFFFF' : (isBoho ? '#243533' : '#1A1A2E'),
                      mb: 1,
                      ...(isGenz && {
                        textShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
                      })
                    }}
                  >
                    {isGenz ? feature.genzTitle : feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontFamily: isGenz ? '"Space Grotesk", sans-serif' : (isBoho ? '"Quicksand", sans-serif' : 'inherit'),
                      color: isGenz ? 'rgba(255, 255, 255, 0.6)' : (isBoho ? '#4C563F' : '#757575'),
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                      mb: isGenz ? 2 : 0
                    }}
                  >
                    {isGenz ? feature.genzDescription : feature.description}
                  </Typography>

                  {/* GenZ NFT-style Button */}
                  {isGenz && (
                    <Box
                      sx={{
                        mt: 2,
                        py: 1,
                        px: 2,
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                        border: '1px solid rgba(34, 211, 238, 0.4)',
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.4) 0%, rgba(16, 185, 129, 0.4) 100%)',
                          boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#22D3EE',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Explore
                      </Typography>
                      <Box component="span" sx={{ color: '#22D3EE', fontSize: '0.9rem' }}>→</Box>
                    </Box>
                  )}
                </Box>
              </Paper>
              </Link>
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
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '80px' }}
          >
            <path
              fill="#964734"
              fillOpacity="0.8"
              d="M0,50 C240,120 480,20 720,80 C960,140 1200,40 1440,70 L1440,150 L0,150 Z"
            />
            <path
              fill="#964734"
              d="M0,90 C180,30 400,110 600,50 C850,10 1050,100 1250,60 C1380,40 1420,80 1440,90 L1440,150 L0,150 Z"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default Features;
