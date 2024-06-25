import { fireEvent, render, screen } from "@testing-library/react";
import Switch from "./Switch";

const component = () => {
  render(<Switch />);
};

describe("Switch Component", () => {
  test("renders the switch component", () => {
    component();

    const themeToggler = screen.getByRole("switch");
    expect(themeToggler).toBeInTheDocument();
  });

  test("aria attributes are set correctly", () => {
    component();

    const themeToggler = screen.getByRole("switch");
    expect(themeToggler).toHaveAttribute("aria-checked", "true");
    expect(themeToggler).toHaveAttribute("aria-label", "Toggle theme");
  });

  test("The theme should change to light", async () => {
    const themeToggler = screen.getByRole("switch");
    fireEvent.click(themeToggler);
    expect(document.body).toHaveAttribute("data-theme", "light");
  });
});
