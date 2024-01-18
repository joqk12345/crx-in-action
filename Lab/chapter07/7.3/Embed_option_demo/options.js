// options.js

document.addEventListener('DOMContentLoaded', function () {
  var usernameInput = document.getElementById('username');
  var saveButton = document.getElementById('saveButton');

  // 保存设置
  saveButton.addEventListener('click', function () {
    var username = usernameInput.value;

    // 将设置保存到浏览器存储中
    chrome.storage.sync.set({ 'username': username }, function () {
      console.log('Options saved');
    });
  });

  // 在页面加载时检查是否存在保存的设置
  chrome.storage.sync.get('username', function (data) {
    if (data.username) {
      usernameInput.value = data.username;
    }
  });
});
