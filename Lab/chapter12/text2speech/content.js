// content.js

// 获取网页的所有文本内容
var pageContent = document.body.innerText;

// 使用 chrome.runtime.sendMessage API 来发送消息
chrome.runtime.sendMessage({ message: 'speak', text: pageContent });