
/* Calculate fuel required for a module with the given mass */
export const calculateFuel = (mass: number): number => {
    return Math.floor(mass / 3.) - 2;
}