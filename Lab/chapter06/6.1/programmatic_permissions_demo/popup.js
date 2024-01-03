document.addEventListener('DOMContentLoaded', function () {
  const requestButton = document.getElementById('requestPermission');

  // 当用户点击按钮时触发请求权限事件
  requestButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.runtime.sendMessage({ action: 'requestPermission' }, function (response) {
        if (response && response.error) {
          console.error(response.error);
        }
      });
    });
  });
});
