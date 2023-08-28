import request from '@/utils/request'
import type { ListParamType } from './types'

export const getListApi = (params: ListParamType) => {
  return request({
    url: '/analysis/list',
    method: 'get',
    data: params
  })
}

