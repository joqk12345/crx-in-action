chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'send_message') {
    // 接收到消息后的处理逻辑
    console.log('Received message:', message.data);
    // 在这里可以进行任何你想要的处理，比如存储消息内容或者进一步处理
  }
});

function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
