// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'loadModule') {
    // 创建一个 content script 来加载并运行脚本
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['otherModule.js']
    }, () => {
      // 发送消息到 content script，通知模块加载完成
      chrome.tabs.sendMessage(sender.tab.id, { action: 'moduleLoaded' });
    });
  }
});
