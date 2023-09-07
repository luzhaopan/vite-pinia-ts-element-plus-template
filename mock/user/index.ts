import { MockMethod } from 'vite-plugin-mock'

const timeout = 1000

const List: {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}[] = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin',
    roleId: '1',
    permissions: ['*.*.*']
  },
  {
    username: 'test',
    password: 'test',
    role: 'test',
    roleId: '2',
    permissions: ['example:dialog:create', 'example:dialog:delete']
  }
]

const routerList = [
  {
    path: '/',
    component: '#',
    meta: { title: 'Dashboard', icon: 'Odometer' },
    redirect: '/dashboard/index',
    children: [
      {
        path: '/dashboard/index',
        name: 'Dashboard',
        component: 'views/dashboard/index',
        meta: { title: 'Dashboard', icon: 'Odometer' }
      }
    ]
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: '#',
    meta: { title: 'Echarts', icon: 'PieChart' },
    children: [
      {
        path: '/echarts/barEcharts',
        name: 'BarEcharts',
        component: 'views/echarts/barEcharts',
        meta: { title: 'BarEcharts' }
      },
      {
        path: '/echarts/radarEcharts',
        name: 'RadarEcharts',
        component: 'views/echarts/radarEcharts',
        meta: { title: 'RadarEcharts' }
      }
    ]
  },
  {
    path: '/timeline',
    component: '#',
    meta: { title: 'TimelineDemo' },
    redirect: '/timeline/index',
    children: [
      {
        path: '/timeline/index',
        name: 'Timeline',
        component: 'views/timeline/index',
        meta: { title: 'Timeline', icon: 'Timer' }
      }
    ]
  }
]

export default [
  // 登录接口
  {
    url: '/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (
          user.username === data.username &&
          user.password === data.password
        ) {
          hasUser = true
          return {
            code: 200,
            data: user
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '账号或密码错误!'
        }
      }
    }
  },
  // 退出接口
  {
    url: '/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/role/routerList',
    method: 'get',
    timeout,
    response: () => {
      // const { roleName } = query
      return {
        code: 200,
        data: routerList
      }
    }
  },
] as MockMethod[]
