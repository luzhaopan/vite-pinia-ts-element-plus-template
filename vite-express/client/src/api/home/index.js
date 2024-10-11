import request from '@/utils/request'

export function getTableData(params) {
  return request({
    url: '/api/users/tableData',
    method: 'get',
    data: params
  })
}
