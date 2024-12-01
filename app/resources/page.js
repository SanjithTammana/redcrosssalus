'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const resources = [
  { title: 'First Aid Basics', url: 'https://www.youtube.com/watch?v=5OKFljZ2GQE' }, // First Aid Basics: Step-by-Step Guide for Emergencies
  { title: 'CPR Techniques', url: 'https://www.youtube.com/watch?v=BUhUiPeEX-8' }, // How to Perform CPR on Adults & Infants | In Case of Emergency | Mass General Brigham
  { title: 'Choking Emergencies', url: 'https://www.youtube.com/watch?v=WeY4KJUnfMc' }, // First aid for someone who is choking | First aid training online | British Red Cross
  { title: 'Bleeding Control', url: 'https://www.youtube.com/watch?v=jYtJS1PtNq0' }, // First Aid for Severe Bleeding
  { title: 'Shock Emergencies', url: 'https://www.youtube.com/watch?v=OhjibitP6SM' }, // First Aid Basics: Severe Bleeding and CPR Techniques
  { title: 'Burns First Aid', url: 'https://www.youtube.com/watch?v=dQozahCH8IE' }, // Essential First Aid Techniques Everyone Needs!
  { title: 'Stroke Recognition', url: 'https://www.youtube.com/watch?v=7Ee1o05x5kw' }, // First Aid Basics: Step-by-Step Guide for Emergencies
  { title: 'AED Usage Adults', url: 'https://www.youtube.com/watch?v=in8j2Q2z3HE&t=1s&pp=ygUTQUVEIHVzYWdlIHJlZCBjcm9zcw%3D%3D' }, // How to Perform CPR on Adults | In Case of Emergency
  { title: 'AED Usage Children', url: 'https://www.youtube.com/watch?v=yp5gjJa2FxA&pp=ygUTQUVEIHVzYWdlIHJlZCBjcm9zcw%3D%3D' }, // How to Perform CPR on Infants | In Case of Emergency
  { title: 'Heat Exhaustion', url: 'https://www.youtube.com/watch?v=W-Us9IP33Gs' }, // Heat Emergencies: First Aid Training
  { title: 'Cold Emergencies', url: 'https://www.youtube.com/watch?v=tHiav9zYJT0' }, // Cold Emergencies: First Aid Training
  { title: 'Poisoning Response', url: 'https://www.youtube.com/watch?v=PgGUSAM6XJw' }, // Poisoning Response: First Aid Training
  { title: 'Seizure Management', url: 'https://www.youtube.com/watch?v=1SMFUwyEafw' }, // Seizure Management: First Aid Training
  { title: 'Head & Spine Injuries', url: 'https://www.youtube.com/watch?v=x-YYjkokQ6U' }, // Head & Spine Injuries: First Aid Training
  { title: 'How to use a Tourniquet', url: 'https://www.youtube.com/watch?v=k98ilfQmUWw' }, // Head & Spine Injuries: First Aid Training
];


const certifications = [
  {
    title: 'First Aid/CPR Certification',
    url: 'https://www.redcross.org/take-a-class/first-aid/first-aid-training/first-aid-certification?srsltid=AfmBOoqPrzJ_2Q7nBcO2gWsNoVLf_csPtExepPddMEJ2uShtCPhiVxxY',
  },
];

const volunteer = [
  {
    title: 'Volunteer with the Red Cross',
    url: 'https://www.redcross.org/volunteer/volunteer-opportunities.html?srsltid=AfmBOorTMJ6zGvE2jYtYIe0bLMi24FEzW_Oq8if6edlHFUHdfhSgeUui',
  },
];

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: '16px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ResourcesPage = () => {
  return (
    <StyledContainer maxWidth="lg">
      {/* Title Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <StyledCard>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Red Cross Resources
            </Typography>
            <Typography variant="h6">
              Explore life-saving information, certification opportunities, and ways to engage with the community.
            </Typography>
            <Typography variant="body1">
              {/* Content remains the same */}
            </Typography>
          </CardContent>
        </StyledCard>
      </Box>

      {/* Educational Videos Section */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Educational Videos
          </Typography>
          <Grid container spacing={3}>
            {resources.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6">{resource.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      fullWidth
                      href={resource.url}
                      target="_blank"
                    >
                      Watch Video
                    </StyledButton>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Future Opportunities Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Future Opportunities
          </Typography>
          {[...certifications, ...volunteer].map((item, index) => (
            <StyledCard key={index} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
              </CardContent>
              <CardActions>
                <StyledButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  href={item.url}
                  target="_blank"
                >
                  {index < certifications.length ? 'Learn More' : 'Get Involved'}
                </StyledButton>
              </CardActions>
            </StyledCard>
          ))}
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ResourcesPage;