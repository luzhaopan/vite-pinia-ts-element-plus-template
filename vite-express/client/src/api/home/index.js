import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/users',
    method: 'get',
    data: params
  })
}
