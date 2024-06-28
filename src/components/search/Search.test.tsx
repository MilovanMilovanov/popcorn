import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Search, { SearchProps } from "./Search";
import NumResults from "../num-results/Num-results";

const props: SearchProps = {
  query: "test",
  testId: "search-testId",
  handleSearch: vi.fn(),
};

const component = () => {
  render(
    <Search {...props}>
      <NumResults numberOfResults={0} />
    </Search>
  );
};

describe("Search Redenring", () => {
  test("Should render Search elements", () => {
    component();
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
  });

  test("Search bar should have a class attribute", () => {
    component();
    expect(screen.getByTestId(props.testId!)).toHaveAttribute("class");
  });
});
