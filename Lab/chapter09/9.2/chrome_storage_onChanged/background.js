// 监听存储变化事件
chrome.storage.onChanged.addListener((changes, area) => {
  console.log('Storage changes:', changes, 'in', area);
});

// 示例：写入数据到存储
chrome.storage.local.set({ 'key': 'value' }, () => {
  console.log('Data saved to storage!');
});
