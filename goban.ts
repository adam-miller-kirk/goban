export enum Status {
  WHITE = "WHITE",
  BLACK = "BLACK",
  EMPTY = "EMPTY",
  OUT = "OUT",
}

type Board = string[];

export class Goban {
  constructor(private goban: Board) {}

  getStatus(x: number, y: number): Status {
    if (
      !this.goban ||
      y < 0 ||
      y >= this.goban.length ||
      x < 0 ||
      x >= this.goban[0].length
    ) {
      return Status.OUT;
    }

    const cell = this.goban[y][x];
    if (cell === ".") return Status.EMPTY;
    if (cell === "o") return Status.WHITE;
    if (cell === "#") return Status.BLACK;

    throw new Error(`Unknown cell: ${cell}`);
  }

  isTaken(x: number, y: number): boolean {
    const startStatus = this.getStatus(x, y);
    if (startStatus === Status.EMPTY || startStatus === Status.OUT)
      return false;

    const visited = new Set<string>();
    const stack: [number, number][] = [[x, y]];

    while (stack.length) {
      const [cx, cy] = stack.pop()!;
      const key = `${cx},${cy}`;
      if (visited.has(key)) continue;
      visited.add(key);

      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        const nx = cx + dx;
        const ny = cy + dy;
        const status = this.getStatus(nx, ny);

        if (status === Status.EMPTY) return false;
        if (status === startStatus) {
          stack.push([nx, ny]);
        }
      }
    }

    return true;
  }
}
