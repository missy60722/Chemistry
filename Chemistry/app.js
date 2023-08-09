// 開場動畫
const lastWord = document.querySelector("#logo");
const animation = document.querySelector("div.animation");
lastWord.addEventListener("animationend", () => {
  animation.style =
    "transition: all 5s; opacity: 0; pointer-events: none; transition-delay: 1.5s";
});

//拖曳＆放置
let source = null;

const element = document.querySelectorAll(".element");
for (let i = 0; i < element.length; i++) {
  element[i].addEventListener("drag", (event) => {
    event.dataTransfer.setData("Text", event.target.id);
  });
  element[i].addEventListener("dragstart", (event) => {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.classList.add("dragging");
    source = event.target;
  });
  element[i].addEventListener("dragend", (event) => {
    // reset the transparency
    event.target.classList.remove("dragging");
    source = null;
  });
}

const target = document.querySelectorAll(".target");
for (let i = 0; i < target.length; i++) {
  target[i].addEventListener("drag", (event) => {
    event.dataTransfer.setData("Text", event.target.id);
  });
  target[i].addEventListener("dragenter", (event) => {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.classList.add("hover");
  });
  target[i].addEventListener("dragleave", (event) => {
    // reset the transparency
    event.target.classList.remove("hover");
  });
  target[i].addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  target[i].addEventListener("drop", (event) => {
    event.target.appendChild(source);
    event.target.classList.remove("hover");
    event.stopImmediatePropagation();
  });
}
