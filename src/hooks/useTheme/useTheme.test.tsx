import { renderHook } from "@testing-library/react";
import useTheme from "../../hooks/useTheme/useTheme";

describe("Switch Component", () => {
  test("The default theme should be dark", () => {
    const { result, unmount } = renderHook(() => useTheme("dark"));
    expect(result.current[0]).toBe("dark");
    unmount();
  });
});
