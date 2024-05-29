import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ErrorMessage from "./error";

const component = () => render(<ErrorMessage error="error message" />);

describe("ErrorMessage Redenring", () => {
  test("Should render error message", () => {
    component();
    const wrapper = screen.getByTestId("errorId");
    expect(wrapper).toHaveClass("error");
    expect(screen.getByText("error message")).toBeInTheDocument();
  });
});
