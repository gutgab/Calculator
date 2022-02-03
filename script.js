const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

function sum(a,b){
    a = parseFloat(a);
    b = parseFloat(b);
    if(Number.isInteger(a+b))return a+b;
    return parseFloat((a+b).toFixed(2));
}

function res(a,b){
    a = parseFloat(a);
    b = parseFloat(b);
    if(Number.isInteger(a-b))return a-b;
    return parseFloat((a-b).toFixed(2));
}

function mul(a,b){
    a = parseFloat(a);
    b = parseFloat(b);
    if(Number.isInteger(a*b))return a*b;
    return parseFloat((a*b).toFixed(2));
}

function div(a,b){
    a = parseFloat(a);
    b = parseFloat(b);
    if(a===0){return 0}
    if(b===0){return "ERROR"}
    if(Number.isInteger(a/b))return a/b;
    return parseFloat((a/b).toFixed(2));
}
