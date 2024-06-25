import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Box, { BoxProps } from "./Box";

const props: BoxProps = {
  id: "test",
  index: 1,
  testId: "box-testId",
};

const component = () =>
  render(
    <Box {...props}>
      <p>Test Content</p>
    </Box>
  );

describe("Box Rendering", () => {
  beforeEach(() => {
    component();
  });
  test("Does not render children when IsOpen: false", () => {
    const button = screen.getByTestId(props.testId!);
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("Renders children when isOen: true", () => {
    const button = screen.getByTestId("btnId");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("–")).toBeInTheDocument();
  });
});
