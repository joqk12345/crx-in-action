// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'speak') {
    chrome.tts.speak(request.text, { 'lang': 'zh-CN', 'rate': 1.0 });
  }
});
