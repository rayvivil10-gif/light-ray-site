const questions = [
  {
    q: "Dans L'Atelier des Sorciers, comment la magie est-elle principalement pratiquée ?",
    options: ["Avec des baguettes", "En dessinant des cercles magiques", "Par incantation orale", "Avec des potions"],
    correct: 1
  },
  {
    q: "Quel est le nom de l'héroïne principale ?",
    options: ["Coco", "Riche", "Agott", "Tetia"],
    correct: 0
  },
  {
    q: "Que se passe-t-il si un sorcier trace un mauvais sceau sur son propre visage ?",
    options: ["Rien du tout", "Il perd sa mémoire", "Il devient invisible", "Il perd ses pouvoirs"],
    correct: 1
  },
  {
    q: "Comment appelle-t-on les praticiens de la magie dans cet univers ?",
    options: ["Mages", "Enchanteurs", "Sorciers", "Alchimistes"],
    correct: 2
  },
  {
    q: "Quel objet est essentiel pour dessiner les sceaux magiques ?",
    options: ["Une plume enchantée", "Un pinceau et de l'encre spéciale", "Un cristal", "Un bâton runique"],
    correct: 1
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById('quizQuestion');
const optionsEl = document.getElementById('quizOptions');
const resultEl = document.getElementById('quizResult');
const restartBtn = document.getElementById('quizRestart');

function loadQuestion() {
  resultEl.textContent = '';
  optionsEl.innerHTML = '';
  const item = questions[current];
  questionEl.textContent = `${current + 1}/${questions.length} — ${item.q}`;

  item.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i, btn);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  const item = questions[current];
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  if (index === item.correct) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    buttons[item.correct].classList.add('correct');
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showFinalResult();
    }
  }, 900);
}

function showFinalResult() {
  questionEl.textContent = 'Quiz terminé !';
  optionsEl.innerHTML = '';
  let title;
  if (score === questions.length) title = "Sorcier Maître 🔮";
  else if (score >= questions.length / 2) title = "Apprenti confirmé 🪄";
  else title = "Débutant curieux 📖";
  resultEl.textContent = `Score : ${score}/${questions.length} — ${title}`;
  restartBtn.style.display = 'inline-block';
}

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  restartBtn.style.display = 'none';
  loadQuestion();
};

loadQuestion();
