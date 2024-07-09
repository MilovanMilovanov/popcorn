import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MovieSummary from "./Movie-summary";
import { MovieProps } from "../movie/Movie";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const testId = "summary-testId";
const watched = {
  Runtime: "148 min",
  imdbRating: "8.8 IMDb rating",
  userRating: "7",
};

const component = (params = initialState) => {
  render(
    <MovieAppProvider contextValue={params}>
      <MovieSummary testId={testId} />
    </MovieAppProvider>
  );
};

describe("MovieSummary Redenring", () => {
  beforeEach(() => {
    component({ ...initialState, watched: [watched] });
  });
  test("Should render MovieSummary component", () => {
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
  test("Should render the length of watchedlist", () => {
    expect(screen.queryByText(`1 movies`)).toBeInTheDocument();
  });
});
