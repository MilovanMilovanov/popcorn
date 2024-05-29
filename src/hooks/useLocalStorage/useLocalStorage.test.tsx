import { renderHook } from "@testing-library/react";
import { expect } from "vitest";
import useLocalStorage from "./useLocalStorage";

describe("Test useLocalStorage", () => {
  test("localStorage watched should have movie data", async () => {
    const { result } = renderHook(() =>
      useLocalStorage([{ id: "movie" }] as any, "watched")
    );

    const [watched] = result.current;

    expect(watched.length).toEqual(1);
  });
});
