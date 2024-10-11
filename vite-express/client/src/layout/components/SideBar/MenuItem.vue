<template>
  <template v-if="props.data.hidden"></template>

  <el-menu-item
    v-else-if="
      hasOneShowingChild(props.data.children, props.data) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !props.data.alwaysShow
    "
    :index="onlyOneChild.path"
  >
    <el-icon v-if="onlyOneChild.meta.icon">
      <component :is="onlyOneChild.meta.icon" />
    </el-icon>
    <span>{{ onlyOneChild.name }}</span>
  </el-menu-item>

  <el-sub-menu v-else :index="props.data.path" :key="props.data.path">
    <template #title>
      <el-icon v-if="props.data.meta.icon">
        <component :is="props.data.meta.icon" />
      </el-icon>
      <span>{{ props.data.name }}</span>
    </template>
    <MenuItem
      v-for="child in props.data.children"
      :key="child.path"
      :data="child"
      :index="child.path"
    />
  </el-sub-menu>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
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

const onlyOneChild = ref(null)

const hasOneShowingChild = (children = [], parent = {}) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router and no name, the child router is displayed by default
  if (showingChildren.length === 1 && !parent.name) {
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
