import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Loader, { LoaderProps } from "./Loading";

const props: LoaderProps = {
  testId: "loader-testId",
  children: <span>Loading movies...</span>,
};

const component = () => render(<Loader {...props} />);

describe("Loaiding Redenring", () => {
  beforeEach(() => {
    component();
  });

  test("Loader component should be visible", () => {
    const loader = screen.getByTestId(props.testId!);
    expect(loader).toBeInTheDocument();
  });

  test("Should render shildren content", () => {
    expect(screen.getByText("Loading movies...")).toBeVisible();
  });
});
