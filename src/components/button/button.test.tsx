import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Button from "./Button";

const component = (props?: { [index: string]: string | boolean | Function }) =>
  render(
    <Button {...props}>
      <p>Test Content</p>
    </Button>
  );

describe("Button Rendering", () => {
  test("Should render children", () => {
    component();
    expect(screen.queryByText("Test Content")).toBeInTheDocument();
  });

  test("Check if buttons accepts and uses props correctly", () => {
    const onClick = vi.fn();
    const props = { "aria-expanded": true, className: "btn", onClick };

    component(props);
    const button = screen.getByTestId("btnId");

    expect(button).toHaveClass("btn");
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });
});
