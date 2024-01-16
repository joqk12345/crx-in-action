let popupOpenCount = 0;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "getPopupOpenCount") {
    console.log("Sending popupOpenCount: " + popupOpenCount);
    sendResponse({ count: popupOpenCount });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  console.log("Popup clicked!");
  // 获取当前弹出页面的 ID
  const [popup] = await chrome.action.getPopup({ tabId: tab.id });

  // 如果弹出页面未打开，增加打开次数并打开弹出页面
  if (!popup) {
    popupOpenCount++;
    chrome.action.setPopup({
      popup: "popup.html"
    });

    // 在下一个事件循环中发送消息，以确保 popupOpenCount 已更新
    setTimeout(() => {
      chrome.runtime.sendMessage({ command: "updatePopupOpenCount", count: popupOpenCount });
    });
  }
});
