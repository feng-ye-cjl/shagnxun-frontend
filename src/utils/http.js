import axios from "axios";

// 创建axios示例
const httpInstance = axios.create({
    baseURL: 'http://140.143.154.96/day07',
    timeout: 5000,
})

// 配置请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
},e => Promise.reject(e))

// 响应拦截器
httpInstance.interceptors.response.use(res => res.data,e => {
    return Promise.reject(e)
})

// 导出
export default httpInstance
