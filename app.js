// Defining Global Variables
////////////////////////////////////////////////////
const display = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const slider = document.getElementById('slider');
const sliderLabel = document.getElementById('sliderValue');
const numCheck = document.getElementById('number');
const letterCheck = document.getElementById('letter');
const mixCheck = document.getElementById('mixedCase');
const puncCheck = document.getElementById('punctuation');

const numbers = "0123456789".split('');
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const upperLetters = lowerLetters.map((value) => value.toUpperCase());
const punctuations = `!@#\$%^&*()-=+'":;[{}]/\\|.,<>~`.split('');

// Defining Functions
////////////////////////////////////////////////////
function selectedChecks() {
  const data = [];
  let checks = 0;
  if (numCheck.checked == true) {
    data.push(...numbers);
    checks += 1;
  }
  if (letterCheck.checked == true) {
    data.push(...lowerLetters);
    checks += 2;
  }
  if (mixCheck.checked == true) {
    data.push(...upperLetters);
    checks += 4;
  }
  if (puncCheck.checked == true) {
    data.push(...punctuations);
    checks += 8;
  }
  return [data, checks];
}

function generateFrom(data, checks) {
  if (checks == 0) {
    return '';
  }

  let password = [];
  const len = slider.value;
  const dataLen = data.length;
  for (let i = 0; i < len; i++) {
    password.push(data[parseInt(Math.random() * dataLen)]);
  }
  return password.join('');
}

function containNum(data) {
  for (const i of data)
    if (numbers.includes(i))
      return true;
  return false;
}

function containLower(data) {
  for (const i of data)
    if (lowerLetters.includes(i))
      return true;
  return false;
}

function containUpper(data) {
  for (const i of data)
    if (upperLetters.includes(i))
      return true;
  return false;
}

function containPunc(data) {
  for (const i of data)
    if (punctuations.includes(i))
      return true;
  return false;
}

function validate(password, checks) {
  if (checks == 0 || checks == 1 || checks == 2 || checks == 4 || checks == 8)
    return true;
  if (checks == 3)
    return (containNum(password) && containLower(password))

  if (checks == 7)
    return (containNum(password) && containLower(password) && containUpper(password))
  
  if (checks == 6)
    return (containLower(password) && containUpper(password))

  if (checks == 9)
    return (containNum(password) && containPunc(password))
  
  if (checks == 10)
    return (containLower(password) && containPunc(password))
  
  if (checks == 11)
    return (containNum(password) && containLower(password) && containPunc(password))
  
  if (checks == 14)
    return (containUpper(password) && containLower(password) && containPunc(password))
  
  if (checks == 15)
    return (containNum(password) && containUpper(password) && containLower(password) && containPunc(password))
}

function generatePassword() {
  const [data, checks] = selectedChecks();
  let validPass = false;
  let password = '';
  while (!validPass) {
    password = generateFrom(data, checks);
    validPass =  validate(password, checks)
  }

  display.value = password;
}

function checkLetter() {
  if (letterCheck.checked == false)
    mixCheck.checked = false;
}

function checkMix() {
  if (mixCheck.checked == true)
    letterCheck.checked = true;
}

function updateLabel() {
  sliderLabel.innerText = slider.value;
}

function alertDiv(element) {
  element.classList.remove('hidden');
  setTimeout(() => element.classList.add('hidden'), 3000);
}

function copyPassword() {
  if (display.value == '') {
    alertDiv(redDiv);
    return;
  }

  navigator.clipboard.writeText(display.value);
  alertDiv(greenDiv);
}

// Defining Event Handlers
////////////////////////////////////////////////////
numCheck.addEventListener('click', generatePassword);
letterCheck.addEventListener('click', checkLetter);
mixCheck.addEventListener('click', checkMix);
letterCheck.addEventListener('click', generatePassword);
mixCheck.addEventListener('click', generatePassword);
puncCheck.addEventListener('click', generatePassword);

slider.addEventListener('input', updateLabel);
slider.addEventListener('change', generatePassword);
copyBtn.addEventListener('click', copyPassword);
