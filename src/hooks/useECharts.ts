import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { useEventListener } from './useEventListener'
import { useBreakpoint } from './useBreakpoint'

// eslint-disable-next-line no-unused-vars
type Fn = (...arg: any) => any

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({}) as Ref<EChartsOption>
  let removeResizeFn: Fn = () => {}

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value
    } as EChartsOption
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, t)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      setTimeout(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      setTimeout(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts('default')

          if (!chartInstance) return
        }
        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts('default')
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  }
}
