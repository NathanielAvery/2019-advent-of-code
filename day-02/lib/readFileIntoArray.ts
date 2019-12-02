import assert from "assert";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

// REFACTOR: This is almost identical to getModuleMasses in day-01
export const readFileIntoArray = async (
  inputPath: string,
): Promise<number[]> => {
  const integerArray: number[] = [];

  try {
    const inputFile = await readFile(inputPath, "utf-8");
    const integers = inputFile.split(",");
    for (const integerStr of integers) {
      if (integerStr !== "") {
        const integer = parseInt(integerStr);
        integerArray.push(integer);
      }
    }
  } catch (error) {
    console.error("Unable to read input file: ", error);
    process.exit(2);
  }

  return integerArray;
};
