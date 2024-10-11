import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/users/list',
    method: 'get',
    data: params
  })
}
