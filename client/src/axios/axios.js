import axios from 'axios'
axios.defaults.headers.common["Authorization"] =  `Bearer ${localStorage.getItem('token')}`
const instance = axios.create({
    baseURL: "https://simplylogs-app.herokuapp.com/" 
})
export default instance