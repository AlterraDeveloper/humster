const Tap = (value) => `<div class="tap">+${value}</div>`;

const humsterButton = document.querySelector("#tap-button");
const humsterContainer = document.querySelector(".tap-container");
const scoreValue = document.querySelector("#score-value");
const levelName = document.querySelector("#level-name");
const levelValue = document.querySelector("#level-value");
const progressBar = document.querySelector("#progress-bar");

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

let state;

const levels = {
  1: {
    name: "Bronze",
    from: 0,
  },
  2: {
    name: "Silver",
    from: 100,
  },
  3: {
    name: "Gold",
    from: 200,
  },
  4: {
    name: "Platinum",
    from: 300,
  },
  5: {
    name: "Diamond",
    from: 400,
  },
  6: {
    name: "Epic",
    from: 500,
  },
  7: {
    name: "Legendary",
    from: 600,
  },
  8: {
    name: "Master",
    from: 700,
  },
  9: {
    name: "Grandmaster",
    from: 800,
  },
  10: {
    name: "Lord",
    from: 900,
  },
};

const database = {
  key: "humster-state",
  save: function (state) {
    localStorage.setItem(this.key, JSON.stringify(state));
  },
  restore: function () {
    const stateJson = localStorage.getItem(this.key);
    if (!stateJson) {
      return {
        coins: 0,
        level: 1,
        energy: 5000,
      };
    }
    return JSON.parse(stateJson);
  },
};

function initApp() {
  state = database.restore();

  scoreValue.innerText = state.coins;
  levelName.innerText = levels[state.level].name;
  levelValue.innerText = `${state.level} / ${Object.keys(levels).length}`;
  progressBar.style.width = `${Math.min(
    state.coins - 100 * (state.level - 1),
    100
  )}%`;
  humsterButton.style.backgroundImage = `url('./images/${state.level}.png')`;
}

function increaseLevel() {
  for (const key in levels) {
    const level = levels[key];
    if (level.from > state.coins) {
      break;
    }
    state.level = Number(key);
  }
  levelName.innerText = levels[state.level].name;
  levelValue.innerText = `${state.level} / ${Object.keys(levels).length}`;
  humsterButton.style.backgroundImage = `url('./images/${state.level}.png')`;
}

function increaseCoins() {
  const tapUpValue = 5;

  const tap = createElementFromHTML(Tap(tapUpValue));
  tap.style.transform = "translate(-50%, -50%)";
  tap.style.top = `${event.pageY}px`;
  tap.style.left = `${event.pageX}px`;

  humsterContainer.append(tap);
  setTimeout(() => {
    tap.remove();
  }, 900);

  const intervalStep = 60;

  let intervalToken = setInterval(() => {
    const test = scoreValue.innerText.replaceAll(String.fromCharCode(160), "");
    let value = parseInt(test);
    value++;
    scoreValue.innerText = value.toLocaleString();
  }, intervalStep);

  setTimeout(() => {
    clearInterval(intervalToken);
  }, intervalStep * (tapUpValue + 1));

  state.coins += tapUpValue;
}

function increaseProgress() {
  progressBar.style.width = `${Math.min(
    state.coins - 100 * (state.level - 1),
    100
  )}%`;
}

humsterButton.addEventListener("click", (event) => {
  increaseCoins();
  increaseLevel();
  increaseProgress();
  database.save(state);
});

initApp();
