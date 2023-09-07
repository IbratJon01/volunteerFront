import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Rating from '@mui/material/Rating'; // Yangi qo'shilgan komponent
import {
  getAllVolunteers,
  deleteVolunteer,
  updateVolunteer,
} from './VolunteerService';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleEditClick = (volunteer) => {
    setEditingVolunteer(volunteer);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setOpenDialog(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateVolunteer(editingVolunteer.id, editingVolunteer);
      loadVolunteers();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating volunteer:', error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Starts</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteers.map((volunteer) => (
            <StyledTableRow key={volunteer.id}>
              <StyledTableCell>{volunteer.id}</StyledTableCell>
              <StyledTableCell>{volunteer.firstName}</StyledTableCell>
              <StyledTableCell>{volunteer.email}</StyledTableCell>
              <StyledTableCell>
                <Rating
                  name={`score-${volunteer.id}`}
                  value={volunteer.score}
                  readOnly
                />
              </StyledTableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditClick(volunteer)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(volunteer.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Volunteer</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={editingVolunteer?.firstName || ''}
            onChange={(e) =>
              setEditingVolunteer({
                ...editingVolunteer,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            label="Email"
            value={editingVolunteer?.email || ''}
            onChange={(e) =>
              setEditingVolunteer({
                ...editingVolunteer,
                email: e.target.value,
              })
            }
          />
          <Rating
            name="score"
            value={editingVolunteer?.score || 0}
            onChange={(event, newValue) =>
              setEditingVolunteer({
                ...editingVolunteer,
                score: newValue,
              })
            }
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VolunteerList;
