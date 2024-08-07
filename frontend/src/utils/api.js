import axios from 'axios';
const api = axios.create({
    baseURL:  `http://backend:3000`,// URL del backend  
});
export default api;