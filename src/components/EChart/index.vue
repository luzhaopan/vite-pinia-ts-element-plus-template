<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts" setup>
import { useECharts } from '@/hooks/useECharts'
import type { EChartsOption } from 'echarts'

const props = defineProps({
  width: {
    type: String as PropType<string>,
    default: '100%'
  },
  height: {
    type: String as PropType<string>,
    default: '300px'
  },
  options: {
    type: Object as PropType<EChartsOption>,
    required: true
  }
})

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>, 'light')

onMounted(() => {
  setOptions(props.options)
})
</script>
