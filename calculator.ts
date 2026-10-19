type Operator = "+" | "-" | "*" | "/"
function add(a: number, b: number): number {
    return a + b
}

function subtract(a: number, b: number): number {
    return a - b
}

function multiply(a: number, b: number): number {
    return a * b
}

function divide(a: number, b: number): number {
    return a / b
}


function calculate(a: number, op: Operator, b: number): number{
    switch(op){
        case "+":
            return add(a, b)
        case "-":
            return subtract(a,b)
        case "*":
            return multiply(a,b)
        case "/":
            return divide(a,b)
    }
}

console.log(calculate(10, "+", 4));
console.log(calculate(10, "-", 4));
console.log(calculate(10, "*", 4));
console.log(calculate(10, "/", 4));