//Importações
import axios from "axios";

//http://192.168.0.101:5000/create
export const api = axios.create({
    baseURL: "http://192.168.0.101:5000"
})