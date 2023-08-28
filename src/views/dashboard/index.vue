<template>
  <ElRow :gutter="20" justify="space-between">
    <ElCol :span="24">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="5">
          <Table :data="state.tableData" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="5">
          <List :data="state.listData" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import Table from './components/Table.vue'
import List from './components/List.vue'
import { getTableApi, getListApi } from '@/api/dashboard'
import { ListData, TableData } from '@/api/dashboard/types'

const loading = ref(true)

const state = reactive<{
  tableData: TableData[]
  listData: ListData[]
}>({
  tableData: [],
  listData: []
})

const getTable = async () => {
  loading.value = true
  const res: any = await getTableApi({
    cur_page: 1,
    page_size: 10
  })
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })

  state.tableData = res.data
}

const getList = async () => {
  loading.value = true
  const res: any = await getListApi({
    cur_page: 1,
    page_size: 10
  })
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })

  state.listData = res.data
}

const getAllApi = async () => {
  await Promise.all([getTable(), getList()])
  loading.value = false
}

getAllApi()
</script>

<style scoped></style>
