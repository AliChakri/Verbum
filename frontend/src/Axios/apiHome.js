
import axios from 'axios'



const APIHome = axios.create({
    baseURL: 'http://localhost:5000/user',
    withCredentials: true,
});


export default APIHome