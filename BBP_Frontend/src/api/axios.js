import axios from 'axios';

export const baseURL = 'http://localhost:8080/api';

export default axios.create({
    baseURL: 'http://localhost:8080/api'
});