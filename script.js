const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const notNumberButtons =["C","*","/","Del","+","-","=",".","%"];

let num1;
let num2;


buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        
        if(notNumberButtons.indexOf(btn.textContent)<0){
            display.textContent+=btn.textContent;
            if(display.textContent.length>1&&display.textContent.slice(0,1)=="0"){
                display.textContent=display.textContent.slice(1);
            }
        }
        else if(btn.textContent=="Del")display.textContent=display.textContent.slice(0,-1);
        else if(btn.textContent=="C")display.textContent="0";
    })
})

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
