import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import NumResults from "./Num-results";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const props = {
  testId: "number-results-testId",
};

const component = (params = initialState) => {
  render(
    <MovieAppProvider contextValue={params}>
      <NumResults {...props} />
    </MovieAppProvider>
  );
};

describe("NumResults Redenring", () => {
  test("Should render the length of search result", () => {
    component({ ...initialState, movies: [{}, {}, {}] });
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveTextContent("3");
  });
});
