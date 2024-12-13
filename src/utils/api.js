import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5003', // API Gateway URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
