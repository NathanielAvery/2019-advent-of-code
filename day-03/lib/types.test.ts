import { Vector2D, scalarMultiply, convertInstruction } from "./types";

describe("scalarMultiply", () => {
  it("scalar of 0 => [0,0]", () => {
    const scalar = 0;
    const vector: Vector2D = [2, 3];
    const expectedVector = [0, 0];

    expect(scalarMultiply(vector, scalar)).toEqual(expectedVector);
  });
});

describe("convertInstruction", () => {
  it("U", () => {
    const instruction = "U10";
    const expectedVector = [0, 10];
    expect(convertInstruction(instruction)).toEqual(expectedVector);
  });

  it("R", () => {
    const instruction = "R5";
    const expectedVector = [5, 0];
    expect(convertInstruction(instruction)).toEqual(expectedVector);
  });

  it("D", () => {
    const instruction = "D2";
    const expectedVector = [0, -2];
    expect(convertInstruction(instruction)).toEqual(expectedVector);
  });

  it("L", () => {
    const instruction = "L204";
    const expectedVector = [-204, 0];
    expect(convertInstruction(instruction)).toEqual(expectedVector);
  });
});
