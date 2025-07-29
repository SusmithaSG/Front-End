const display = document.getElementById('display');
const buttonsContainer = document.getElementById('buttons');

let expression = '';

const buttons = [
  'C', '←', '.', '×',
  '7', '8', '9', '÷',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '00', '=', '%'
];

// Helper to update display
function updateDisplay(value) {
  display.value = value || '0';
}

// DOM: Create buttons
buttons.forEach(text => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = 'btn ' + (text === '=' ? 'btn-blue' : 
                            text === 'C' || text === '←' ? 'btn-red' :
                            ['×', '÷', '+', '-', '%'].includes(text) ? 'btn-purple' : '');
  btn.addEventListener('click', () => handleButtonClick(text));
  buttonsContainer.appendChild(btn);
});

// Handle click
function handleButtonClick(btn) {
  if (btn === 'C') {
    expression = '';
  } else if (btn === '←') {
    expression = expression.slice(0, -1);
  } else if (btn === '=') {
    try {
      expression = evaluateExpression(expression).toString();
    } catch {
      expression = 'Error';
    }
  } else {
    expression += btn;
  }
  updateDisplay(expression);
}

// Evaluate expression safely
function evaluateExpression(exp) {
  return Function('"use strict"; return (' + exp.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
}

// Handle keyboard events
document.addEventListener('keydown', (e) => {
  if (/[0-9]/.test(e.key)) {
    expression += e.key;
    updateDisplay(expression);
  } else if (['+', '-', '*', '/', '%'].includes(e.key)) {
    expression += e.key;
    updateDisplay(expression);
  } else if (e.key === 'Enter') {
    expression = evaluateExpression(expression).toString();
    updateDisplay(expression);
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  } else {
    alert('Only numbers are allowed');
  }
});
