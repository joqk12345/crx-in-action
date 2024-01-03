// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});

// 注册一个消息监听器，等待用户点击按钮请求权限
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'requestPermission') {
    // 请求当前标签页的权限
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: requestPermissionScript
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        sendResponse({ error: chrome.runtime.lastError.message });
      }
    });

    return true; // 返回 true 表示异步操作
  }
});

// 请求权限的实际脚本
function requestPermissionScript() {
  // 这里可以执行具体的访问操作
  // 例如，获取当前页面的标题
  const pageTitle = document.title;
  console.log('Page title:', pageTitle);

  // 返回页面标题作为示例数据，实际情况中可能是其他操作
  pageTitle;
}
