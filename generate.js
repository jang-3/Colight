let allQns = [];
let answered = [];
let finalAnswers = [];
let choiceAnswered = 0;
let quizStarted = false;
let allQIndex = 0;

let qnStart = document.getElementById("prompter");
let checkPersona = document.getElementById("persona-select");
let selfie = document.getElementById("selfie");
let name = document.getElementById("name-input");
let thanks = document.getElementById("thanks");
let welcome = document.getElementById("welcome");
let set = document.querySelector(".set");

let fullQuiz = [welcome, qnStart, name, checkPersona, selfie, thanks];
let fc = document.getElementById("fc");
let bc = document.getElementById("bc");

function startPledge() {
  cycleQuizStage("next");
  quizStarted = true;

  set.style.display = "flex";
}

async function loadQuestions() {
  const res = await fetch("generate.md");
  const mdText = await res.text();

  const lines = mdText.split("\n");
  const container = document.getElementById("prompter");

  let question = "";
  let choices = [];
  let qIndex = 0;
  let qType = "axis1";
  let embedUrl = 0;

  for (const line of lines) {
    if (line.startsWith("### Q:")) {
      if (question) {
        renderQuestion(container, question, choices, qIndex++, qType, embedUrl);
        choices = []; // ✅ reset choices for next question
        embedUrl = 0; // ✅ reset embed
      }
      question = line.replace("### Q:", "").trim();
    } else if (line.startsWith("-")) {
      choices.push(line.replace("-", "").trim());
    } else if (line.startsWith("$embed")) {
      embedUrl = line.replace("$embed", "").trim();
    }
  }

  // ✅ Render the final question (even if no next Q: line came)
  if (question) {
    renderQuestion(container, question, choices, qIndex++, qType, embedUrl);
  }

  allQns[0]?.classList.add("active");
}

function renderQuestion(container, question, choices, index, qType, embedUrl) {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML += `<div class="qnOptions titleQ"> <p style="margin-bottom: 20px; font-size: 15px;">Click the arrows to cycle between question selections. Pick three questions to answer by submitting them. Remember to click "take selfie" at the end!</p><h4 class="${qType} question-ask">${question}</h4> </div>`;

  if (choices.length > 0) {
    choices.forEach((choice, i) => {
      const id = `q${index}_a${i}`;
      div.innerHTML += `
      <label class="qnOptions">
        <input type="radio" name="q${index}" value="${i}" id="${id}">
        <span>${choice}</span>
      </label><br>`;
    });
  } else {
    div.innerHTML += `<textarea class="qnAns" rows="4" cols="50" placeholder="Type your answer here..."></textarea>`;
  }

  container.appendChild(div);
  allQns.push(div);
}

function submitAns() {
  const currentQn = allQns[allQIndex];

  if (currentStageIndex === 1 && choiceAnswered < 3) {
    // 🔍 1. Extract the question text
    const questionText = currentQn.querySelector("h4")?.textContent.trim();

    // 🔍 2. Try getting selected radio (if it's a multiple choice)
    const selectedInput = currentQn.querySelector(
      "input[type='radio']:checked"
    );
    let answerText = "";

    if (selectedInput) {
      // Get the text inside the <span> next to the selected radio
      const label = selectedInput.closest("label");
      answerText = label?.querySelector("span")?.textContent.trim() || "";
    } else {
      // 🔍 3. Try getting textarea answer (if open-ended)
      const textarea = currentQn.querySelector("textarea");
      answerText = textarea?.value.trim() || "";
    }

    // 🔐 4. Push final answer into the result array
    finalAnswers.push({
      question: questionText,
      answer: answerText,
    });

    answered.push(currentQn);
    choiceAnswered += 1;

    currentQn.remove();
    allQns.splice(allQIndex, 1);

    if (choiceAnswered === 3) {
      cycleQuizStage("next");
      document.getElementById("prompt").value =
        generateImagePrompt(finalAnswers);
      window.sendPrompt();
    } else {
    }
  } else if (currentStageIndex > 1 || choiceAnswered >= 3) {
    cycleQuizStage("next");
    return;
  }

  if (allQIndex >= allQns.length) {
    allQIndex = allQns.length - 1;
  }

  allQns.forEach((q, i) => q.classList.toggle("active", i === allQIndex));
}

function generateImagePrompt(finalAnswers) {
  // Extract just the answer text
  const keywords = finalAnswers
    .map((entry) => entry.answer.trim())
    .filter((answer) => answer.length > 0); // remove blanks

  // Join answers into a single phrase
  const joined = keywords.join(", ");

  // Build final prompt
  const prompt = "Please generate a background image of " + joined;
  return prompt;
}

function traverseQuestions(direction) {
  setTimeout(() => {
    if (direction === "front" && choiceAnswered >= 3) {
      cycleQuizStage("next");
      return;
    }

    if (direction === "front") {
      allQIndex = (allQIndex + 1) % allQns.length; // ✅ loop to start
    } else if (direction === "back") {
      allQIndex = (allQIndex - 1 + allQns.length) % allQns.length; // ✅ loop to end
    }

    allQns.forEach((q, i) => q.classList.toggle("active", i === allQIndex));

    const isLast = allQIndex === allQns.length - 1;
  }, 300);
}

let currentStageIndex = 0; // index in fullQuiz

function cycleQuizStage(direction) {
  // Hide all stages
  if (quizStarted) {
    bc.style.display = "none";
    fc.style.display = "none";
  }
  fullQuiz.forEach((section) => (section.style.display = "none"));

  // Update index based on direction
  if (direction === "next" && currentStageIndex < fullQuiz.length - 1) {
    currentStageIndex++;
  } else if (direction === "back" && currentStageIndex > 0) {
    currentStageIndex--;
  }

  // Show current stage
  fullQuiz[currentStageIndex].style.display = "flex"; // or "block" if flex isn't needed
  if (currentStageIndex === fullQuiz.length - 1) {
    document.getElementById("sa").style.display = "none";
  }
}

loadQuestions();
fullQuiz.forEach((section, i) => {
  section.style.display = i === 0 ? "flex" : "none";
});
