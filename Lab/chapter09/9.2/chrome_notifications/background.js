// 创建一个简单的通知
chrome.notifications.create({
  type: 'basic',
  iconUrl: 'icon.png',
  title: 'Hello!',
  message: 'This is a notification from your extension.'
}, (notificationId) => {
  console.log('Notification created:', notificationId);
});

// 监听通知被点击事件
chrome.notifications.onClicked.addListener((notificationId) => {
  console.log('Notification clicked:', notificationId);
});

// 监听通知被关闭事件
chrome.notifications.onClosed.addListener((notificationId, byUser) => {
  console.log('Notification closed:', notificationId, 'by user:', byUser);
});
