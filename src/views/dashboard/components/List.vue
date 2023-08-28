<template>
  <div v-for="val in props.data" :key="val.id">
    <div class="list">
      <div class="title">{{ val.title }}</div>
      <div class="subtitle">
        <div>{{ val.author }}</div>
        <div>{{ val.time }}</div>
      </div>
      <div class="content">{{ val.content }}</div>
    </div>
  </div>
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
.list {
  margin: 5px 0;
  border: 1px solid $base-border-color;
  padding: 10px;
}
.title {
  font-size: 18px;
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
</style>
