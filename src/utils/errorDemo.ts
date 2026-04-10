export function riskyFunction(value: number): void {
  if (value < 0) {
    throw new Error("Value cannot be negative");
  }
  console.log("Value is valid: ", value);
}
