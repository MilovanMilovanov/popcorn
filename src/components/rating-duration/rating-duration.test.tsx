import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import RatingAndDuration from "./rating-duration";
import { MovieDetailsProps } from "../movie/movie";

const movie: MovieDetailsProps = {
  Runtime: "111 min",
  imdbRating: "0.3 IMDb rating",
  userRating: "1",
};

const component = () => {
  render(<RatingAndDuration {...movie} />);
};

describe("RatingAndDuration Redenring", () => {
  test("Should render RatingAndDuration movie props", () => {
    const { Runtime, imdbRating, userRating } = movie;
    component();
    expect(screen.getByTestId("ratingAndDurationId")).toBeInTheDocument();
    expect(screen.queryByText(Runtime!)).toBeInTheDocument();
    expect(screen.queryByText(imdbRating!)).toBeInTheDocument();
    expect(screen.queryByText(userRating!)).toBeInTheDocument();
  });
});
