// Remove annoying ads
const removeAds = () => {
  const ads = [...document.getElementsByClassName("ad")];
  ads.forEach((ad) => ad.remove());
};

// updater
const updateDialog = ({ bestPick, filteredWordList }) => {
  const bestPickEl = document.getElementById("wordle-solver-dialog-best-pick");
  bestPickEl.textContent = bestPick;
  const potentialWordsEl = document.getElementById(
    "wordle-solver-dialog-potential-words"
  );
  potentialWordsEl.innerHTML = filteredWordList.join("<br />");
};

const rowIsValid = (row) => {
  if (!row.textContent) return false;

  const cells = [...row.children];
  const cellStates = cells.map((c) => c.children[0].getAttribute("data-state"));
  if (cellStates.includes("tbd")) return false;

  return true;
};

const update = () => {
  removeAds();
  const guesses = [];
  // scrape the page
  const rows = [...document.getElementsByClassName("Row-module_row__pwpBq")];
  rows.forEach((row) => {
    if (!rowIsValid(row)) return;
    const usedLetters = new Set([]);
    let validLetters = "-----".split("");

    const cells = [...row.children];
    cells.forEach((cell, index) => {
      const cellBlock = cell.children[0];
      const state = cellBlock.getAttribute("data-state");
      if (state === "tbd") return;

      if (state === "absent") {
        usedLetters.add(cellBlock.textContent);
        // validLetters += "-";
      } else if (state === "present") {
        validLetters[index] = cellBlock.textContent;
      } else if (state === "correct") {
        validLetters[index] = cellBlock.textContent.toUpperCase();
      } else {
        console.error("unknown state", state);
      }
    });
    const validString = validLetters.join("");
    const usedString = [...usedLetters].join("");
    guesses.push({ correctLetters: validString, usedLetters: usedString });
  });

  if (!guesses.length) return;

  (async () => {
    console.log(guesses);
    const src = chrome.runtime.getURL("solver.js");
    const solver = await import(src);
    const result = solver.solve(guesses);
    updateDialog(result);
  })();
};

window.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") return;
  // TODO: wait for animation to finish
  setTimeout(update, 2000);
});

// TODO: add a button to append the answer to the JSON file
// might have to do this in a background script

const dialog = document.createElement("div");
dialog.innerHTML = `
  <h1>Wordle Solver</h1>
  <div>
    Best Pick: <strong id="wordle-solver-dialog-best-pick" style="font-weight: bold;">salet</strong>
  </div>
  <div>
    <h2>Potential Words:</h2>
    <div
      id="wordle-solver-dialog-potential-words"
      style="height: calc(100vh - 160px); overflow: scroll; background-color: white;">
    </div>
  </div>
`;
dialog.id = "wordle-solver-dialog";
dialog.style.position = "fixed";
dialog.style.top = "66px";
dialog.style.right = "0";
dialog.style.zIndex = "9999";
dialog.style.backgroundColor = "lightgray";
dialog.style.padding = "10px";
dialog.style.width = "calc((100vw - 500px) / 2)))";

const button = document.createElement("button");
button.innerHTML = "Update";
button.onclick = update;

dialog.appendChild(button);

document.body.appendChild(dialog);
removeAds();
