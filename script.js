// Variables Section : 

const display = document.querySelector('.screen');
let lastOperator = null;
let firstOperand = null;
const numbers = [0,1,2,3,4,5,6,7,8,9]
const operations = ['*','-','+','/']

// EventListeners for KeyBoard & Mouse
document.addEventListener('click', (e) => {

  const currentElement = e.target;
  const currentElementValue = currentElement.getAttribute('value');
  // Display & Visual Ability 
  if(currentElementValue === "clear" || display.textContent == "NaN") clearDisplay();
  if(currentElement.classList.contains('number')) appendNumber(currentElementValue);
  if(operations.includes(currentElementValue)) handleOperator(currentElementValue);
  if(currentElementValue === ".") addDecimal();
  if(currentElementValue === "percent") percent();
  if(currentElementValue === "=") equals()
  if(currentElementValue === "sign") changeSign();
});

document.addEventListener('keydown', (e) =>  {

  if(numbers.includes(parseInt(e.key))) appendNumber(e.key);
  if(operations.includes(e.key)) handleOperator(e.key);
  if(e.key === ".") addDecimal();
  if(e.key === "%") percent();
  if(e.key === "Enter") equals();
  if(e.key === "c") clearDisplay();
  if(e.key === "Backspace") deleteLast();
})

// Calculator Functions
function appendNumber(number){
  if (display.textContent == "0" ) {
    display.textContent = number;
    return;
  } else if (display.textContent.length < 8 ) { 
    display.textContent += number;
  }
}

function deleteLast(){
  if (!display.textContent == "0"){
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
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

function operate(first, second, operator) { 
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