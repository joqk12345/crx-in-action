// Content Script 用于与当前激活的页面通信

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'content_script_message') {
    console.log('Received message in content script:', message.data);
    // 处理接收到的消息
  }
});

// 示例：向 Background 发送消息
chrome.runtime.sendMessage({
  type: 'send_message',
  data: 'Message from Content Script'
});
