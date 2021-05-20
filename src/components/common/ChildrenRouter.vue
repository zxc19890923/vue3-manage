<!--
  params: [{
    path: 路由跳转地址
    name: 路由显示名称
  }]
-->
<template>
  <div class="childrenRouter">
    <div class="routerNames">
      <div v-for="(item, index) in routerInfo" :key="index">
        <router-link :to="item.path">
          <div class="childrenRouterName">{{item.name}}</div>
        </router-link>
      </div>
    </div>
    <div class="childRouterContain">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
export default {
  name: 'childrenRouter',
  props: {
    routerInfo: Array
  },
  setup (props) {
    let routerInfo = reactive([])
    routerInfo = props.routerInfo
    // 检测属性数据变化
    watch(props.routerInfo, (newVal, oldVal) => {
      console.log(newVal, oldVal, '检测路由配置信息发生变化')
      routerInfo = newVal
    })
    return {
      routerInfo
    }
  }
}
</script>