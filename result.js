let axis1 = sessionStorage.getItem("axis1");
let axis2 = sessionStorage.getItem("axis2");

const params = new URLSearchParams(window.location.search);
const result = params.get("result"); // e.g. "overthinker"

// Use the result in your page
document.getElementById("result-text").textContent = `The ${result}`;
