import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MovieSummary from "./Movie-summary";
import { MovieDetailsProps } from "../movie/Movie";

const watched: MovieDetailsProps[] = [
  {
    Runtime: "148 min",
    imdbRating: "8.8 IMDb rating",
    userRating: "7",
  },
];

const component = (watched: MovieDetailsProps[]) => {
  render(<MovieSummary watched={watched} />);
};

describe("MovieSummary Redenring", () => {
  test("Should render MovieSummary component", () => {
    component(watched);
    expect(screen.getByTestId("movieSummaryId")).toBeInTheDocument();
  });
  test("Should render the length of watchedlist", () => {
    component(watched);
    expect(screen.queryByText(`${watched.length} movies`)).toBeInTheDocument();
  });
});
