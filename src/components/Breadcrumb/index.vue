<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group appear enter-active-class="animate__animated animate__fadeInRight">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="item.path"
        :to="getPath(item)"
      >
        <span
          v-if="item.redirect === 'noRedirect' || index == breadcrumbItems.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}</span
        >
        <a v-else>{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router'

const { currentRoute } = useRouter()

const breadcrumbItems: any = ref<AppRouteRecordRaw[]>([])

const getBreadcrumb = (route: RouteLocationNormalizedLoaded) => {
  const list = route.matched.filter((item) => item.children.length !== 1)
  breadcrumbItems.value = list.map((item) => {
    return item
  })
  // console.log('breadcrumbItems', breadcrumbItems.value)
}

const getPath = (val: AppRouteRecordRaw) => {
  if (val.children && val.children.length) {
    getPath(val.children[0])
  } else {
    return val.path
  }
}

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    getBreadcrumb(route)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
