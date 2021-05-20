<template>
  <el-dialog title="查看详情" v-model="modalState" @close="closeModalState">
    <div class="caseTitle">
      案件要素
    </div>
    <div class="caseForm">
      <div class="caseItem" v-for="(item, index) in data.evidenceDetail" :key="index">
        <div class="caseName">字段名称:</div>
        <div class="caseInput"><el-input v-model="item.name" style="width: 200px;"></el-input></div>
      </div>
    </div>
    <div class="caseTitle">
      证据材料
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref, onMounted, watch } from 'vue'
import getListFunction from '@/common/getListFunction'
export default {
  props: ['id', 'state'],
  emits: ['closeDetailModal'],
  setup (props, {emit}) {
    let modalState = ref(false)
    let data = reactive({
      evidenceDetail: []
    })
    const { getListData } = getListFunction()
    // 获取详情
    const getEvidenceDetailFun = async () => {
      let res = await getListData({type: 'getEvidenceDetail', id: props.id})
      data.evidenceDetail = res.data
    }
    // onMounted(() => {
    //   getEvidenceDetailFun()
    // }),
    watch ([() => props.id, () => props.state], (newVal, oldVal) => {
      modalState.value = newVal[1]
      getEvidenceDetailFun(newVal[0])
    })
    const closeModalState = () => {
      emit('closeDetailModal')
    }
    return {
      data,
      modalState,
      closeModalState
    }
  },
}
</script>
<style lang="scss" scoped>
  .caseTitle {
    font-weight: bold;
    margin: 20px;
  }
  .caseForm {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    .caseItem {
      display: flex;
      align-items: center;
      margin: 10px 20px;
      .caseName {
        margin-right: 10px;
      }
      .caseInput {
        margin-right: 20px;
      }
    }
  }
</style>