// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
      const tabId = activeTab.id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: wipeOutPage // 引用函数名称
      });
    }
  });
});

// 定义要执行的函数
function wipeOutPage() {
  // 这里是函数的具体实现逻辑
  console.log("Wiping out the page!");
  // 例如，在这里执行特定的操作
  // 注意：这个函数将会在页面上下文中执行
}
