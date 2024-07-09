import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ErrorMessage, { ErrorProps } from "./Error";
import styles from "./error.module.less";

const props: ErrorProps = {
  error: "Error message",
  testId: "error-testId",
};

const component = () => render(<ErrorMessage {...props} />);

describe("ErrorMessage Redenring", () => {
  beforeEach(() => {
    component();
  });

  test("Error component should be rendered", () => {
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
  });
  test("Should render error message", () => {
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toHaveClass(styles.error);
    expect(screen.getByText(props.error)).toBeInTheDocument();
  });
});
