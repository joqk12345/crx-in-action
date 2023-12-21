// 监听权限变化事件
chrome.permissions.onAdded.addListener((permissions) => {
  console.log('Permissions added:', permissions);
});

chrome.permissions.onRemoved.addListener((permissions) => {
  console.log('Permissions removed:', permissions);
});

// 请求权限的示例
function requestPermissions() {
  chrome.permissions.request({
    permissions: ['storage'],
    origins: ['<all_urls>']
  }, (granted) => {
    if (granted) {
      console.log('Storage permission granted!');
    } else {
      console.log('Storage permission not granted.');
    }
  });
}

// 监听扩展按钮点击事件
chrome.action.onClicked.addListener((tab) => {
  // 执行想要的操作
  requestPermissions(); // 在用户点击扩展按钮时请求权限
});
