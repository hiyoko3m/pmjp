export function range(begin: number, end: number): Array<number> {
  return Array.from(Array(end - begin), (_, k) => k).map((v) => v + begin);
}
