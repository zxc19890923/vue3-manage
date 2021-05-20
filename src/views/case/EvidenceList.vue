<template>
  <div class="caseList">
    <div class="rightContentTitle">证据和要素核验</div>
  </div>
  <div class="searchBar">
    <div>交易平台</div>
    <div>
      <platform-select @changePlatformSelect="getPlatformSelectVal"></platform-select>
    </div>
  </div>
  <evidence-table :platform="platformData"></evidence-table>
</template>
<script>
import PlatformSelect from '@/components/common/PlatformSelect'
import { ref } from 'vue'
import EvidenceTable from '@/components/case/EvidenceTable.vue'
export default {
  name: 'caseList',
  components: {
    PlatformSelect, EvidenceTable
  },
  setup() {
    let platformData = ref('')
    const getPlatformSelectVal = (val) => {
      platformData.value = val
    }
    return {
      platformData,
      getPlatformSelectVal
    }
  },
}
</script>