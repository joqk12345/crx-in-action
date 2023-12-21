document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log("username:", username);

  // 模拟获取令牌并存储
  const token = 'example_token'; // 替换为实际的获取令牌逻辑

  chrome.storage.local.set({ 'token': token }, function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log('Token saved successfully');
    }
  });

  // 发送令牌给 Service Worker
  chrome.runtime.sendMessage({ type: 'login', data: { 'token': token } });
});

