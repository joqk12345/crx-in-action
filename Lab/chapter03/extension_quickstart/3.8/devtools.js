// devtools.js
chrome.devtools.panels.create(
  "My Panel", // 面板的标题
  "icon.png", // 面板的图标
  "devtools.html", // 面板的HTML文件
  (panel) => {
    // 面板创建成功后的回调函数
    console.log("面板已创建");
    panel.onShown.addListener((window) => {
      // 面板显示时的事件监听器
      console.log("面板已显示");
      chrome.runtime.sendMessage({ data: "getTitle" }, (response) => {
        // 向服务工作线程发送消息，请求获取当前网页的标题
        window.document.querySelector("#title").innerHTML = response.title; // 将标题显示在面板中
      });
    });
  }
);
