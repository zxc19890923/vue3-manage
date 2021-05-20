<template>
  <div class="caseList">
    <div class="rightContentTitle">案件查询</div>
  </div>
  <div class="searchBar">
    <div>交易平台</div>
    <div>
      <platform-select @changePlatformSelect="getPlatformSelectVal"></platform-select>
    </div>
    <div>案件阶段</div>
    <div>
      <case-stage-select @changeCaseStageSelect="getCaseStageSelectVal"></case-stage-select>
    </div>
  </div>
  <case-table :platform="platformData" :caseStage="caseStageData"></case-table>
</template>
<script>
import PlatformSelect from '@/components/common/PlatformSelect'
import caseStageSelect from '@/components/common/CaseStageSelect'
import { reactive, ref } from 'vue'
import CaseTable from '@/components/case/CaseTable.vue'
export default {
  name: 'caseList',
  components: {
    PlatformSelect, caseStageSelect, CaseTable
  },
  setup() {
    let platformData = ref('')
    let caseStageData = ref(null)
    const getPlatformSelectVal = (val) => {
      platformData.value = val
    }
    const getCaseStageSelectVal = (val) => {
      caseStageData.value = val
    }
    return {
      platformData,
      caseStageData,
      getCaseStageSelectVal,
      getPlatformSelectVal
    }
  },
}
</script>