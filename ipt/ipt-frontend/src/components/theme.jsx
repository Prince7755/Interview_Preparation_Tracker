import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    h4: {
      fontWeight: 'bold',
      fontSize: '2rem',
      '@media (max-width:900px)': {
        fontSize: '1.7rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.3rem',
      },
    },
    h6: {
      fontSize: '1.2rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          '@media (max-width:600px)': {
            fontSize: '0.85rem',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '1rem',
          paddingBottom: '1rem',
          '@media (max-width:600px)': {
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
          },
        },
      },
    },
  },
});

export default theme;
