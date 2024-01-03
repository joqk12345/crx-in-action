// popup.js
document.getElementById('requestPermissions').addEventListener('click', () => {
  chrome.runtime.sendMessage({ request: 'requestOptionalPermissions' });
});