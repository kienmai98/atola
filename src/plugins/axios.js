import axios from "axios";
export default axios.create({
  baseURL: process.env.API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});
