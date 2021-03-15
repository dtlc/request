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

export default class Service {
    constructor(axiosOpts, customConfig) {
        const config = Object.assign({}, defaultConfig, customConfig)
        const service = axios.create(axiosOpts)
        // 加载特定适配器
        if (config.hasOwnProperty("adapter") && config.adapter !== null) {
            service.defaults.adapter = config.adapter
        }

        service.interceptors.request.use(config.request_success, config.request_failed);
        service.interceptors.response.use(config.response_success, config.response_failed);

        service.all = axios.all;
        service.spread = axios.spread;

        return service
    }
}


