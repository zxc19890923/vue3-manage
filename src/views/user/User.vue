<template>
  <ChildrenRouter :routerInfo="childrenRouterInfo"></ChildrenRouter>
</template>
<script>
import { reactive } from 'vue'
// 二级导航配置组件
import ChildrenRouter from '@/components/common/ChildrenRouter.vue'
  export default {
    name: 'case',
    components: {
      ChildrenRouter
    },
    setup () {
      const childrenRouterInfo = reactive([
        { path: '/user/user-list', name: '用户列表' }
      ])
      return {
        childrenRouterInfo
      }
    }
  }
</script>