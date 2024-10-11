<template>
  <div class="headbar-container">
    <div class="left-panel">
      <el-tooltip
        content="折叠/展开菜单"
        placement="bottom"
        transition=""
        :show-after="500"
        :hide-after="0"
      >
        <el-icon class="fold-unfold" @click="collapseHandle">
          <Expand v-if="collapse" />
          <Fold v-else />
        </el-icon>
      </el-tooltip>
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <div class="right">
      <UserInfo />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import UserInfo from '@/components/UserInfo/index.vue'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    const collapse = computed(() => appStore.getCollapse)

    const collapseHandle = () => {
      appStore.setCollapse(!collapse.value)
    }

    return {
      collapse,
      collapseHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.headbar-container {
  z-index: 10;
  background-color: var(--gl-headbar-background-color);
  box-shadow: var(--el-box-shadow-light);
  height: $base-nav-bar-height;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    margin-left: 10px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      margin-left: 10px;
    }
  }
}
</style>
