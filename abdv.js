let barcolour = document.getElementById("header-bar");
let barlink = document.querySelectorAll(".link");
let hr = document.querySelectorAll("hr");
let li = document.querySelectorAll("li");

function barChange() {
  if (window.scrollY > 850) {
    barcolour.style.backgroundColor = "rgb(65, 0, 0)";
    document.body.style.backgroundColor = "rgb(65, 0, 0)";
    hr.forEach((line) => (line.style.backgroundColor = "brown"));
    barlink.forEach((link) => (link.style.color = "white"));
    li.forEach((link) => (link.style.color = "white"));
  } else {
    barcolour.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";
    hr.forEach((line) => (line.style.backgroundColor = "")); // Reset or use original color
    barlink.forEach((link) => (link.style.color = "rgb(255, 125, 3)"));
    li.forEach((link) => (link.style.color = "rgb(181, 181, 181)"));
  }
}

window.addEventListener("scroll", barChange);
