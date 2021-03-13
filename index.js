import axios from 'axios'
import {uniapp} from "./src/adapters"

const defaultConf = {
    adapter: null,
    interceptors_request_success: (config) => {
        return config;
    },
    interceptors_request_failed: (error) => {
        return Promise.reject(error);
    },
    interceptors_response_success: (response) => {
        return response.data;
    },
    interceptors_response_failed: (error) => {
        return Promise.reject(error.response);
    }
}

export default class request {
    constructor(axiosConf, customConf) {
        const conf = Object.assign({}, defaultConf, customConf)
        this.service = axios.create(axiosConf)

        // 加载特定适配器
        if (conf.hasOwnProperty("adapter") && conf.adapter === "uniapp") {
            this.service.defaults.adapter = uniapp
        }

        // 请求拦截器
        this.service.interceptors.request.use(conf.interceptors_request_success, conf.interceptors_request_failed)
        // 响应拦截器
        this.service.interceptors.response.use(conf.interceptors_response_success, conf.interceptors_response_failed)

        this.service.all = axios.all;
        this.service.spread = axios.spread;
    }

}


