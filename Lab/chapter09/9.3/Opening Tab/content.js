function createButtons() {
  // 创建一个直接打开页面的按钮
  const directButton = document.createElement("button");
  directButton.textContent = "直接打开页面";
  directButton.addEventListener("click", function () {
    window.open(chrome.runtime.getURL("example.html"));
  });
  document.body.appendChild(directButton);

  // 创建一个通过 background 打开页面的按钮
  const indirectButton = document.createElement("button");
  indirectButton.textContent = "通过 background 打开页面";
  indirectButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ openExamplePage: true });
  });
  document.body.appendChild(indirectButton);
}

// 在 DOMContentLoaded 事件触发时调用创建按钮的函数
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createButtons);
} else {
  createButtons();
}