<template>
  <div :class="{ 'has-logo': true }">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :router="true"
        :collapse="collapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <MenuItem v-for="route in routers" :key="route.path" :data="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import Logo from './Logo.vue'
import MenuItem from './MenuItem.vue'

const appStore = useAppStore()
const permissionStore = usePermissionStoreWithOut()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// const routers = reactive(useRouter().options.routes)
const routers = computed(() => permissionStore.getAddRouters)
const collapse = computed(() => appStore.getCollapse)

const activeMenu = computed(() => {
  const { currentRoute } = useRouter()
  return currentRoute.value.path
})
</script>

<style></style>
