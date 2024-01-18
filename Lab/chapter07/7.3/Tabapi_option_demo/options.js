// options.js

document.addEventListener('DOMContentLoaded', function () {
  // 连接到背景脚本
  var port = chrome.runtime.connect({ name: "options" });

  var openTabButton = document.getElementById('openTabButton');

  openTabButton.addEventListener('click', function () {
    // 示例：通过发送消息到背景脚本，在新标签页中打开一个网址
    port.postMessage({ action: "openTab", url: "https://www.baidu.com" });
  });
});
