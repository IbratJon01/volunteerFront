import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/volunteers';

const getAllVolunteers = () => {
  return axios.get(API_BASE_URL);
};

const getVolunteerById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

const createVolunteer = (volunteer) => {
  return axios.post(API_BASE_URL, volunteer);
};

const updateVolunteer = (id, volunteer) => {
  return axios.put(`${API_BASE_URL}/${id}`, volunteer);
};

const deleteVolunteer = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
