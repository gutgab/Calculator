const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const notNumberButtons = ["C", "*", "/", "Del", "+", "-", "=", "%"];
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

function porcent(a,b){
    a = parseFloat(a);
    b = parseFloat(b);
    if (Number.isInteger(a*b/100)) return a*b/100;
    return parseFloat((a*b/100).toFixed(3));
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
            result=false;
            break;
        default:
            break;
    }
    num3 = num2;
    num1 = display.textContent;
    num2 = undefined;
    clean = true;
    if(Number.isInteger(parseFloat(num1))){
        point=false;
    }
    else point=true;
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (notNumberButtons.indexOf(btn.textContent) < 0) {
            if(num1=="ERROR")result=true;
            if (result&&btn.textContent!=".") {
                num1 = undefined;
                num2 = undefined;
                num3 = undefined;
                operation = "";
                result = false;
                if(display.textContent!="0.") clean = true;
                if(Number.isInteger(parseFloat(display.textContent))){
                    point=false;
                }
                else point=true;
            }
            if (clean) { display.textContent = ""; clean = false;point=false; }
            if(point==false&&btn.textContent=="."){
                if(display.textContent==""){display.textContent="0.";clean=false;point=true;return}
                display.textContent += btn.textContent;
                point=true;
                return
            }
            else if(btn.textContent=="."){
                return
            }
            display.textContent += btn.textContent;
            if (display.textContent.length > 1 && display.textContent.slice(0, 1) == "0"&&!display.textContent.includes("."))
                display.textContent = display.textContent.slice(1);
            if (operation != ""&&display.textContent!="0."&&num1!=undefined) num2 = display.textContent;
            else if(display.textContent!="0.")num1 = display.textContent;
        }
        else if (btn.textContent == "Del") {
            display.textContent = display.textContent.slice(0, -1);
            if(display.textContent.includes(".")){point=true;}
            else point=false;
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
            point=false;
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
