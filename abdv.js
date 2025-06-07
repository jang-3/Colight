let barcolour = document.getElementById("header-bar");
let barlink = document.querySelectorAll(".link");
let hr = document.querySelectorAll("hr");
let li = document.querySelectorAll("li");
let vl = document.querySelectorAll(".vertical-line");
let stats = document.getElementById("moreStats");

function barChange() {
  if (window.scrollY > 850 && window.scrollY < 2950) {
    barcolour.style.backgroundColor = "rgb(65, 0, 0)";
    document.body.style.backgroundColor = "rgb(65, 0, 0)";
    hr.forEach((line) => (line.style.backgroundColor = "brown"));
    barlink.forEach((link) => (link.style.color = "white"));
    li.forEach((link) => (link.style.color = "white"));
  } else if (
    (window.scrollY > 2950 && window.scrollY < 3150) ||
    window.scrollY < 850
  ) {
    barcolour.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";
    hr.forEach((line) => (line.style.backgroundColor = "")); // Reset or use original color
    barlink.forEach((link) => (link.style.color = "rgb(255, 125, 3)"));
    li.forEach((link) => (link.style.color = "rgb(181, 181, 181)"));
    vl.forEach((link) => (link.style.backgroundColor = "rgb(255, 125, 3)"));
    stats.style.backgroundColor = "black";
  } else if (window.scrollY > 3150) {
    barcolour.style.backgroundColor = "white";
    stats.style.backgroundColor = "white";
    document.body.style.backgroundColor = "white";
    vl.forEach((link) => (link.style.backgroundColor = "black"));
    barlink.forEach((link) => (link.style.color = "black"));
  }
}

window.addEventListener("scroll", barChange);
