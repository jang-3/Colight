let allQns = [];
let axis1 = 0;
let axis2 = 0;
let allQIndex = 0;

async function loadQuestions() {
  const res = await fetch("questions.md");
  const mdText = await res.text();

  const lines = mdText.split("\n");
  const container = document.getElementById("quiz-container");

  let question = "";
  let choices = [];
  let qIndex = 0;
  let qType = "axis1";
  let embedUrl = 0;

  for (const line of lines) {
    if (line.startsWith("### Q:")) {
      if (question && choices.length > 0) {
        renderQuestion(container, question, choices, qIndex++, qType, embedUrl);
        choices = [];
        embedUrl = 0;
      }
      question = line.replace("### Q:", "").trim();
    } else if (line.startsWith("-")) {
      choices.push(line.replace("-", "").trim());
    } else if (line.startsWith("changeType")) {
      qType = "axis2";
    } else if (line.startsWith("$embed")) {
      embedUrl = line.replace("$embed", "").trim();
    }
  }

  if (question && choices.length > 0) {
    renderQuestion(container, question, choices, qIndex++, qType, embedUrl);
  }

  allQns[0]?.classList.add("active");
}

function renderQuestion(container, question, choices, index, qType, embedUrl) {
  const div = document.createElement("div");
  div.classList.add("question");
  if (embedUrl) {
    div.innerHTML += `<img class="gifshow" src="${embedUrl}" alt="Embedded media">`;
  }
  div.innerHTML += `<h4 class="${qType} question-ask">${question}</h4>`;
  choices.forEach((choice, i) => {
    const id = `q${index}_a${i}`;
    div.innerHTML += `
      <label for="${id}" class="quizOptions">
        <input type="radio" name="q${index}" value="${i}" id="${id}" hidden>
        <span>${choice}</span>
      </label><br>`;
  });

  container.appendChild(div);
  allQns.push(div);
}

function traverseQuestions(direction) {
  if (direction === "front" && allQIndex < allQns.length - 1) allQIndex++;
  else if (direction === "back" && allQIndex > 0) allQIndex--;

  allQns.forEach((q, i) => q.classList.toggle("active", i === allQIndex));

  const isLast = allQIndex === allQns.length - 1;
  document.getElementById("checkbtn").style.display = isLast ? "flex" : "none";
  document.getElementById("nextbtn").style.display = isLast ? "none" : "flex";
}

function submitAnswers() {
  let quadra = "Unknown";
  const results = [];
  const questionDivs = document.querySelectorAll(`.question`);

  questionDivs.forEach((div, index) => {
    const selected = div.querySelector(`input[name="q${index}"]:checked`);
    const questionEl = div.querySelector("h4");
    const questionText = questionEl?.textContent || `Question ${index + 1}`;
    const questionClass = questionEl?.classList;

    if (selected) {
      const selectedValue = selected.value;
      const choiceIndex = parseInt(selectedValue);
      const scoreMap = [-1.75, -1, 1, 1.75];
      const score = scoreMap[choiceIndex] ?? 0;

      if (questionClass.contains("axis1")) axis1 += score;
      else if (questionClass.contains("axis2")) axis2 += score;

      const label = div.querySelector(`label[for="${selected.id}"] span`);
      const selectedText = label?.textContent?.trim();
      if (selectedText) {
        incrementOptionCount(index, selectedText);
        results.push({ question: questionText, answer: selectedText });
      }
    } else {
      results.push({ question: questionText, answer: "No answer" });
    }
  });

  if (Math.abs(axis1) <= 1 && Math.abs(axis2) <= 1) quadra = "Hero_Holland";
  else if (axis1 > 0) quadra = axis2 > 0 ? "Clueless_Chloe" : "Knowxitxall_Ken";
  else if (axis1 < 0)
    quadra = axis2 < 0 ? "Overthinker_Owen" : "Indifferent_Irene";

  const safeResultKey = sanitizeKey(quadra); // 🔒 Sanitize Firebase path
  incrementFinalResult(safeResultKey);
  incrementSubmissionCount();

  sessionStorage.setItem("axis1", axis1);
  sessionStorage.setItem("axis2", axis2);
  axis1 = 0;
  axis2 = 0;

  window.location.href = `${window.location.origin}/result.html?result=${quadra}`;
}

window.traverseQuestions = traverseQuestions;
window.submitAnswers = submitAnswers;

// ---------------------- 🔥 FIREBASE -------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,
  runTransaction,
  update,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAY6kpTdzwwpc8siw5nMTC7RV6yhRm9jYg",
  authDomain: "colight-94527.firebaseapp.com",
  databaseURL:
    "https://colight-94527-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "colight-94527",
  storageBucket: "colight-94527.firebasestorage.app",
  messagingSenderId: "982501307891",
  appId: "1:982501307891:web:e8118309fd27e038fa8e86",
  measurementId: "G-H6SZZCPFK8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

function sanitizeKey(str) {
  return str
    .replace(/[.#$/\[\]"]/g, "") // remove invalid characters
    .replace(/\s+/g, "_"); // replace spaces with underscores
}

function incrementOptionCount(qIndex, selectedOption) {
  const safeKey = sanitizeKey(selectedOption);
  const optionRef = ref(db, `questions/${qIndex}/options/${safeKey}/count`);
  runTransaction(optionRef, (current) => (current || 0) + 1)
    .then(() =>
      console.log(`⬆️ Count incremented for Q${qIndex} – "${safeKey}"`)
    )
    .catch((err) => console.error("❌ Error incrementing count:", err));
}

function incrementFinalResult(resultKey) {
  const safeKey = sanitizeKey(resultKey);
  const resultRef = ref(db, `finalResults/${safeKey}`);
  runTransaction(resultRef, (current) => (current || 0) + 1)
    .then(() => console.log(`📈 Result incremented for "${safeKey}"`))
    .catch((err) => console.error("❌ Error updating result:", err));
}

function incrementSubmissionCount() {
  const countRef = ref(db, "totalSubmissions");
  runTransaction(countRef, (current) => (current || 0) + 1)
    .then(() => console.log("📊 Total submission count incremented."))
    .catch((err) => console.error("❌ Error updating submission count:", err));
}

loadQuestions();
