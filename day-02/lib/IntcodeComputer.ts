import assert from "assert";

export type IntcodeProgram = number[];

export class IntcodeComputer {
  public constructor() {
    this.program = [];
  }

  public loadProgram(program: IntcodeProgram) {
    assert(program.length > 0, "Intcode Program must have positive length");
    this.program = program;
  }

  public runProgram(): IntcodeProgram {
    console.log("Running the program!");
    // Run program...
    console.log("Program has completed.");

    return this.program;
  }

  private program: IntcodeProgram;
}
