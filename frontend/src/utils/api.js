import axios from 'axios';

export default axios.create({
    baseURL: process.env.BASE_URL //referimos a la URL del backend
});