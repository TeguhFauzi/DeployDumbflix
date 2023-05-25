import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
