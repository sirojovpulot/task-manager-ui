import axios from 'axios'
import {notification} from 'antd';
import {API_BASE_URL} from './AppConfig';
import {ACCESS_TOKEN} from "./constants";


const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
});


// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// API Request interceptor
service.interceptors.request.use(config => {
    const jwtToken = localStorage.getItem(ACCESS_TOKEN);

    if (jwtToken) {
        config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken;
    }

    return config
}, error => {
    // Do something with request error here
    notification.error({
        message: 'Error'
    })
    Promise.reject(error).then();
})

// API response interceptor
service.interceptors.response.use((response) => {
    const {data} = response;
    if (data?.success && !!data?.message) {
        notification.success({message: data?.message});
    }
    return response.data;
}, (error) => {
    console.log(error)
    let notificationParam = {message: error.message};
    if(error.response?.data?.detail){
        notificationParam = {message: error.response?.data?.detail}
    }

    // Remove token and redirect
    if (error.response.status === 401 || error.response.status === 403) {
        notificationParam.message = 'Authentication Fail';
        notificationParam.description = 'Please login again';
        localStorage.clear();
        history.push('/login');
        // window.location.reload();
    }

    if (error.response.status === 404) {
        notificationParam.message = 'Not Found'
    }

    if (error.response.status === 508) {
        notificationParam.message = "Time Out"
    }
    if (notificationParam.message) {
        notification.error(notificationParam)
    }

    return Promise.reject(error);
});

export default service;