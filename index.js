import axios from 'axios'
import {uniapp} from "./src/adapters"

const defaultConfig = {
    adapter: null,
    interceptors_request_success: config => {
        return config;
    },
    interceptors_request_failed: error => {
        return Promise.reject(error);
    },
    interceptors_response_success: response => {
        return response.data;
    },
    interceptors_response_failed: error => {
        return Promise.reject(error.response);
    }
}

export default class Request {
    constructor(axiosOpts, customConfig) {
        const config = Object.assign({}, defaultConfig, customConfig)
        this.service = axios.create(axiosOpts)
        // 加载特定适配器
        if (config.hasOwnProperty("adapter") && config.adapter === "uniapp") {
            console.log("adasd")
            this.service.defaults.adapter = uniapp
        }

        this.service.interceptors.request.use(config.interceptors_request_success, config.interceptors_request_failed);
        this.service.interceptors.response.use(config.interceptors_response_success, config.interceptors_response_failed);

        this.service.all = axios.all;
        this.service.spread = axios.spread;

        return this
    }
}


