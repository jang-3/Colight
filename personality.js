let allChoices = [];
let axis1 = 0;
let axis2 = 0;
async function loadQuestions() {
  const res = await fetch("questions.md");
  const mdText = await res.text();

  const lines = mdText.split("\n");
  const container = document.getElementById("quiz-container");

  let question = "";
  let choices = [];
  let qIndex = 0;
  let qType = "axis1";

  for (const line of lines) {
    if (line.startsWith("### Q:")) {
      // Render previous question if exists
      if (question && choices.length > 0) {
        renderQuestion(container, question, choices, qIndex++, qType);
        choices = [];
      }
      question = line.replace("### Q:", "").trim();
    } else if (line.startsWith("-")) {
      choices.push(line.replace("-", "").trim());
    } else if (line.startsWith("changeType")) {
      qType = "axis2";
    }
  }
  // Render last question
  if (question && choices.length > 0) {
    renderQuestion(container, question, choices, qIndex++);
  }
}

function renderQuestion(container, question, choices, index, qType) {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `<p class="${qType}">${question}</p>`;

  choices.forEach((choice, i) => {
    const id = `q${index}_a${i}`;
    div.innerHTML += `
        <label for="${id}">
          <input type="radio" name="q${index}" value="${i}" id="${id}">
          ${choice}
        </label><br>`;
  });

  container.appendChild(div);
}

function submitAnswers() {
  const results = [];
  const questionDivs = document.querySelectorAll(`.question`);

  questionDivs.forEach((div, index) => {
    const selected = div.querySelector(`input[name="q${index}"]:checked`);
    const questionText =
      div.querySelector("p")?.textContent || `Question ${index + 1}`;
    const questionClass = div.querySelector("p")?.classList;

    if (selected) {
      const selectedValue = selected.value;
      const choiceIndex = parseInt(selectedValue);

      // ✅ Score using 4-option scale
      const scoreMap = [-2, -1, 1, 2];
      const score = scoreMap[choiceIndex] ?? 0;

      if (questionClass.contains("axis1")) {
        axis1 += score;
      } else if (questionClass.contains("axis2")) {
        axis2 += score;
      }
    }

    results.push({
      question: questionText,
      answer: selected ? selected.value : "No answer",
    });
  });

  console.log("Results:", results);
  console.log(`Axis 1: ${axis1}, Axis 2: ${axis2}`);
  alert(`Axis 1: ${axis1}   Axis 2: ${axis2}`);
}

loadQuestions();
