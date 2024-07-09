import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Logo from "./Logo";
import styles from "./logo.module.less";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const testId = "logo-testId";

const component = (params = initialState) =>
  render(
    <MovieAppProvider contextValue={{ ...params }}>
      <Logo testId={testId} />
    </MovieAppProvider>
  );

describe("Logo Rendering", () => {
  test("The Logo should be rendered", () => {
    component();
    const logo = screen.getByTestId(testId);
    expect(logo).toBeInTheDocument();
    expect(screen.queryByAltText("animated popcorn image")).toBeInTheDocument();
  });

  test("The logo-highlight class should be present", () => {
    component({ ...initialState, movies: [{ Year: "2024" }] });
    const logoImg = screen.getByAltText("animated popcorn image");
    expect(logoImg).toHaveClass(styles["logo-highlight"]);
  });

  test("The logo-highlight class shouldn't be present", () => {
    component({ ...initialState, movies: [] });

    const logoImg = screen.getByAltText("animated popcorn image");
    expect(logoImg).not.toHaveClass(styles["logo-highlight"]);
  });
});
