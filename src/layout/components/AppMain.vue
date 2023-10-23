<template>
  <div class="app-main-container">
    <router-view v-slot="{ Component }">
      <keep-alive :include="getCaches">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// const getCaches = reactive([])
const getCaches = computed(() => {
  // return tagsViewStore.getCachedViews
  return []
})
</script>

<style lang="scss" scoped>
.app-main-container {
  min-height: $base-app-main-height;
  margin-top: $base-nav-bar-height;
  position: relative;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
}
</style>
