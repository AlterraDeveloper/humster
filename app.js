const Tap = (value) => `<div class="tap">+${value}</div>`;

const humsterButton = document.querySelector("#tap-button");
const humsterContainer = document.querySelector(".tap-container");
const scoreValue = document.querySelector("#score-value");

scoreValue.innerText = (5_000_000).toLocaleString();

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

const tapUpValue = 5;

humsterButton.addEventListener("click", (event) => {
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
    console.log("Score:", scoreValue.innerText);
    const test = scoreValue.innerText.replaceAll(String.fromCharCode(160), "");
    let value = parseInt(test);
    console.log("value:", test);
    value++;
    scoreValue.innerText = value.toLocaleString();
  }, intervalStep);

  setTimeout(() => {
    clearInterval(intervalToken);
  }, intervalStep * (tapUpValue + 1));
});
