import assert from "assert";
import process from "process";
import { readFileIntoArray } from "./lib/readFileIntoArray";
import { IntcodeComputer } from "./lib/IntcodeComputer";

if (process.argv.length !== 3) {
  console.error("This script takes in the path to an input file.");
  process.exit(1);
}
const inputPath: string = process.argv[2];

const main = async (): Promise<void> => {
  const inputProgram = await readFileIntoArray(inputPath);
  assert(inputProgram.length > 0);

  const computer = new IntcodeComputer(inputProgram);

  const outputProgram = computer.runProgram();
  console.log(`OUTPUT: ${outputProgram}`);
};

main();
