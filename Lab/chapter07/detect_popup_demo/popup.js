document.addEventListener('DOMContentLoaded', function () {
  // 在弹出页面打开时，向background请求当前打开次数
  chrome.runtime.sendMessage({ command: "getPopupOpenCount" }, function (response) {
    console.log("i'm clicked");
    const openCountElement = document.getElementById('openCount');
    openCountElement.textContent = response.count.toString();
  });

  // 在消息更新打开次数时刷新显示
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "updatePopupOpenCount") {
      const openCountElement = document.getElementById('openCount');
      openCountElement.textContent = request.count.toString();
    }
  });
});
