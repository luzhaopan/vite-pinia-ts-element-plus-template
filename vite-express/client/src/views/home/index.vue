<template>
  <div class="page-header">
    <div class="page-header-heading">
      <span class="page-header-heading-title">Home</span>
    </div>
    <div class="page-header-content">
      <div class="page-header-info">
        <div>
          <img src="@/assets/avatar.webp" class="avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            Hello，nice to meet u!<span class="welcome-text">，good luck!</span>
          </div>
          <div class="underline text-3xl font-bold">为了维护世界和平，让我们一起努力吧！</div>
        </div>
      </div>
      <Clock />
    </div>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>动态</span>
      </div>
    </template>
    <div>
      <div>
        <div class="flex items-center mt-3" v-for="item in list" :key="item.desc">
          <img src="@/assets/avatar.webp" class="w-8 h-8 rounded-lg" />
          <div class="content">
            <div class="text-base font-bold">
              {{ item.title }}
            </div>
            <div class="text-sm">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Clock from '@/components/Clock/index.vue'
import { getTableData } from '@/api/home'

const list = ref([])

const submitForm = async () => {
  const res = await getTableData()
  list.value = res.data
}
onMounted(() => {
  submitForm()
})
</script>

<style lang="scss" scoped>
.page-header {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: var(--el-box-shadow-light);
}

.page-header-heading {
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
}

.page-header-heading-title {
  display: block;
  float: left;
  margin-bottom: 0;
  padding-right: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
}

.page-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.content {
  margin-left: 15px;
}

.content-title {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
}

.avatar {
  display: block;
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

.box-card {
  margin-top: 20px;
}

.table {
  width: 100%;
  color: #666;
  border-collapse: collapse;
  background-color: #fff;

  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;

    &:nth-child(odd) {
      width: 20%;
      text-align: right;
      background-color: #f7f7f7;
    }
  }
}
</style>
