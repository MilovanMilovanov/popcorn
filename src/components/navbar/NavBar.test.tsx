import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import NavBar, { NavBarProps } from "./NavBar";

const props: NavBarProps = {
  testId: "NavBar-testId",
  children: <span>NavBar content</span>,
};

const component = () => render(<NavBar {...props} />);
describe("NavBar Redenring", () => {
  beforeEach(() => {
    component();
  });
  test("NavBar component should be visible", () => {
    const navBar = screen.getByTestId(props.testId!);
    expect(navBar).toBeInTheDocument();
    expect(navBar).toBeVisible();
  });

  test("The NavBar should have a className attribute", () => {
    const navBar = screen.getByTestId(props.testId!);
    expect(navBar).toHaveAttribute("class");
  });

  test("The NavBar content should be visible", () => {
    const navBar = screen.getByTestId(props.testId!);
    expect(screen.queryByText("NavBar content")).toBeInTheDocument();
    expect(navBar).toBeVisible();
  });
});
