import { createInterface, type Interface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { calculate, isOperator, type Operator } from "./operations.js";

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

function formatResult(value: number): number {
    return Number(value.toPrecision(12))
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
    console.log(`${first} ${op} ${second} = ${formatResult(result)}`);
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
