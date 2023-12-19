chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'login') {
    const token = message.data.token;

    // 存储令牌
    chrome.storage.local.set({ 'token': token });

    sendResponse({ status: 'Logged in' });
  } else if (message.type === 'service_request') {
    chrome.storage.local.get(['token'], function (result) {
      const token = result.token;

      // 使用令牌执行服务请求操作
      // ...

      sendResponse({ result: 'Service completed' });
    });
    return true;
  }
});
