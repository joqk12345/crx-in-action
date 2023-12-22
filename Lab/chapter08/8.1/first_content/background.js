chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "injectCSS" && sender.tab.id) {
    chrome.scripting.insertCSS({
      target: { tabId: sender.tab.id },
      files: ["styles.css"]
    }).then(() => {
      console.log("CSS injected!");
    }).catch((error) => {
      console.error("Failed to inject CSS: ", error);
    });
  }
});
