// auto-barrel-ignore

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_RUTA_API;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;