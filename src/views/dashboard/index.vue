<template>
  <ElRow :gutter="20" justify="space-between">
    <ElCol :span="24">
      <ElCard shadow="hover">
        <Table />
      </ElCard>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover">
        <List />
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import Table from './components/Table.vue'
import List from './components/List.vue'
</script>

<style scoped></style>
