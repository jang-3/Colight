async function loadQuestions() {
  const res = await fetch("questions.md");
  const mdText = await res.text();

  const lines = mdText.split("\n");
  const container = document.getElementById("quiz-container");

  let question = "";
  let choices = [];
  let qIndex = 0;

  for (const line of lines) {
    if (line.startsWith("### Q:")) {
      // Render previous question if exists
      if (question && choices.length > 0) {
        renderQuestion(container, question, choices, qIndex++);
        choices = [];
      }
      question = line.replace("### Q:", "").trim();
    } else if (line.startsWith("-")) {
      choices.push(line.replace("-", "").trim());
    }
  }

  // Render last question
  if (question && choices.length > 0) {
    renderQuestion(container, question, choices, qIndex++);
  }
}

function renderQuestion(container, question, choices, index) {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `<p>${question}</p>`;

  choices.forEach((choice, i) => {
    const id = `q${index}_a${i}`;
    div.innerHTML += `
        <label for="${id}">
          <input type="radio" name="q${index}" value="${choice}" id="${id}">
          ${choice}
        </label><br>`;
  });

  container.appendChild(div);
}

loadQuestions();
