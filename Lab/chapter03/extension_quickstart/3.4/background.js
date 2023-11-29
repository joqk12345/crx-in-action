// background.js
chrome.runtime.onMessage.addListener((message, sender, callback) => {
  const tabId = sender.tab.id; // 获取发送消息的标签页的ID
  if (message.data === "setAlarm") {
    // 如果消息是设置闹钟
    chrome.alarms.create({ delayInMinutes: 5 }); // 创建一个5分钟后触发的闹钟
  } else if (message.data === "runLogic") {
    // 如果消息是运行逻辑
    chrome.scripting.executeScript({
      // 在当前标签页中执行 logic.js 文件
      file: "logic.js",
      target: { tabId },
    });
  } else if (message.data === "changeColor") {
    // 如果消息是改变颜色
    chrome.scripting.executeScript({
      // 在当前标签页中执行一个匿名函数，将页面背景色改为橙色
      func: () => (document.body.style.backgroundColor = "orange"),
      target: { tabId },
    });
  }
});
