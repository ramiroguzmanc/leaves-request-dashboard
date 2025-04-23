import axios from 'axios';

const API_URL = 'https://67f551e6913986b16fa426fd.mockapi.io/api/v1'

export const api = axios.create({
  baseURL: API_URL,
});
