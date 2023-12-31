import request from '@/utils/request'
import type { UserType } from './types'

// 用户登录
export const loginApi = (data: UserType) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户退出登录
export function signOut() {
  return request({
    url: '/user/signOut',
    method: 'post'
  })
}

// 路由获取
export const getRouterApi = (data: any) => {
  return request({
    url: '/role/routerList',
    method: 'get',
    data
  })
}