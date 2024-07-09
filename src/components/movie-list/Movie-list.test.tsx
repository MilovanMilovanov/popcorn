import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MovieList from "./Movie-list";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const testId = "movie-list-testId";
const movie = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "2010",
};

const component = async (params = initialState) => {
  render(
    <MovieAppProvider contextValue={params}>
      <MovieList testId={testId} />
    </MovieAppProvider>
  );
};

describe("MovieList Redenring", () => {
  test("MovieList should be rendered", () => {
    component();
    const list = screen.getByTestId(testId);
    expect(list).toBeInTheDocument();
  });

  test("MovieList content should be visible", () => {
    component({ ...initialState, movies: [movie] });
    const { Title: title, Year: year } = movie;
    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(screen.queryByText(year)).toBeInTheDocument();
    expect(screen.queryByAltText(`${title} poster`)).toBeInTheDocument();
  });
});
