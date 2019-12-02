import { IntcodeProgram, IntcodeComputer } from "./IntcodeComputer";

describe("IntcodeComputer", () => {
  // The examples provided on https://adventofcode.com/2019/day/2
  const examples = [
    [
      [1, 0, 0, 0, 99],
      [2, 0, 0, 0, 99],
    ],
    [
      [2, 3, 0, 3, 99],
      [2, 3, 0, 6, 99],
    ],
    [
      [2, 4, 4, 5, 99, 0],
      [2, 4, 4, 5, 99, 9801],
    ],
    [
      [1, 1, 1, 4, 99, 5, 6, 0, 99],
      [30, 1, 1, 4, 2, 5, 6, 0, 99],
    ],
  ];

  it.each(examples)(
    "Program %p should become %p",
    (initialProgram: IntcodeProgram, finalProgram: IntcodeProgram): void => {
      const computer = new IntcodeComputer();
      computer.loadProgram(initialProgram);

      const calculatedProgram = computer.runProgram();
      expect(calculatedProgram).toStrictEqual(finalProgram);
    },
  );
});
