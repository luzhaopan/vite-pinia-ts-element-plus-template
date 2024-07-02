<template>
  <ElRow :gutter="20" justify="space-between" class="mb-2.5">
    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24" class="mb-2.5">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="2">
          <div style="height: 48px">
            <div class="title">Total Sales</div>
            <div class="value">$666,888</div>
          </div>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24" class="mb-2.5">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="2">
          <div style="height: 48px">
            <div class="title">Operational Effect</div>
            <el-progress :percentage="percentage" :color="colors" />
          </div>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24" class="mb-2.5">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="2">
          <el-statistic title="Feedback number" :value="562">
            <template #suffix>
              <el-icon style="vertical-align: -0.125em">
                <ChatLineRound />
              </el-icon>
            </template>
          </el-statistic>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24" class="mb-2.5">
      <ElCard shadow="hover">
        <ElSkeleton :loading="loading" animated :rows="2">
          <el-countdown title="Remaining VIP time" format="HH:mm:ss" :value="value" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})
const value = ref(Date.now() + 1000 * 60 * 60 * 24 * 2)
const percentage = ref(0)

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]
onMounted(() => {
  setInterval(() => {
    percentage.value = (percentage.value % 100) + 10
  }, 500)
})
</script>

<style lang="scss" scoped>
.title {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
}
.value {
  color: #000;
  font-size: 20px;
}
</style>
