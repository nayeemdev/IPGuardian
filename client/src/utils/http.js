import Axios from "axios";

const http = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default http;
