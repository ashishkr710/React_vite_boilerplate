import Axios, { AxiosResponse } from "axios";
import envConfig from "../environment/index";
import storage from "@utils/storage";
import { logout } from "../API/Auth";

const API_URL = `${envConfig.apiUrl}`; // End point

// Create axios instance without headers for now
export const axios = Axios.create({
  baseURL: API_URL,
});

// Request interceptor to set headers before each request
axios.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    console.log("Axios request interceptor ran");

    //// If headers are undefined, initialize them
    //if (!config.headers) {
    //    config.headers.set({});
    //}

    // Use the 'set' method to update headers dynamically
    config.headers.set("Accept", "application/json");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    if (
      error.response?.data.status === 401 &&
      error.response?.data?.message === "No auth token"
    ) {
      console.log("axios error", error.response?.data);
      //storage.clearToken();
      //storage.clearUser();
      logout();

      // Redirect to login
      window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);
