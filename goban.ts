export enum Status {
  WHITE = "WHITE",
  BLACK = "BLACK",
  EMPTY = "EMPTY",
  OUT = "OUT",
}

// Cardinal directions for traversing adjacent cells (no diagonals)
const directions: readonly [number, number][] = [
  [0, 1], // South
  [0, -1], // North
  [1, 0], // East
  [-1, 0], // West
];

type Board = string[];

export class Goban {
  constructor(private board: Board) {}

  // Generates a unique key for coordinate tracking in visited set
  private coordKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  // Returns the status of a cell, or OUT if the position is off the board
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

  /**
   * Determines whether the stone at (x, y) is captured (i.e., has no liberties).
   * A stone is captured if its entire connected group has no adjacent empty cells.
   */
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

      // Check each adjacent cell (N, S, E, W) for liberties or connected stones
      for (const [directionX, directionY] of directions) {
        const neighbourX = currentX + directionX;
        const neighbourY = currentY + directionY;

        const neighborStatus = this.getStatus(neighbourX, neighbourY);

        // Found a liberty — this group is not taken
        if (neighborStatus === Status.EMPTY) return false;

        // Add connected stone of same colour to traversal if not yet visited
        if (
          neighborStatus === startStatus &&
          !visited.has(this.coordKey(neighbourX, neighbourY))
        ) {
          stack.push([neighbourX, neighbourY]);
        }
      }
    }

    // No liberties found in the connected group
    return true;
  }
}
