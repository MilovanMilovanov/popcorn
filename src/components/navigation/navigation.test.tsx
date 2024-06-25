import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Navigation, { NavigationProps } from "./Navigation";

const props: NavigationProps = {
  testId: "navigation-testId",
  children: <span>Navigation content</span>,
};

const component = () => render(<Navigation />);
describe("Navigation Redenring", () => {
  beforeEach(() => {
    component();
  });
  test("Navigation component should be visible", () => {
    const navigation = screen.getByTestId(props.testId!);
    expect(navigation).toBeInTheDocument();
    expect(navigation).toBeVisible();
  });

  test("The Navigation should have a className attribute", () => {
    const navigation = screen.getByTestId(props.testId!);
    expect(navigation).toHaveAttribute("class");
  });

  test("Navigation content should be visible", () => {
    const navigation = screen.getByTestId(props.testId!);
    expect(screen.queryByText("Navigation content")).toBeInTheDocument();
    expect(navigation).toBeVisible();
  });
});
