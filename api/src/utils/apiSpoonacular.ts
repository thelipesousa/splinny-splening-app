// axiosClient.ts
import axios from 'axios';

const apiSpoonacular = axios.create({
  baseURL: 'https://api.spoonacular.com/',
  params: {
    apiKey: process.env.SPOONACULAR_API_KEY,
  },
});

export default apiSpoonacular;
