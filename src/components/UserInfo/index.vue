<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper">
      <img src="@/assets/avatar.webp" class="user-avatar" />
      <div class="user-name">
        {{ username }}
      </div>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item divided @click="logOut">Log Out</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCache } from '@/hooks/useStorage'
import { removeToken } from '@/utils/auth'

const { replace } = useRouter()
const { useStorage } = useCache()

const username = 'luis'

const logOut = async () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      useStorage.clear()
      removeToken()
      await replace('/login')
      ElMessage({
        type: 'success',
        message: '退出登录成功！'
      })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 20px;

  .avatar-wrapper {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .user-name {
      position: relative;
      margin-left: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
</style>
@/hooks/useStorage
