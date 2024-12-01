'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './theme/theme';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navigation handler
  const navigateTo = (path) => {
    router.push(path);
    setMobileOpen(false); // Close the drawer on navigation
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Chatbot', path: '/chatbot' },
    { label: 'Practice', path: '/practice' },
    { label: 'Resources', path: '/resources' },
    { label: 'About the Team', path: '/about-the-team' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {navItems.map((item) => (
                    <NavButton key={item.label} onClick={() => navigateTo(item.path)}>
                      {item.label}
                    </NavButton>
                  ))}
                </Box>
                {/* Mobile Navigation */}
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </StyledAppBar>

            {/* Mobile Drawer */}
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 240,
                },
              }}
            >
              <Box sx={{ textAlign: 'center', pt: 2 }}>
                <Typography variant="h6" sx={{ my: 2 }}>
                  Salus by Red Cross
                </Typography>
                <List>
                  {navItems.map((item) => (
                    <ListItem button key={item.label} onClick={() => navigateTo(item.path)}>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>

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
