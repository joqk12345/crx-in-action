// content.js

chrome.runtime.sendMessage({ greeting: '你好，后台！' }, function (response) {
  console.log('收到来自后台的回复:', response);
});
