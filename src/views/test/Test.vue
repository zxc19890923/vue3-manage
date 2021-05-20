<template>
  <ChildrenRouter :routerInfo="childrenRouterInfo"></ChildrenRouter>
</template>
<script>
import { reactive } from '@vue/reactivity'
// 二级导航配置组件
import ChildrenRouter from '@/components/common/ChildrenRouter.vue'
  export default {
    name: 'test',
    components: {
      ChildrenRouter
    },
    setup () {
      const childrenRouterInfo = reactive([
        { path: '/test/test-list', name: '测试数据' }
      ])
      return {
        childrenRouterInfo
      }
    }
  }
</script>