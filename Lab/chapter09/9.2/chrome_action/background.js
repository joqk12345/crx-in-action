chrome.action.onClicked.addListener((tab) => {
  console.log("Clicked on the extension!");
  // 执行想要的操作
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // 在这里执行与标签页相关的操作
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }
    console.log("Clicked on the extension!");
    console.log("Active tab:", tabs[0]);
  });
});
