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
  render(<MovieStatistics statistics={props.statistics} />);
};

describe("MovieStatistics Redenring", () => {
  test("Should render MovieStatistics movie props", () => {
    const {
      statistics: { runtime, imdbRating, userRating },
    } = props;
    component();
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
    expect(screen.queryByText(runtime!)).toBeInTheDocument();
    expect(screen.queryByText(imdbRating!)).toBeInTheDocument();
    expect(screen.queryByText(userRating!)).toBeInTheDocument();
  });
});
