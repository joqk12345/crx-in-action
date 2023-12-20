// background.js
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    console.log("Extension installed.");
    // 首次安装时的逻辑
  } else if (details.reason === "update") {
    console.log("Extension updated.");
    // 扩展更新时的逻辑
  } else if (details.reason === "chrome_update") {
    console.log("Chrome updated.");
    // Chrome 浏览器更新时的逻辑
  } else if (details.reason === "shared_module_update") {
    console.log("Shared module updated.");
    // 扩展共享模块更新时的逻辑
  }
});
