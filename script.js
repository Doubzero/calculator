const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator");
const clearButton = document.getElementById("data-clear");
const windowPreview = document.getElementById("currentPreview");
const resultWindow = document.getElementById("resultWindow");

//event Listeners
clearButton.addEventListener("click", clearAll);
//cycle through all objects to write button text to screen.
numberButtons.forEach((button) =>
  button.addEventListener("click", () => writeToScreen(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);
//helper functions
function writeToScreen(number) {
  if (windowPreview.textContent == "0") {
    windowPreview.textContent = "";
  }
  windowPreview.textContent += number;
}
function setOperation(operator) {
  windowPreview.textContent += " " + operator + " ";
}
function clearAll() {
  resultWindow.textContent = "0";
  windowPreview.textContent = "0";
}
