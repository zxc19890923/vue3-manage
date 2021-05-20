<template>
  <div class="contain">
    <div id="nav">
      <div style="height: 20px"></div>
      <router-link to="/user" active-class="active">
        <div class="navBtn">用户</div>
      </router-link>
      <router-link to="/case" active-class="active">
        <div class="navBtn">案件</div>
      </router-link>
      <router-link to="/test" active-class="active">
        <div class="navBtn">测试</div>
      </router-link>
    </div>
    <div class="navChild">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    // 交易平台数据，进入系统获取一次
    store.dispatch('getPlatformList')
    // 欠款人数据，进入系统获取一次
    store.dispatch('getBorrowerList')
    // 案件阶段列表，进入系统获取一次
    store.dispatch('getCaseStageList')
  }
}
</script>
<style lang="scss" scoped>
  .contain {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    #nav {
      width: 60px;
      height: 100%;
      text-align: center;
      background: #444;
      color: #fff;
      flex-shrink: 0;
      .navBtn {
        padding: 20px 0;
        color: #ccc;
        background: #333;
        flex: 1;
        flex-shrink: 0;
      }
      .active .navBtn {
        color: #fff;
        background: #000;
      }
    }
    .navChild {
      flex: 1;
      flex-shrink: 0;
      overflow: auto;
    }
  }
</style>
