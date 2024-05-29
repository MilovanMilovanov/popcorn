import { fireEvent, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useKey from "./useKey";

describe("Test useKey", () => {
  test("Should call action with ArrowUp key", () => {
    const action = vi.fn();
    const { unmount } = renderHook(() => useKey(action));

    fireEvent.keyDown(document, {
      code: "ArrowUp",
    });

    expect(action).toHaveBeenCalledWith("ArrowUp");

    unmount();
  });

  test("Should call action with ArrowDown key", () => {
    const action = vi.fn();
    const { unmount } = renderHook(() => useKey(action));

    fireEvent.keyDown(document, {
      code: "ArrowDown",
    });

    expect(action).toHaveBeenCalledWith("ArrowDown");

    unmount();
  });

  test("Should call action with ArrowLeft key", () => {
    const action = vi.fn();
    const { unmount } = renderHook(() => useKey(action));

    fireEvent.keyDown(document, {
      code: "ArrowLeft",
    });

    expect(action).toHaveBeenCalledWith("ArrowLeft");

    unmount();
  });

  test("Should call action with ArrowRight key", () => {
    const action = vi.fn();
    const { unmount } = renderHook(() => useKey(action));

    fireEvent.keyDown(document, {
      code: "ArrowRight",
    });

    expect(action).toHaveBeenCalledWith("ArrowRight");

    unmount();
  });
});
