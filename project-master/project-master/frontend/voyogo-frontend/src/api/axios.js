import axios from "axios";
import { clearAuthStorage } from "../utils/auth";

const instance = axios.create({

  baseURL: "http://localhost:8080/voyago",

});

/* Public endpoints */

const publicEndpoints = [

  "/auth/login",
  "/auth/signup"

];

/* Request interceptor */

instance.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    const isPublic = publicEndpoints.some(url =>
      config.url.includes(url)
    );

    if (token && !isPublic) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  },

  (error) => Promise.reject(error)

);


/* Response interceptor */
instance.interceptors.response.use(

  (response) => response,

  (error) => {

    const status = error.response?.status;

    if (status === 401 || status === 403) {

      clearAuthStorage();
      window.location.href = "/login";

    }

    return Promise.reject(error);

  }

);

export default instance;
