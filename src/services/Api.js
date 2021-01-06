import axios from 'axios';
import variable from './variables.json';

const API = axios.create({
    baseURL: variable.URL_BACKEND,
});

export default API;