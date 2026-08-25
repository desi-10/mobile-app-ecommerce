import axios from 'axios';

// Default to localhost, but this should be your machine's IP address when running on a physical device.
// e.g., EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
