import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://192.168.0.187:3001', // Adicione o endereço IP local da sua máquina, exemplo: 192.168.102. 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
