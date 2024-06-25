import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MovieSummary from "./Movie-summary";
import { MovieDetailsProps } from "../movie/Movie";

const testId = "summary-testId";

const watched: MovieDetailsProps[] = [
  {
    Runtime: "148 min",
    imdbRating: "8.8 IMDb rating",
    userRating: "7",
  },
];

const component = (params = watched as MovieDetailsProps[]) => {
  render(<MovieSummary testId={testId} watched={params} />);
};

describe("MovieSummary Redenring", () => {
  beforeEach(() => {
    component();
  });
  test("Should render MovieSummary component", () => {
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
  test("Should render the length of watchedlist", () => {
    expect(screen.queryByText(`${watched.length} movies`)).toBeInTheDocument();
  });
});
