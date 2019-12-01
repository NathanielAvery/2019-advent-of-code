import { calculateFuel } from "./calculateFuel";

describe("calculateFuel", () => {
    // The examples provided on https://adventofcode.com/2019/day/1
    const examples = [
        [12, 2],
        [14, 2],
        [1969, 654],
        [100756, 33583]
    ];

    it.each(examples)("module of mass %i should have fuel: %i", (mass: number, expectedFuel: number): void => {
        const calculatedFuel = calculateFuel(mass);
        expect(calculatedFuel).toBe(expectedFuel);
    });
});