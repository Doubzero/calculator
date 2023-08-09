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

//event Listeners
clearButton.addEventListener("click", clearAll);
equalButton.addEventListener("click", evaluate);

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
    resultWindow.textContent = `${finalResult} ${currentOperator}`;
  }
}
function clearNum() {}
function writeToScreen(number) {
  if (windowPreview.textContent == "0") {
    windowPreview.textContent = " ";
  }

  windowPreview.textContent += number;
}
function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = windowPreview.textContent;
  currentOperator = operator;
  secondNumber = finalResult;
  resultWindow.textContent = `${firstNumber} ${currentOperator}`;
  resetWindow();
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
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function divisable(a, b) {
  return a % b;
}

function operate(operator, n1, n2) {
  n1 = Number(n1);
  n2 = Number(n2);
  if (operator === "+") {
    return add(n1, n2);
  } else if (operator === "-") {
    return subtract(n2, n1);
  } else if (operator === "*") {
    return multiply(n1, n2);
  } else if (operator === "÷") {
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
  } else {
    firstNumber = windowPreview.textContent;
    resultWindow.textContent = operate(
      currentOperator,
      firstNumber,
      secondNumber
    );
  }
  finalResult = resultWindow.textContent;

  windowPreview.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;

  currentOperator = null;
}
