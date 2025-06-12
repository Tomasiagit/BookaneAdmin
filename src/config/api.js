// export const SERVER = "https://userapi.saferlimitada.com/api/";

import axios from "axios";



export const SERVER = "http://127.0.0.1:8000/api/";
const api = axios.create({
    baseURL : SERVER
});

export default api;
