chrome.runtime.onInstalled.addListener(function () {
  console.log('Extension installed!');
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Message received:', request);

  if (request.command === "changePopupContent") {
    // 在这里处理改变弹出页面内容的逻辑
    // 这里简单地更新default_popup为新的HTML文件
    chrome.action.setPopup({
      popup: chrome.runtime.getURL("new-popup.html")
    });
  }
});