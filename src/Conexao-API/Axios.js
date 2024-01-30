import axios from 'axios'

const instance = axios.create({
    baseURL: /*"https://drab-hosiery-moth.cyclic.app/"*/"http://localhost:8080/",
    timeout: 2500
});

export default instance;