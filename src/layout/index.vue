<template>
  <div class="app-wrapper" :class="{ mobile: isMobile }">
    <div
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        hideSidebar: collapse
      }"
    >
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      ></div>
      <SideBar class="sidebar-container" />
      <div class="main-container" :class="collapse ? 'is-collapse-main' : ''">
        <div
          class="layout-navbar"
          :class="{
            'fixed-header': header === 'fixed',
            'max-width': !collapse,
            'min-width': collapse
          }"
        >
          <NavBar />
        </div>
        <AppMain />
        <Footer />
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onBeforeMount, onUnmounted } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import SideBar from './components/SideBar/index.vue'
  import NavBar from './components/NavBar.vue'
  import AppMain from './components/AppMain.vue'
  import Footer from './components/Footer.vue'

  const isMobile = ref(false)
  const header = ref('fixed')
  const appStore = useAppStore()
  const collapse = computed(() => appStore.getCollapse)
  const device = computed(() => appStore.getDevice)

  const handleFoldSideBar = () => {
    appStore.setCollapse(true)
  }
  const handleIsMobile = () => {
    return document.body.getBoundingClientRect().width - 1 < 992
  }
  const handleResize = () => {
    if (!document.hidden) {
      isMobile.value = handleIsMobile()
      // if (isMobile) {
      //   //横向布局时如果是手机端访问那么改成纵向版
      //   this.$store.dispatch('settings/changeLayout', 'vertical')
      // } else {
      //   this.$store.dispatch('settings/changeLayout', this.oldLayout)
      // }
      appStore.toggleDevice(isMobile.value ? 'mobile' : 'desktop')
    }
  }
  onBeforeMount(() => {
    window.addEventListener('resize', handleResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<style lang="scss" scoped>
  @mixin fix-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $base-z-index - 2;
    width: calc(100% - #{$sideBarWidth});
    overflow: hidden;
    transition: width 0.28s;
  }
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .layout-container-vertical {
      position: relative;
      .main-container {
        position: relative;
        min-height: 100%;
        margin-left: $base-left-menu-max-width;
        background: #f6f8f9;
        // transition: $base-transition;
        .layout-navbar {
          position: fixed;
          top: 0;
          z-index: 100;
          background-color: $base-menu-background;
        }
        .max-width {
          width: $base-right-content-width;
        }
        .min-width {
          width: $base-right-content-width-min;
        }
        .hideSidebar .fixed-header {
          width: calc(100% - $base-left-menu-min-width);
        }
      }
      .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $base-z-index - 1;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        opacity: 0.5;
      }
    }

    /* 手机端开始 */
    &.mobile {
      .layout-container-vertical {
        &.hideSidebar .sidebar-container {
          width: 0 !important;
        }
        &.hideSidebar .main-container {
          width: 100%;
          margin-left: 0 !important;
        }
      }
    }
    /* 手机端结束 */
  }
</style>
