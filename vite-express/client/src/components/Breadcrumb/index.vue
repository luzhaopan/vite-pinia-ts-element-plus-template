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

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()

const breadcrumbItems = ref([])

const getBreadcrumb = (route) => {
  const list = route.matched.filter((item) => item.name !== 'dashboard')
  breadcrumbItems.value = list.map((item) => {
    return item
  })
  console.log('breadcrumbItems', breadcrumbItems.value)
}

const getPath = (val) => {
  if (val.children && val.children.length) {
    getPath(val.children[0])
  } else {
    console.log(val.path)

    return val.path
  }
}

watch(
  () => currentRoute.value,
  (route) => {
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
