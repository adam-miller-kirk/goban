import { Goban, Status } from "./goban";

describe("Goban", () => {
  test("white is taken when surrounded by black", () => {
    const goban = new Goban([".#.", "#o#", ".#."]);
    expect(goban.isTaken(1, 1)).toBe(true);
  });

  test("white is not taken when it has a liberty", () => {
    const goban = new Goban(["...", "#o#", ".#."]);
    expect(goban.isTaken(1, 1)).toBe(false);
  });

  test("black shape is taken when surrounded", () => {
    const goban = new Goban(["oo.", "##o", "o#o", ".o."]);
    expect(goban.isTaken(0, 1)).toBe(true);
    expect(goban.isTaken(1, 1)).toBe(true);
    expect(goban.isTaken(1, 2)).toBe(true);
  });

  test("black shape is not taken when it has a liberty", () => {
    const goban = new Goban(["oo.", "##.", "o#o", ".o."]);
    expect(goban.isTaken(0, 1)).toBe(false);
    expect(goban.isTaken(1, 1)).toBe(false);
    expect(goban.isTaken(1, 2)).toBe(false);
  });

  test("square shape is taken", () => {
    const goban = new Goban(["oo.", "##o", "##o", "oo."]);
    expect(goban.isTaken(0, 1)).toBe(true);
    expect(goban.isTaken(0, 2)).toBe(true);
    expect(goban.isTaken(1, 1)).toBe(true);
    expect(goban.isTaken(1, 2)).toBe(true);
  });

  describe("additional cases", () => {
    test("stone on the edge is taken when surrounded", () => {
      const goban = new Goban(["o", "#"]);
      expect(goban.isTaken(0, 1)).toBe(true);
    });

    test("stone on the corner with a liberty is not taken", () => {
      const goban = new Goban([".#", ".."]);
      expect(goban.isTaken(1, 0)).toBe(false);
    });

    test("isolated stone in open space is not taken", () => {
      const goban = new Goban(["...", ".#.", "..."]);
      expect(goban.isTaken(1, 1)).toBe(false);
    });

    test("empty space is never taken", () => {
      const goban = new Goban(["..."]);
      expect(goban.isTaken(1, 0)).toBe(false);
    });

    test("out of bounds coordinates are never taken", () => {
      const goban = new Goban([".#."]);
      expect(goban.isTaken(-1, 0)).toBe(false);
      expect(goban.isTaken(0, -1)).toBe(false);
      expect(goban.isTaken(3, 0)).toBe(false);
      expect(goban.isTaken(0, 1)).toBe(false);
    });

    test("white and black adjacent but only white is taken", () => {
      const goban = new Goban([".#.", "#o#", ".#."]);
      expect(goban.isTaken(1, 1)).toBe(true); // white taken
      expect(goban.isTaken(1, 0)).toBe(false); // black has liberty
    });
  });
});
