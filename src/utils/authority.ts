// vite使用动态路由，在动态导入组件的时候，需要注意不能将页面路径直接作为component导入，虽然开发环境一般是能正常加载，但是打包到生产环境的时候就会出错，所以我们需要添加以下代码：
const modules = import.meta.glob('../views/**/*.vue')

/* Layout */
export const Layout = () => import('@/layout/index.vue')

export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout'
      })
    })
}

const hasPermission = (roles: any, route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 前端控制路由生成
export const generateRoutesFn1 = (
  routes: any[],
  roles: string[]
): any[] => {
  const res: any[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = generateRoutesFn1(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  
  return res
}

// 后端控制路由生成
export const generateRoutesFn2 = (routes: any[]): any[] => {
  const res: any[] = []

  for (const route of routes) {
    const data: any = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta
    }
    if (route.component) {
      const comModule = modules[`../${route.component}.vue`]
      const component = route.component as string
      
      if (!comModule && !component.includes('#')) {
        console.error(`未找到${route.component}.vue文件，请创建`)
      } else {
        // 动态加载路由文件，可根据实际情况进行自定义逻辑
        data.component =
          component === '#' ? Layout : comModule
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutesFn2(route.children)
    }
    res.push(data as any)
  }
  return res
}

