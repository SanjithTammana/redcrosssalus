import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ED1B2E',
    },
    secondary: {
      main: '#0091CD',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#9F9FA3',
    },
  },
  typography: {
    fontFamily: 'Georgia, serif',
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ED1B2E',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '1rem',
      fontStyle: 'italic',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ED1B2E',
          color: '#FFFFFF',
          borderRadius: '5px',
          padding: '10px 20px',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#c81828',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          '&:hover': {
            boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
});

export default theme;
