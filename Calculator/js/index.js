var regex = /\.{1}/g;
var CE = true;

function btnPlus() {
  document.calculator.display.value += "+";
  CE = true;
}

function btnMinus() {
  document.calculator.display.value += "-";
  CE = true;
}

function btnDiv() {
  document.calculator.display.value += "/";
  CE = true;
}

function btnMult() {
  document.calculator.display.value += "*";
  CE = true;
}

function btnDot() {
  if (!document.calculator.display.value.match(regex)) {
    document.calculator.display.value += ".";
    CE = true;
  }
}

function btnMod() {
  document.calculator.display.value += "%";
  CE = true;
}

function btnAllClear() {
  document.calculator.display.value = "";
  CE = true;
}

function btnClearEntry() {
  var string = document.calculator.display.value;
  if (CE) {
    document.calculator.display.value = document.calculator.display.value.substr(0, string.length - 1);
  }
}

function btnSqrt() {
  document.calculator.display.value = Number(Math.round(Math.sqrt(document.calculator.display.value) + "e+9") + "e-9");
  CE = false;
}

function btnSquare() {
  document.calculator.display.value = Number(Math.pow(document.calculator.display.value, 2));
  CE = false;
}

function btnInverse() {
  document.calculator.display.value = eval("1/" + document.calculator.display.value);
  CE = false;
}

function btnSign() {
  document.calculator.display.value = eval("(" + document.calculator.display.value + ")" + "*-1");
  CE = false;
}

function btnEval() {
  document.calculator.display.value = eval(document.calculator.display.value);
  CE = false;
}