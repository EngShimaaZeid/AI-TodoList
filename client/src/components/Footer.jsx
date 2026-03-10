import React from 'react';
import { Box, Container, Typography, Grid, IconButton, Link, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = ({ isBoho, isGenz, currentTheme }) => {
  // GenZ Footer
  if (isGenz) {
    return (
      <Box
        component="footer"
        sx={{
          py: 6,
          background: 'linear-gradient(180deg, transparent 0%, rgba(15, 10, 31, 0.95) 100%)',
          borderTop: '1px solid rgba(16, 185, 129, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glowing background effect */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #10B981, #A855F7, #EC4899, transparent)',
            opacity: 0.5
          }}
        />
        
        <Container maxWidth="lg">
          {/* Brand */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: '2rem',
                fontWeight: 800,
                mb: 1,
                background: 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ✨ Hayati ✨
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem'
              }}
            >
              "Your AI bestie for getting stuff done"
            </Typography>
          </Box>

          {/* Links Row */}
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {['Home', 'Features', 'Vibes', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  transition: 'all 0.3s',
                  '&:hover': { 
                    color: '#A855F7',
                    textShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
                  }
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>

          {/* Social Icons */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {[
              { icon: <TwitterIcon />, label: 'Twitter' },
              { icon: <LinkedInIcon />, label: 'LinkedIn' },
              { icon: <InstagramIcon />, label: 'Instagram' }
            ].map((social) => (
              <IconButton
                key={social.label}
                sx={{
                  color: '#FFFFFF',
                  bgcolor: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '12px',
                  p: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(236, 72, 153, 0.4)',
                    boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          {/* Copyright */}
          <Typography
            sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5
            }}
          >
            © 2025 Hayati · Made with <FavoriteIcon sx={{ fontSize: 16, color: '#EC4899' }} /> and good vibes
          </Typography>
        </Container>
      </Box>
    );
  }

  if (isBoho) {
    // Vintage Boho Footer
    return (
      <Box
        component="footer"
        sx={{
          py: 5,
          bgcolor: '#243533',
          color: '#F5E6D3',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          {/* Main Content - Centered */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Brand */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: '2.5rem',
                fontWeight: 700,
                mb: 1,
                color: '#F5E6D3'
              }}
            >
              ✧ Hayati ✧
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: '1.3rem',
                opacity: 0.85,
                fontStyle: 'italic',
                mb: 3
              }}
            >
              "Your cozy corner for organizing life"
            </Typography>

            {/* Decorative Divider */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              mb: 3
            }}>
              <Box sx={{ width: 60, height: 1, bgcolor: 'rgba(245,230,211,0.3)' }} />
              <Typography sx={{ fontSize: '1.2rem' }}>☕</Typography>
              <Box sx={{ width: 60, height: 1, bgcolor: 'rgba(245,230,211,0.3)' }} />
            </Box>
          </Box>

          {/* Links Row */}
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {['Home', 'Features', 'How It Works', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '1.2rem',
                  color: '#C9A577',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    color: '#F5E6D3',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>

          {/* Social Icons */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {[
              { icon: <TwitterIcon />, label: 'Twitter' },
              { icon: <LinkedInIcon />, label: 'LinkedIn' },
              { icon: <InstagramIcon />, label: 'Instagram' }
            ].map((social) => (
              <IconButton
                key={social.label}
                sx={{
                  color: '#C9A577',
                  bgcolor: 'rgba(201, 165, 119, 0.1)',
                  borderRadius: '50%',
                  p: 1,
                  '&:hover': {
                    bgcolor: '#964734',
                    color: '#F5E6D3',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          {/* Copyright */}
          <Typography
            sx={{
              textAlign: 'center',
              fontFamily: '"Caveat", cursive',
              fontSize: '1.1rem',
              color: 'rgba(245,230,211,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5
            }}
          >
            © 2025 Hayati · Made with <FavoriteIcon sx={{ fontSize: 16, color: '#964734' }} /> and lots of coffee
          </Typography>
        </Container>
      </Box>
    );
  }

  // Modern Footer
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1A1A2E',
        color: 'white',
        py: { xs: 6, md: 8 },
        pb: { xs: 3, md: 4 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography sx={{ fontSize: '2rem' }}>
                🤖
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  background: 'linear-gradient(135deg, white 0%, #26BFF0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Hayati
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#9CA3AF'
              }}
            >
              My Life, Organized by AI
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={6} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['About', 'Contact', 'Privacy', 'Terms'].map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  underline="none"
                  sx={{
                    color: '#9CA3AF',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#26BFF0',
                      transform: 'translateX(4px)'
                    },
                    display: 'inline-block'
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social */}
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <InstagramIcon />, label: 'Instagram' }
              ].map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: 44,
                    height: 44,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#26BFF0',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Box
          sx={{
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <Typography
            sx={{
              color: '#9CA3AF',
              fontSize: '0.875rem'
            }}
          >
            © 2025 Hayati. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
