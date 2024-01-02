// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    console.log("Active Tab URL: " + activeTab.url);
  });
});