import axios from 'axios'

const instance = axios.create({
    baseURL: "https://costs.cyclic.app/",
    timeout: 2500
});

export default instance;