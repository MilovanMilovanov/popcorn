import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Search, { SearchProps } from "./Search";
import NumResults from "../num-results/Num-results";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const props: SearchProps = {
  testId: "search-testId",
};

const component = () => {
  render(
    <MovieAppProvider>
      <Search {...props} />
    </MovieAppProvider>
  );
};

describe("Search Redenring", () => {
  test("Should render Search component", () => {
    component();
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
  });

  test("Search bar should have a class attribute", () => {
    component();
    expect(screen.getByTestId(props.testId!)).toHaveAttribute("class");
  });
});
