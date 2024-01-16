document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnChangeContent').addEventListener('click', function () {
    // 向background发送消息，请求改变弹出页面的内容
    chrome.runtime.sendMessage({ command: "changePopupContent" });
  });
});