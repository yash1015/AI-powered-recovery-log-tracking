// ═══════════════════════════════════════════════
//  DevOps MCQ Quiz — 20 Questions
// ═══════════════════════════════════════════════

const QUESTIONS = [
  {
    category: "Docker",
    question: "What command is used to list all running Docker containers?",
    options: ["docker ps", "docker list", "docker show", "docker containers"],
    answer: 0
  },
  {
    category: "Docker",
    question: "Which file does Docker use to build a container image?",
    options: ["docker-compose.yml", "Dockerfile", "container.json", "image.yaml"],
    answer: 1
  },
  {
    category: "Kubernetes",
    question: "In Kubernetes, what is the smallest deployable unit?",
    options: ["Container", "Node", "Pod", "Deployment"],
    answer: 2
  },
  {
    category: "Kubernetes",
    question: "Which Kubernetes command applies a configuration file to the cluster?",
    options: ["kubectl run", "kubectl apply -f", "kubectl create", "kubectl deploy"],
    answer: 1
  },
  {
    category: "CI/CD",
    question: "What does CI stand for in DevOps?",
    options: ["Container Integration", "Continuous Improvement", "Continuous Integration", "Code Infrastructure"],
    answer: 2
  },
  {
    category: "CI/CD",
    question: "Which of the following is a popular CI/CD tool?",
    options: ["Apache Tomcat", "Jenkins", "Redis", "MongoDB"],
    answer: 1
  },
  {
    category: "Git",
    question: "Which Git command creates a new branch and switches to it?",
    options: ["git branch new", "git switch create", "git checkout -b", "git new-branch"],
    answer: 2
  },
  {
    category: "Git",
    question: "What does 'git rebase' do?",
    options: [
      "Deletes the current branch",
      "Reapplies commits on top of another base branch",
      "Merges two branches with a merge commit",
      "Resets the repository to initial state"
    ],
    answer: 1
  },
  {
    category: "Linux",
    question: "Which command shows the disk usage of files and directories?",
    options: ["df -h", "ls -la", "du -sh", "free -m"],
    answer: 2
  },
  {
    category: "Linux",
    question: "What does the chmod 755 command do to a file?",
    options: [
      "Owner: read only. Others: no access",
      "Owner: full access. Group & others: read + execute",
      "Everyone: full access",
      "Owner: read + write. Others: no access"
    ],
    answer: 1
  },
  {
    category: "Networking",
    question: "What port does HTTPS use by default?",
    options: ["80", "8080", "443", "22"],
    answer: 2
  },
  {
    category: "Networking",
    question: "Which tool is used to test connectivity to a remote host?",
    options: ["curl", "ping", "wget", "ssh"],
    answer: 1
  },
  {
    category: "Docker",
    question: "What does 'docker-compose up -d' do?",
    options: [
      "Builds images only",
      "Stops all containers",
      "Starts services defined in docker-compose.yml in detached mode",
      "Removes all containers"
    ],
    answer: 2
  },
  {
    category: "Kubernetes",
    question: "What is a Kubernetes Service used for?",
    options: [
      "Running batch jobs",
      "Storing secrets",
      "Exposing pods to network traffic",
      "Scheduling workloads"
    ],
    answer: 2
  },
  {
    category: "DevOps Concepts",
    question: "What is Infrastructure as Code (IaC)?",
    options: [
      "Writing code that runs inside containers",
      "Managing infrastructure through code and config files instead of manual steps",
      "A programming language for DevOps",
      "Running applications directly on bare metal"
    ],
    answer: 1
  },
  {
    category: "DevOps Concepts",
    question: "Which tool is most commonly used for Infrastructure as Code?",
    options: ["Ansible", "Terraform", "Puppet", "Jenkins"],
    answer: 1
  },
  {
    category: "Linux",
    question: "Which command is used to view the last 100 lines of a log file in real time?",
    options: ["cat logfile", "tail -f -n 100 logfile", "head -100 logfile", "watch logfile"],
    answer: 1
  },
  {
    category: "CI/CD",
    question: "In a CI/CD pipeline, what does a 'stage' represent?",
    options: [
      "A server environment",
      "A Docker container",
      "A logical phase of the pipeline e.g. build, test, deploy",
      "A Git branch"
    ],
    answer: 2
  },
  {
    category: "Kubernetes",
    question: "What is the purpose of a Kubernetes ConfigMap?",
    options: [
      "To store encrypted passwords",
      "To define resource limits for pods",
      "To store non-sensitive configuration data as key-value pairs",
      "To schedule pods on specific nodes"
    ],
    answer: 2
  },
  {
    category: "DevOps Concepts",
    question: "What does 'shift left' mean in DevOps?",
    options: [
      "Moving servers to a different data center",
      "Moving testing and security earlier in the development pipeline",
      "Shifting deployment to left-side servers",
      "Refactoring legacy code"
    ],
    answer: 1
  }
];

// ── State ──────────────────────────────────────
let currentQ    = 0;
let score       = 0;
let userName    = '';
let userAnswers = []; // -1 = skipped
let timerInterval;
let timeLeft    = 30;
let answered    = false;

const LETTERS = ['A', 'B', 'C', 'D'];

// ── Screen navigation ──────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Start quiz ─────────────────────────────────
function startQuiz() {
  const input = document.getElementById('userName');
  const name  = input.value.trim();
  if (!name) {
    document.getElementById('nameError').textContent = '⚠ Please enter your name to begin.';
    input.focus();
    return;
  }
  userName    = name;
  currentQ    = 0;
  score       = 0;
  userAnswers = [];
  answered    = false;
  showScreen('screen-quiz');
  loadQuestion();
}

// ── Load question ──────────────────────────────
function loadQuestion() {
  answered = false;
  const q = QUESTIONS[currentQ];

  // Topbar
  const pct = ((currentQ) / QUESTIONS.length) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('qCounter').textContent = `Q ${currentQ + 1} / ${QUESTIONS.length}`;

  // Card
  document.getElementById('qNumber').textContent   = String(currentQ + 1).padStart(2, '0');
  document.getElementById('qCategory').textContent = q.category;
  document.getElementById('qText').textContent     = q.question;

  // Animate card
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'cardIn 0.4s ease';

  // Options
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className  = 'option-btn';
    btn.innerHTML  = `<span class="opt-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.onclick    = () => selectAnswer(i);
    grid.appendChild(btn);
  });

  // Next button
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled    = true;
  nextBtn.textContent = currentQ < QUESTIONS.length - 1 ? 'NEXT QUESTION →' : 'SEE RESULTS →';

  // Timer
  startTimer();
}

// ── Timer ──────────────────────────────────────
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) autoSkip();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el   = document.getElementById('timerDisplay');
  const wrap = document.getElementById('timerWrap');
  el.textContent = timeLeft;
  wrap.className = timeLeft <= 8 ? 'timer-wrap danger' : 'timer-wrap';
}

function autoSkip() {
  if (answered) return;
  answered = true;
  userAnswers.push({ selected: -1, correct: QUESTIONS[currentQ].answer });
  // Show correct answer
  const buttons = document.getElementById('optionsGrid').querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[QUESTIONS[currentQ].answer].classList.add('correct');
  document.getElementById('nextBtn').disabled = false;
}

// ── Select answer ──────────────────────────────
function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q       = QUESTIONS[currentQ];
  const buttons = document.getElementById('optionsGrid').querySelectorAll('.option-btn');

  buttons.forEach(b => b.disabled = true);

  if (idx === q.answer) {
    score++;
    buttons[idx].classList.add('correct');
  } else {
    buttons[idx].classList.add('wrong');
    buttons[q.answer].classList.add('correct');
  }

  userAnswers.push({ selected: idx, correct: q.answer });
  document.getElementById('nextBtn').disabled = false;
}

// ── Next question ──────────────────────────────
function nextQuestion() {
  currentQ++;
  if (currentQ >= QUESTIONS.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

// ── Show result ────────────────────────────────
function showResult() {
  clearInterval(timerInterval);
  showScreen('screen-result');

  const total   = QUESTIONS.length;
  const correct = score;
  const wrong   = userAnswers.filter(a => a.selected !== -1 && a.selected !== a.correct).length;
  const skipped = userAnswers.filter(a => a.selected === -1).length;
  const pct     = Math.round((correct / total) * 100);

  // Name
  document.getElementById('resultName').textContent = `Nice work, ${userName}!`;

  // Animate score ring
  setTimeout(() => {
    document.getElementById('scoreNum').textContent = correct;
    const circumference = 314;
    const offset = circumference - (pct / 100) * circumference;
    const ring = document.getElementById('ringFill');
    ring.style.strokeDashoffset = offset;
    // Color ring by score
    if (pct >= 80)      ring.style.stroke = 'var(--green)';
    else if (pct >= 60) ring.style.stroke = 'var(--accent)';
    else if (pct >= 40) ring.style.stroke = 'var(--yellow)';
    else                ring.style.stroke = 'var(--red)';
  }, 200);

  // Stats
  document.getElementById('statCorrect').textContent = correct;
  document.getElementById('statWrong').textContent   = wrong;
  document.getElementById('statSkipped').textContent = skipped;
  document.getElementById('statPercent').textContent = pct + '%';

  // Grade
  const badge = document.getElementById('gradeBadge');
  const msg   = document.getElementById('gradeMsg');
  if (pct >= 90) {
    badge.textContent = '🏆 EXPERT';
    badge.className   = 'grade-badge expert';
    msg.textContent   = 'Outstanding! You\'re DevOps ready.';
  } else if (pct >= 75) {
    badge.textContent = '🚀 ADVANCED';
    badge.className   = 'grade-badge great';
    msg.textContent   = 'Great job! A few more revisions and you\'re set.';
  } else if (pct >= 50) {
    badge.textContent = '📈 INTERMEDIATE';
    badge.className   = 'grade-badge average';
    msg.textContent   = 'Good start! Keep studying core concepts.';
  } else {
    badge.textContent = '📚 BEGINNER';
    badge.className   = 'grade-badge';
    msg.textContent   = 'Don\'t give up — every expert was once a beginner!';
  }

  // Question review
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = '';
  QUESTIONS.forEach((q, i) => {
    const ua = userAnswers[i] || { selected: -1, correct: q.answer };
    const isCorrect = ua.selected === ua.correct;
    const isSkipped = ua.selected === -1;

    const item = document.createElement('div');
    item.className = `review-item ${isSkipped ? 'review-skipped' : isCorrect ? 'review-correct' : 'review-wrong'}`;

    const icon = isSkipped ? '⏭' : isCorrect ? '✅' : '❌';
    let ansHtml = '';
    if (isSkipped) {
      ansHtml = `<div class="review-ans review-skipped-ans">Skipped — Correct: ${q.options[ua.correct]}</div>`;
    } else if (isCorrect) {
      ansHtml = `<div class="review-ans review-correct-ans">✓ ${q.options[ua.selected]}</div>`;
    } else {
      ansHtml = `
        <div class="review-ans review-wrong-ans">✗ You chose: ${q.options[ua.selected]}</div>
        <div class="review-ans review-correct-ans">✓ Correct: ${q.options[ua.correct]}</div>
      `;
    }

    item.innerHTML = `
      <div class="review-icon">${icon}</div>
      <div>
        <div class="review-q">Q${i + 1}. ${q.question}</div>
        ${ansHtml}
      </div>`;
    reviewList.appendChild(item);
  });
}

// ── Restart ────────────────────────────────────
function restartQuiz() {
  currentQ    = 0;
  score       = 0;
  userAnswers = [];
  answered    = false;
  showScreen('screen-welcome');
  document.getElementById('userName').value = '';
  document.getElementById('nameError').textContent = '';
}
