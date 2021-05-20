// 如果一个界面调用多个接口，那么直接返回list显然不行，
// 所以我们在需要获取多个list界面的onMounted钩子函数中手动调用我们这里的方法，通过传递不同的参数来判断调用什么接口，
// 我们的方法将list return出去，这样就可以在外面定义多个list来获取多个数据。
import { CREATE, GET_AGENT_LIST, GET_BORROW_LIST, GET_PLATFORMS, GET_CASE_LIST, DELETE_CASE_DATA, SElECT_DETAIL, GET_STATUS_LIST,  GET_BILL_LIST_DATA, GET_ELEMENTS } from '../http/api'
let getApiList = Function
export default function () {
  // 根据查询条件过滤数据列表
  const getListData = (event) => {
    return new Promise((resolve, reject) => {
      // 通过event判断调用哪个接口
      switch (event.type) {
        case 'getPlatforms': {
          // 获取交易平台列表
          getApiList = GET_PLATFORMS()
          break
        }
        // 案件列表
        case 'getCaseList': {
          console.log(event.page, event.pageSize, event.platformName, '数据')
          getApiList = GET_CASE_LIST({page: event.page, pageSize: event.pageSize, platform: event.platformName})
          break
        }
        // 获取代理人列表
        case 'getAgentList': {
          getApiList = GET_AGENT_LIST({name: event.name})
          break
        }
        // 获取欠款人列表
        case 'getDebt': {
          getApiList = GET_BORROW_LIST()
          break
        }
        // 创建测试数据
        case 'createTestData': {
          getApiList = CREATE(event.params)
          break
        }
        // 删除测试数据
        case 'deleteCase': {
          getApiList = DELETE_CASE_DATA({id: event.id})
          break
        }
        // 查看详情
        case 'selectDetail': {
          getApiList = SElECT_DETAIL({id: event.id})
          break
        }
        // 查询案件阶段列表
        case 'getCaseStageList': {
          getApiList = GET_STATUS_LIST()
          break
        }
        // 查询账单列表
        case 'getBillListData': {
          getApiList = GET_BILL_LIST_DATA({platform: event.platform, status: event.caseStage, page: event.page, pageSize: event.pageSize})
          break
        }
        case 'getEvidenceDetail': {
          getApiList = GET_ELEMENTS({id: event.id})
          break
        }
      }
      getApiList.then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.statusText)
        }
      })
    })
  }
  // 所有需要调接口的地方只需要调用此函数就可以了。
  return {
    getListData
  }
}