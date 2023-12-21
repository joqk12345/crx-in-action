// 示例：向 Service Worker 发送服务请求
chrome.runtime.sendMessage({ type: 'service_request', data: { /* 服务请求的数据 */ } });
