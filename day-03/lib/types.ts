export type Vector2D = [number, number];

export enum Direction {
  U,
  R,
  D,
  L,
}

const stringToDirection = (directionStr: string): Direction =>
  Direction[directionStr as keyof typeof Direction];

export const scalarMultiply = (vector: Vector2D, scalar: number): Vector2D => [
  scalar * vector[0],
  scalar * vector[1],
];

const directionMap = new Map<Direction, Vector2D>();
directionMap.set(Direction.U, [0, 1]);
directionMap.set(Direction.R, [1, 0]);
directionMap.set(Direction.D, [0, -1]);
directionMap.set(Direction.L, [-1, 0]);

// Ideally this would be more strongly typed to /[URDL]\d+/
export type Instruction = string;

export type Line2D = {
  start: Vector2D;
  end: Vector2D;
};

export const convertInstruction = (instruction: Instruction): Vector2D => {
  const [directionStr, ...lengthArr] = instruction.split("");
  const direction = stringToDirection(directionStr);
  const length = parseInt(lengthArr.join(""));

  const unitVec = directionMap.get(direction);
  if (unitVec === undefined) {
    throw new Error("Unknown direction");
  }

  return scalarMultiply(unitVec, length);
};

// F
export class Wire {
  public constructor() {
    this.points = [[0, 0]];
  }

  public addInstruction(instruction: Instruction) {}

  private points: Vector2D[];

  private getLastPoint(): Vector2D {
    return this.points[this.points.length - 1];
  }
}
