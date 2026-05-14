import { create } from 'zustand';
import axios from 'axios';

// Create an Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
});

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (name, email, password, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('user', JSON.stringify(response.data));
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API failed', error);
    } finally {
      localStorage.removeItem('user');
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
