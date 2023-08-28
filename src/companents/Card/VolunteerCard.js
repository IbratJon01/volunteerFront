import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';

const VolunteerCard = ({ volunteer }) => {
  return (
    <Card style={{ width: '300px', height: '300px', margin:"5px",marginRight:"15px" }}>
      <CardHeader
        avatar={<div style={{fontSize:"55px"}}><Avatar >{'A'}</Avatar></div>}
        title={<div><span style={{marginRight:"2px"}}>{volunteer.firstName}</span><span>{volunteer.lastName}</span></div>}
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
