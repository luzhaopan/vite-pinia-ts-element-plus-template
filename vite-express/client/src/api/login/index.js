import request from '@/utils/request'

// 用户登录
export function loginApi(params) {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

// 用户退出登录
export function signOut(params) {
  return request({
    url: '/user/signOut',
    method: 'post',
    data: params
  })
}
