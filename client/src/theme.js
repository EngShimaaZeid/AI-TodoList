import { createTheme } from '@mui/material/styles';

// Theme names constant
export const THEMES = {
  MODERN: 'modern',
  BOHO: 'boho',
  GENZ: 'genz'
};

// --- Modern Theme (Material Design) ---
export const modernTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3F51B5', // Indigo 500
      dark: '#303F9F',
      light: '#C5CAE9',
    },
    secondary: {
      main: '#F50057', // Pink A400
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    button: { textTransform: 'uppercase', letterSpacing: '1.25px' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

// --- Boho Theme (Vintage Scrapbook) ---
export const bohoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#243533', // Lagoon
      contrastText: '#F0EFE7',
    },
    secondary: {
      main: '#964734', // Crimson Blaze
    },
    background: {
      default: '#F0EFE7', // Cream Paper
      paper: '#F0EFE7',
    },
    text: {
      primary: '#243533', // Lagoon
      secondary: '#4C563F', // Moss Mist
    },
    // Custom palette extensions
    custom: {
      amber: '#B78953',
      moss: '#4C563F',
      maple: '#692721',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Arial", sans-serif',
    h1: {
      fontFamily: '"Caveat", cursive',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Caveat", cursive',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Caveat", cursive',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Caveat", cursive',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Caveat", cursive',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Caveat", cursive',
      fontWeight: 700,
    },
    button: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16, // Softer corners
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '5px 5px 15px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        },
      },
    },
  },
});

// --- GenZ Theme (Cosmic Vibrant) ---
export const genzTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10B981', // Emerald Green
      dark: '#059669',
      light: '#34D399',
    },
    secondary: {
      main: '#22D3EE', // Cyan
      dark: '#06B6D4',
      light: '#67E8F9',
    },
    background: {
      default: '#0F0A1F', // Deep cosmic purple
      paper: 'rgba(15, 20, 35, 0.8)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    custom: {
      green: '#10B981',
      cyan: '#22D3EE',
      pink: '#EC4899',
      purple: '#A855F7',
      gradient: 'linear-gradient(135deg, #10B981 0%, #A855F7 50%, #EC4899 100%)',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0F0A1F 0%, #1A1033 50%, #0D1B2A 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
        },
        contained: {
          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9333EA 0%, #DB2777 100%)',
            boxShadow: '0 6px 20px rgba(168, 85, 247, 0.6)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          background: 'transparent',
          borderColor: 'rgba(168, 85, 247, 0.5)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(168, 85, 247, 0.1)',
            borderColor: '#A855F7',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 20, 60, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 20, 60, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(168, 85, 247, 0.5)',
            boxShadow: '0 12px 40px rgba(168, 85, 247, 0.2)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 10, 31, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(30, 20, 60, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(168, 85, 247, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(168, 85, 247, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#A855F7',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          color: '#FFFFFF',
        },
      },
    },
  },
});
