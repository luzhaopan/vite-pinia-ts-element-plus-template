<template>
  <div :class="{ 'has-logo': true }">
    <logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :router="true"
        :collapse="collapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <MenuItem v-for="route in routes" :key="route.path" :data="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app'
import { useRouter } from 'vue-router'
import Logo from './Logo.vue'
import MenuItem from './MenuItem.vue'

const route = useRouter()
const routes = reactive(useRouter().options.routes)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const appStore = useAppStore()
const collapse = computed(() => appStore.getCollapse)

const activeMenu = computed(() => {
  const { currentRoute } = route
  return currentRoute.value.path
})
</script>

<style>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    } */
</style>
