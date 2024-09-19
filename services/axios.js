import axios from 'axios';

const api = axios.create({
  baseURL: 'http://158.247.124.44:4000',
  timeout: 5000, // Aumentado a 5 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
