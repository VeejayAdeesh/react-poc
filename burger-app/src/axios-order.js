import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://my-burger-app-af475.firebaseio.com/'
})

export default axiosInstance;