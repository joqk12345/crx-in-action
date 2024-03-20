import { getToken, formatToken, refreshToken } from '@/utils/auth'

// dev 调试接口，后端已经开启跨域请求
let API_DOMAIN: string = 'http://127.0.0.1:8001/'
// 请求服务器地址（正式build环境真实请求地址）
if (import.meta.env.MODE === 'production') {
  //API_DOMAIN = 'https://example.com/'
  API_DOMAIN = 'http://127.0.0.1:8001/'
}

// API请求异常报错内容
export const API_FAILED: string = '网络连接已中断，稍后重试。'

// 定义req接口类型
export interface ReqConfig {
  url?: string
  method?: string
  data?: any
  formData?: boolean
  success?: (res: any) => void
  fail?: (err: any) => void
  done?: () => void
  background?: boolean
}

export type LoginResult = {
  code: number
  msg: string
  data: {
    /** 用户名 */
    username: string
    /** 当前登陆用户的角色 */
    roles: Array<string>
    /** `token` */
    accessToken: string
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date
  }
}

// add task result
export type ResponseResult = {
  code: number
  msg: string
  data: any
}

// API请求汇总
export const apiReqs = {
  // 登录
  signIn: (config: ReqConfig) => {
    // 新增扩展登录接口
    config.url = API_DOMAIN + 'v1/extendLogin'
    config.method = 'post'
    apiFetch(config)
  },
  // 获取数据
  getData: (config: ReqConfig) => {
    config.url = API_DOMAIN + 'getData/'
    config.method = 'get'
    apiFetch(config)
  },
  // 提交任务
  submitTask: (config: ReqConfig) => {
    config.url = API_DOMAIN + 'v1/task/add'
    config.method = 'post'
    apiFetch(config)
  },
  // 委托background提交数据
  submitByBackground: (config: ReqConfig) => {
    config.background = true
    config.url = API_DOMAIN + 'api/process'
    config.method = 'post'
    apiFetch(config)
  },
}

export const refreshTokenApi = (config: ReqConfig) => {
  config.url = API_DOMAIN + 'v1/refreshToken'
  config.method = 'post'
  return fetch(config.url, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config.data),
  }).then((res) => res.json())
}

// 发起请求
function apiFetch(config: ReqConfig) {
  // if (config.background && import.meta.env.MODE === 'production') {
  if (config.background && import.meta.env.MODE === 'production') {
    // [适用于build环境的content script]委托background script发起请求，此种方式只能传递普通json数据，不能传递函数及file类型数据。
    sendRequestToBackground(config)
  } else {
    // [适用于popup及开发环境的content script]发起请求
    apiRequest(config)
    console.log('invoke apiRequest')
  }
}

/*
 * API请求封装（带验证信息）
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */
export function apiRequest(config: ReqConfig) {
  // 如果没有设置config.data，则默认为{}
  if (config.data === undefined) {
    config.data = {}
  }
  if (config.url === undefined) {
    config.url = ''
  }
  // 如果没有设置config.method，则默认为post
  config.method = config.method || 'post'

  // 请求头设置
  let headers: { [key: string]: string } = {}

  let data: any = null

  if (config.formData) {
    // 上传文件的兼容处理，如果config.formData=true，则以form-data方式发起请求。
    // fetch()会自动设置Content-Type为multipart/form-data，无需额外设置。
    data = new FormData()
    Object.keys(config.data).forEach(function (key) {
      data.append(key, config.data[key])
    })
  } else {
    // 如果不长传文件，fetch()默认的Content-Type为text/plain;charset=UTF-8，需要手动进行修改。
    headers['Content-Type'] = 'application/json;charset=UTF-8'
    data = JSON.stringify(config.data)
  }

  // 准备好请求的全部数据
  let axiosConfig: RequestInit = {
    method: config.method,
    headers,
    body: data,
  }

  const whiteList = ['/refreshToken', '/extendlogin']
  const isInWhiteList = whiteList.some((path) => config.url?.includes(path))
  if (!isInWhiteList) {
    //注入用户信息
    getToken()
      .then((userdata) => {
        console.log('userdata: ', userdata)
        if (userdata) {
          // token存在
          const now = new Date().getTime()
          const expired = userdata.expires - now <= 0
          if (expired) {
            // token过期
            // removeToken()
            console.log('expired token')

            config.data = {
              refreshToken: userdata.refreshToken,
            }
            refreshToken(config)
              .then((res) => {
                headers['Authorization'] = formatToken(res.data.accessToken)
              })
              .finally(() => {
                console.log('refresh token')
              })
          } else {
            headers['Authorization'] = formatToken(userdata.accessToken)
          }
        }
      })
      .then(() => {
        // 发起请求
        fetch(config.url!, axiosConfig)
          .then((res) => res.json())
          .then((result) => {
            // 请求结束的回调
            config.done && config.done()
            // 请求成功的回调
            config.success && config.success(result)
          })
          .catch((error) => {
            // 请求结束的回调
            config.done && config.done()
            // 请求失败的回调
            config.fail && config.fail(API_FAILED)
            console.log('occur excption: ', error)
          })
      })
      .finally(() => {
        console.log('finally')
      })
  }
}

// 委托background执行请求
function sendRequestToBackground(config: ReqConfig) {
  // chrome.runtime.sendMessage中只能传递JSON数据，不能传递file类型数据，因此直接从popup发起请求。
  // The message to send. This message should be a JSON-ifiable object.
  // 详情参阅：https://developer.chrome.com/extensions/runtime#method-sendMessage
  if (chrome && chrome.runtime) {
    chrome.runtime.sendMessage(
      {
        // 带上标识，让background script接收消息时知道此消息是用于请求API
        contentRequest: 'apiRequest',
        config: config,
      },
      (result) => {
        // 接收background script的sendResponse方法返回的消数据result
        config.done && config.done()
        if (result.result === 'succ') {
          config.success && config.success && config.success(result)
        } else {
          config.fail && config.fail(result.msg)
        }
      }
    )
  }
}
