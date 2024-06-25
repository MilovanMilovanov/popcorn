import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Navigation from "./Navigation";
import Logo from "../logo/Logo";
import Search from "../search/Search";

const component = () => {
  render(
    <Navigation>
      <Logo />
      <Search query="" handleSearch={vi.fn()}></Search>
    </Navigation>
  );
};

describe("Navigation Redenring", () => {
  test("Should render Navigation elements", () => {
    component();
    expect(screen.getByTestId("navId")).toBeInTheDocument();
    expect(screen.getByTestId("logoId")).toBeInTheDocument();
    expect(screen.getByTestId("searchId")).toBeInTheDocument();
  });
  test("The Navigation should have a className attribute", () => {
    component();
    expect(screen.getByTestId("navId")).toHaveAttribute("class");
  });
});
