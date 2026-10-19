import { createInterface, type Interface } from "node:readline/promises"
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

function parseNumber(text: string): number {
    const trimmed = text.trim()
    if(trimmed === ""){
        throw new Error("Please enter a number");
    }
    const value = Number(trimmed)
    if(!Number.isFinite(value)){
        throw new Error(`"${trimmed}" is not a valid number`)
    }
    return value
}

async function askNumber(rl: Interface, prompt: string): Promise<number> {
    while(true){
        const answer = await rl.question(prompt)
        try {
            return parseNumber(answer)
        } catch (error) {
            if(error instanceof Error){
                console.log(`${error.message}. Try again.`)
            }
        }
    }
}


const first = await askNumber(rl, "Enter the first number: ")
console.log(`You typed: ${first} (${typeof first})`)

rl.close()