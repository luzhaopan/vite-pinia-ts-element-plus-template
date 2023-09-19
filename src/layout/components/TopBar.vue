<template>
  <div class="top-header">
    <Logo class="logo" />
    <el-menu
      :default-active="activeMenu"
      class="el-menu-demo"
      :router="true"
      mode="horizontal"
      @select="handleSelect"
    >
      <MenuItem v-for="route in routers" :key="route.path" :data="route" />
    </el-menu>
    <UserInfo />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import Logo from './SideBar/Logo.vue'
import MenuItem from './SideBar/MenuItem.vue'

const activeMenu = computed(() => {
  const { currentRoute } = useRouter()
  return currentRoute.value.path
})

const permissionStore = usePermissionStoreWithOut()
const routers = computed(() => permissionStore.getAddRouters)

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--el-menu-border-color);
}
.logo {
  flex: 0 0 240px;
}
.el-menu-demo {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
