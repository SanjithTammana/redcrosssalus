'use client';

import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

const TeamMemberBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const TeamMemberAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '80px',
    height: '80px',
  },
}));

const ContactInfo = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const AboutTeamPage = () => {
  return (
    <MainContainer>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: 'center', padding: 2 }}
      >
        About the Team
      </Typography>
      <Grid container spacing={4}>
        {/* Sanjith Tammana */}
        <Grid item xs={12} sm={6}>
          <TeamMemberBox>
            <TeamMemberAvatar alt="Sanjith Tammana" src="/images/sanjith_t.jpg" />
            <Typography variant="h5" gutterBottom>
              Sanjith Tammana
            </Typography>
            <Typography variant="body2" gutterBottom>
              [Sanjith's bio here]
            </Typography>
            {/* Contact Information */}
            <ContactInfo variant="body2" gutterBottom>
              <strong>Phone:</strong> +1 (201) 301-8677
            </ContactInfo>
            <ContactInfo variant="body2">
              <strong>Email:</strong> sanjith.tammana@gmail.com
            </ContactInfo>
          </TeamMemberBox>
        </Grid>
        {/* Suhrit Revuri */}
        <Grid item xs={12} sm={6}>
          <TeamMemberBox>
            <TeamMemberAvatar alt="Suhrit Revuri" src="/images/suhrit_r.jpeg" />
            <Typography variant="h5" gutterBottom>
              Suhrit Revuri
            </Typography>
            <Typography variant="body2" gutterBottom>
              [Suhrit's bio here]
            </Typography>
            {/* Contact Information */}
            <ContactInfo variant="body2" gutterBottom>
              <strong>Phone:</strong> +1 (302) 562-3736
            </ContactInfo>
            <ContactInfo variant="body2">
              <strong>Email:</strong> suhritrevuri@gmail.com
            </ContactInfo>
          </TeamMemberBox>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default AboutTeamPage;
