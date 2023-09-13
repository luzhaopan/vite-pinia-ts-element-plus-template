<template>
  <EChart :options="options" height="600px" />
</template>
<script lang="ts" setup>
const options = {
  backgroundColor: '#fff',
  title: {
    text: '基础雷达图'
  },
  tooltip: {},
  legend: {
    data: ['新增建设项目', '施工数量', '竣工数量']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '1月', max: 600 },
      { name: '2月', max: 600 },
      { name: '3月', max: 600 },
      { name: '4月', max: 600 },
      { name: '5月', max: 600 },
      { name: '6月', max: 600 },
      { name: '7月', max: 600 },
      { name: '8月', max: 600 },
      { name: '9月', max: 600 },
      { name: '10月', max: 600 },
      { name: '11月', max: 600 },
      { name: '12月', max: 600 }
    ]
  },
  series: [
    {
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      itemStyle: { normal: { areaStyle: { type: 'default' } } },
      data: [
        {
          value: [89, 56, 142, 168, 232, 236, 358, 469, 265, 46, 55, 66],
          name: '新增建设项目'
        },
        {
          value: [28, 36, 12, 68, 232, 336, 458, 569, 165, 146, 87, 35],
          name: '施工数量'
        },
        {
          value: [289, 356, 12, 16, 23, 36, 58, 69, 126, 246, 355, 466],
          name: '竣工数量'
        }
      ]
    }
  ]
}
</script>
