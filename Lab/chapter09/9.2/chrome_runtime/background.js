// 获取扩展信息示例
console.log('Extension ID:', chrome.runtime.id);
console.log('Extension Version:', chrome.runtime.getManifest().version);

// 监听扩展安装和更新事件
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed or updated:', details);
});

// 监听消息发送事件
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message, 'from:', sender);
  // 如果需要，可以发送回复
  // sendResponse({ received: true });
});
