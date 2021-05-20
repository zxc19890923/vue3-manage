// 封装后台接口方法
import { get, post, put, del, uploader } from '@/http/http.js'
// 获取交易平台列表
export const GET_PLATFORMS = (params) => get('service-core/manage/data/getPlatforms', params)
// 获取代理人列表
export const GET_AGENT_LIST = (params) => get(`service-core/manage/data/getAgentList/${params.name}`)
// 获取欠款人列表
export const GET_BORROW_LIST = (params) => get('service-core/manage/data/getBorrowList', params)
// 创建测试案件
export const CREATE = (params) => post('service-core/manage/data/case/create', params)
// 获取案件列表
export const GET_CASE_LIST = (params) => get('service-core/manage/data/getTestBillListData', params)
// 删除一条数据
export const DELETE_CASE_DATA = (params) => post(`service-core/manage/data/deleteTestBill/${params.id}`)
// 查看详情接口
export const SElECT_DETAIL = (params) => get(`service-core/manage/data/detail/${params.id}`)
// 获取案件阶段列表
export const GET_STATUS_LIST = (params) => get('service-core/manage/case/getStatusList', params)
// 获取账单列表
export const GET_BILL_LIST_DATA = (params) => get('service-core/manage/case/getBillListData', params)
// 获取案件要素信息
export const GET_ELEMENTS = (params) => get(`service-core/manage/elements/getElements/${params.id}`)