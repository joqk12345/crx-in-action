// 监听页面导航事件
chrome.webNavigation.onCommitted.addListener((details) => {
  console.log('Navigation Committed:', details);
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log('Before Navigation:', details);
});

// 示例：向特定网站注入内容脚本
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes('google.com')) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      function: () => {
        // 在这里可以执行注入的脚本
        console.log('Injected script on google.com');
      }
    });
  }
});
