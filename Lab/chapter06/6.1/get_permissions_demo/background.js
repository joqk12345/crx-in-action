// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.permissions.getAll(permissions => {
    console.log('Permissions: ', permissions.permissions);
  });
});