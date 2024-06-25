import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ErrorMessage, { ErrorProps } from "./Error";

const props: ErrorProps = {
  error: "Error message",
  testId: "error-testId",
};

const component = () => render(<ErrorMessage {...props} />);

describe("ErrorMessage Redenring", () => {
  test("Should render error message", () => {
    component();
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toHaveClass("error");
    expect(screen.getByText(props.error)).toBeInTheDocument();
  });
});
