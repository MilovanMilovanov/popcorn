import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import NumResults from "./Num-results";

const resultsLength = 7;

const component = () => {
  render(<NumResults num={resultsLength} />);
};

describe("NumResults Redenring", () => {
  test("Should render the length of search result", () => {
    component();
    expect(screen.getByTestId("numResultsId")).toBeInTheDocument();
    expect(screen.queryByText(resultsLength)).toBeInTheDocument();
  });
});
