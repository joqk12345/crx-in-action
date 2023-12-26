// contentScript.js

chrome.runtime.sendMessage({ action: 'loadModule' });

// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'moduleLoaded') {
    // Now otherModule.js has loaded; you can use the exported functions or variables
    exampleFunction();
  }
});

function exampleFunction() {
  console.log('This is an example function from otherModule.js');
}
