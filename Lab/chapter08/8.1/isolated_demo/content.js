// content.js
console.log('Content script loaded.');

// 向页面添加一个简单的消息
const messageDiv = document.createElement('div');
messageDiv.style.position = 'fixed';
messageDiv.style.bottom = '10px';
messageDiv.style.right = '10px';
messageDiv.style.padding = '5px';
messageDiv.style.background = 'red';
messageDiv.style.color = 'white';
messageDiv.textContent = 'This message is from the content script!';
document.body.appendChild(messageDiv);
