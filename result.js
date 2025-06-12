let axis1 = Number(sessionStorage.getItem("axis1"));
let axis2 = Number(sessionStorage.getItem("axis2"));
let midpoint = (1.75 * 5) / 2;
let max = 1.75 * 5;
let axis1value = (axis1 + max) / (2 * max);
let axis2value = (axis2 + max) / (2 * max);
axis1value = Math.max(0, Math.min(1, axis1value));
axis2value = Math.max(0, Math.min(1, axis2value));

const images = {
  Hero_Holland: "persona-hero.png",
  Indifferent_Irene: "persona-irene.png",
  Overthinker_Owen: "persona-owen.png",
  Knowxitxall_Ken: "persona-ken.png",
  Clueless_Chloe: "persona-chloe.png",
};

const descriptions = {
  Hero_Holland: `Hero Holland is calm, grounded, and courageous — not because they never feel fear, but because they’ve learned how to act despite it. Holland knows that domestic violence doesn’t always look obvious — it can be quiet, hidden, or brushed off. But they also know the damage silence can do. That’s why Holland chooses to act safely and with empathy. They’ve mastered the A.R.T. of Safe Interruption — Approaching calmly, Responding with care, and Talking without blame. Whether it’s checking in with a friend, encouraging someone to call the helpline, or simply not turning away, Holland shows that being a hero isn’t about saving the day — it’s about choosing to care out loud.`,

  Indifferent_Irene: `Indifferent Irene notices signs, too — but shrugs them off. She believes that what happens in a relationship should stay private. Maybe she thinks it’s just drama, or “not that deep.” Irene isn’t cold, just disconnected. She thinks unless someone asks for help, it’s better to stay out of it. But Irene's silence can feel like indifference to someone suffering. What she needs is to understand the impact of looking away — and how inaction can silently protect the abuser.`,

  Clueless_Chloe: `Clueless Chloe means well, but she often misses the signs of domestic violence — especially the subtle ones like controlling behavior, isolation, or emotional manipulation. She’s not apathetic — just unaware. DV isn’t something she’s really talked about before, so she doesn’t always realise when something’s wrong. What Chloe needs isn’t guilt — it’s awareness and education. Once she learns how to spot the signs, she’s open to doing something about it.`,

  Overthinker_Owen: `Owen picks up on the signs — the awkward silences, the sudden mood shifts, the subtle bruises — but he’s caught in a loop of doubt and overthinking. He wants to step in, but his mind runs through a hundred “what ifs.” What if he misreads the situation? What if speaking up causes more harm? What if he freezes and says the wrong thing? The fear of making a mistake keeps him silent — not because he doesn’t care, but because he cares too much. In the end, silence feels like the safer choice — even when it doesn’t sit right.`,

  Knowxitxall_Ken: `Ken means well — he notices when something’s wrong and doesn’t hesitate to act. But sometimes, his confidence turns into impulsiveness. He thinks the best way to help is to take matters into his own hands, even without fully understanding the situation. While his intentions are good, Ken’s approach can sometimes escalate things or put himself and others at risk. Ken sees intervention as a one-man mission, but what he needs to learn is that safe intervention isn’t about being the hero — it’s about being smart, calm, and prepared.`,
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
  document.getElementById("persona-description").textContent =
    descriptions[result] || "No description available.";

  document.getElementById("result-text").textContent = `${result
    .replace("_", " ")
    .replace("x", "-")
    .replace("x", "-")}`;

  imageChar.style.backgroundImage = 'url("' + images[result] + '")';
  document.getElementById("persona-description").textContent =
    descriptions[result] || "No description available.";

  if (Math.abs(axis1value) > 0.5) {
    v1.textContent = "straightforward";
    v2.textContent = "hesitant to act";
    bar1.style.width = `${axis1value * 100}%`;
  } else {
    v1.textContent = "hesitant to act";
    v2.textContent = "straightforward";
    if (Math.abs(axis1value) < 0.5) {
      axis1value = 1 - axis1value;
    }
    bar1.style.width = `${axis1value * 100}%`;
  }

  if (Math.abs(axis2value) > 0.5) {
    v3.textContent = "ignorantly safe";
    v4.textContent = "passionately selfless";
    bar2.style.width = `${axis2value * 100}%`;
  } else {
    v3.textContent = "passionately selfless";
    v4.textContent = "ignorantly safe";
    if (Math.abs(axis2value) < 0.5) {
      axis2value = 1 - axis2value;
    }
    bar2.style.width = `${axis2value * 100}%`;
  }
}

loadStats();
