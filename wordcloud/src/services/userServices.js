import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

export const userServices = {
  async login(credentials) {
    return axios.post(`${API_URL}user/user/login/`, credentials);
  },

  async getUserDetails(username, token) {
    return axios.get(`${API_URL}user/user/users/${username}/`, {
      headers: { Authorization: `Token ${token}` },
    });
  },
};