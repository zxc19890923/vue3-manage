import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import getListFunction from '@/common/getListFunction.js'
const { getListData } = getListFunction()
export default createStore({
  state: {
    platformList: [], // 平台名称列表
    borrowerList: [], // 欠款人列表
    caseStageList: [] // 案件阶段列表
  },
  mutations: {
    getPlatformList (state, data) {
      state.platformList = data
    },
    getBorrowerList (state, data) {
      state.borrowerList = data
    },
    getCaseStageList (state, data) {
      state.caseStageList = data
    }
  },
  actions: {
    // 通过接口获取平台名称列表
    async getPlatformList (context) { // 这里的context参数就代表上下文，$store
      // 获取交易平台列表，actions中使用异步获取数据
      let platformData = await getListData({type: 'getPlatforms'})
      context.commit('getPlatformList', platformData.data)
    },
    // 通过接口获取欠款人列表
    async getBorrowerList (context) {
      let borrowerData = await getListData({type: 'getDebt'})
      context.commit('getBorrowerList', borrowerData.data)
    },
    // 通过接口获取案件阶段列表
    async getCaseStageList (context) {
      let caseStageData = await getListData({type: 'getCaseStageList'})
      context.commit('getCaseStageList', caseStageData.data)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
