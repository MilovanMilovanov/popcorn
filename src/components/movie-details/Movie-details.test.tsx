import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MovieDetails from "./Movie-details";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const props = {
  testId: "details-testId",
};

const movie = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "16 Jul 2010",
  Runtime: "148 min",
  imdbRating: "8.8 IMDb rating",
  userRating: "7",
};

const component = async (params = initialState) => {
  render(
    <MovieAppProvider contextValue={params}>
      <MovieDetails {...props} />
    </MovieAppProvider>
  );
};

const waitForLoadingToDisappear = async () => {
  await waitFor(() =>
    expect(screen.queryByText("Loading movies...")).not.toBeInTheDocument()
  );
};

describe("MovieDetails Redenring", () => {
  test("Should render movie details", async () => {
    component({ ...initialState, movies: [movie], selectedId: movie.imdbID });
    const details = screen.getByTestId(props.testId);
    expect(details).toBeInTheDocument();

    await waitForLoadingToDisappear();

    const movieTitle = screen.getByRole("heading");
    expect(movieTitle).toHaveTextContent(movie.Title);
    screen.debug();
  });

  test("StarRating should be rendered if selectedId is different than current movie id", async () => {
    component({ ...initialState, selectedId: "different id" });

    await waitForLoadingToDisappear();

    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("Add movie button should not be rendered initially", async () => {
    component();

    await waitForLoadingToDisappear();

    expect(screen.queryByText("+ Add to List")).not.toBeInTheDocument();
  });

  test("Add movie button should be visible", async () => {
    component({ ...initialState, selectedId: "different id" });

    await waitForLoadingToDisappear();

    const wrapper = screen.getByRole("slider");

    const stars = within(wrapper).getAllByRole("button") as Element[];
    fireEvent.click(stars.at(0)!);

    const addButton = screen.queryByText("+ Add to List");
    expect(addButton).toBeInTheDocument();
  });

  test("HandleCloseDetails should be called once", async () => {
    const handleCloseDetails = vi.fn();
    component({ ...initialState, handleCloseDetails });

    await waitForLoadingToDisappear();

    const btnBack = screen.queryByText("←") as Element;

    fireEvent.click(btnBack);

    expect(handleCloseDetails).toHaveBeenCalledTimes(1);
  });
});
