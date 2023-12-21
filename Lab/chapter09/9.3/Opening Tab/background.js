// background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.openExamplePage) {
    chrome.tabs.create({ url: chrome.runtime.getURL("example.html") });
  }
});
