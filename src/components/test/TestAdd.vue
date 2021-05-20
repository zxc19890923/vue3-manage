<template>
  <div class="textAdd">
    <!-- <div class="addTitle">新增测试</div> -->
    <div class="addContain">
      <div class="addRow">
        <span class="required">*</span>
        <span class="columnTitle">交易平台</span>
        <platform-select :initVal="platformName" @changePlatformSelect="getPlatformSelectVal($event)"></platform-select>
      </div>
      <div class="addRow">
        <span class="required">*</span>
        <span class="columnTitle">代理人</span>
        <el-select v-model="proxyName" placeholder="请选择" no-data-text="暂无数据" style="width: 100%">
          <el-option v-for="(item, index) in testAddData.proxyList" :key="index" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </div>
      <div class="addRow">
        <span class="required">*</span>
        <span class="columnTitle">欠款人</span>
        <borrower-select :initVal="borrowerName" @changeBorrowerSelect="getBorrowerSelectVal($event)"></borrower-select>
      </div>
    </div>
    <div class="addBtn">
      <router-link to="/test/test-list">
        <el-button @click="closeModal()">返回</el-button>
      </router-link>
      <el-button type="primary" style="margin-left: 20px;" :loading="loading" @click="createTestData()">提交</el-button>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import getListFunction from '@/common/getListFunction.js'
import { ElMessage } from 'element-plus'
import PlatformSelect from '@/components/common/PlatformSelect'
import borrowerSelect from '@/components/common/BorrowerSelect'
export default {
  components: { PlatformSelect, borrowerSelect },
  name: 'testAdd',
  emits: ['closeModal'],
  setup (props, context) {
    let proxyName = ref('')
    let borrowerName = ref('')
    let platformName = ref('')
    let loading = ref(false)
    // 使用reactive对象中包含数组，这样可以直接给数组负值并保持数据相应性。
    const testAddData = reactive({
      proxyList: []
    })
    const { getListData } = getListFunction()
    onMounted(async () => {
      console.log(getCurrentInstance(), '获取当前实例', 'setup实例中的参数context只能获取emit，attrs，slots没法获取到element实例的内容，所以需要通过getCurrentInstance获取')
      // getCurrentInstance().appContext.config.globalProperties.$message.success({type: 'warning', message: '123123'})
    })
    // 添加测试数据
    const createTestData = async () => {
      console.log(proxyName.value, borrowerName.value, platformName.value)
      if (proxyName.value === '' || borrowerName.value === '' || platformName.value === '') {
        ElMessage.error({
          type: 'warning',
          message: '带*号的为必填项'
        })
        return false
      }
      let params = {
        agentUserId: proxyName.value,
        borrowUserId: borrowerName.value,
        platform: platformName.value
      }
      loading.value = true
      await getListData({type: 'createTestData', params: params}).then(res => {
        if (res.code === '200') {
          ElMessage.success({
            type: 'success',
            message: '新增测试数据成功'
          })
        } else {
          ElMessage.success({
            type: 'error',
            message: '新增测试数据失败'
          })
        }
        proxyName.value = ''
        borrowerName.value = ''
        platformName.value = ''
        testAddData.proxyList = []
        context.emit('closeModal', 1)
      })
      loading.value = false
    }
    const closeModal = () => {
      proxyName.value = ''
      borrowerName.value = ''
      platformName.value = ''
      testAddData.proxyList = []
      context.emit('closeModal', 2)
    }
    // 子组件交易平台传值
    const getPlatformSelectVal = async (event) => {
      platformName.value = event
      // 当交易平台变化的时候获取代理人数据
      proxyName.value = ''
      let proxyData = await getListData({type: 'getAgentList', name: platformName.value})
      testAddData.proxyList = proxyData.data
    }
    // 子组件获取欠款人列表
    const getBorrowerSelectVal = (event) => {
      borrowerName.value = event
    }
    return {
      platformName,
      proxyName,
      borrowerName,
      loading,
      testAddData,
      createTestData,
      closeModal,
      getBorrowerSelectVal,
      getPlatformSelectVal
    }
  }
}
</script>
<style lang="scss" scoped>
  .textAdd {
    width: 500px;
    margin: 0 auto 20px auto;
    .addTitle {
      font-size: 30px;
      font-weight: bold;
      margin: 40px 0;
      text-align: center;
    }
    .addRow {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;
      span {
        margin-right: 5px;
      }
      .required {
        color: red;
      }
      .columnTitle {
        display: flex;
        width: 70px;
        flex-shrink: 0;
      }
    }
    .addBtn {
      text-align: right;
    }
  }
</style>