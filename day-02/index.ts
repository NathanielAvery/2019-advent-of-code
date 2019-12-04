import assert from "assert";
import process from "process";
import { readFileIntoArray } from "./lib/readFileIntoArray";
import { IntcodeComputer, IntcodeProgram } from "./lib/IntcodeComputer";

if (process.argv.length !== 3) {
  console.error("This script takes in the path to an input file.");
  process.exit(1);
}
const inputPath: string = process.argv[2];

const getProgram = (
  originalProgram: IntcodeProgram,
  noun: number,
  verb: number,
): IntcodeProgram => {
  const newProgram = [...originalProgram];
  newProgram[1] = noun;
  newProgram[2] = verb;

  return newProgram;
};

let originalProgram: IntcodeProgram;

const main = async (): Promise<void> => {
  // Part 1
  console.log("=== Part 1 ===");
  const inputProgram = await readFileIntoArray(inputPath);
  assert(inputProgram.length > 0);

  // Store the original program for later.
  originalProgram = [...inputProgram];

  const computer = new IntcodeComputer(inputProgram);

  const outputProgram = computer.runProgram();
  console.log(`Address 0: ${outputProgram}`);

  console.log("=== Part 2 ===");

  const zeroTo99 = [...Array(100).keys()];
  const targetValue = 19690720;

  for (const noun of zeroTo99) {
    for (const verb of zeroTo99) {
      const program = getProgram(originalProgram, noun, verb);
      computer.loadProgram(program);
      const output = computer.runProgram();
      if (output[0] === targetValue) {
        console.log(`Answer: ${100 * noun + verb}`);
        process.exit(0);
      }
    }
  }
};

main();
