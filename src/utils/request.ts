import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import router from '@/router'

function getSession(key: string) {
  const json: any = window.sessionStorage.getItem(key)
  return JSON.parse(json)
}

//读取环境
export const BASE_API: string = import.meta.env.VITE_APP_BASE_API as string
// console.log(BASE_API, 'VITE_APP_BASE_API')

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getSession('token')) {
      config.headers.common['Authorization'] = `${getSession('token')}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code && res.code !== 200) {
      // `token` 过期或者账号已在别处登录
      const codeArr = [401, 4001]
      if (codeArr.includes(res.code)) {
        window.sessionStorage.clear() // 清除浏览器全部临时缓存
        router.push('/login') // 去登录页面
        ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
          .then(() => {})
          .catch(() => {})
        return Promise.reject(service.interceptors.response)
      }
      ElMessage.error(res.message)
      return Promise.resolve(res)
    } else {
      return response.data
    }
  },
  (error: AxiosError) => {
    if (error.message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时')
    } else if (error.message == 'Network Error') {
      ElMessage.error('网络连接错误')
    } else {
      ElMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
