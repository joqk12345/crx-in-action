// background.js

console.log('Service Worker 已启动！');

chrome.runtime.onInstalled.addListener(() => {
  console.log('扩展已安装！');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('收到来自内容脚本的消息:', message);

  // 在这里可以执行一些操作，然后回复消息给内容脚本
  sendResponse({ received: true });
});
