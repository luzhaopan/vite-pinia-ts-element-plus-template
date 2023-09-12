<template>
  <el-table
    :data="props.data"
    style="width: 100%"
    max-height="300"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="date" label="Date" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <div>
    <el-pagination
      style="float: right; padding: 10px"
      background
      layout="prev, pager, next"
      :total="props.data.length"
    />
  </div>
</template>

<script lang="ts" setup>
import { TableData } from '@/api/dashboard/types'

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if ((rowIndex & 1) === 1) {
    return 'warning-row'
  } else {
    return 'success-row'
  }
}

const props = defineProps({
  data: {
    type: Array as PropType<TableData[]>,
    default: () => []
  }
})
</script>

<style>
/* .el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
} */
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
