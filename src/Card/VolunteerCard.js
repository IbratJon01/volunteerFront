import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';

const VolunteerCard = ({ volunteer }) => {
  return (
    <Card style={{ width: '300px', height: '300px' }}>
      <CardHeader
        avatar={<Avatar>{volunteer.firstName[0]}</Avatar>}
        title={volunteer.firstName}
        subheader={volunteer.email}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {volunteer.aboutMe}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VolunteerCard;
