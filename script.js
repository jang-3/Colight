let barcolour = document.getElementById("header-bar");
let barlink = document.querySelectorAll(".link");

function barChange() {
  if (window.scrollY > 2900) {
    barcolour.style.backgroundColor = "white";
    barlink.forEach((link) => (link.style.color = "black"));
  } else {
    barcolour.style.backgroundColor = "black";
    barlink.forEach((link) => (link.style.color = "rgb(255, 125, 3)"));
  }
}

window.addEventListener("scroll", barChange);
