import { createInterface, type Interface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const operators = ["+", "-", "*", "/"] as const;

type Operator = (typeof operators)[number];

function add(a: number, b: number): number {
  return a + b;
}

function isOperator(text: string): text is Operator {
  return (operators as readonly string[]).includes(text);
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function calculate(a: number, op: Operator, b: number): number {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function parseNumber(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") {
    throw new Error("Please enter a number");
  }
  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    throw new Error(`"${trimmed}" is not a valid number`);
  }
  return value;
}

async function askNumber(rl: Interface, prompt: string): Promise<number> {
  while (true) {
    const answer = await rl.question(prompt);
    try {
      return parseNumber(answer);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.message}. Try again.`);
      }
    }
  }
}

async function askOperator(rl: Interface, prompt: string): Promise<Operator> {
  while (true) {
    const answer = (await rl.question(prompt)).trim();
    if (isOperator(answer)) {
      return answer;
    }
    console.log(`${answer} is not an operator. Use + - * or /. Try again.`);
  }
}

const rl = createInterface({
  input: stdin,
  output: stdout,
});

while (true) {
  const first = await askNumber(rl, "Enter the first number: ");
  const op = await askOperator(rl, "Enter an operator (+, -, *, /): ");
  const second = await askNumber(rl, "Enter the second number: ");

  try {
    const result = calculate(first, op, second);
    console.log(`${first} ${op} ${second} = ${result}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const again = (await rl.question("Calculate again? (y/n): ")).trim().toLowerCase()
  if (again !== "y"){
    break
  }
}

rl.close();
