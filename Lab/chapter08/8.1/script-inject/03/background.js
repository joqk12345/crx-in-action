// background.js

// 监听点击浏览器图标的事件
chrome.action.onClicked.addListener(async () => {
  // 获取当前活动页面的标签页信息
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 向当前标签页注入脚本
  chrome.scripting.executeScript({
    target: { tabId: tab.id }, // 指定标签页
    function: injectScript, // 要注入的 JavaScript 函数
  });
});

// 要注入的 JavaScript 函数
function injectScript() {
  // 在页面中注入脚本
  // 这里是要注入的 JavaScript 代码
  console.log('Injected script!');
}
