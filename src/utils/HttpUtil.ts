import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_ENDPOINT = 'https://api.weatherapi.com/v1/';

class HttpUtil {
    axios: AxiosInstance;

    constructor() {

        const baseURL = API_ENDPOINT;

        this.axios = axios.create({
            baseURL,
        });
    }

    makeRequest<T>(request: AxiosRequestConfig) {
        request.url += `&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
        return this.axios.request<T>(request);
    }
}

export default new HttpUtil();