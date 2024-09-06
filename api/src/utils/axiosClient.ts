import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', // URL do seu servidor ou MongoDB API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
