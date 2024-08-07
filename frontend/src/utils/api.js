import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL:  `http://backend:3000`,// URL del backend  
});
export default api;