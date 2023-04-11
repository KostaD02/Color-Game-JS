const scoreDisplay = document.querySelector("#score");
const colorDisplay = document.querySelector("#color");
const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");
const resetBtn = document.querySelector(".reset");
const swapBtn = document.querySelector(".swap");
const boxArray = document.querySelectorAll(".box");
const firstRow = document.querySelectorAll(".first");
const secondRow = document.querySelectorAll(".second");
const thirdRow = document.querySelectorAll(".third");

let currentMode = '';
let currentAnswer = -1;
let currentColorFormat = 'rgb';
let score = 0;

easyBtn.addEventListener('click', () => {
  startGame('easy');
});

mediumBtn.addEventListener('click', () => {
  startGame('medium');
});

hardBtn.addEventListener('click', () => {
  startGame('hard');
});

swapBtn.addEventListener('click', () => {
  if (!currentMode) {
    displayAlert('Wrong mode', 'info', 'pick gamemode to swap color format');
    return;
  }
  currentColorFormat = currentColorFormat === 'rgb' ? 'hex' : 'rgb';
  if (currentAnswer !== -1) {
    colorDisplay.innerHTML = currentColorFormat === 'hex'
      ? rgbToHex(colorDisplay.innerHTML)
      : hexToRGB(colorDisplay.innerHTML);
  }
});

resetBtn.addEventListener('click', () => {
  if (!currentMode) {
    displayAlert('Nothing to restart', 'info', 'pick gamemode first');
    return;
  }

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, reset it!'
  }).then((result) => {
    if (result.isConfirmed) {
      displayAlert('Reseted!', 'success', 'Your game was reseted.');
      resetGame(true);
    } else {
      displayAlert('Nothing happend', 'info', 'Your game was not reseted.');
    }
  })
});

boxArray.forEach((element, index) => {
  element.addEventListener('click', () => {
    checkValidAnswer(index);
  });
});

function startGame(mode = "easy") {
  currentMode = mode === 'easy' || mode === 'medium' || mode === 'hard' ? mode : 'notfound';
  if (currentMode === 'notfound' || !(currentColorFormat == 'rgb' || currentColorFormat === 'hex')) {
    resetGame();
    return;
  }
  initStyle();
  const count = currentMode === "easy" ? 3 : (currentMode === "medium" ? 6 : 9);
  const colorsArray = getRandomColors(count);
  const answer = randomIndex(count);
  firstRow.forEach((element, index) => {
    setBackgroundColor(element, colorsArray[index]);
  });
  if (currentMode === 'medium' || currentMode === 'hard') {
    secondRow.forEach((element, index) => {
      setBackgroundColor(element, colorsArray[index + 3]);
    });
  }
  if (currentMode === 'hard') {
    thirdRow.forEach((element, index) => {
      setBackgroundColor(element, colorsArray[index + 6]);
    });
  }
  currentAnswer = answer;
  colorDisplay.textContent = currentColorFormat === 'hex'
    ? rgbToHex(colorsArray[answer])
    : colorsArray[answer];
}

function checkValidAnswer(index) {
  if (currentMode === "easy" || currentMode === "medium" || currentMode === "hard") {
    const count = currentMode === "easy" ? 3 : (currentMode === "medium" ? 6 : 9);
    for (let i = 0; i < count; i++) {
      if (index === i) {
        if (index === currentAnswer) {
          setScore(currentMode, true);
          displayAlert('Correct', 'success', 'congrats');
          startGame(currentMode);
        } else {
          setScore(currentMode, false);
          displayAlert('Wrong', 'error', 'try again');
        }
      }
    }
  } else {
    displayAlert('Wrong mode', 'warning', 'Pick at least one mode!');
  }
}

function resetGame(isAllowed = false) {
  currentMode = '';
  currentAnswer = -1;
  currentColorFormat = 'rgb';
  score = 0;
  scoreDisplay.textContent = score;
  colorDisplay.textContent = 'None';
  boxArray.forEach(element => {
    setCursorelement(element, 'not-allowed');
    setBackgroundColor(element);
    setHover(element, false);
  });
  if (!isAllowed) {
    displayAlert('Wrong config', 'error', 'Restarting the game');
  }
}

function setScore(mode = 'easy', hasWon = false) {
  if (mode === "easy") {
    score += hasWon ? 10 : -5;
  } else if (mode === "medium") {
    score += hasWon ? 20 : -10;
  } else {
    score += hasWon ? 30 : -15;
  }

  if (score <= 0) {
    score = 0;
  }

  scoreDisplay.textContent = score;
}

function initStyle() {
  boxArray.forEach(element => {
    setHover(element, false);
  });
  firstRow.forEach(element => {
    setCursorelement(element, 'pointer');
    setHover(element, true);
  });
  secondRow.forEach(element => {
    setCursorelement(element, currentMode === 'easy' ? 'not-allowed' : 'pointer');
    setBackgroundColor(element);
    setHover(element, currentMode !== 'easy');
  });
  thirdRow.forEach(element => {
    setCursorelement(element, currentMode === 'hard' ? 'pointer' : 'not-allowed');
    setBackgroundColor(element);
    setHover(element, currentMode === 'hard');
  });
}

function setHover(element, set = false) {
  if (set) {
    element.classList.add('hover');
  } else {
    element.classList.remove('hover');
  }
}

function setCursorelement(element, cursor = "pointer") {
  element.style.cursor = cursor;
}

function setBackgroundColor(element, bgColor = 'transparent') {
  element.style.backgroundColor = bgColor;
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function getRandomColors(count = 3) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(getRandomRGB());
  }
  return array;
}

function randomIndex(count) {
  return Math.floor(Math.random() * count);
}

function displayAlert(title = "Title", icon = "success", text = "") {
  Swal.fire({ title, icon, text });
}

function rgbToHex(color) {
  const values = color.slice(4, -1).split(',');
  const r = parseInt(values[0], 10);
  const g = parseInt(values[1], 10);
  const b = parseInt(values[2], 10);
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}

function hexToRGB(color) {
  const values = color.replace("#", "");
  const r = parseInt(values.slice(0, 2), 16);
  const g = parseInt(values.slice(2, 4), 16);
  const b = parseInt(values.slice(4, 6), 16);
  return `rgb(${r},${g},${b})`;
}
