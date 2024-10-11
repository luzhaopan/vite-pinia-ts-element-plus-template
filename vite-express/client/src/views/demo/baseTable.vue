<template>
  <el-table v-loading="loading" :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleDetail"> Detail </el-button>
        <el-button link type="primary" size="small" @click="handleEdit">Edit</el-button>
        <el-button link type="primary" size="small" @click="handleDel">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { getTableData } from '@/api/home'

const tableData = ref([])
const loading = ref(false)

const fetchTableData = async () => {
  loading.value = true
  const res = await getTableData()
  loading.value = false
  tableData.value = res.data
}

const handleDetail = () => {
  console.log('click')
}

const handleEdit = () => {
  console.log('click')
}

const handleDel = () => {
  console.log('click')
}

onMounted(() => {
  fetchTableData()
})
</script>
