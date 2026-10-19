import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"

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
    if(b=== 0){
        throw new Error("Cannot divide by zero")
    }
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


const rl = createInterface({
    input : stdin,
    output : stdout
})

const answer = await rl.question("Enter your first number: ")
console.log(`You typed: ${answer} (${typeof answer})`)

rl.close()