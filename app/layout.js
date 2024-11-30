'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './/theme/theme';
import './globals.css';

// Styled components for the header and layout
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'var(--red-cross-red)',
  boxShadow: 'none',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'var(--red-cross-white)',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  margin: theme.spacing(0, 1.5),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const LayoutWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',
}));

const MotionBox = styled(motion.div)(() => ({
  width: '100%',
  height: '100%',
  flex: 1,
}));

// Framer Motion animation settings
const slideAnimation = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

export default function RootLayout({ children }) {
  const router = useRouter();

  // Navigation handler
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LayoutWrapper>
            {/* Header */}
            <StyledAppBar position="sticky">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 700 }}>
                  Salus by Red Cross
                </Typography>
                {/* Navigation Buttons */}
                <NavButton onClick={() => navigateTo('/')}>Home</NavButton>
                <NavButton onClick={() => navigateTo('/chatbot')}>Chatbot</NavButton>
                <NavButton onClick={() => navigateTo('/practice')}>Practice</NavButton>
                <NavButton onClick={() => navigateTo('/resources')}>Resources</NavButton>
                <NavButton onClick={() => navigateTo('/about-the-team')}>About the Team</NavButton>
              </Toolbar>
            </StyledAppBar>

            {/* Animated Page Transitions */}
            <AnimatePresence mode="wait">
              <MotionBox
                key={router.pathname} // Track the current page for transitions
                initial="initial"
                animate="animate"
                exit="exit"
                variants={slideAnimation}
              >
                {children}
              </MotionBox>
            </AnimatePresence>
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
