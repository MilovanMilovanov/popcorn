import { fireEvent, render, screen } from "@testing-library/react";
import Switch from "./Switch";
import MovieAppProvider from "../../context/movie-app-context/movie-app-context";

const testId = "theme-switch-testId";

const component = () => {
  render(
    <MovieAppProvider>
      <Switch testId={testId} />;
    </MovieAppProvider>
  );
};

describe("Switch Component", () => {
  beforeEach(() => {
    component();
  });

  test("renders the switch component", () => {
    const themeToggler = screen.getByTestId(testId);
    expect(themeToggler).toBeInTheDocument();
  });

  test("aria attributes are set correctly", () => {
    const themeToggler = screen.getByTestId(testId);
    expect(themeToggler).toHaveAttribute("aria-checked", "true");
    expect(themeToggler).toHaveAttribute("aria-label", "Toggle theme");
  });

  test("The theme should change to light", async () => {
    const themeToggler = screen.getByTestId(testId);
    fireEvent.click(themeToggler);
    expect(document.body).toHaveAttribute("data-theme", "light");
  });
});
