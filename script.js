const display = document.querySelector('.screen');
let lastOperator = null;
let firstOperand = null;

document.addEventListener('click', (e) => {
  const currentElement = e.target;

  // Display & Visual Ability 
  if(currentElement.getAttribute('value') === "clear") clearDisplay();
  if(currentElement.classList.contains('number')) appendNumber(currentElement.getAttribute('value'));
  if(currentElement.getAttribute('value') === ".") addDecimal();

  if(currentElement.getAttribute('value') === "*") handleOperator('*');
  if(currentElement.getAttribute('value') === "-") handleOperator('-');
  if(currentElement.getAttribute('value') === "+") handleOperator('+');
  if(currentElement.getAttribute('value') === "percent") percent();
  if(currentElement.getAttribute('value') === "=") equals();
  if(currentElement.getAttribute('value') === "/") handleOperator('/');
  if(currentElement.getAttribute('value') === "sign") changeSign();

});

document.addEventListener('keyup', (e)=> {
  display.textContent = "meow"
})

function appendNumber(number){
  if (display.textContent === "0" ) {
    display.textContent = number;
    return;
  } else if (display.textContent.length < 8 ) { 
    display.textContent += number;
  }
}

function addDecimal() {
  if(!display.textContent.includes('.')) display.textContent += '.';
}

function clearDisplay() { 
  display.textContent = "0";
  lastOperator = null;
  firstOperand = null;
}

function updateDisplay(value) { 
  display.textContent = Math.round(parseFloat(value) * 1000) / 1000;
}

function handleOperator(operator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(display.textContent);
  } else if (lastOperator) {
    firstOperand = operate(firstOperand, parseFloat(display.textContent), lastOperator);
    updateDisplay(firstOperand);
  }
  lastOperator = operator;
  display.textContent = "0";

}

function equals() {
  if (lastOperator !== null) {
    const result = operate(firstOperand, parseFloat(display.textContent), lastOperator);
    updateDisplay(result);
    firstOperand = null;
    lastOperator = null;
  }
}

function operate(first, second , operator) { 
  if(operator === '*') return first * second;
  if(operator === '+') return first + second;
  if(operator === '-') return first - second;
  if(operator === '/') return second === 0 ? 'Error' : first / second;
}

function percent() {
  let current = parseFloat(display.textContent);
  updateDisplay(current / 100);
}

function changeSign() {
  let current = parseFloat(display.textContent);
  updateDisplay(current * -1);
}
  