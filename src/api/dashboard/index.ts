import request from '@/utils/request'
import type { ListParamType } from './types'

export const getTableApi = (params: any) => {
  return request({
    url: '/analysis/table',
    method: 'get',
    data: params
  })
}

export const getListApi = (params: ListParamType) => {
  return request({
    url: '/analysis/list',
    method: 'get',
    data: params
  })
}

export const getGeometryListApi = (params?: any) => {
  return request({
    url: '/geometry/list',
    method: 'get',
    data: params
  })
}


