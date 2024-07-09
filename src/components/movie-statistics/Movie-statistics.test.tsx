import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MovieStatistics, { MovieStatisticsProps } from "./Movie-statistics";

const props: MovieStatisticsProps = {
  statistics: {
    runtime: "111 min",
    imdbRating: "0.3 IMDb rating",
    userRating: "1",
  },
  testId: "rating-duration-testId",
};

const component = () => {
  render(<MovieStatistics {...props} />);
};

describe("MovieStatistics Redenring", () => {
  test("Should render MovieStatistics props", () => {
    component();
    const {
      statistics: { runtime, imdbRating, userRating },
    } = props;
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
    expect(screen.queryByText(runtime!)).toBeInTheDocument();
    expect(screen.queryByText(imdbRating!)).toBeInTheDocument();
    expect(screen.queryByText(userRating!)).toBeInTheDocument();
  });
});
