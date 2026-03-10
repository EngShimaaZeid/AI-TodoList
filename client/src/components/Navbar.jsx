import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PaletteIcon from '@mui/icons-material/Palette';
import CheckIcon from '@mui/icons-material/Check';
import { THEMES } from '../theme';

const Navbar = ({ currentTheme, onThemeChange, onOpenChat, onLogout, isAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeAnchorEl, setThemeAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  
  const isBoho = currentTheme === THEMES.BOHO;
  const isGenz = currentTheme === THEMES.GENZ;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeMenuOpen = (event) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeAnchorEl(null);
  };

  const handleThemeSelect = (themeName) => {
    onThemeChange(themeName);
    handleThemeMenuClose();
  };

  const themeOptions = [
    { name: THEMES.MODERN, label: 'Modern', icon: '🤖', description: 'Clean & Professional' },
    { name: THEMES.BOHO, label: 'Boho', icon: '🍂', description: 'Warm & Vintage' },
    { name: THEMES.GENZ, label: 'GenZ', icon: '✨', description: 'Cosmic & Vibrant' }
  ];

  const getCurrentThemeIcon = () => {
    const current = themeOptions.find(t => t.name === currentTheme);
    return current ? current.icon : '🎨';
  };

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Get Started', href: '#cta' }
  ];

  const handleNavClick = (href) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const navbarHeight = 80;
          const targetPosition = element.offsetTop - navbarHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 80;
        const targetPosition = element.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: isGenz 
            ? 'rgba(15, 10, 31, 0.9)' 
            : (isBoho ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.95)'),
          backdropFilter: 'blur(10px)',
          borderBottom: isGenz 
            ? '1px solid rgba(16, 185, 129, 0.3)' 
            : '1px solid rgba(38, 191, 240, 0.1)',
          py: scrolled ? 1 : 1.5,
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box 
              component={Link} 
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: '2rem',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' }
                  }
                }}
              >
                {isGenz ? '🚀' : (isBoho ? '📔' : '🤖')}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontFamily: isBoho ? '"Caveat", cursive' : '"Roboto", sans-serif',
                  fontSize: isBoho ? '1.8rem' : '1.5rem',
                  background: isGenz 
                    ? 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)'
                    : (isBoho ? 'none' : 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)'),
                  WebkitBackgroundClip: (isBoho && !isGenz) ? 'unset' : 'text',
                  WebkitTextFillColor: (isBoho && !isGenz) ? '#243533' : 'transparent',
                  backgroundClip: (isBoho && !isGenz) ? 'unset' : 'text'
                }}
              >
                Hayati
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    sx={{
                      color: isGenz ? 'rgba(255,255,255,0.8)' : (isBoho ? '#4C563F' : '#757575'),
                      fontWeight: 500,
                      fontFamily: isBoho ? '"Caveat", cursive' : 'inherit',
                      fontSize: isBoho ? '1.2rem' : '0.875rem',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: '2px',
                        background: isGenz 
                          ? 'linear-gradient(135deg, #10B981 0%, #A855F7 100%)'
                          : (isBoho ? '#964734' : 'linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)'),
                        transition: 'width 0.3s ease'
                      },
                      '&:hover::after': { width: '100%' },
                      '&:hover': { 
                        color: isGenz ? '#FFFFFF' : (isBoho ? '#964734' : '#26BFF0'), 
                        bgcolor: 'transparent' 
                      }
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                
                {/* Theme Selector Button */}
                <Button
                  onClick={handleThemeMenuOpen}
                  startIcon={<PaletteIcon />}
                  sx={{
                    color: isGenz ? '#10B981' : (isBoho ? '#964734' : '#26BFF0'),
                    fontWeight: 500,
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 2,
                    border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                    borderRadius: 2,
                    '&:hover': { 
                      bgcolor: isGenz 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : (isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(38, 191, 240, 0.1)')
                    }
                  }}
                >
                  <span style={{ marginRight: 4 }}>{getCurrentThemeIcon()}</span>
                  <span style={{ fontSize: '0.75rem' }}>
                    {themeOptions.find(t => t.name === currentTheme)?.label}
                  </span>
                </Button>
                
                {/* Theme Menu */}
                <Menu
                  anchorEl={themeAnchorEl}
                  open={Boolean(themeAnchorEl)}
                  onClose={handleThemeMenuClose}
                  PaperProps={{
                    sx: {
                      bgcolor: isGenz ? 'rgba(15, 20, 35, 0.95)' : 'white',
                      backdropFilter: 'blur(20px)',
                      border: isGenz ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                      borderRadius: 2,
                      minWidth: 180,
                      mt: 1
                    }
                  }}
                >
                  {themeOptions.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={() => handleThemeSelect(option.name)}
                      sx={{
                        py: 1.5,
                        color: isGenz ? '#FFFFFF' : 'inherit',
                        '&:hover': {
                          bgcolor: isGenz 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : 'rgba(0,0,0,0.04)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <span style={{ fontSize: '1.2rem' }}>{option.icon}</span>
                      </ListItemIcon>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {option.label}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          {option.description}
                        </Typography>
                      </Box>
                      {currentTheme === option.name && (
                        <CheckIcon sx={{ 
                          ml: 1, 
                          fontSize: '1rem', 
                          color: isGenz ? '#10B981' : '#26BFF0' 
                        }} />
                      )}
                    </MenuItem>
                  ))}
                </Menu>
                
                {!isAuthenticated ? (
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<LoginIcon />}
                    sx={{
                      color: isGenz ? '#10B981' : (isBoho ? '#964734' : '#26BFF0'),
                      fontWeight: 500,
                      textTransform: 'none',
                      fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                      '&:hover': { 
                        bgcolor: isGenz 
                          ? 'rgba(16, 185, 129, 0.1)' 
                          : (isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(38, 191, 240, 0.1)')
                      }
                    }}
                  >
                    Login / Sign Up
                  </Button>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to="/profile"
                      startIcon={<PersonIcon />}
                      sx={{
                        color: isGenz ? '#10B981' : (isBoho ? '#964734' : '#26BFF0'),
                        fontWeight: 500,
                        textTransform: 'none',
                        fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                        '&:hover': { 
                          bgcolor: isGenz 
                            ? 'rgba(16, 185, 129, 0.1)' 
                            : (isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(38, 191, 240, 0.1)')
                        }
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      onClick={onLogout}
                      startIcon={<LogoutIcon />}
                      sx={{
                        color: isGenz ? '#10B981' : (isBoho ? '#964734' : '#26BFF0'),
                        fontWeight: 500,
                        textTransform: 'none',
                        fontFamily: isBoho ? '"Quicksand", sans-serif' : 'inherit',
                        '&:hover': { 
                          bgcolor: isGenz 
                            ? 'rgba(16, 185, 129, 0.1)' 
                            : (isBoho ? 'rgba(150, 71, 52, 0.1)' : 'rgba(38, 191, 240, 0.1)')
                        }
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: isGenz ? '#FFFFFF' : '#1A1A2E' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            bgcolor: isGenz ? '#0F0A1F' : 'white'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: isGenz ? '#FFFFFF' : 'inherit' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              sx={{ justifyContent: 'center', py: 2 }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  color: isGenz ? '#FFFFFF' : 'inherit'
                }}
              />
            </ListItem>
          ))}
          <ListItem sx={{ justifyContent: 'center', pt: 4, flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" sx={{ color: isGenz ? 'rgba(255,255,255,0.7)' : 'inherit', mb: 1 }}>
              Choose Theme
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {themeOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={() => {
                    onThemeChange(option.name);
                    setMobileOpen(false);
                  }}
                  variant={currentTheme === option.name ? 'contained' : 'outlined'}
                  sx={{
                    minWidth: 80,
                    flexDirection: 'column',
                    py: 1.5,
                    bgcolor: currentTheme === option.name 
                      ? (isGenz ? 'rgba(16, 185, 129, 0.3)' : 'primary.main')
                      : 'transparent',
                    borderColor: isGenz ? 'rgba(16, 185, 129, 0.5)' : 'primary.main',
                    color: isGenz ? '#FFFFFF' : 'inherit',
                    '&:hover': {
                      bgcolor: isGenz ? 'rgba(16, 185, 129, 0.2)' : 'primary.light'
                    }
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                  <span style={{ fontSize: '0.75rem' }}>{option.label}</span>
                </Button>
              ))}
            </Box>
          </ListItem>
        </List>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ mb: 2 }} />
    </>
  );
};

export default Navbar;
