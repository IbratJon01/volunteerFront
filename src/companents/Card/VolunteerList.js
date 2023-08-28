import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getAllVolunteers, deleteVolunteer } from '../Volunteer/VolunteerService';
import VolunteerCard from './VolunteerCard';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    const response = await getAllVolunteers();
    setVolunteers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteVolunteer(id);
    loadVolunteers();
  };

  console.log(volunteers);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {volunteers.map((volunteer) => (
      <VolunteerCard key={volunteer.id} volunteer={volunteer} />
    ))}
  </div>
  );
};

export default VolunteerList;
