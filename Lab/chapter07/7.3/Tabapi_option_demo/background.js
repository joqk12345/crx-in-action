// background.js

// 连接到选项页面
var port;

chrome.runtime.onConnect.addListener(function (runtimePort) {
  port = runtimePort;

  // 示例：在接收到选项页面消息时，在新标签页中打开一个网址
  port.onMessage.addListener(function (msg) {
    if (msg.action === "openTab") {
      chrome.tabs.create({ url: msg.url }, function (tab) {
        console.log("Opened tab with ID: " + tab.id);
      });
    }
  });
});
