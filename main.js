let easyCounter = 0;
let mediumCounter = 0;
let hardCounter = 0;
let myAnswer = 0;
function modeOption(option) {
  if (option == "easy") {
    easyCounter = 1;
    mediumCounter = 0;
    hardCounter = 0;
    document.getElementById("topLeft").style.background = "green";
    document.getElementById("topMiddle").style.background = "green";
    document.getElementById("topRigth").style.background = "green";
    document.getElementById("middleLeft").style.background = "transparent";
    document.getElementById("middleMiddle").style.background = "transparent";
    document.getElementById("middleRigth").style.background = "transparent";
    document.getElementById("bottomLeft").style.background = "transparent";
    document.getElementById("bottomMiddle").style.background = "transparent";
    document.getElementById("bottomRigth").style.background = "transparent";
    GenerateColorsOption("easy");
  } else if (option == "medium") {
    easyCounter = 0;
    mediumCounter = 1;
    hardCounter = 0;
    document.getElementById("topLeft").style.background = "orange";
    document.getElementById("topMiddle").style.background = "orange";
    document.getElementById("topRigth").style.background = "orange";
    document.getElementById("middleLeft").style.background = "orange";
    document.getElementById("middleMiddle").style.background = "orange";
    document.getElementById("middleRigth").style.background = "orange";
    document.getElementById("bottomLeft").style.background = "transparent";
    document.getElementById("bottomMiddle").style.background = "transparent";
    document.getElementById("bottomRigth").style.background = "transparent";
    GenerateColorsOption("medium");
  } else {
    easyCounter = 0;
    mediumCounter = 0;
    hardCounter = 1;
    document.getElementById("topLeft").style.background = "red";
    document.getElementById("topMiddle").style.background = "red";
    document.getElementById("topRigth").style.background = "red";
    document.getElementById("middleLeft").style.background = "red";
    document.getElementById("middleMiddle").style.background = "red";
    document.getElementById("middleRigth").style.background = "red";
    document.getElementById("bottomLeft").style.background = "red";
    document.getElementById("bottomMiddle").style.background = "red";
    document.getElementById("bottomRigth").style.background = "red";
    GenerateColorsOption("hard");
  }
}

function fillArrayWithRandomColor(array, count) {
  for (let i = 0; i < count; i++) {
    let x = Math.round(Math.random() * 256);
    let y = Math.round(Math.random() * 256);
    let z = Math.round(Math.random() * 256);
    array.push(`rgb(${x},${y},${z})`);
  }
}

function randomNumber(count) {
  let number = 0;
  number = Math.floor(Math.random() * count) + 0;
  return number;
}
function GenerateColorsOption(option) {
  if (option == "easy") {
    let myArray = [];
    fillArrayWithRandomColor(myArray, 3);
    let answer = randomNumber(3);
    document.getElementById("RGBcodeID").innerHTML = `${myArray[answer]}`;
    document.getElementById("topLeft").style.background = `${myArray[0]}`;
    document.getElementById("topMiddle").style.background = `${myArray[1]}`;
    document.getElementById("topRigth").style.background = `${myArray[2]}`;
    document.getElementById("middleLeft").style.background = "transparent";
    document.getElementById("middleMiddle").style.background = "transparent";
    document.getElementById("middleRigth").style.background = "transparent";
    document.getElementById("bottomLeft").style.background = "transparent";
    document.getElementById("bottomMiddle").style.background = "transparent";
    document.getElementById("bottomRigth").style.background = "transparent";
    myAnswer = answer;
  } else if (option == "medium") {
    let myArray = [];
    fillArrayWithRandomColor(myArray, 6);
    let answer = randomNumber(6);
    document.getElementById("RGBcodeID").innerHTML = `${myArray[answer]}`;
    document.getElementById("topLeft").style.background = `${myArray[0]}`;
    document.getElementById("topMiddle").style.background = `${myArray[1]}`;
    document.getElementById("topRigth").style.background = `${myArray[2]}`;
    document.getElementById("middleLeft").style.background = `${myArray[3]}`;
    document.getElementById("middleMiddle").style.background = `${myArray[4]}`;
    document.getElementById("middleRigth").style.background = `${myArray[5]}`;
    document.getElementById("bottomLeft").style.background = "transparent";
    document.getElementById("bottomMiddle").style.background = "transparent";
    document.getElementById("bottomRigth").style.background = "transparent";
    myAnswer = answer;
  } else {
    let myArray = [];
    fillArrayWithRandomColor(myArray, 9);
    let answer = randomNumber(9);
    document.getElementById("RGBcodeID").innerHTML = `${myArray[answer]}`;
    document.getElementById("topLeft").style.background = `${myArray[0]}`;
    document.getElementById("topMiddle").style.background = `${myArray[1]}`;
    document.getElementById("topRigth").style.background = `${myArray[2]}`;
    document.getElementById("middleLeft").style.background = `${myArray[3]}`;
    document.getElementById("middleMiddle").style.background = `${myArray[4]}`;
    document.getElementById("middleRigth").style.background = `${myArray[5]}`;
    document.getElementById("bottomLeft").style.background = `${myArray[6]}`;
    document.getElementById("bottomMiddle").style.background = `${myArray[7]}`;
    document.getElementById("bottomRigth").style.background = `${myArray[8]}`;
    myAnswer = answer;
  }
}

function optionClick(option) {
  if (option == myAnswer) {
    Swal.fire({
      icon: "success",
      title: "Correct answer",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong color",
    });
  }
}
function generateButton() {
  if (easyCounter == 1) {
    GenerateColorsOption("easy");
  } else if (mediumCounter == 1) {
    GenerateColorsOption("medium");
  } else {
    GenerateColorsOption("hard");
  }
}
