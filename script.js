const baseQuestions = [
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
  },
  {
    q: "D'où vient le terme japonais désignant les dessins animés ?",
    options: ["D'une abréviation d'\"animation\"", "D'un nom de studio", "D'un mot signifiant \"magie\"", "D'un jeu vidéo"],
    correct: 0
  },
  {
    q: "Comment appelle-t-on les bandes dessinées japonaises ?",
    options: ["Manhwa", "Manga", "Anime", "Doujin"],
    correct: 1
  },
  {
    q: "Dans la plupart des mangas, dans quel sens se lit une page ?",
    options: ["De gauche à droite", "De droite à gauche", "De haut en bas uniquement", "Cela varie toujours"],
    correct: 1
  },
  {
    q: "Quel terme désigne un fan très investi dans la culture anime/manga ?",
    options: ["Otaku", "Senpai", "Kawaii", "Shonen"],
    correct: 0
  },
  {
    q: "Que signifie \"shonen\" dans une catégorie de manga ?",
    options: ["Destiné aux jeunes filles", "Destiné aux jeunes garçons", "Genre horreur", "Genre historique"],
    correct: 1
  },
  {
    q: "Dans L'Atelier des Sorciers, que risque-t-on à dessiner un sceau interdit ?",
    options: ["Rien, c'est sans danger", "Une transformation forcée en objet", "Un simple mal de tête", "La perte de la vue"],
    correct: 1
  },
  {
    q: "Quel type de contenu TikTok permet de découvrir une histoire en épisodes ?",
    options: ["Un live uniquement", "Une série postée partie par partie", "Une story de 24h", "Un sondage"],
    correct: 1
  }
];

let pool = [];
let currentItem = null;
let score = 0;
let answered = 0;

const questionEl = document.getElementById('quizQuestion');
const optionsEl = document.getElementById('quizOptions');
const resultEl = document.getElementById('quizResult');
const restartBtn = document.getElementById('quizRestart');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function refillPool() {
  pool = shuffle(baseQuestions);
}

function loadQuestion() {
  if (pool.length === 0) refillPool();
  currentItem = pool.pop();

  resultEl.textContent = `Score : ${score}/${answered} · question infinie 🔁`;
  optionsEl.innerHTML = '';

  const shuffledOptions = currentItem.options.map((opt, i) => ({ opt, i }));
  const shuffled = shuffle(shuffledOptions);

  questionEl.textContent = currentItem.q;

  shuffled.forEach(({ opt, i }) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i, btn);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  answered++;

  if (index === currentItem.correct) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    buttons.forEach(b => {
      if (b.textContent === currentItem.options[currentItem.correct]) {
        b.classList.add('correct');
      }
    });
  }

  restartBtn.style.display = 'inline-block';
  setTimeout(loadQuestion, 900);
}

restartBtn.onclick = () => {
  score = 0;
  answered = 0;
  restartBtn.style.display = 'none';
  loadQuestion();
};

loadQuestion();
