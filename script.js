const numberButtons = document.querySelectorAll("[data-number]");

const clearButton = document.getElementById("data-clear");
const windowPreview = document.getElementById("currentPreview");
const resultWindow = document.getElementById("resultWindow");

clearButton.addEventListener("click", clearAll);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => writeToScreen(button.textContent))
);

function writeToScreen(number) {
  if (windowPreview.textContent == "0") {
    windowPreview.textContent = "";
  }
  windowPreview.textContent += number;
}

function clearAll() {
  resultWindow.textContent = "0";
  windowPreview.textContent = "0";
}
