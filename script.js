const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const notNumberButtons = ["C", "*", "/", "Del", "+", "-", "=", ".", "%"];
let num1;
let num2;
let num3;
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
function operate(a, b, c) {
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
        default:
            break;
    }
    num3 = num2;
    num1 = display.textContent;
    num2 = undefined;
    result = true;
    clean = true;
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (notNumberButtons.indexOf(btn.textContent) < 0) {
            if (result) {
                num1 = undefined;
                num2 = undefined;
                num3 = undefined;
                operation = "";
                result = false;
                clean = true;
            }
            if (clean) { display.textContent = ""; clean = false; }
            display.textContent += btn.textContent;
            if (display.textContent.length > 1 && display.textContent.slice(0, 1) == "0")
                display.textContent = display.textContent.slice(1);
            if (operation != "") num2 = display.textContent;
            else num1 = display.textContent;
        }
        else if (btn.textContent == "Del") {
            display.textContent = display.textContent.slice(0, -1);
            if (notNumberButtons.indexOf(display.textContent) >= 0 || (display.textContent.length <= 0)) { display.textContent = "0" }
            if (operation == "") { num1 = display.textContent; }
            else num2 = display.textContent;
        }
        else if (btn.textContent == "C") {
            display.textContent = "0";
            num1 = undefined;
            num2 = undefined;
            num3=undefined;
            operation = "";
            result = false;
            clean = false;
        }
        else if (btn.textContent == ".") {
            return
        }
        else if (btn.textContent == "%") {
            return
        }
        else if (btn.textContent == "=") {
            if (result && num2 == undefined) {
                num2 = num3;
                operate(num1, num2, operation);
            }
            else if (num2 != undefined) operate(num1, num2, operation);
        }
        else {
            if (num2 != undefined) operate(num1, num2, operation);
            result = false;
            operation = btn.textContent;
            clean = true;
        }
    })
})
