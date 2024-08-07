<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      class="login-form"
      label-position="top"
      status-icon
      :size="formSize"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          type="password"
          v-model.trim="ruleForm.password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item label="" prop="remember">
        <el-checkbox v-model="ruleForm.remember" label="记住我" size="small" />
        <div style="color: #fff; font-size: 12px; margin-left: 20px">
          <el-switch size="small" v-model="value1" @change="isUseDynamicRouter" />
          <span style="margin-left: 10px">使用动态路由</span>
        </div>
        <div style="color: #fff; font-size: 12px; margin-left: 20px">
          <el-switch size="small" v-model="value2" @change="isMenuHorizontal" />
          <span style="margin-left: 10px">菜单是否顶栏布局</span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          @click="submitForm(ruleFormRef)"
          :loading="loading"
        >
          login
        </el-button>
      </el-form-item>
      <div>
        <div class="tips">
          <span>账号：admin</span>
          <span>密码：admin</span>
        </div>
        <div class="tips">
          <span>账号：visitor</span>
          <span>密码：visitor</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { setToken } from '@/utils/auth'
import { useCache } from '@/hooks/useStorage'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { loginApi, getRouterApi } from '@/api/login'
import type { UserType } from '@/api/login/types'

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const { currentRoute, addRoute, push } = useRouter()
const { useStorage } = useCache()

const value1 = ref(appStore.getDynamicRouter)

const value2 = computed(() => {
  return appStore.getLayout === 'topmenu'
})

const loading = ref(false)

const formSize = ref('default')

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<UserType>({
  username: 'admin',
  password: 'admin',
  remember: false
})

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: 'Please input userName',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please select passWord',
      trigger: 'change'
    }
  ]
})

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: any) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

const isUseDynamicRouter = (v: boolean) => {
  appStore.setDynamicRouter(v)
}

const isMenuHorizontal = (v: boolean) => {
  const layout = v ? 'topmenu' : 'sidemenu'
  appStore.setLayout(layout)
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        const res: any = await loginApi(ruleForm)
        if (res.code == 200) {
          useStorage.set(appStore.getUserInfo, res.data)
          setToken('admin')

          const hour = new Date().getHours()
          const thisTime =
            hour < 8
              ? '早上好'
              : hour <= 11
              ? '上午好'
              : hour <= 13
              ? '中午好'
              : hour < 18
              ? '下午好'
              : '晚上好'
          ElNotification({
            title: thisTime,
            message: 'welcome',
            type: 'success'
          })
          // 是否使用动态路由
          if (appStore.getDynamicRouter) {
            getRole()
          } else {
            if (res.data.role === 'admin') {
              await permissionStore.generateRoutes('none').catch(() => {})
            } else {
              await permissionStore.generateRoutes('visitor').catch(() => {})
            }

            permissionStore.getAddRouters.forEach((route) => {
              addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
            })

            permissionStore.setIsAddRouters(true)
            push({ path: redirect.value || permissionStore.addRouters[0].path })
          }
        }
      } finally {
        loading.value = false
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 获取角色信息
const getRole = async () => {
  // admin - 模拟后端过滤菜单
  const res = await getRouterApi({})
  if (res) {
    const routers = res.data || []
    useStorage.set('roleRouters', routers)

    await permissionStore.generateRoutes('admin', routers).catch(() => {})
    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    })

    permissionStore.setIsAddRouters(true)
    push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/login.jpg');
  background-size: 100% 100%;

  .login-form {
    max-width: 480px;
    width: 30%;
    background-color: rgba(255, 255, 255, 0.279);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translateY(-50%);
  }
  ::v-deep(.el-form-item__label) {
    color: #ff940a;
    font-size: 16px;
    font-weight: 600;
  }

  ::v-deep(.el-checkbox__label) {
    color: #fff;
  }

  .tips {
    color: #fff;
    span {
      margin-right: 10px;
    }
  }
}
</style>
