import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Logo, { LogoProps } from "./Logo";

const props: LogoProps = {
  isMovieLoaded: true,
  testId: "logo-testId",
  children: (
    <>
      <img src="src\assets\popcorn.jpg" alt="test" />
      <h1>Popcorn</h1>
    </>
  ),
};

const component = (params = props) => render(<Logo {...params} />);

describe("Logo Rendering", () => {
  test("The Logo should be rendered", () => {
    component();
    const logo = screen.getByTestId(props.testId!);
    expect(logo).toBeInTheDocument();
    expect(screen.queryByAltText("test")).toBeInTheDocument();
  });

  test("The logo-highlight class should be present", () => {
    component({ ...props, isMovieLoaded: true });
    const logo = screen.getByTestId(props.testId!);
    expect(logo).toHaveClass("logo-highlight");
  });

  test("The logo-highlight class shouldn't be present", () => {
    component({ ...props, isMovieLoaded: false });
    const logo = screen.getByTestId(props.testId!);
    expect(logo).not.toHaveClass("logo-highlight");
  });
});
