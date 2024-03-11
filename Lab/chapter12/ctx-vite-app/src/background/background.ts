/*global chrome*/
import { db, Task } from '../db/db.ts'

// manifest.json的Permissions配置需添加declarativeContent权限
chrome.runtime.onInstalled.addListener(function () {
  // 默认先禁止Page Action。如果不加这一句，则无法生效下面的规则
  chrome.action.disable()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // 设置规则
    let rule = {
      // 运行插件运行的页面URL规则
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            // 适配所有域名以“www.”开头的网页
            // hostPrefix: ''
            // 适配所有域名以“.element-plus.org”结尾的网页
            // hostSuffix: '.element-plus.org',
            // 适配域名为“element-plus.org”的网页
            // hostEquals: 'element-plus.org',
            // 适配https协议的网页
            schemes: ['https'],
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    }
    // 整合所有规则
    const rules = [rule]
    // 执行规则
    chrome.declarativeContent.onPageChanged.addRules(rules)
  })
})

/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // 接收来自content script的消息，requset里不允许传递function和file类型的参数
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const { contentRequest } = request
    // 接收来自content的api请求
    if (contentRequest === 'apiRequest') {
      let { config } = request
      // API请求成功的回调
      config.success = (data) => {
        data.result = 'succ'
        sendResponse(data)
      }
      // API请求失败的回调
      config.fail = (msg) => {
        sendResponse({
          result: 'fail',
          msg,
        })
      }
      // 发起请求
      // apiRequest(config)
    }
  })
  return true
})*/

// 监听来自内容脚本的消息
/*
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'download') {
    var audio_url = message.audio_url
    var title = message.title.replace(/[^a-zA-Z0-9._-]+/g, '')

    console.log('audio_url:', audio_url)
    console.log('Title:', title)

    if (audio_url) {
      chrome.downloads.download({ url: audio_url, filename: title + '.mp3' })
    }
  }
})
*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Received message from :')
  console.log(message)
  console.log(sender)
  if (message.action === 'getTasks') {
    console.log('getTasks from indexed db')
    // let storage_data = [
    //   {
    //     title: 'task1',
    //     url: 'http://www.baidu.com',
    //     status: 'done',
    //     download_link: 'http://www.baidu.com',
    //     date: '2023-10-01',
    //   },
    // ]
    db.tasks
      .toArray()
      .then((tasks: Task[]) => {
        // storage_data = tasks
        console.log('storage_data:', tasks)
        sendResponse({ data: tasks })
        console.log('sendResponse success')
      })
      .catch((error: Error) => {
        console.error('Error fetching tasks:', error)
        // Handle the error appropriately
      })
    return true
  } else if (message.action === 'addTask') {
    console.log('addTask')
    //add db
    let task_info: Task = {
      title: message.title,
      url: message.url,
      status: 'pending',
      download_link: '',
      date: new Date().toLocaleDateString(),
    }
    db.tasks.add(task_info)
    console.log('add task success ')
  }

  // console.log('URL: ' + message.url)
  // console.log('Title: ' + message.title)
  // console.log('ActiveTab id: ' + message.id)
  // let tabInfo = message.tabInfo
  // console.log('ActiveTab: ' + tabInfo)

  // 在这里进行处理，比如发送到服务器等等
  // 发送响应给popup页面
  sendResponse({ message: '处理完成' })
})
