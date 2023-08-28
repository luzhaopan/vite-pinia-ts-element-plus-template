import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

interface ListProps {
  id: string
  author: string
  title: string
  content: string
  time: string
}

const timeout = 1000

const List: ListProps[] = []

for (let i = 0; i < 5; i++) {
  List.push(
    Mock.mock({
      id: '@increment(1)',
      author: '@cname',
      title: '@title(2, 3)',
      content: '@cword(8, 20)',
      time: '@datetime'
    })
  )
}
interface TableProps {
  id: string
  date: string
  name: string
  address: string
}

const Table: TableProps[] = []

for (let i = 0; i < 11; i++) {
  Table.push(
    Mock.mock({
      id: '@increment(1)',
      name: '@cname',
      address: '@cword(8, 20)',
      date: '@datetime'
    })
  )
}

export default [
  {
    url: '/analysis/table',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        data: Table
      }
    }
  },
  {
    url: '/analysis/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        data: List
      }
    }
  }
] as MockMethod[]
