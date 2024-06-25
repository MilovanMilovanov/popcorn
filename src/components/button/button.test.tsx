import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Button, { BtnProps } from "./Button";

const intialProps: BtnProps = {
  testId: "btn-testId",
  id: "1",
  "aria-expanded": true,
  onClick: vi.fn(),
};

const component = (props = intialProps) =>
  render(
    <Button {...props}>
      <p>Test Content</p>
    </Button>
  );

describe("Button Rendering", () => {
  test("Should render children", () => {
    component();
    const btn = screen.getByTestId(intialProps.testId!);
    expect(btn).toBeInTheDocument();
    expect(screen.queryByText("Test Content")).toBeInTheDocument();
  });

  test("Check if buttons accepts and uses props correctly", () => {
    const props = { "aria-expanded": true, className: "btn" };

    component(props);
    const button = screen.getByTestId("btnId");

    expect(button).toHaveClass("btn");
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(intialProps.onClick).toBeCalledTimes(1);
  });
});
