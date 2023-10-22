import axios from 'axios';

export const baseURL = 'http://localhost:3500';

export default axios.create({
    baseURL: 'http://localhost:8080/api'
});