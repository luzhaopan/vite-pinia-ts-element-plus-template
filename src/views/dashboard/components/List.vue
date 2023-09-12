<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>动态</span>
      </div>
    </template>
    <div class="page-list">
      <div class="item" v-for="val in props.data" :key="val.id">
        <img src="@/assets/avatar.webp" class="avatar" />
        <div>
          <div class="title">{{ val.title }}</div>
          <div class="subtitle">
            <div>{{ val.author }}</div>
            <div>{{ val.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ListData } from '@/api/dashboard/types'
const props = defineProps({
  data: {
    type: Array as PropType<ListData[]>,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  max-height: 275px;
  overflow: auto;
}
.item {
  margin: 2px 0;
  border-bottom: 1px solid $base-border-color;
  padding: 8px;
  display: flex;
}
.title {
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  font-weight: 600;
}
.subtitle {
  font-size: 14px;
  display: flex;
  align-items: center;
  line-height: 20px;
  padding: 5px 0;
}
.subtitle div:first-child {
  margin-right: 10px;
}
.content {
  font-size: 16px;
  padding: 10px 0;
}

.avatar {
  display: block;
  width: 42px;
  height: 42px;
  border-radius: 42px;
  margin-right: 10px;
}
</style>
