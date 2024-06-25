import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Main, { MainProps } from "./Main";

const props: MainProps = {
  testId: "main-testId",
  children: <p>Main content</p>,
};

describe("Main Rendering", () => {
  render(<Main {...props} />);
  test("Main component should be rendered", () => {
    const box = screen.getByTestId(props.testId!);
    expect(box).toBeInTheDocument();
  });

  test("Children should be visible", () => {
    expect(screen.queryByText("Main content")).toBeInTheDocument();
  });
});
