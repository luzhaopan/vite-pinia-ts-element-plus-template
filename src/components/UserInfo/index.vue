<template>
  <el-dropdown class="avatar-container">
    <span class="avatar-wrapper">
      <img src="@/assets/avatar.webp" class="user-avatar" />
      <div class="user-name">
        {{ username }}
      </div>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="toGithub">github</el-dropdown-item>
        <el-dropdown-item divided @click="logOut">Log Out</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCache } from '@/hooks/web/useCache'
import { removeToken } from '@/utils/auth'

const { replace } = useRouter()
const { wsCache } = useCache()

const username = 'luis'

const toGithub = () => {
  window.open(
    'https://github.com/luzhaopan/vite-pinia-ts-element-plus-template/tree/vite-admin-template'
  )
}

const logOut = async () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      wsCache.clear()
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
