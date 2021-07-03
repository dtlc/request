import axios from 'axios'

const defaultConfig = {
    adapter: null,
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

export default class Request {
    constructor(axiosOpts, customConfig) {
        const config = Object.assign({}, defaultConfig, customConfig)
        const request = axios.create(axiosOpts)
        // 加载特定适配器
        if (config.hasOwnProperty("adapter") && config.adapter !== null) {
            request.defaults.adapter = config.adapter
        }

        request.interceptors.request.use(config.request_success, config.request_failed);
        request.interceptors.response.use(config.response_success, config.response_failed);

        request.all = axios.all;
        request.spread = axios.spread;

        return request
    }
}


