import axios from 'axios';

const api = {
    getUsers: () => axios.get('/api/admin/users'),
    getAnimals: () => axios.get('/api/admin/animals'),
    getTrainingLogs: () => axios.get('/api/admin/training'),
  // Add other API actions (create, update, delete)
};

export default api;
