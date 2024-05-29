import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Box from "./box";

const component = () =>
  render(
    <Box>
      <p>Test Content</p>
    </Box>
  );

describe("Box Rendering", () => {
  test("Does not render children when IsOpen: false", () => {
    component();
    const button = screen.getByTestId("btnId");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("Renders children when isOen: true", () => {
    component();
    const button = screen.getByTestId("btnId");

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("–")).toBeInTheDocument();
  });
});
