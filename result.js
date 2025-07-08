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
  Hero_Holland: {
    description: `You are calm, grounded, and brave — not because fear doesn’t exist for you, but because you’ll choose to act through it. You’ll recognise that domestic violence isn’t always obvious, and you won’t look away when others stay silent. You’ll believe in caring out loud and stepping in safely, even when it’s difficult.`,
    growth: `You can continue to grow by helping others learn how to support safely. You’ll be able to encourage your friends to speak up when something feels wrong, and guide them using the <a href="art.html" id="special">A.R.T. method</a> A.R.T. of Safe Interruption</a> — Approaching calmly, Responding with care, and Talking without blame. If someone is unsure how to help, you can share what’s worked for you. By modelling thoughtful action and empathy, you’ll become a steady influence in creating a safer, more caring community.`,
  },

  Indifferent_Irene: {
    description: `You tend to keep your distance when something feels off, thinking it’s not your place to get involved. It’s not that you won’t care — you just believe others should handle their own problems unless they ask. But staying silent could unintentionally allow harm to continue.`,
    growth: `You can start growing by recognising that silence will still have an impact — and often not a helpful one. If you notice someone withdrawing or showing signs of distress, you can begin by gently checking in. A simple “Hey, is everything okay?” will open the door. You’ll be able to show support using the <a href="art.html">A.R.T. method</a>: approach with calm, respond with empathy, and speak without assigning blame. Even small acts of presence will show others they are seen and not alone.`,
  },

  Clueless_Chloe: {
    description: `You care deeply, but you might not always recognise the signs of abuse — especially when they’re quiet or emotional rather than physical. It’s not that you’ll ignore people in pain, you just haven’t learned what to look out for yet.`,
    growth: `You’ll be able to grow by learning how abuse can show up in subtle ways — like excessive control, manipulation, or isolation. When you start to notice these signs, you can act using the <a href="art.html" id="special">A.R.T. method</a>: you’ll calmly approach someone you’re concerned about, respond with understanding, and talk gently without placing blame. If a friend seems constantly anxious around their partner or stops talking to others, you’ll know how to check in. As you become more aware, you’ll offer the kind of support others can truly count on.`,
  },

  Overthinker_Owen: {
    description: `You’ll notice when something’s wrong — the strange energy, the uncomfortable silence — and you’ll want to help. But you might get caught in your thoughts, worrying about what could go wrong if you say the wrong thing or misread the situation.`,
    growth: `You can grow by realising that overthinking will often lead to inaction, and silence can still cause harm. If you see something concerning, you can take a small, safe step. Using the <a href="art.html" id="special">A.R.T. method</a>, you’ll be able to calmly approach someone, offer care by listening without judgment, and speak without blame. You won’t need the perfect words — only the willingness to be present. Over time, your confidence will grow as you choose thoughtful action over fear of making a mistake.`,
  },

  Knowxitxall_Ken: {
    description: `You’re bold and quick to act when you sense a problem, driven by good intentions. But in your urgency, you might step in without fully understanding the situation — which could lead to more harm than help.`,
    growth: `You can grow by learning to pause before jumping in. If you see someone upset or uncomfortable, you can take a moment to assess the situation and then apply the <a href="art.html" id="special">A.R.T. method</a>. You’ll approach with calm, respond with care, and speak in a way that doesn’t blame or escalate. By slowing down and listening first, you’ll protect others and yourself. Your strength will come not just from acting, but from knowing when and how to act wisely.`,
  },
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
    .replace("x", "-")
    .replace("x", "-")}`;

  imageChar.style.backgroundImage = 'url("' + images[result] + '")';
  document.getElementById("persona-description").innerHTML =
    descriptions[result].description || "No description available.";

  document.getElementById("growth-path").innerHTML =
    descriptions[result].growth || "No growth available.";
  if (Math.abs(axis1value) > 0.5) {
    v1.textContent = "direct";
    v2.textContent = "hesitant";
    bar1.style.width = `${axis1value * 100}%`;
  } else {
    v1.textContent = "hesitant";
    v2.textContent = "direct";
    if (Math.abs(axis1value) < 0.5) {
      axis1value = 1 - axis1value;
    }
    bar1.style.width = `${axis1value * 100}%`;
  }

  if (Math.abs(axis2value) > 0.5) {
    v3.textContent = "secure";
    v4.textContent = "selfless";
    bar2.style.width = `${axis2value * 100}%`;
  } else {
    v3.textContent = "selfless";
    v4.textContent = "secure";
    if (Math.abs(axis2value) < 0.5) {
      axis2value = 1 - axis2value;
    }
    bar2.style.width = `${axis2value * 100}%`;
  }
}

loadStats();
