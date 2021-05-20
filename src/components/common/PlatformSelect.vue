<template>
  <el-select v-model="searchValue" placeholder="请选择" no-data-text="暂无数据" @change="changePlatform()" style="width: 100%">
    <el-option value="" label="请选择"></el-option>
    <el-option v-for="(item, index) in platform.platformList" :key="index" :value="item" :label="item"></el-option>
  </el-select>
</template>
<script>
import { onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'platformSelect',
  props: ['initVal'],
  emits: ['changePlatformSelect'],
  setup (props, {emit}) {
    // 使用vuex
    const store = useStore()
    let searchValue = ref('')
    const platform = reactive({
      platformList: {}
    })
    // 初始化默认值为空，watch只能监听href reactive function array所以使用一下格式
    watch(() => props.initVal, (newVal, oldVal) => {
      searchValue.value = newVal
    })
    onMounted (async () => {
      // 从vuex获取数据，这个接口只需要调一次，好多地方都有使用，如果在组件中掉接口那么每次加载组件都会调用接口。
      platform.platformList = store.state.platformList
    })
    const changePlatform = () => {
      // 返回查询结果
      emit('changePlatformSelect', searchValue.value)
    }
    return {
      searchValue,
      platform,
      changePlatform
    }
  }
}
</script>