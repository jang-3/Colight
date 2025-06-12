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
      // Render previous question if it exists
      if (question && choices.length > 0) {
        renderQuestion(container, question, choices, qIndex++, qType, embedUrl);
        choices = [];
        embedUrl = 0; // reset for next question
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

  // Render last question
  if (question && choices.length > 0) {
    renderQuestion(container, question, choices, qIndex++, qType, embedUrl);
  }
}

function renderQuestion(container, question, choices, index, qType, embedUrl) {
  const div = document.createElement("div");
  div.classList.add("question");
  if (embedUrl && embedUrl !== 0) {
    div.innerHTML += `
      <img class="gifshow" src="${embedUrl}" alt="Embedded media">
    `;
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
  allQns[0]?.classList.add("active"); // Show first question by default
}

function traverseQuestions(direction) {
  if (direction === "front" && allQIndex < allQns.length - 1) {
    allQIndex += 1;
  } else if (direction === "back" && allQIndex > 0) {
    allQIndex -= 1;
  }

  allQns.forEach((question, index) => {
    question.classList.toggle("active", index === allQIndex);
  });

  const isLastQuestion = allQIndex === allQns.length - 1;
  document.getElementById("checkbtn").style.display = isLastQuestion
    ? "flex"
    : "none";

  document.getElementById("nextbtn").style.display = isLastQuestion
    ? "none"
    : "flex";
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

  // Determine quadrant
  if (Math.abs(axis1) <= 1 && Math.abs(axis2) <= 1) {
    quadra = "Hero_Holland";
  } else if (axis1 > 0) {
    quadra = axis2 > 0 ? "Clueless_Chloe" : "Knowxitxall_Ken";
  } else if (axis1 < 0) {
    quadra = axis2 < 0 ? "Overthinker_Owen" : "Indifferent_Irene";
  }

  console.log("Results:", results);
  console.log(`Axis 1: ${axis1}, Axis 2: ${axis2}`);
  alert(`Axis 1: ${axis1}   Axis 2: ${axis2} result: ${quadra}`);

  sessionStorage.setItem("axis1", axis1);
  sessionStorage.setItem("axis2", axis2);
  axis1 = 0;
  axis2 = 0;
  window.location.href = `${window.location.origin}/result.html?result=${quadra}`;
}

loadQuestions();
