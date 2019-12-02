import process from "process";

if (process.argv.length !== 3) {
  console.error("This script takes in the path to an input file.");
  process.exit(1);
}
const inputPath: string = process.argv[2];
