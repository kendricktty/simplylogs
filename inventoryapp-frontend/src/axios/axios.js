import axios from 'axios'
axios.defaults.headers.common["Authorization"] =  `Bearer ${localStorage.getItem('token')}`
const instance = axios.create({
    baseURL: "http://localhost:8001" 
})
export default instance