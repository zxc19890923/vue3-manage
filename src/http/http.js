// 一、配置axios
import axios from 'axios'
// axios配置，如果接口地址在一个域名下面可以直接获取window.location.origin，运维配置反向代理，解决跨域问题，可处理多个不同地址的后台接口
// 获取浏览器的接口地址。
let baseUrl = window.location.origin
// 但是实际开发中，接口可能来自不同的域名，随意需要根据环境打包
// let baseUrl = ''
// switch (process.env.VUE_APP_CURENV) {
//   case 'dev':
//     baseUrl = 'https://pingtai.dev.bangying.org'
//     break
//   case 'test':
//     baseUrl = 'https://pingtai.test.bangying.org'
//     break
//   case 'pre':
//     baseUrl = 'https://pingtai.pre.bangying.org'
//     break
//   case 'prod':
//     baseUrl = 'https://pingtai.pro.bangying.org'
//     break
// }
axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.timeout = 50000 // 设置请求最大时长
axios.defaults.withCredentials = true
// 请求拦截器，设置token
axios.interceptors.request.use(config => {
  if (localStorage && localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
  }
  return config
}, error => {
  // 可以安装elementui等ui组件，将错误信息输出到界面。
  console.log(error)
  return Promise.error(error)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    // 993登录过期
    if (response.data.code !== '993') {
      return Promise.resolve(response)
    } else {
      console.log('登录过期')
      // store.commit('clearUserInfo')  // 使用vuex存储过用户信息，这里需要清空一下。
      window.location.href = '/#/login'
    }
  } else {
    return Promise.reject(response)
  }
})

// 2、封装请求方式
// @param url 接口地址
// @param data 携带参数
// @param file 上传文件对象
// @param auth 是否携带token
// get请求
export function get (url, data) {
  console.log('get', data)
  return axios.get(url, { params: data })
}
// post请求
export function post (url, data) {
  return axios.post(url, data)
}
// put请求
export function put (url, data) {
  return axios.put(url, data)
}
// delete 请求
export function del (url, data) {
  return axios.delete(url, data)
}
// upload 请求
export function uploader (url, file) {
  let params = new FormData()
  params.append('file', file)
  return axios.post(url, params)
}