<template>
  <div class="testList">
    <div class="rightContentTitle">
      测试数据
    </div>
    <div class="searchBar">
      <div>交易平台</div>
      <div>
        <!-- 交易平台组件 -->
        <platform-select @changePlatformSelect="getPlatformSelectVal"></platform-select>
      </div>
      <div>
        <el-button @click="openAddModal()">新增测试数据</el-button>
      </div>
    </div>
    <div class="testItem">
      <!-- 表格列表数据 -->
      <el-table v-loading="loading" :data="testData.caseList.data" highlight-current-row empty-text="数据为空" style="width: 100%;">
        <el-table-column lable="序号" align="center" type="index"></el-table-column>
        <el-table-column prop="ppOrderId" align="center" label="案件编号"></el-table-column>
        <el-table-column prop="lendName" align="center" label="代理人"></el-table-column>
        <el-table-column prop="borrowName" align="center" label="欠款人"></el-table-column>
        <el-table-column prop="statusName" align="center" label="案件阶段"></el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="item">
            <el-button size="mini" type="primary" plain @click="selectDetailFun(item)">查看详情</el-button>
            <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除这条测试数据吗？"
              @confirm="deleteCase(item)"
            >
            <template #reference>
              <el-button size="mini" type="danger" plain>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageStyle">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="10"
          :total="testData.caseList.maxRows"
          @current-change="changePageNumber"
        >
        </el-pagination>
      </div>
    </div>
  </div>
  <!-- 新增测试数据 -->
  <el-dialog title="新增测试数据" v-model="addModalState" @close="closeAddModal(1, 2)">
    <test-add @closeModal="closeAddModal($event, 1)"></test-add>
  </el-dialog>
  <!-- 查看详情 -->
  <look-detail-modal :detail="testData.item" :lookModalState="lookModalState" @closeCaseDetailModal="closeAddModal(null, 2)"></look-detail-modal>
</template>
<script>
import getListFunction from '@/common/getListFunction.js'
import { onMounted, reactive, ref } from 'vue'
import TestAdd from '@/components/test/TestAdd.vue'
import LookDetailModal from '@/components/common/LookDetailModal'
import PlatformSelect from '@/components/common/PlatformSelect.vue'
export default {
  name: 'testList',
  components: {
    TestAdd,
    PlatformSelect,
    LookDetailModal
  },
  setup () {
    // 获取列表，封装到getListFunction方法中
    const { getListData } = getListFunction()
    // 直接定义reactove数组，如果赋值就会失去响应性，只能使用push，splice等方法，这样不方便，所以我们定义一个对象，对象中定义数组。
    const testData = reactive({
      platformList: [],
      item: {},
      caseList: {
        maxPage: 1,
        data: []
      }
    })
    let searchValue = ref('')
    let addModalState = ref(false)
    let lookModalState = ref(false)
    let loading = ref(false)
    let currentPage = ref(1)
    onMounted (async () => {
      // 获取案件列表
      changePlatform()
    })
    // 根据条件查询案件列表
    const changePlatform = async (page, pageSize) => {
      loading.value = true
      let caseData = await getListData({type: 'getCaseList', platformName: searchValue.value, page: page ? page : 1, pageSize: pageSize ? pageSize : 10})
      if (caseData && caseData.data && caseData.data.data && caseData.data.data.length > 0) {
        testData.caseList = caseData.data
      } else {
        testData.caseList.maxRows = 1
        testData.caseList.data = []
      }
      loading.value = false
    }
    // 单机分页获取数据
    const changePageNumber = (page) => {
      currentPage.value = page
      changePlatform(page)
    }
    // 删除测试数据
    const deleteCase = async (item) => {
      await getListData({type: 'deleteCase', id: item.row.id})
      changePlatform()
      currentPage.value = 1
    }
    // 打开新增测试数据弹出
    const openAddModal = () => {
      addModalState.value = true
    }
    // 关闭新增测试数据窗口
    const closeAddModal = (event, type) => {
      // type: 1->新增窗口，2->查看详情窗口
      // event： 1->需要刷新列表， 2->不需要刷新列表
      if (type === 1) {
        if (event === 1) {
          addModalState.value = false
          changePlatform()
          currentPage.value = 1 // 分页重置
        } else {
          addModalState.value = false
        }
      } else if (type === 2) {
        lookModalState.value = false
      }
    }
    // 查看详情
    const selectDetailFun = (item) => {
      testData.item = item.row
      lookModalState.value = true
    }
    // 子组件交易平台传值
    const getPlatformSelectVal = (event) => {
      searchValue.value = event
      changePlatform()
    }
    return {
      loading,
      searchValue,
      testData,
      changePlatform,
      getListData,
      addModalState,
      lookModalState,
      openAddModal,
      changePageNumber,
      deleteCase,
      closeAddModal,
      selectDetailFun,
      getPlatformSelectVal,
      currentPage
    }
  }
}
</script>