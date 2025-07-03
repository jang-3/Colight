async function loadQuestions() {
  const res = await fetch("generate.md");
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
  div.innerHTML += `<h4 class="${qType} question-ask">${question}</h4>`;
  choices.forEach((choice, i) => {
    const id = `q${index}_a${i}`;
    div.innerHTML += `
        <label for="${id}" class="qnOptions">
          <input type="radio" name="q${index}" value="${i}" id="${id}" hidden>
          <span onclick="traverseQuestions('front')">${choice}</span>
        </label><br>`;
  });

  container.appendChild(div);
  allQns.push(div);
}

function traverseQuestions(direction) {
  setTimeout(() => {
    if (direction === "front" && allQIndex < allQns.length - 1) allQIndex++;
    else if (direction === "back" && allQIndex > 0) allQIndex--;

    allQns.forEach((q, i) => q.classList.toggle("active", i === allQIndex));

    const isLast = allQIndex === allQns.length - 1;
    document.getElementById("checkbtn").style.display = isLast
      ? "flex"
      : "none";
    document.getElementById("nextbtn").style.display = isLast ? "none" : "flex";
  }, 300); // delay of 300 milliseconds
}
