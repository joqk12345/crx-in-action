// background.js

// 定义规则，拦截特定网址的请求并记录 URL
const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: "block"
    },
    condition: {
      urlFilter: "mp.weixin.qq.com", // 你要监控的特定网址
      resourceTypes: ["main_frame", "sub_frame", "script", "image", "stylesheet", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]
    }
  }
];

// 安装规则
chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [], addRules: rules }, () => {
  if (chrome.runtime.lastError) {
    console.error("Failed to install rules: ", chrome.runtime.lastError.message);
  } else {
    console.log("Rules installed successfully.");
  }
});
