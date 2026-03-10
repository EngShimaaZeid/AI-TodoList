import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { modernTheme, bohoTheme, genzTheme, THEMES } from './theme';
import './index.css';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import Home from './pages/Home';
import ToDoList from './pages/ToDoList';
import Calendar from './pages/Calendar';
import Eisenhower from './pages/Eisenhower';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('hayati-theme');
    return saved || THEMES.BOHO;
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const getTheme = () => {
    switch (currentTheme) {
      case THEMES.BOHO:
        return bohoTheme;
      case THEMES.GENZ:
        return genzTheme;
      default:
        return modernTheme;
    }
  };
  
  const theme = getTheme();
  const isBoho = currentTheme === THEMES.BOHO;
  const isGenz = currentTheme === THEMES.GENZ;

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('hayati_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  // Persist theme preference
  useEffect(() => {
    localStorage.setItem('hayati-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    
    // Use React Router navigation instead of window.location.href
    // The navigation will happen from the Login component
  };

  const handleLogout = () => {
    localStorage.removeItem('hayati_token');
    localStorage.removeItem('hayati_user_id');
    localStorage.removeItem('hayati_user_name');
    setIsAuthenticated(false);
    setChatOpen(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (isCheckingAuth) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</Box>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        {/* Background styling for themes */}
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: isGenz ? 'transparent' : (isBoho ? '#F8F6F0' : 'background.default'),
            background: isGenz 
              ? 'linear-gradient(135deg, #0F0A1F 0%, #1A1033 50%, #0D1B2A 100%)'
              : 'none',
            backgroundImage: isBoho 
              ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23C9A577\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
              : 'none',
            position: 'relative',
            '&::before': isGenz ? {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0
            } : {}
          }}
        >
          {/* Navbar */}
          <Navbar 
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            onLogout={isAuthenticated ? handleLogout : null}
            isAuthenticated={isAuthenticated}
          />

          <Routes>
            {/* Public Routes - All features accessible without login */}
            <Route path="/" element={
              <Home isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} onOpenChat={handleOpenChat} isAuthenticated={isAuthenticated} />
            } />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} onLogin={handleLogin} onThemeChange={handleThemeChange} />
            } />
            <Route path="/todo" element={
              <ToDoList isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} />
            } />
            <Route path="/calendar" element={
              <Calendar isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} />
            } />
            <Route path="/eisenhower" element={
              <Eisenhower isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} />
            } />
            <Route path="/profile" element={
              <Profile isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} onOpenChat={handleOpenChat} />
            } />
          </Routes>

          {/* Footer */}
          <Footer isBoho={isBoho} isGenz={isGenz} currentTheme={currentTheme} />

          {/* Chat Interface */}
          <ChatInterface 
            open={chatOpen} 
            onClose={handleCloseChat} 
            isBoho={isBoho}
            isGenz={isGenz}
            currentTheme={currentTheme}
          />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
