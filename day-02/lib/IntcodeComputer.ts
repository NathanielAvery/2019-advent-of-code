import assert from "assert";

export type IntcodeProgram = number[];

enum OpCode {
  "ADD" = 1,
  "MULTIPLY" = 2,
  "EXIT" = 99,
}

type OperationFunction = () => void;

export class IntcodeComputer {
  public constructor(program: IntcodeProgram) {
    assert(program.length > 0, "Intcode Program must have positive length");
    this.program = program;
  }

  public loadProgram(program: IntcodeProgram) {
    assert(program.length > 0, "Intcode Program must have positive length");
    this.program = program;
    this.currentOpcodeLocation = 0;
  }

  public runProgram(): IntcodeProgram {
    // console.log("Running the program!");
    // Run program...

    while (this.getCurrentOperationCode() !== OpCode.EXIT) {
      // Perform operation
      const opCode = this.getCurrentOperationCode();
      this.getOperationFunction(opCode)();

      // Jump forward by 4.
      this.currentOpcodeLocation += 4;
      assert(
        this.isValidLocation(this.currentOpcodeLocation),
        "Next operation code should be valid",
      );
    }

    // Wahoo!
    // console.log("Program has completed.");

    return this.program;
  }

  // Store the program
  private program: IntcodeProgram;

  private currentOpcodeLocation: number = 0;

  // Store the provided value in the given location in the program
  private setValue(location: number, value: number) {
    assert(this.programIsLoaded(), "Program must be loaded.");
    assert(
      this.isValidLocation(location),
      "Location to store value must be valid (i.e. between 0 and program length -1)",
    );
    this.program[location] = value;
  }

  private getCurrentOperationCode(): number {
    return this.getValue(this.currentOpcodeLocation);
  }

  private getValue(location: number): number {
    assert(this.programIsLoaded());
    return this.program[location];
  }

  private programIsLoaded(): boolean {
    return this.program.length > 0;
  }

  private isValidLocation(location: number): boolean {
    return location >= 0 && location < this.program.length;
  }

  private addFunction(): void {
    assert(this.getValue(this.currentOpcodeLocation) === OpCode.ADD);

    const location1 = this.getValue(this.currentOpcodeLocation + 1);
    const location2 = this.getValue(this.currentOpcodeLocation + 2);
    const location3 = this.getValue(this.currentOpcodeLocation + 3);

    const value1 = this.getValue(location1);
    const value2 = this.getValue(location2);

    const newValue = value1 + value2;

    this.setValue(location3, newValue);
  }

  private multiplyFunction(): void {
    assert(this.getValue(this.currentOpcodeLocation) === OpCode.MULTIPLY);

    const location1 = this.getValue(this.currentOpcodeLocation + 1);
    const location2 = this.getValue(this.currentOpcodeLocation + 2);
    const location3 = this.getValue(this.currentOpcodeLocation + 3);

    const value1 = this.getValue(location1);
    const value2 = this.getValue(location2);

    const newValue = value1 * value2;

    this.setValue(location3, newValue);
  }

  private operationFunctions: { [code: number]: () => void } = {
    1: this.addFunction.bind(this),
    2: this.multiplyFunction.bind(this),
  };

  private getOperationFunction(code: number): OperationFunction {
    const noOp: OperationFunction = () => {};
    switch (code) {
      case 1:
        return this.addFunction.bind(this);
      case 2:
        return this.multiplyFunction.bind(this);
      default:
        return noOp;
    }
  }
}
