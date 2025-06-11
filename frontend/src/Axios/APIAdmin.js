

import axios from 'axios'



const APIAdmin = axios.create({
    baseURL: 'http://localhost:5000/admin',
    withCredentials: true,
});


export default APIAdmin