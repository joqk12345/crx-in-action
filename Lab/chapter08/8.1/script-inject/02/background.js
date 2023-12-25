
console.log('Service Worker 已启动！');

chrome.scripting
  .registerContentScripts([{
    id: "myContentScript",
    js: ["contentScript.js"],
    persistAcrossSessions: false,
    matches: ["https://*.baidu.com/*"],
    runAt: "document_idle",
  }])
  .then(() => console.log("registration complete"))
  .catch((err) => console.warn("unexpected error", err))