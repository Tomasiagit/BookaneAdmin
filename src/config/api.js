// export const SERVER = "https://userapi.saferlimitada.com/api/";

import axios from "axios";



//export const SERVER = "http://192.168.1.102/bookane_backend/public/api/";

export const SERVER = "http://10.200.219.12:8000/api/";
const api = axios.create({
    baseURL : SERVER
});

export default api;
