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
});
