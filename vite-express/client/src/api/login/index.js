import request from '@/utils/request'

// 用户登录
export function loginApi(params) {
  return request({
    url: '/api/users/login',
    method: 'post',
    data: params
  })
}

// 用户退出登录
export function logoutApi(params) {
  return request({
    url: '/api/users/logout',
    method: 'get',
    data: params
  })
}
