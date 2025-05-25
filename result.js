let axis1 = Number(sessionStorage.getItem("axis1"));
let axis2 = Number(sessionStorage.getItem("axis2"));
let midpoint = (1.75 * 5) / 2;
let max = 1.75 * 5;
let axis1value = (axis1 + max) / (2 * max);
let axis2value = (axis2 + max) / (2 * max);

const images = {
  Hero_Holland: "persona-hero.png",
  Indifferent_Irene: "persona-irene.png",
  Overthinker_Owen: "persona-owen.png",
  Knowxitxall_Ken: "persona-ken.png",
  Clueless_Chloe: "persona-chloe.png",
};

const params = new URLSearchParams(window.location.search);
const result = params.get("result"); // e.g. "overthinker"

const v1 = document.getElementById("comp1");
const v2 = document.getElementById("comp2");
const v3 = document.getElementById("comp3");
const v4 = document.getElementById("comp4");
const bar1 = document.getElementById("value1");
const bar2 = document.getElementById("value2");
const imageChar = document.getElementById("char-img");
const barContainerWidth =
  document.querySelector(".result-container").offsetWidth;

// Use the result in your page

function loadStats() {
  document.getElementById("result-text").textContent = `${result
    .replace("_", " ")
    .replace("x", "-")}`;

  imageChar.style.backgroundImage = 'url("' + images[result] + '")';

  if (Math.abs(axis1) > midpoint) {
    v1.textContent = axis1 > 0 ? "straightforward" : "hesitant to act";
    v2.textContent = axis1 > 0 ? "hesitant to act" : "straightforward";
  } else {
    v1.textContent = axis1 > 0 ? "hesitant to act" : "straightforward";
    v2.textContent = axis1 > 0 ? "straightforward" : "hesitant to act";
  }

  if (Math.abs(axis2) > midpoint) {
    v3.textContent = axis2 > 0 ? "passionately selfless" : "ignorantly safe";
    v4.textContent = axis2 > 0 ? "ignorantly safe" : "passionately selfless";
  } else {
    v3.textContent = axis2 > 0 ? "ignorantly safe" : "passionately selfless";
    v4.textContent = axis2 > 0 ? "passionately selfless" : "ignorantly safe";
  }

  bar1.style.width = `${axis1value * barContainerWidth}px`;
  bar2.style.width = `${axis2value * barContainerWidth}px`;
}

loadStats();
