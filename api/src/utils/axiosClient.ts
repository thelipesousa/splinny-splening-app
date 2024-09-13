import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://192.168.0.185:3001', // Altere para o IP da sua máquina, antes estava http://localhost:3001
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;