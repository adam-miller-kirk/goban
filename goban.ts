export enum Status {
  WHITE = "WHITE",
  BLACK = "BLACK",
  EMPTY = "EMPTY",
  OUT = "OUT",
}

const directions: readonly [number, number][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

type Board = string[];

export class Goban {
  constructor(private board: Board) {}

  private coordKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  getStatus(x: number, y: number): Status {
    if (
      !this.board ||
      y < 0 ||
      y >= this.board.length ||
      x < 0 ||
      x >= this.board[0].length
    ) {
      return Status.OUT;
    }

    const cell = this.board[y][x];

    switch (cell) {
      case ".":
        return Status.EMPTY;
      case "o":
        return Status.WHITE;
      case "#":
        return Status.BLACK;
      default:
        throw new Error(`Unknown cell: ${cell}`);
    }
  }

  isTaken(x: number, y: number): boolean {
    const startStatus = this.getStatus(x, y);

    if (startStatus === Status.EMPTY || startStatus === Status.OUT)
      return false;

    const visited = new Set<string>();
    const stack: [number, number][] = [[x, y]];

    while (stack.length) {
      const [currentX, currentY] = stack.pop()!;
      const key = this.coordKey(currentX, currentY);

      if (visited.has(key)) continue;
      visited.add(key);

      for (const [directionX, directionY] of directions) {
        const neighbourX = currentX + directionX;
        const neighbourY = currentY + directionY;

        const neighborStatus = this.getStatus(neighbourX, neighbourY);
        if (neighborStatus === Status.EMPTY) return false;

        if (
          neighborStatus === startStatus &&
          !visited.has(this.coordKey(neighbourX, neighbourY))
        ) {
          stack.push([neighbourX, neighbourY]);
        }
      }
    }

    return true;
  }
}
