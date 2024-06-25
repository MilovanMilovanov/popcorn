import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import RatingAndDuration, { RatingAndDurationProps } from "./Rating-duration";

const props: RatingAndDurationProps = {
  Runtime: "111 min",
  imdbRating: "0.3 IMDb rating",
  userRating: "1",
  testId: "rating-duration-testId",
};

const component = () => {
  render(<RatingAndDuration {...props} />);
};

describe("RatingAndDuration Redenring", () => {
  test("Should render RatingAndDuration movie props", () => {
    const { Runtime, imdbRating, userRating } = props;
    component();
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
    expect(screen.queryByText(Runtime!)).toBeInTheDocument();
    expect(screen.queryByText(imdbRating!)).toBeInTheDocument();
    expect(screen.queryByText(userRating!)).toBeInTheDocument();
  });
});
