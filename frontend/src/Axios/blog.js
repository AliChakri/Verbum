


import axios from 'axios'



const Blog = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});


export default Blog