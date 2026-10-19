# Calculator (TypeScript)

A command-line calculator. It asks for two numbers and an operator
(`+`, `-`, `*`, `/`), prints the result, and keeps going until you say stop.
Bad input is rejected and asked for again, and division by zero is reported
as an error.

## Requirements

- Node.js 22 or newer

## Run it

```
npm install
npm run dev
```

Other scripts:

- `npm run build` compiles the TypeScript into `dist/`
- `npm start` runs the compiled program

## Structure

- `calculator.ts`: the terminal conversation (prompts, input checking, the repeat loop)
- `operations.ts`: the maths (`calculate` and the operator type)
- `tsconfig.json`: TypeScript compiler settings (strict mode on)
- `package.json`: project description and npm scripts