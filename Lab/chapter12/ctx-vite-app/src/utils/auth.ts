// import Cookies from 'js-cookie'

import { refreshTokenApi, ReqConfig } from '@/api/index'
import router from '@/pages/popup/router/router.config'

export interface DataInfo<T> {
  /** token */
  accessToken: string
  /** `accessToken`的过期时间（时间戳） */
  expires: T
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string
  /** 用户名 */
  username?: string
  /**用户id */
  userid?: number
  /** 当前登陆用户的角色 */
  roles?: Array<string>
}

export type RefreshTokenResult = {
  code: number
  msg: string
  data: {
    /** `token` */
    accessToken: string
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date
  }
}

export const sessionKey = 'usersession'
export const TokenKey = 'authorized-token'

// export function getToken(): DataInfo<number> {
//   let sessionData: any = null
//   chrome.storage.local.get(['usersession']).then((res) => {
//     if (res.usersession) {
//       sessionData = JSON.parse(res.usersession)
//     } else {
//       console.log("can't get usersession")
//     }
//   })
//   return sessionData
// }
export function getToken(): Promise<DataInfo<number>> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['usersession'], (res) => {
      if (res.usersession) {
        const sessionData = JSON.parse(res.usersession)
        console.log(sessionData)
        resolve(sessionData)
      } else {
        //获取不到值也是返回一个空对象，避免卡入死循环
        console.log('can not get usersession')
        resolve({} as DataInfo<number>)
      }
    })
  })
}

export function refreshToken(config: ReqConfig): Promise<RefreshTokenResult> {
  return new Promise<RefreshTokenResult>((resolve, reject) => {
    refreshTokenApi(config)
      .then((res) => {
        console.log(res)
        if (res?.code === 0) {
          setToken(res.data)
          res
        } else {
          removeToken()
          router.push('/login')
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`username`、`roles`、`accessToken`、`refreshToken`、`expires`这四条信息放在key值为`usersession`的localStorage里,
 * 因为popup页面关闭后sesionStorage的存储会丢失，所以使用localstorage存储
 */
export function setToken(data: DataInfo<Date>) {
  // const test_data = { message: 'Hello, World!' }
  // chrome.storage.local.set({ myData: test_data }).then(() => {
  //   console.log('Value is set')
  // })
  // chrome.storage.local.get(['myData']).then((result) => {
  //   console.log(result.myData)
  // })
  let expires = 0
  const { accessToken, refreshToken } = data
  expires = new Date(data.expires).getTime()
  if (data.username && data.roles && data.userid) {
    const { username, roles, userid } = data
    const sessionData = {
      accessToken,
      refreshToken,
      expires,
      username,
      roles,
      userid,
    }
    chrome.storage.local
      .set({ usersession: JSON.stringify(sessionData) })
      .then(() => {
        console.log('usersession is set')
      })
  } else {
    // get stored username userid and roles
    chrome.storage.local.get(['usersession']).then((res) => {
      if (res.usersession) {
        const sessionDataObject = JSON.parse(res.usersession)
        const { username, roles, userid } = sessionDataObject
        const sessionData = {
          accessToken,
          refreshToken,
          expires,
          username,
          roles,
          userid,
        }
        chrome.storage.local
          .set({ usersession: JSON.stringify(sessionData) })
          .then(() => {
            console.log('usersession is set')
          })
      } else {
        console.log(
          'get info error can not get usersession, please login again'
        )
        router.push('/login')
      }
    })
  }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  chrome.storage.local.remove(sessionKey)
  // localStorage.clear()
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}
