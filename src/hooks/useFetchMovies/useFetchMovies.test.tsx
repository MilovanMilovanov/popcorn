import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import useFetchMovies from "./useFetchMovies";

describe("Test useFetchMovies", () => {
  const fetchSpy = vi.spyOn(window, "fetch");

  afterEach(() => {
    fetchSpy.mockClear();
    fetchSpy.mockReset();
  });

  test("Movies should be fetched", async () => {
    const data = {
      ok: true,
      json: async () =>
        await {
          Response: "True",
          Search: [
            {
              imdbID: "1",
              Title: "Movie 1",
              Year: "2020",
              Runtime: "120 min",
              imdbRating: "7.5",
            },
            {
              imdbID: "2",
              Title: "Movie 2",
              Year: "2021",
              Runtime: "110 min",
              imdbRating: "8.0",
            },
          ],
        },
    };
    fetchSpy.mockReturnValue(data as any);
    const { result, unmount } = renderHook(() => useFetchMovies("red"));

    await waitFor(() => {
      expect(result.current.movies.length).toEqual(2);
    });

    const { isLoading, error } = result.current;

    expect(isLoading).toBe(false);
    expect(error).toBe("");
    unmount();
  });

  test("Error message should be present", async () => {
    const data = {
      ok: true,
      json: async () =>
        await {
          Response: "False",
        },
    };
    fetchSpy.mockReturnValue(Promise.resolve(data as any));

    const { result, unmount } = renderHook(() => useFetchMovies("green"));

    await waitFor(() => {
      expect(result.current.error).toBe("No Movie Found!");
    });

    const { isLoading, movies } = result.current;

    expect(isLoading).toBe(false);
    expect(movies.length).toEqual(0);
    unmount();
  });
});
