
import axios from 'axios'



const APICom = axios.create({
    baseURL: 'http://localhost:5000/api/comments',
    withCredentials: true,
});


export default APICom;