<template>
  <template v-if="data.meta.hidden"></template>

  <el-menu-item
    v-else-if="
      hasOneShowingChild(data.children, data) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !data.alwaysShow
    "
    :index="onlyOneChild.path"
  >
    <el-icon v-if="onlyOneChild.meta.icon">
      <component :is="onlyOneChild.meta.icon" />
    </el-icon>
    <span>{{ onlyOneChild.name }}</span>
  </el-menu-item>

  <el-sub-menu v-else :index="data.path" :key="data.path">
    <template #title>
      <el-icon v-if="data.meta.icon">
        <component :is="data.meta.icon" />
      </el-icon>
      <span>{{ data.name }}</span>
    </template>
    <MenuItem v-for="child in data.children" :key="child.path" :data="child" :index="child.path" />
  </el-sub-menu>
</template>

<script lang="ts" setup>
defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild: any = ref(null)

const hasOneShowingChild = (children = [], parent = {}) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router and alwaysShow is true, the child router is displayed by default
  if (showingChildren.length === 1 && (parent as any).meta && !(parent as any).meta.alwaysShow) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
</script>
