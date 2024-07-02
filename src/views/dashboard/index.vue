<template>
  <PanelGroup :loading="loading" />
  <h1 class="text-3xl font-bold underline text-red-600 ml-5">Hello world!</h1>
  <ElRow :gutter="20" justify="space-between">
    <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24" class="mb-2.5">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="5">
          <Table :data="state.tableData" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
      <ElSkeleton :loading="loading" animated :rows="5">
        <List :data="state.listData" />
      </ElSkeleton>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="10">
          <StatisticalChart />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import PanelGroup from './components/PanelGroup.vue'
import Table from './components/Table.vue'
import List from './components/List.vue'
import StatisticalChart from './components/StatisticalChart.vue'
import { getTableApi, getListApi } from '@/api/dashboard'
import type { ListData, TableData } from '@/api/dashboard/types'

const loading = ref<boolean>(true)

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
