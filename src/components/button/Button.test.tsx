import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Button, { BtnProps } from "./Button";

const props: BtnProps = {
  testId: "btn-testId",
  id: "1",
  className: "btn2",
  "aria-expanded": true,
  children: <p>Button Content</p>,
  onClick: vi.fn(),
};

const component = (params = props) =>
  render(<Button {...params}>{params.children}</Button>);

describe("Button Rendering", () => {
  test("Button should be vissible", () => {
    component();
    expect(screen.getByTestId(props.testId!)).toBeVisible();
  });

  test("Should render children", () => {
    component();
    const btn = screen.getByTestId(props.testId!);
    expect(btn).toBeInTheDocument();
    expect(screen.queryByText("Button Content")).toBeInTheDocument();
  });

  test("Check if button has correct props", () => {
    component({
      ...props,
      "aria-expanded": true,
      className: props.className,
    });
    const button = screen.getByTestId(props.testId!);

    expect(button).toHaveClass(props.className!);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(props.onClick).toBeCalledTimes(1);
  });
});
