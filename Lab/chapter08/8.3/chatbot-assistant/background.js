// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showDialog') {
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 220,
      height: 150
    });
  }
});
