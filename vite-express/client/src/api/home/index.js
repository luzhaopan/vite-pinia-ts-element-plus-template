import request from '@/utils/request'

export function getTableData(params) {
  return request({
    url: '/api/data/dataList',
    method: 'get',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/api/data/add',
    method: 'post',
    data: params
  })
}

export function editData(params) {
  return request({
    url: '/api/data/edit',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: `/api/data/delete/${params.id}`,
    method: 'get',
    data: params
  })
}