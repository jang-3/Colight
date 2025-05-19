let axis1 = Number(sessionStorage.getItem("axis1"));
let axis2 = Number(sessionStorage.getItem("axis2"));
let midpoint = (1.75 * 5) / 2;
let max = 1.75 * 5;
let axis1value = axis1 / max;
let axis2value = axis2 / max;

const params = new URLSearchParams(window.location.search);
const result = params.get("result"); // e.g. "overthinker"

const v1 = document.getElementById("comp1");
const v2 = document.getElementById("comp2");
const v3 = document.getElementById("comp3");
const v4 = document.getElementById("comp4");
const bar1 = document.getElementById("value1");
const bar2 = document.getElementById("value2");
const barContainerWidth =
  document.querySelector(".result-container").offsetWidth;

// Use the result in your page

function loadStats() {
  document.getElementById("result-text").textContent = `The ${result}`;
  if (Math.abs(axis1) > midpoint) {
    v1.textContent = axis1 > 0 ? "straightforward" : "hesitant to act";
    v2.textContent = axis1 > 0 ? "hesitant to act" : "straightforward";
  } else {
    axis1value = (max - Math.abs(axis1)) / max;
    v1.textContent = axis1 > 0 ? "hesitant to act" : "straightforward";
    v2.textContent = axis1 > 0 ? "straightforward" : "hesitant to act";
  }
  if (Math.abs(axis2) > midpoint) {
    v3.textContent = axis2 > 0 ? "passionately selfless" : "ignorantly safe";
    v4.textContent = axis2 > 0 ? "ignorantly safe" : "passionately selfless";
  } else {
    axis2value = (max - Math.abs(axis2)) / max;
    v3.textContent = axis2 > 0 ? "ignorantly safe" : "passionately selfless";
    v4.textContent = axis2 > 0 ? "passionately selfless" : "ignorantly safe";
  }
  bar1.style.width = `${Math.abs(axis1value) * barContainerWidth}px`;
  bar2.style.width = `${Math.abs(axis2value) * barContainerWidth}px`;
}
loadStats();
