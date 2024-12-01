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
              I’m Sanjith Tammana, a high school student passionate about technology with experience in software development, machine learning, and data analysis. During a research internship at UT Dallas, I developed predictive models to analyze football player transfer values. As a Headstarter Fellow, I built projects such as chatbots and inventory management systems, honing my problem-solving skills. My technical ability is also shown in my role as the President and Founder of Prosper Technology Student Association. Additionally, as a Life Scout, I’ve cultivated leadership abilities through mentoring and community conservation efforts, combining technical expertise with a dedication to meaningful solutions.
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
              I am Suhrit Revuri, a junior in high school who is interested about entrepreneurship, leadership, and technology. As a passionate Python coder, I enjoy applying my knowledge to solve problems in the real world and come up with new ideas. I have recently completed 11 AP classes, and I have a ton more planned as I continue to challenge myself and expand my knowledge. I also have a lot of leadership responsibilities at school. I am the head of marketing and sergeant at arms for the Technology Student Association (TSA), the president of the American Red Cross Club, and the vice president of the Data Science Club, Hindu YUVA, and the Biology Olympiad Club. I can lead meaningful efforts, mentor others, and work with peers in these jobs. I am excited to keep contributing significantly through creative projects and motivating partnerships because I have a solid academic background, technological credentials, and a wealth of leadership experience.
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
