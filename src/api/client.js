import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

export function fetchDestinations() {
  return api.get('/destination').then(r => r.data);
}

export function fetchHotels() {
  return api.get('/hotels').then(r => r.data || []);
}

