chrome.action.onClicked.addListener((tab) => {
  // 执行想要的操作
  console.log("Extension button clicked!");
});



chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "index.html" });
});