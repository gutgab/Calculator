const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const notNumberButtons =["C","*","/","Del","+","-","=",".","%"];
let num1;
let num2;
let num3;
let operation;
let result = false;
let newNumber=false;

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

buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        
        if(notNumberButtons.indexOf(btn.textContent)<0){
            if(num1!=undefined)display.textContent="";
            display.textContent+=btn.textContent;
            if(display.textContent.length>1&&display.textContent.slice(0,1)=="0"){
                display.textContent=display.textContent.slice(1);
            }
            newNumber=true;
        }
        else if(btn.textContent=="Del")display.textContent=display.textContent.slice(0,-1);
        else if(btn.textContent=="C"){display.textContent="0";num1=undefined;result=false;operation=undefined;}
        else if(btn.textContent=="+"){
            if(num1==undefined){
                num1=display.textContent;
                operation=btn.textContent;
            }
            else if(result){
                num1=display.textContent;
                result=false;
            }
            else if(newNumber){
                num2=display.textContent;
                display.textContent=sum(num1,num2);
                num1=display.textContent;
            }
        }
        else if(btn.textContent=="="){
            if(num1!=undefined&&operation!=undefined){
                switch (operation) {
                    case "+":
                        if(result&&num3!=num1){num3=num2;num1=num2;}
                        num2=display.textContent;
                        display.textContent=sum(num1,num2);
                        result=true;
                        newNumber=false;
                        break;
                    
                    default:
                        break;
                }
            }
        }
    })
})
