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
      <div class="font-size-30 font-weight-700 text-center mb-2">注册</div>
      <el-form-item label="" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          :loading="loading"
          @click="handleRegister(ruleFormRef)"
        >
          register
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { register } from '@/api/login'
import router from '@/router'

const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: ''
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

const handleRegister = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const res = await register(ruleForm)
        // console.log(res)
        if (res.code === 200) {
          router.push('/login')
        }
      } catch (error) {
        console.log(error)
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
