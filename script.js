const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const notNumberButtons = ["+", "-", "/", "*", "C", "%", "=", "Del"];
let num1;
let num2;
let num3;
let operation = "";
let result = false;
let clean = false;
let point = false;

function sum(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a + b)) return a + b;
    return parseFloat((a + b).toFixed(3));
}

function res(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a - b)) return a - b;
    return parseFloat((a - b).toFixed(3));
}

function mul(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a * b)) return a * b;
    return parseFloat((a * b).toFixed(3));
}

function div(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (a === 0) { return 0 }
    if (b === 0) { return "ERROR" }
    if (Number.isInteger(a / b)) return a / b;
    return parseFloat((a / b).toFixed(3));
}

function porcent(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a * b / 100)) return a * b / 100;
    return parseFloat((a * b / 100).toFixed(3));
}

function operate(a, b, c) {
    result = true;
    switch (c) {
        case "+":
            display.textContent = sum(a, b);
            break;
        case "-":
            display.textContent = res(a, b);
            break;
        case "*":
            display.textContent = mul(a, b);
            break;
        case "/":
            display.textContent = div(a, b);
            break;
        case "%":
            display.textContent = porcent(a, b);
            result = false;
            break;
        default:
            break;
    }
    num3 = num2;
    num1 = display.textContent;
    num2 = undefined;
    clean = true;
    if (Number.isInteger(parseFloat(num1))) {
        point = false;
    }
    else point = true;
}

function getInput(input) {
    if (numberButtons.indexOf(input) >= 0) {
        if (num1 == "ERROR") result = true;
        if (result && input != ".") {
            num1 = undefined;
            num2 = undefined;
            num3 = undefined;
            operation = "";
            result = false;
            if (display.textContent != "0.") clean = true;
            if (Number.isInteger(parseFloat(display.textContent))) {
                point = false;
            }
            else point = true;
        }
        if (clean) { display.textContent = ""; clean = false; point = false; }
        if (point == false && input == ".") {
            if (display.textContent == "") { display.textContent = "0."; clean = false; point = true; return }
            display.textContent += input;
            point = true;
            return
        }
        else if (input == ".") {
            return
        }
        display.textContent += input;
        if (display.textContent.length > 1 && display.textContent.slice(0, 1) == "0" && !display.textContent.includes("."))
            display.textContent = display.textContent.slice(1);
        if (operation != "" && display.textContent != "0." && num1 != undefined) num2 = display.textContent;
        else if (display.textContent != "0.") num1 = display.textContent;
    }
    else if (input == "Del") {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent.includes(".")) { point = true; }
        else point = false;
        if (numberButtons.indexOf(display.textContent) < 0 || (display.textContent.length <= 0)) { display.textContent = "0" }
        if (operation == "") { num1 = display.textContent; }
        else num2 = display.textContent;
    }
    else if (input == "C") {
        display.textContent = "0";
        num1 = undefined;
        num2 = undefined;
        num3 = undefined;
        operation = "";
        result = false;
        clean = false;
        point = false;
    }
    else if (input == "=") {
        if (result && num2 == undefined) {
            num2 = num3;
            operate(num1, num2, operation);
        }
        else if (num2 != undefined) operate(num1, num2, operation);
    }
    else if (notNumberButtons.indexOf(input) >= 0) {
        if (num2 != undefined) operate(num1, num2, operation);
        result = false;
        operation = input;
        clean = true;
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        getInput(btn.textContent);
    })
})
window.addEventListener("keydown", key => {
    let newKey;
    switch (key.key) {
        case "Enter":
            newKey="=";
            break;
        case "Backspace":
            newKey="Del";
            break;
        case "c":
            newKey="C";
            break;
        default:
            newKey=key.key;
            break;
    }
    getInput(newKey);
})