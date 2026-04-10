export function countDown(n: number): void {
  if (n <= 0) {
    console.log("Done!");
    return;
  }

  console.log(n);
  countDown(n - 1);
}
