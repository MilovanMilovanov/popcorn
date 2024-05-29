import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Search, { SearchProps } from "./search";
import NumResults from "../num-results/num-results";

const props: SearchProps = {
  query: "test",
  handleSearch: vi.fn(),
};

const component = () => {
  render(
    <Search {...props}>
      <NumResults num={0} />
    </Search>
  );
};

describe("Search Redenring", () => {
  test("Should render Search elements", () => {
    component();
    expect(screen.getByTestId("searchId")).toBeInTheDocument();
    expect(screen.getByTestId("numResultsId")).toBeInTheDocument();
  });

  test("Search bar should have a class attribute", () => {
    component();
    expect(screen.getByTestId("searchId")).toHaveAttribute("class");
  });
});
