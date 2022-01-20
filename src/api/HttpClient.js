import axios from "axios";

const baseURL = "http://localhost:4000/";
const HttpClient = axios.create({
  baseURL,
});

export default HttpClient;
