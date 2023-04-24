// src/api/service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getMovies = async () => {
  try {
        const res = await api.get("/movies");
        return res.data;
    } catch (err) {
        return errorHandler(err);
    }
};

const uploadImage = async (file) => {
  try {
        const res = await api.post("/upload", file);
        return res.data;
    } catch (err) {
        return errorHandler(err);
    }
};

const createMovie = async (newMovie) => {
  try {
        const res = await api.post("/movies", newMovie);
        return res.data;
    } catch (err) {
        return errorHandler(err);
    }
};

export default {
  getMovies,
  uploadImage,
  createMovie
};
