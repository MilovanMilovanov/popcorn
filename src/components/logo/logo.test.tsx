import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Logo from "./Logo";

const component = (param?: boolean) => render(<Logo isMovieLoaded={param} />);

describe("Logo Rendering", () => {
  test("The Logo should be visible", () => {
    component();
    expect(screen.queryByAltText("animated popcorn image")).toBeInTheDocument();
  });

  test("The logo-highlight class should be present", () => {
    const logoHightlight = true;
    component(logoHightlight);
    const wrapper = screen.getByTestId("logoId");
    expect(wrapper).toHaveClass("logo-highlight");
  });

  test("The logo-highlight class shouldn't be present", () => {
    const logoHightlight = false;
    component(logoHightlight);
    const wrapper = screen.getByTestId("logoId");
    expect(wrapper).not.toHaveClass("logo-highlight");
  });
});
