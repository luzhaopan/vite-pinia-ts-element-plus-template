<template>
  <ElRow :gutter="20" justify="space-between">
    <ElCol :span="24">
      <ElCard shadow="hover">
        <Table />
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
import { getListApi } from '@/api/dashboard'
import { ListData } from '@/api/dashboard/types'

const loading = ref(true)

const state = reactive<{
  listData: ListData[]
}>({
  listData: []
})

const getCount = async () => {
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

getCount()
</script>

<style scoped></style>
