import axios from 'axios';

export const ApiInstance = axios.create({
    baseURL: 'https://glacial-refuge-41061.herokuapp.com/api',
    headers: {'Basic-Token': 'caramelmacchiato'}
  });