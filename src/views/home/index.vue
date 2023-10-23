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
          <div>为了维护世界和平，让我们一起努力吧！</div>
        </div>
      </div>
      <Clock />
    </div>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>information</span>
      </div>
    </template>
    <table class="table">
      <tr>
        <td>vite</td>
        <td>^4.4.9</td>
        <td>vue</td>
        <td>^3.3.4</td>
      </tr>
      <tr>
        <td>pinia</td>
        <td>^2.1.6</td>
        <td>vue-router</td>
        <td>^4.2.4</td>
      </tr>
      <tr>
        <td>element-plus</td>
        <td>^2.3.9</td>
        <td>axios</td>
        <td>^1.2.1</td>
      </tr>
      <tr>
        <td>echarts</td>
        <td>^5.4.3</td>
        <td>mockjs</td>
        <td>^1.1.0</td>
      </tr>
      <tr>
        <td>lodash-es</td>
        <td>^4.17.21</td>
        <td>vite-plugin-mock</td>
        <td>2.9.6</td>
      </tr>
      <tr>
        <td>web-storage-cache</td>
        <td>^1.1.1</td>
        <td>eslint</td>
        <td>^8.46.0</td>
      </tr>
      <tr>
        <td>github address</td>
        <td colspan="3">
          <a
            href="https://github.com/luzhaopan/vite-pinia-ts-element-plus-template/tree/vite-admin-template"
          >
            点我
          </a>
        </td>
      </tr>
    </table>
  </el-card>
</template>

<script setup>
import Clock from '@/components/Clock/index.vue'
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
