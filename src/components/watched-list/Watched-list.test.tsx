import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import WatchedList from "./Watched-list";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const testId = "watchlist-testId";
const selectedId = "tt1375666";
const handleRemoveMovie = vi.fn();

const watched = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "16 Jul 2010",
  Runtime: "148 min",
  imdbRating: "8.8 IMDb rating",
  userRating: "7",
};

const component = (params = initialState) => {
  render(
    <MovieAppProvider contextValue={params}>
      <WatchedList testId={testId} />
    </MovieAppProvider>
  );
};

const { Title: title, Runtime: runtime, userRating, imdbRating } = watched;

describe("WatchedList Redenring", () => {
  beforeEach(() => {
    component({
      ...initialState,
      handleRemoveMovie,
      selectedId,
      watched: [watched],
    });
  });
  test("Should render wathchedList props", () => {
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(screen.queryByText(imdbRating)).toBeInTheDocument();
    expect(screen.queryByText(userRating)).toBeInTheDocument();
    expect(screen.queryByText(runtime)).toBeInTheDocument();
    expect(screen.queryByAltText(`${title} poster`)).toBeInTheDocument();

    const deleteBtn = screen.queryByText("–") as Element;
    expect(deleteBtn).toBeInTheDocument();
  });

  test("handleRemoveMovie should be called once", async () => {
    const deleteBtn = screen.queryByText("–") as Element;

    fireEvent.click(deleteBtn);
    expect(handleRemoveMovie).toHaveBeenCalledTimes(1);
  });

  test("Movie should be removed from WatchedList", () => {
    const deleteBtn = screen.queryByText("–") as Element;
    fireEvent.click(deleteBtn);
    expect(handleRemoveMovie).toHaveBeenCalledWith(selectedId);

    waitForElementToBeRemoved(() => screen.queryByText("–") as Element).then(
      () => {
        expect(deleteBtn).not.toBeInTheDocument();
      }
    );
  });
});
