// 第三章3.7 content.js
// 获取网页中的搜索框元素
const input = document.querySelector("#sb_form_q");
// 获取网页中的搜索按钮元素
const button = document.querySelector("#sb_form_go");
// 给搜索框添加一个事件监听器，当用户按下回车键时，弹出一个提示框
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    alert("你搜索了：" + input.value);
  }
});
// 给搜索按钮添加一个事件监听器，当用户点击时，弹出一个提示框
button.addEventListener("click", () => {
  alert("你搜索了：" + input.value);
});
