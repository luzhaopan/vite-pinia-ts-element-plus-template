<template>
  <div class="calendar-card">
    <div class="left">
      <el-select
        v-model="state.currentYear"
        class="m-2"
        placeholder="Select"
        size="small"
        @change="yearSelect"
      >
        <el-option
          v-for="item in state.yearList"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>

      <div class="month">
        <div
          v-for="item in state.monthList"
          class="month-item"
          @click="selectedMonth(item.value)"
          :class="{ actived: item.selected }"
          :key="item.name"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="right">
      <div class="weekdays">
        <div class="weekdays-item">Sun</div>
        <div class="weekdays-item">Mon</div>
        <div class="weekdays-item">Tue</div>
        <div class="weekdays-item">Web</div>
        <div class="weekdays-item">Thu</div>
        <div class="weekdays-item">Fri</div>
        <div class="weekdays-item">Set</div>
      </div>

      <div class="days" v-for="(dayItem, i) in state.dayList" :key="i">
        <div class="days-item" v-for="(item, j) in dayItem" :key="j">
          <div
            :class="{
              list: item.day.getMonth() + 1 === state.currentMonth,
              'other-month': item.day.getMonth() + 1 !== state.currentMonth,
              'weekend-day': isWeekend(item.day) && item.day.getMonth() + 1 === state.currentMonth,
              otherWeekendDay: isWeekend(item.day) && item.day.getMonth() + 1 !== state.currentMonth
            }"
          >
            <div class="day-text">
              {{ formatDate(null, item.day.getMonth() + 1, item.day.getDate()) }}
            </div>
            <div
              class="tags"
              v-if="!isWeekend(item.day) && !isFestival(item.day) && compareDate(item.day)"
            >
              <div class="hard" v-if="!timeCompare(item.startTime)">辛苦了！</div>
              <div v-else>
                <div class="leave" v-if="!item.startTime">需请假</div>
                <div class="late" v-else>晚到</div>
              </div>
            </div>
            <div class="tags" v-if="!compareDate(item.day)">
              <div class="fighting">加油！</div>
            </div>
            <div
              class="work-time"
              v-if="
                !isWeekend(item.day) &&
                item.startTime &&
                !isFestival(item.day) &&
                compareDate(item.day)
              "
            >
              <div>· {{ item.startTime }}</div>
              <div>· {{ item.endTime }}</div>
            </div>
            <div class="weekend-tag">
              <p v-if="isWeekend(item.day) && !isFestival(item.day)" class="weekend-text">周末</p>
              <p v-else-if="isFestival(item.day)" class="festival-data">节假日</p>
              <p v-else class="daily-text">工作日</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { festivalData } from './festivalData'

interface dateType {
  yearList: any[]
  monthList: any[]
  currentDay: number
  currentMonth: number
  currentYear: number
  currentWeek: number
  days: any[]
  dayList: any[]
}

const state = reactive<dateType>({
  yearList: [
    {
      value: 2022,
      selected: false
    },
    {
      value: 2023,
      selected: false
    }
  ],
  monthList: [
    {
      value: 1,
      name: 'Jan',
      selected: false
    },
    {
      value: 2,
      name: 'Feb',
      selected: false
    },
    {
      value: 3,
      name: 'Mar',
      selected: false
    },
    {
      value: 4,
      name: 'Apr',
      selected: false
    },
    {
      value: 5,
      name: 'May',
      selected: false
    },
    {
      value: 6,
      name: 'Jun',
      selected: false
    },
    {
      value: 7,
      name: 'Jul',
      selected: false
    },
    {
      value: 8,
      name: 'Aug',
      selected: false
    },
    {
      value: 9,
      name: 'Sep',
      selected: false
    },
    {
      value: 10,
      name: 'Oct',
      selected: false
    },
    {
      value: 11,
      name: 'Nov',
      selected: false
    },
    {
      value: 12,
      name: 'Dec',
      selected: false
    }
  ],
  currentDay: 1,
  currentMonth: 1,
  currentYear: 2023,
  currentWeek: 1,
  days: [],
  dayList: []
})

onMounted(() => {
  state.currentYear = new Date().getFullYear()
  state.currentMonth = new Date().getMonth() + 1
  state.yearList.forEach((item) => {
    if (item.value === state.currentYear) {
      item.selected = true
    } else {
      item.selected = false
    }
  })
  selectedMonth(state.currentMonth)
})

// 初始化日历数据
const initData = (cur) => {
  let date
  if (cur) {
    date = new Date(cur)
  } else {
    const d = new Date(formatDate(new Date().getFullYear(), new Date().getMonth(), 1))
    d.setDate(35)
    date = new Date(formatDate(d.getFullYear(), d.getMonth() + 1, 1))
  }

  state.currentDay = date.getDate() // 月份的某一天
  state.currentYear = date.getFullYear()
  state.currentMonth = date.getMonth() + 1
  state.currentWeek = date.getDay() // 表示星期的某一天的数字 1...6,0

  if (state.currentWeek === 0) {
    state.currentWeek = 7
  }

  const target = formatDate(state.currentYear, state.currentMonth, state.currentDay)

  state.days.length = 0
  // 根据本月的1号获取之前的几天放到前面
  for (let i = state.currentWeek; i >= 0; i--) {
    const d2 = new Date(target)
    d2.setDate(d2.getDate() - i)
    const map: any = {
      startTime: '09:20:00',
      endTime: '18:00:00'
    }
    map.day = d2
    state.days.push(map)
  }
  // 之后的其他周
  for (let j = 1; j < 35 - state.currentWeek; j++) {
    const d3 = new Date(target)
    d3.setDate(d3.getDate() + j)
    let map
    if (j === 2 || j === 5 || j === 11) {
      map = {
        startTime: '09:30:00',
        endTime: '18:00:00'
      }
    } else if (j === 20 || j === 28) {
      map = {
        startTime: 0,
        endTime: 0
      }
    } else {
      map = {
        startTime: '09:00:00',
        endTime: '18:00:00'
      }
    }
    map.day = d3
    state.days.push(map)
  }

  state.dayList = []
  for (let i = 0; i < state.days.length; i += 7) {
    state.dayList.push(state.days.slice(i, i + 7))
  }
}

// 年份选择
const yearSelect = () => {
  getDays(state.currentYear, state.currentMonth)
}

// 月分选择
const selectedMonth = (m) => {
  state.currentMonth = m
  state.monthList.forEach((item) => {
    if (item.value === m) {
      item.selected = true
    } else {
      item.selected = false
    }
  })
  getDays(state.currentYear, state.currentMonth)
}

// 获取日期
const getDays = (year, month) => {
  const d = new Date(formatDate(year, month, 1))
  initData(formatDate(d.getFullYear(), d.getMonth() + 1, 1))
}

// 格式化日期
const formatDate = (year, month, day) => {
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return year ? year + '-' + month + '-' + day : month + '-' + day
}

// 判断是否周末
const isWeekend = (date) => {
  return date.getDay() === 6 || date.getDay() === 0
}

// 判断节假日
const isFestival = (item) => {
  const date = formatDate(item.getFullYear(), item.getMonth() + 1, item.getDate())
  return festivalData[state.currentYear].includes(date)
}

// 判断是否是未来的日期
const compareDate = (date) => {
  const now = new Date().valueOf()
  const cur = new Date(date).valueOf()
  return now > cur
}

// 对比时间是否迟到
const timeCompare = (time1, time2 = '09:00:00') => {
  return time1 ? timeToSec(time1) > timeToSec(time2) : true
}

const timeToSec = (time) => {
  const hour = time.split(':')[0]
  const min = time.split(':')[1]
  const sec = time.split(':')[2]
  return Number(hour * 3600) + Number(min * 60) + Number(sec)
}
</script>
<style lang="scss" scoped>
.calendar-card {
  font-size: 13px;
  width: 100%;
  background: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.left {
  flex: 0 0 100px;
  color: #727272;
  padding: 20px 10px;
}

.month {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.month-item {
  font-weight: 600;
  width: 35px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 4px;
  text-align: center;
  cursor: pointer;
  margin: 4px 2px;
}

.actived {
  background: $base-color-default;
  color: #fff;
}

.right {
  flex: 1;
}

.weekdays {
  margin: 0;
  padding: 10px;
  display: flex;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid $base-border-color;
}

.weekdays-item {
  flex: 1;
  text-align: center;
}

.days {
  margin: 0;
  display: flex;
  flex: 1;
}

.days-item {
  display: flex;
  flex: 1;
  list-style-type: none;
  display: inline-block;
  width: 13.4%;
  border: 1px solid #e5e5e5;
  margin: 5px;
  border-radius: 4px;
}

.list {
  padding: 4px;
  position: relative;
  height: 100px;
  color: #000;
  background-color: #fff;
}

.other-month {
  padding: 4px;
  position: relative;
  height: 100px;
  color: #7b7b7b;
  background-color: #bfbfbf59;
}

.tags {
  position: absolute;
  top: 5px;
  right: 5px;
}

.hard {
  background-color: #70b562;
  color: #fff;
  border-radius: 3px;
  padding: 0 4px;
}

.late {
  background-color: #eab439;
  color: #fff;
  border-radius: 3px;
  padding: 0 4px;
}

.leave {
  background-color: #eef208;
  color: #fff;
  border-radius: 3px;
  padding: 0 4px;
}

.fighting {
  background-color: #37f208;
  color: #fff;
  border-radius: 3px;
  padding: 0 4px;
}

.day-text {
  font-weight: 600;
  text-decoration: underline;
  text-align: left;
  margin-left: 10px;
}
.work-time {
  margin-left: 10px;
}
.weekend-tag {
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.weekend-text {
  color: red;
  margin: 2px 5px;
}

.festival-data {
  color: red;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  width: 50px;
  text-align: center;
}

.daily-text {
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  width: 50px;
  text-align: center;
  color: #000;
}

.weekend-day {
  background-color: #99ea5f;
}

.otherWeekendDay {
  background-color: #99ea5f75;
}
</style>
