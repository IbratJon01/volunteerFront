import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getVolunteerById, updateVolunteer } from '../Volunteer/VolunteerService';

const VolunteerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate hook
  const [volunteer, setVolunteer] = useState({});
  const [editedVolunteer, setEditedVolunteer] = useState({
    firstName: '',
    imagePath: '',
    birthDate: '',
  });

  useEffect(() => {
    getVolunteerById(id).then((response) => {
      setVolunteer(response.data);
      setEditedVolunteer(response.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVolunteer({
      ...editedVolunteer,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVolunteer(id, editedVolunteer)
      .then(() => {
        // Use navigate to go back to the profile page
        navigate(`/volunteer/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Volunteer Profilni Tahrirlash</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={editedVolunteer.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imagePath">Image: </label>
          <input
            type="text"
            id="imagePath"
            name="imagePath"
            value={editedVolunteer.imagePath}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date: </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={editedVolunteer.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Saqlash</button>
      </form>
    </div>
  );
};

export default VolunteerEdit;
