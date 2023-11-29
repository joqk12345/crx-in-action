// options.js
document.querySelector("#save").addEventListener("click", () => {
  const color = document.querySelector("#color").value; // 获取用户选择的颜色
  chrome.storage.sync.set({ color }, () => {
    // 将颜色保存到同步存储中
    console.log("颜色已保存");
  });
  chrome.runtime.sendMessage({ data: "changeColor" }, (response) => {
    // 向服务工作线程发送消息，请求改变当前标签页的背景色
    console.log("颜色已改变");
  });
});
