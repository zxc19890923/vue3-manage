<template>
  <div class="caseTable">
    <el-table v-loading="loading" :data="caseTableData.caseStageData.data" highlight-current-row empty-text="数据为空" style="width: 100%;">
      <!-- <el-table-column lable="序号" align="center" type="index"></el-table-column> -->
      <el-table-column prop="ppOrderId" align="center" label="案件编号" width="250"></el-table-column>
      <el-table-column prop="productName" align="center" label="产品名称" width="200"></el-table-column>
      <el-table-column prop="loanTime" align="center" label="入库日期" width="108"></el-table-column>
      <el-table-column prop="borrowName" align="center" label="欠款人" width="200"></el-table-column>
      <!-- <el-table-column prop="statusName" align="center" label="案件阶段"></el-table-column> -->
      <el-table-column align="center" label="操作">
        <template #default="item">
          <div class="operate">
            <div>
              <el-button size="mini" type="primary" plain @click="lookCaseDetail(item.row)">查看案件详情</el-button>
            </div>
            <div>
              <el-button size="mini" type="primary" plain>下载案件材料</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageStyle">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="10"
        :total="caseTableData.caseStageData.maxRows"
        @current-change="changePageNumber"
      >
      </el-pagination>
    </div>
  </div>
  <evidence-detail :id="id" :state="state" @closeDetailModal="closeModal"></evidence-detail>
</template>
<script>
import { reactive, watch, ref, onMounted, toRefs } from 'vue'
import getListFunction from '@/common/getListFunction.js'
import { useRoute, useRouter } from 'vue-router'
import EvidenceDetail from './EvidenceDetail'
export default {
  name: 'caseTable',
  props: ['platform'],
  components: {
    EvidenceDetail
  },
  setup (props, {emit}) {
    console.log(props, '刷新')
    const { getListData } = getListFunction()
    const caseTableData = reactive({
      caseStageData: []
    })
    let loading = ref(false)
    let currentPage = ref(1)
    let platform = ref('')
    let id = ref(null)
    let state = ref(false)
    const route = useRoute()
    const router = useRouter()
    // 定义获取列表的方法
    const selectCaseStageList = async (platform='', caseStage=920, page=1, pageSize=10) => {
      loading.value = true
      let caseStageInfo = await getListData({type: 'getBillListData', 'caseStage': caseStage, 'platform': platform, 'page': page, 'pageSize': pageSize})
      caseTableData.caseStageData = caseStageInfo.data
      loading.value = false
    }
    // 分页刷新数据
    const changePageNumber = async (page) => {
      currentPage.value = page
      selectCaseStageList(platform.value, 920, page)
    }
    // 监听查询条件数据变化，更新列表数据
    watch (() => props.platform, (newVal, oldVal) => {
      console.log(newVal, "数组platform和caseStage的值")
      platform.value = newVal
      selectCaseStageList(newVal)
      currentPage.value = 1
    })
    // 查看案件详情
    let lookCaseDetail = (item) => {
      console.log(item, '信息')
      id.value = item.id
      state.value = true
    }
    let closeModal = () => {
      state.value = false
    }

    onMounted(() => {
      selectCaseStageList()
      currentPage.value = 1
    })
    return {
      caseTableData,
      currentPage,
      loading,
      selectCaseStageList,
      changePageNumber,
      platform,
      lookCaseDetail,
      closeModal,
      id,
      state
    }
  }
}
</script>
<style lang="scss" scoped>
  .operate {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    div {
      line-height: 40px;
      margin-right: 10px;
    }
  }
</style>