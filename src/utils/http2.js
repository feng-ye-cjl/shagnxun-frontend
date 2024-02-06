import axios from "axios";

// 创建axios示例
const httpInstance = axios.create({
    baseURL: 'https://www.shangxun1.com',
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
