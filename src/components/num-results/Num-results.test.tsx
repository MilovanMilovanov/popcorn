import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import NumResults, { NumResultsProps } from "./Num-results";

const props: NumResultsProps = {
  numberOfResults: 7,
  testId: "number-results-testId",
};

const component = () => {
  render(<NumResults {...props} />);
};

describe("NumResults Redenring", () => {
  test("Should render the length of search result", () => {
    component();
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveTextContent(props.numberOfResults.toFixed());
  });
});
