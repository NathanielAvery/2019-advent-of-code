import assert from "assert";
import fs from "fs";
import process from "process";
import { promisify } from "util";
import { calculateFuel, calculateTotalFuel } from "./lib/calculateFuel";

const readFile = promisify(fs.readFile);

const getModuleMasses = async (): Promise<number[]> => {
  if (process.argv.length !== 3) {
    console.error("This script takes in the path to an input file.");
    process.exit(1);
  }
  const inputPath: string = process.argv[2];
  const moduleMasses: number[] = [];

  try {
    const inputFile = await readFile(inputPath, "utf-8");
    const lines = inputFile.split("\n");
    for (const line of lines) {
      if (line !== "") {
        // TODO: Check that 'line' is a valid integer.
        const moduleMass = parseInt(line);
        assert(moduleMass > 0);
        moduleMasses.push(moduleMass);
      }
    }
  } catch (error) {
    console.error("Unable to read input file: ", error);
    process.exit(2);
  }

  return moduleMasses;
};

const part1 = async (): Promise<void> => {
  const moduleMasses = await getModuleMasses();
  console.log("=== Part 1 ===");
  console.log(`Number of modules: ${moduleMasses.length}`);

  const fuelTotal = moduleMasses
    .map((mass: number): number => calculateFuel(mass))
    .reduce(
      (previous: number, current: number): number => previous + current,
      0,
    );
  console.log(`Amount of fuel required: ${fuelTotal}`);
};

const part2 = async (): Promise<void> => {
  const moduleMasses = await getModuleMasses();

  const fuelTotal = moduleMasses
    .map((mass: number): number => calculateTotalFuel(mass))
    .reduce(
      (previous: number, current: number): number => previous + current,
      0,
    );
  console.log("=== Part 2 ===");
  console.log(`Total amount of fuel required: ${fuelTotal}`);
};

part1();
part2();
