import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Loading from "./Loading";

describe("Loaiding Redenring", () => {
  test("Should render the following text - 'Loading...'", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
