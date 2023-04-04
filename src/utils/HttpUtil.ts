import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpUtil {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create();
    }

    makeRequest<T>(request: AxiosRequestConfig) {
        return this.axios.request<T>(request);
    }
}

export default new HttpUtil();