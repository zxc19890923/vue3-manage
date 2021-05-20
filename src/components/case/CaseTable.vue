<template>
  <div class="caseTable">
    <el-table v-loading="loading" :data="caseTableData.caseStageData.data" highlight-current-row empty-text="数据为空" style="width: 100%;">
      <!-- <el-table-column lable="序号" align="center" type="index"></el-table-column> -->
      <el-table-column prop="ppOrderId" align="center" label="案件编号" width="200"></el-table-column>
      <el-table-column prop="loanTime" align="center" label="更新日期" width="108"></el-table-column>
      <el-table-column prop="borrowName" align="center" label="欠款人" width="120"></el-table-column>
      <el-table-column prop="statusName" align="center" label="案件阶段" width="120"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="item">
          <!-- {key: 0, value: "已结清"}
          {key: 500, value: "待还款"}
          {key: 900, value: "立案"}
          {key: 920, value: "信息核验"}
          {key: 940, value: "信息确认"}
          {key: 960, value: "缴费"}
          {key: 980, value: "缴费审核"}
          {key: 1000, value: "调解方案"}
          {key: 1100, value: "批量数据处理中"}
          {key: 2000, value: "协议签署"}
          {key: 3000, value: "完成"}
          {key: 4000, value: "可仲裁"}
          {key: 5000, value: "仲裁中"}
          {key: 6000, value: "仲裁完成"} -->
          <div class="operate">
            <div v-if="item.row.status === 920 || item.row.status === 940 || item.row.status === 1000 || item.row.status === 2000 || item.row.status === 3000">
              <el-button size="mini" type="primary" plain @click="lookCaseDetail(item.row)">查看案件详情</el-button>
            </div>
            <div v-if="item.row.status === 920 || item.row.status === 940">
              <el-button size="mini" type="primary" plain>下载案件材料</el-button>
            </div>
            <div v-if="item.row.status === 960 || item.row.status === 980">
              <el-button size="mini" type="primary" plain>查看缴费通知</el-button>
            </div>
            <div v-if="item.row.status === 980">
              <el-button size="mini" type="primary" plain>查看缴费证明</el-button>
            </div>
            <div v-if="item.row.status === 1000 || item.row.status === 2000 || item.row.status === 3000">
              <el-button size="mini" type="primary" plain>查看交易文件</el-button>
            </div>
            <div v-if="item.row.status === 1000 || item.row.status === 2000 || item.row.status === 3000">
              <el-button size="mini" type="primary" plain>查看证件文件</el-button>
            </div>
            <div v-if="item.row.status === 1000 || item.row.status === 2000 || item.row.status === 3000">
              <el-button size="mini" type="primary" plain>查看调节申请书</el-button>
            </div>
            <div v-if="item.row.status === 2000 || item.row.status === 3000">
              <el-button size="mini" type="primary" plain>查看仲裁申请书</el-button>
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
  <!-- 查看详情 -->
  <look-detail-modal :detail="caseTableData.caseStageData.item" :lookModalState="lookModalState" @closeCaseDetailModal="closeDetailModal"></look-detail-modal>
</template>
<script>
import { reactive, watch, ref, onMounted } from 'vue'
import getListFunction from '@/common/getListFunction.js'
import { useRoute, useRouter } from 'vue-router'
import LookDetailModal from '@/components/common/LookDetailModal.vue'
export default {
  name: 'caseTable',
  props: ['platform', 'caseStage'],
  components: {
    LookDetailModal
  },
  setup (props, {emit}) {
    console.log(props, '刷新')
    const { getListData } = getListFunction()
    const caseTableData = reactive({
      caseStageData: [],
      item: {}
    })
    let loading = ref(false)
    let currentPage = ref(1)
    let platform = ref('')
    let status = ref(null)
    let lookModalState = ref(false)
    const route = useRoute()
    const router = useRouter()
    // 定义获取列表的方法
    const selectCaseStageList = async (platform='', caseStage='', page=1, pageSize=10) => {
      loading.value = true
      let caseStageInfo = await getListData({type: 'getBillListData', 'platform': platform, 'caseStage': caseStage, 'page': page, 'pageSize': pageSize})
      caseTableData.caseStageData = caseStageInfo.data
      loading.value = false
    }
    // 分页刷新数据
    const changePageNumber = async (page) => {
      currentPage.value = page
      selectCaseStageList(platform.value, status.value, page)
    }
    // 监听查询条件数据变化，更新列表数据
    watch ([() => props.platform, ()=>props.caseStage], (newVal, oldVal) => {
      console.log(newVal, "数组platform和caseStage的值")
      platform.value = newVal[0]
      status.value = newVal[1]
      selectCaseStageList(newVal[0], newVal[1])
      currentPage.value = 1
    })
    // 查看案件详情
    let lookCaseDetail = (item) => {
      lookModalState.value = true
      caseTableData.caseStageData.item = item
    }
    let closeDetailModal = () => {
      console.log('子组件调用')
      lookModalState.value = false
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
      status,
      lookCaseDetail,
      lookModalState,
      closeDetailModal
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