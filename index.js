import axios from 'axios'
import {uniapp} from "./adapters"

const defaultConfig = {
    adapter: null,
    interceptor: {
        request_success: config => {
            return config;
        },
        request_failed: error => {
            return Promise.reject(error);
        },
        response_success: response => {
            return response.data;
        },
        response_failed: error => {
            return Promise.reject(error.response);
        }
    }
}

export default class Service {
    constructor(axiosOpts, customConfig) {
        const config = Object.assign({}, defaultConfig, customConfig)
        const service = axios.create(axiosOpts)
        // 加载特定适配器
        if (config.hasOwnProperty("adapter") && config.adapter !== null) {
            console.log(uniapp)
            service.defaults.adapter = uniapp
        }

        service.interceptors.request.use(config.interceptor.request_success, config.interceptor.request_failed);
        service.interceptors.response.use(config.interceptor.response_success, config.interceptor.response_failed);

        service.all = axios.all;
        service.spread = axios.spread;

        return service
    }
}


