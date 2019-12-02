/* Calculate fuel required for a module with the given mass */
export const calculateFuel = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
};

/* Calculate fuel required for a module with the given mass
 * PLUS the fuel required for _that_ fuel, etc.
 */
export const calculateTotalFuel = (mass: number): number => {
  let total = 0;
  let fuelPart = calculateFuel(mass);

  while (fuelPart > 0) {
    total += fuelPart;
    fuelPart = calculateFuel(fuelPart);
  }

  return total;
};
