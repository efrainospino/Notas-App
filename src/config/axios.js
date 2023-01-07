import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://production-na.up.railway.app'
});

export default clienteAxios;