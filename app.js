// 開場動畫
const lastWord = document.querySelector("#logo");
const animation = document.querySelector("div.animation");
lastWord.addEventListener("animationend", () => {
  animation.style =
    "transition: all 5s; opacity: 0; pointer-events: none; transition-delay: 1.5s";
});

function allowDrop(ev) {
  ev.preventDefault();
  // 這是要配合 HTML 的 ondragover 一起使用，目的是要移除元素預設行為
}

function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault(); // 移除預設行為
  var data = ev.dataTransfer.getData("Text"); // 存取資料
  ev.target.appendChild(document.getElementById(data));
}
