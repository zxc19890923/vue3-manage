<template>
  <ChildrenRouter :routerInfo="childrenRouterInfo"></ChildrenRouter>
</template>
<script>
import { reactive } from 'vue'
// 二级导航配置组件
import ChildrenRouter from '@/components/common/ChildrenRouter.vue'
  export default {
    name: 'case',    components: {
      ChildrenRouter
    },
    setup () {
      const childrenRouterInfo = reactive([
        { path: '/case/evidence-list', name: '证据和要素核验'},
        { path: '/case/case-list', name: '案件查询' }
      ])
      return {
        childrenRouterInfo
      }
    }
  }
</script>