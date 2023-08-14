let firstNumber = "";
let secondNumber = "";
let finalResult = null;
let currentOperator = null;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("data-clear");
const windowPreview = document.getElementById("currentPreview");
const equalButton = document.getElementById("equalsBtn");
const resultWindow = document.getElementById("resultWindow");
const decimalButton = document.getElementById("decimal");
const backButton = document.getElementById("backspace");

//event Listeners
window.addEventListener("keydown", keyboardSupport);
clearButton.addEventListener("click", clearAll);
equalButton.addEventListener("click", evaluate);
decimalButton.addEventListener("click", addDecimal);
backButton.addEventListener("click", deletePrevious);

//button cycles.
numberButtons.forEach((button) =>
  button.addEventListener("click", () => writeToScreen(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

//helper functions
function resetWindow() {
  windowPreview.textContent = "0";
  if (finalResult !== null) {
    resultWindow.textContent = ` ${finalResult} ${currentOperator}`;
  }
}

function writeToScreen(number) {
  if (windowPreview.textContent == "0") {
    windowPreview.textContent = " ";
  }
  if (currentOperator === null && finalResult !== null) {
    clearAll();
    windowPreview.textContent = " ";
    windowPreview.textContent += number;
  } else {
    windowPreview.textContent += number;
  }
}
function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = windowPreview.textContent;
  currentOperator = operator;
  secondNumber = finalResult;
  resultWindow.textContent = `${firstNumber} ${currentOperator}`;
  resetWindow();
}
function addDecimal() {
  if (windowPreview.textContent.includes(".")) return;
  windowPreview.textContent += ".";
}

function deletePrevious() {
  windowPreview.textContent = windowPreview.textContent.toString().slice(0, -1);
}
function clearAll() {
  resultWindow.textContent = "0";
  windowPreview.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  finalResult = null;
}

//calculate functions
function add(n1, n2) {
  return n1 + n2;
}
function subtract(n1, n2) {
  return n1 - n2;
}
function multiply(n1, n2) {
  return n1 * n2;
}
function divide(n1, n2) {
  return n1 / n2;
}
function divisable(n1, n2) {
  return n1 % n2;
}

function operate(operator, n1, n2) {
  n1 = Number(n1);
  n2 = Number(n2);
  if (operator === "+") {
    return add(n1, n2);
  } else if (operator === "-") {
    return subtract(n1, n2);
  } else if (operator === "*") {
    return multiply(n1, n2);
  } else if (operator === "÷" || operator === "/") {
    return divide(n1, n2);
  } else if (operator === "%") {
    return divisable(n1, n2);
  } else {
    return null;
  }
}
function evaluate() {
  if (finalResult === null) {
    secondNumber = windowPreview.textContent;
    resultWindow.textContent = operate(
      currentOperator,
      firstNumber,
      secondNumber
    );
  } else if (finalResult !== null) {
    firstNumber = windowPreview.textContent;
    resultWindow.textContent = operate(
      currentOperator,
      secondNumber,
      firstNumber
    );
  }

  finalResult = resultWindow.textContent;

  windowPreview.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;

  currentOperator = null;
  // checks for if dividing by 0 and resets display on clicking equals twice
  if (finalResult === "Infinity") {
    clearAll();
    windowPreview.textContent = "Cannot divide by 0";
    return;
  } else if (windowPreview.textContent.includes("null")) {
    clearAll();
  }
}

function keyboardSupport(e) {
  if (e.key === "Escape") clearAll();
  if (e.key >= 0 && e.key <= 9) writeToScreen(e.key);
  if (e.key === "Delete") deletePrevious();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(e.key);
  if (e.key === "Enter") evaluate();
  if (e.key === ".") addDecimal();
}
