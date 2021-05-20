<template>
  <el-dialog title="查看详情" v-model="modalState" @close="closeDetailModal">
    <div class="detailTitle">账单信息</div>
    <div class="detailItem">
      <div class="itemLeft">案件状态</div>
      <div class="itemRight">
        {{detailData.itemData.statusName}}
        <span v-if="detailData.itemData.secondStatusName">-</span>
        {{detailData.itemData.secondStatusName}}
      </div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">账单总额</div>
      <div class="itemRight">￥{{detailData.itemData.totalMoney}}</div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">已还金额</div>
      <div class="itemRight">￥{{detailData.itemData.totalRepayMoney}}</div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">剩余未还金额</div>
      <div class="itemRight">￥{{detailData.itemData.totalNoPayMoney}}</div>
    </div>
    <div class="detailTitle" style="margin-top: 20px">交易信息</div>
    <div class="detailItem">
      <div class="itemLeft">产品名称</div>
      <div class="itemRight">{{detailData.itemData.platform}}</div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">账单号</div>
      <div class="itemRight">{{detailData.itemData.ppOrderId}}</div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">债权人</div>
      <div class="itemRight">{{detailData.itemData.centreServiceName}}</div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">借款人</div>
      <div class="itemRight">{{detailData.itemData.borrowName}}</div>
    </div>
    <div class="detailItem">
      <div class="itemLeft">逾期天数</div>
      <div class="itemRight">{{detailData.itemData.overdueDay}}</div>
    </div>
  </el-dialog>
  <!-- <div>{{detailData.itemData}}</div> -->
</template>
<script>
import { reactive, onMounted, watch, ref } from 'vue'
export default ({
  props: {
    // 详情内容
    detail: {
      type: Object,
      default: {}
    },
    lookModalState: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeCaseDetailModal'],
  setup (props, { emit }) {
    const detailData = reactive({
      itemData: {},
      modalState: false
    })
    const modalState = ref(false)
    const closeDetailModal = () => {
      console.log('父组件发送信息')
      emit('closeCaseDetailModal')
    }
    // 只能监听ref reactive function
    watch([() => props.detail, () => props.lookModalState], (newVal, oldVal) => {
      detailData.itemData = newVal[0]
      modalState.value = newVal[1]
    })
    return {
      detailData,
      modalState,
      closeDetailModal
    }
  },
})
</script>
<style scoped lang="scss">
  .detailTitle {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .detailItem {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .itemLeft {
      flex: 1;
      text-align: left;
      color: #666;
    }
    .itemRight {
      flex: 1;
      text-align: right;
      font-weight: bold;
    }
  }
  .detailItem:last-child {
    border: none;
  }
</style>