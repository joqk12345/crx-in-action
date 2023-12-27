// content.js

// 创建对话小人图像
const dialogImage = document.createElement('img');
dialogImage.src = chrome.runtime.getURL('dialog.png');

// 设置图片固定大小
dialogImage.style.width = '100px';
dialogImage.style.height = '100px';

dialogImage.style.position = 'fixed';
dialogImage.style.bottom = '20px';
dialogImage.style.right = '20px';
dialogImage.style.cursor = 'pointer';


document.body.appendChild(dialogImage);

// 点击图像时触发的操作
dialogImage.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'showDialog' });
});
