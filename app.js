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

let videoReplay = document.querySelector(".replay");
videoReplay.style.cursor = "not-allowed";
videoReplay.disabled = true;
let gameReload = document.querySelector(".return");
const video = document.createElement("video");
const box3 = document.querySelector("#box3");
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
    if (source.classList.contains("answer") && event.target.classList.contains("droppable")) {
      event.target.classList.add("answer");
    }
    else{
      event.target.classList.add("not");
    }
  });
  target[i].addEventListener("dragleave", (event) => {
    // reset the transparency
    event.target.classList.remove("hover");
    if (source.classList.contains("answer") && event.target.classList.contains("droppable")) {
      event.target.classList.remove("answer");
    }
    else{
      event.target.classList.remove("not");
    }
  });
  target[i].addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  target[i].addEventListener("drop", (event) => {
    event.preventDefault();
    event.target.classList.remove("hover");
    
    if (source.classList.contains("answer") && event.target.classList.contains("droppable")) {
      videoReplay.style.cursor = "pointer";
      videoReplay.disabled = false;
      video.src = "./pictures/co2.mp4";
      video.width = 400;
      video.autoplay = true;
      box3.appendChild(video);
      // videoStart.style = "display:block";
      event.target.appendChild(source);
    }
    event.stopImmediatePropagation();
  });
}

// video replay
videoReplay.addEventListener("click", (event) => {
  video.currentTime = 0;
  video.play();
});

const level = document.querySelectorAll(".level");
level.forEach((span) => {
  const targetId = span.getAttribute("data-target");
  const targetElement = document.getElementById(targetId);
  
  if (targetElement) {
    span.textContent = targetElement.textContent;
  }
});


// 獲取所有的部分元素
const sections = document.querySelectorAll("section");

let currentSectionIndex = 0;
sections[currentSectionIndex].classList.add("active");

currentSectionIndex = sessionStorage.getItem("currentSectionIndex");

// 如果有保存的索引，切换到对应的部分
if (currentSectionIndex !== null) {
  switchSection(parseInt(currentSectionIndex));
}

// 处理部分切换的函数
function switchSection(sectionIndex) {
  // 隐藏所有部分
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // 显示指定索引的部分
  if (sectionIndex >= 0 && sectionIndex < sections.length) {
    sections[sectionIndex].classList.add("active");
    currentSectionIndex = sectionIndex;
    sessionStorage.setItem("currentSectionIndex", currentSectionIndex);
  }
}

// 切换到上一个部分
const previous = document.querySelector(".previous");
previous.addEventListener("click", () => {
  const prevSectionIndex = currentSectionIndex - 1;
  if (prevSectionIndex >= 0){
    switchSection(prevSectionIndex);
  }
  
});

// 切换到下一个部分
const next = document.querySelector(".next");
next.addEventListener("click", () => {
  const nextSectionIndex = currentSectionIndex + 1;
  if (nextSectionIndex < sections.length){
    switchSection(nextSectionIndex);
  }
});

//重新整理頁面
const reload = document.querySelector(".return");
reload.addEventListener("click", () => {
  location.reload();
  const currentSectionIndex = sessionStorage.getItem("currentSectionIndex");

  if (currentSectionIndex !== null) {
    switchSection(parseInt(currentSectionIndex));
  }
});

