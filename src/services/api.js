import axios from "axios";

export const api = axios.create({
    baseURL: "https://apinotes-jsls.onrender.com"
});

