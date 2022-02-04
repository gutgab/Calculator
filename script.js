const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const notNumberButtons = ["C", "*", "/", "Del", "+", "-", "=", ".", "%"];
let num1;
let num2;
let prevOperation = "";
let operation = "";
let result = false;
let clean = false;

function sum(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a + b)) return a + b;
    return parseFloat((a + b).toFixed(2));
}

function res(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a - b)) return a - b;
    return parseFloat((a - b).toFixed(2));
}

function mul(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a * b)) return a * b;
    return parseFloat((a * b).toFixed(2));
}

function div(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (a === 0) { return 0 }
    if (b === 0) { return "ERROR" }
    if (Number.isInteger(a / b)) return a / b;
    return parseFloat((a / b).toFixed(2));
}
function operate(num1, num2, operation) {
    if (result) { 
        operation = prevOperation; 
        if(operation=="+"){num1 = num2; num2 = display.textContent};
        if(operation=="-"){num1 = display.textContent};
    }
    switch (operation) {
        case "+":
            display.textContent = sum(num1, num2);
            result = true;
            prevOperation = operation;
            clean = true;
            break;
        case "-":
            display.textContent = res(num1, num2);
            result = true;
            prevOperation = operation;
            clean = true;
            break;
        default:
            break;
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (notNumberButtons.indexOf(btn.textContent) < 0) {
            if (result) { result = false; }
            if (clean) { display.textContent = ""; clean = false; }
            display.textContent += btn.textContent;
            if (display.textContent.length > 1 && display.textContent.slice(0, 1) == "0")
                display.textContent = display.textContent.slice(1);
            if (operation == "") { num1 = display.textContent; num2 = undefined }
            else num2 = display.textContent;
        }
        else if (btn.textContent == "Del") {
            display.textContent = display.textContent.slice(0, -1);
            if(notNumberButtons.indexOf(display.textContent)>=0||(display.textContent.length<=0)){display.textContent="0"}
            if (operation == "") { num1 = display.textContent;}
            else num2 = display.textContent;
        }
        else if (btn.textContent == "C") {
            display.textContent = "0";
            num1 = undefined;
            num2 = undefined;
            prevOperation = "";
            operation = "";
            result = false;
            clean = false;
        }
        else if (btn.textContent == "+") {
            operation = "+";
            clean = true;
            if (num2 != undefined && !result) { operate(num1, num2, operation) }
            if (result) { num1 = display.textContent; result = False; }
        }
        else if (btn.textContent == "-") {
            operation = "-";
            clean = true;
            if (num2 != undefined && !result) { operate(num1, num2, operation) }
            if (result) { num1 = display.textContent; result = False; }
        }
        else if (btn.textContent == "=") {
            if(num2==undefined)return;
            operate(num1, num2, operation);
            operation = "";
        }
    })
})
