import request from '@/utils/request'

export function getTableData(params) {
  return request({
    url: '/api/data/dataList',
    method: 'get',
    data: params
  })
}
