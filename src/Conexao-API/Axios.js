import axios from 'axios'

const instance = axios.create({
    baseURL: "https://drab-hosiery-moth.cyclic.app/",
    timeout: 2500
});

export default instance;