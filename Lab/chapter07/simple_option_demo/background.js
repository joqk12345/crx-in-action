// background.js

// 当插件安装或更新时触发
chrome.runtime.onInstalled.addListener(function () {
  console.log('Options Page Demo extension installed or updated.');
});