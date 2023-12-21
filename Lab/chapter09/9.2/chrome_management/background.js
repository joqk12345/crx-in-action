// 监听管理事件
chrome.management.onInstalled.addListener((info) => {
  console.log(`Extension installed: ${info.id} - ${info.name}`);
});

chrome.management.onUninstalled.addListener((info) => {
  console.log(`Extension uninstalled: ${info.id} - ${info.name}`);
});

chrome.management.onEnabled.addListener((info) => {
  console.log(`Extension enabled: ${info.id} - ${info.name}`);
});

chrome.management.onDisabled.addListener((info) => {
  console.log(`Extension disabled: ${info.id} - ${info.name}`);
});
