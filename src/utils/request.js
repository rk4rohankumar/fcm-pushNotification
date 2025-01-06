// utils/request.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/notifications',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
