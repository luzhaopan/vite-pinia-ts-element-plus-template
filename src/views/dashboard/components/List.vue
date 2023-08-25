<template>
  <div>
    <div v-for="(val, index) in list" :key="index">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div v-if="val.imgUrl || val.iconClass" class="mr-4">
            <el-avatar v-if="val.imgUrl" size="large" :src="val.imgUrl" />
          </div>
          <div>
            <p class="text-sm mb-1">
              {{ val.subTitle }}
              <el-tag v-if="val.tag">{{ val.tag }}</el-tag>
            </p>
            <p v-if="val.time" class="text-xs text-gray-500">{{ val.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// list初始化
const list: any[] = [
  {
    imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    title: '支付宝',
    subTitle: '斗通关无际县军连用知政以该果思快领c。',
    tag: '科学搬砖组',
    time: '9小时前',
    href: 'javascript:;'
  },
  {
    imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    title: '支付宝',
    subTitle: '斗通关无际县军连用知政以该果思快领c。',
    tag: '科学搬砖组',
    time: '9小时前'
  },
  {
    imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    title: '支付宝',
    subTitle: '斗通关无际县军连用知政以该果思快领c。',
    tag: '科学搬砖组',
    time: '9小时前'
  },
  {
    imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    title: '支付宝',
    subTitle: '斗通关无际县军连用知政以该果思快领c。',
    tag: '科学搬砖组',
    time: '9小时前'
  },
  {
    imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    title: '支付宝',
    subTitle: '斗通关无际县军连用知政以该果思快领c。',
    tag: '科学搬砖组',
    time: '9小时前'
  },
  {
    imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    title: '支付宝',
    subTitle: '斗通关无际县军连用知政以该果思快领c。',
    tag: '科学搬砖组',
    time: '9小时前'
  }
]
</script>

<style lang="scss" scoped>
::v-deep(.el-card__header) {
  margin-bottom: -1px;
}

::v-deep(.el-card__body) {
  padding: 0;
}

.c-list-card-body {
  transition: all 0.3s;
  position: relative;
  padding: 15px;
  box-shadow:
    1px 0 0 0 #f0f0f0,
    0 1px 0 0 #f0f0f0,
    1px 1px 0 0 #f0f0f0,
    inset 1px 0 0 0 #f0f0f0,
    inset 0 1px 0 0 #f0f0f0;
}

.c-list-card-body:hover {
  z-index: 1;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
