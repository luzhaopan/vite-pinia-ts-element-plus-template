<template>
  <div class="page-clock">
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>
    <div class="date-block">
      <div class="date"></div>
      <div class="week"></div>
      <div class="time"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
const left = () => {
  const secondHand = document.querySelector('.second-hand')
  const minHand = document.querySelector('.min-hand')
  const hourHand = document.querySelector('.hour-hand')
  const updata = () => {
    const now = new Date()
    //秒针的旋转计算
    const seconds = now.getSeconds()
    const secondsDegrees = seconds * 6
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
    //分针旋转的计算
    const mins = now.getMinutes()
    const minsDegrees = mins * 6 + (seconds / 60) * 6
    minHand.style.transform = `rotate(${minsDegrees}deg)`
    //时针旋转的计算
    const hours = now.getHours()
    const hoursDegrees = (hours - 12) * 30 + (mins / 60) * 30
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`
  }
  setInterval(updata, 1000)
  updata()
}

const right = () => {
  const DATE = document.querySelector('.date')
  const WEEK = document.querySelector('.week')
  const TIME = document.querySelector('.time')
  const Adate = () => {
    const now = new Date()
    const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const str = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    DATE.innerHTML = str
    WEEK.innerHTML = weekList[now.getDay()]
  }
  Adate()
  setInterval(Adate, 24 * 3600)

  // 分钟，秒，不足两位时，用0进行凑位。
  const zero = (arg) => {
    if (arg >= 10) {
      return arg
    } else {
      return '0' + arg
    }
  }
  // 显示当前时间的函数
  const Atime = () => {
    const now = new Date()
    const str = now.getHours() + ':' + zero(now.getMinutes()) + ':' + zero(now.getSeconds())
    TIME.innerHTML = str
  }
  Atime()
  setInterval(Atime, 1000)
}

onMounted(() => {
  left()
  right()
})
</script>
<style lang="scss" scoped>
.page-clock {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clock {
  position: relative;
  margin-right: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  // border: 2px solid white;
  // background: rgba(77, 77, 77, 0.4);
  // box-shadow:
  //   0 0 2px 4px rgba(0, 0, 0, 0.1),
  //   0 0 10px 3px rgba(0, 0, 0, 0.2),
  //   0 0 1px 2px #efefef inset,
  //   0 0 30px rgb(66, 66, 66) inset;
  background-image: url('@/assets/clock.jpg');
  background-repeat: no-repeat;
  background-position: center 0.1px;
  background-size: 100% 100%;
}
.clock-face {
  position: relative;
  width: 100%;
  height: 100%;
}
/*时钟表表盘中心圆点*/
.clock-face::after {
  content: '';
  display: block;
  width: 2px;
  height: 2px;
  background-color: #357e7e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
/*指针通用样式，在sass中可以封装成一个mixin*/
.hand {
  background: #fff;
  position: absolute;
  bottom: 50%;
  left: 50%;
  /*transform:translateX(-50%); 虽说这样可以使指针居中线，但是translate的平移是相对于自身center位置的，那么这样居中处理后，下面的旋转仍旧按的是平移之前的right位置为原点，虽说三个指针通过translateY看似处于一条中线上，实际旋转时仍然是按照各自的right位置进行旋转*/
  transform: rotate(0deg);
  transform-origin: 50% 100%;
  // box-shadow:
  //   0 0 0 1px rgba(0, 0, 0, 0.1),
  //   0 0 8px rgba(0, 0, 0, 0.4),
  //   2px 5px 1px rgba(0, 0, 0, 0.5);
}

/*时针样式*/
.hour-hand {
  height: 24%;
  width: 2px;
  margin-left: -1px; /*使时针向左移动自身的一半来居中*/
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.min-hand {
  height: 30%;
  width: 2px;
  margin-left: -1px;
}
.second-hand {
  height: 35%;
  width: 1px;
  margin-left: -0.5px;
  border-bottom-left-radius: 1px;
  border-top-left-radius: 1px;
  background-color: red;
}
/*日期，时间，星期几的样式*/
.date-block {
  font-size: 14px;
  font-family: serif;
  font-weight: bold;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
}
</style>
