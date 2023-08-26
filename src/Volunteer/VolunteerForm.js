// Yuqoridagi VolunteerService.js kabi funksiyalarni import qiling
import React, { useState } from 'react';
import { createVolunteer } from './VolunteerService'; // To'g'ri manzilni ishlatganizdan ishonch hosil qiling

const VolunteerForm = () => {
    const [volunteer, setVolunteer] = useState({
      firstName: '',
      lastName: '',
      birthDate: '',
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setVolunteer((prevVolunteer) => ({
        ...prevVolunteer,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await createVolunteer(volunteer);
      // Ma'lumotni yuklashdan so'ng ro'yxatni yangilang yoki qayta yuklang
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={volunteer.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={volunteer.lastName} onChange={handleChange} />
        </label>
        <label>
          Birth Date:
          <input type="date" name="birthDate" value={volunteer.birthDate} onChange={handleChange} />
        </label>
        <button type="submit">Add Volunteer</button>
      </form>
    );
  };
  
  export default VolunteerForm;
  