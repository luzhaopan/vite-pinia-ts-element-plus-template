<template>
  <div class="login-box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      size="default"
      ref="ruleFormRef"
      label-width="120px"
      class="login-form"
      label-position="top"
      status-icon
    >
      <el-form-item label="" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="" prop="remember">
        <el-switch v-model="ruleForm.remember" />
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          style="width: 100%"
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { setToken } from '@/utils/auth'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/stores/modules/app'
// import { loginApi } from '@/api/login'
import router from '@/router'

const appStore = useAppStore()
const { wsCache } = useCache()

const loading = ref(false)

const ruleFormRef = ref()
const ruleForm = reactive({
  username: 'admin',
  password: 'admin',
  remember: false
})

const rules = reactive({
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

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        // const res = await loginApi(ruleForm)
        // console.log(res)
        // if (res.code == 200) {
        wsCache.set(appStore.getUserInfo, {
          username: 'admin',
          password: 'admin'
        })
        setToken('admin')
        //   router.push('/')
        // }
        router.push('/')
      } finally {
        loading.value = false
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-box {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/login/login-bg.jpg');
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
}
</style>
