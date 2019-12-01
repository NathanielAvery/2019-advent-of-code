import assert from "assert";
import fs from "fs";
import process from "process";
import { promisify } from "util";
import { calculateFuel } from "./lib/calculateFuel";

const readFile = promisify(fs.readFile);

const part1 = async (): Promise<void> => {
    if (process.argv.length !== 3) {
        console.error("This script takes in the path to an input file.")
        process.exit(1);
    }
    const inputPath: string = process.argv[2];

    try {
        const inputFile = await readFile(inputPath, "utf-8");
        const lines = inputFile.split("\n");
        console.log(`Number of modules: ${lines.length}`);
        let fuelTotal = 0;
        for (const line of lines) {
            if (line !== "") {
                // TODO: Check that 'line' is a valid integer.
                const moduleMass = parseInt(line);
                assert(moduleMass > 0);
                const moduleFuel = calculateFuel(moduleMass);

                fuelTotal += moduleFuel;
            }
        }
        console.log(`Amount of fuel required: ${fuelTotal}`);
    } catch (error) {
        console.error("Unable to read input file: ", error);
        process.exit(2);
    }
}

part1();