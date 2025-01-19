import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';')[0].split('=')[1]}`;
axios.defaults.headers.common["Accept"] = "application/json";
