'use client';

import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// Global styles for smooth scrolling
const GlobalStyles = styled('div')(() => ({
  'html, body': {
    scrollBehavior: 'smooth',
  },
}));

// Styled components
const Background = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, var(--red-cross-white), var(--secondary-gray))',
  minHeight: '100vh',
  padding: theme.spacing(8, 0),
  display: 'flex',
  flexDirection: 'column',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, var(--red-cross-red), #c81828)',
  color: 'var(--red-cross-white)',
  textAlign: 'center',
  padding: theme.spacing(10, 2),
  borderRadius: '16px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  width: '90%',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  '&:hover': {
    background: 'linear-gradient(to right, #c81828, #a3141f)',
    transform: 'scale(1.02)',
  },
}));

const ContentBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(5),
  marginBottom: theme.spacing(6),
  borderRadius: '16px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: '90%',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.2)',
  },
}));

const List = styled('ul')(({ theme }) => ({
  paddingLeft: 0,
  listStyle: 'none',
  textAlign: 'left',
  margin: 0,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '&::before': {
      content: '"•"',
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1.5),
      fontSize: '1.2rem',
    },
  },
}));

const ScrollButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, var(--red-cross-red), #c81828)',
  color: 'var(--red-cross-white)',
  fontSize: '1rem',
  textTransform: 'none',
  padding: theme.spacing(1.5, 6),
  borderRadius: '30px',
  transition: 'all 0.3s ease',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
  marginBottom: theme.spacing(4),
  '&:hover': {
    background: 'linear-gradient(to right, #c81828, #a3141f)',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.25)',
    transform: 'scale(1.05)',
  },
}));

export default function HomePage() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <GlobalStyles>
      <Background>
        <Container>
          {/* Hero Section */}
          <HeroSection>
            <LocalHospitalIcon fontSize="large" style={{ marginBottom: '16px' }} />
            <Typography variant="h1" gutterBottom style={{ fontWeight: 700 }}>
              First Aid and CPR Readiness
            </Typography>
            <Typography variant="h6" gutterBottom>
              A Red Cross Initiative - Empowering communities with life-saving knowledge
            </Typography>
            {/* Ready Button */}
            <ScrollButton onClick={() => handleScroll('why-it-matters')}>Ready?</ScrollButton>
          </HeroSection>

          {/* Why It Matters Section */}
          <ContentBox id="why-it-matters">
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: 600, color: 'var(--red-cross-black)', textAlign: 'center' }}
            >
              Why It Matters
            </Typography>
            <Typography variant="body1" gutterBottom>
              Emergencies can happen at any time, and the lack of immediate first aid can mean the difference between life
              and death.
            </Typography>
            <List>
              <li>
                <Typography variant="body1">
                  <strong>350,000 cardiac arrests</strong> occur outside hospitals in the US every year.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>90%</strong> of these are fatal without immediate CPR.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>59%</strong> of adults feel unprepared for emergencies.
                </Typography>
              </li>
            </List>
            <Typography variant="body1">
              Our platform bridges this gap by equipping individuals with Red Cross-approved lifesaving skills.
            </Typography>
          </ContentBox>

          {/* Learn to Save Lives Section */}
          <ContentBox id="learn-to-save-lives">
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: 600, color: 'var(--red-cross-black)', textAlign: 'center' }}
            >
              Learn to Save Lives
            </Typography>
            <Typography variant="body1" gutterBottom>
              Whether you're practicing or responding to an emergency, we're here to help you every step of the way.
            </Typography>
          </ContentBox>
        </Container>
      </Background>
    </GlobalStyles>
  );
}
