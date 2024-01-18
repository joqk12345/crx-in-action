// popup.js
document.addEventListener('DOMContentLoaded', function () {
  var openOptionsButton = document.getElementById('openOptionsButton');

  openOptionsButton.addEventListener('click', function () {
    // 打开嵌入选项页面
    chrome.runtime.openOptionsPage();
  });
});
