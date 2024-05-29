import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import GenericText from "./generic-text";

const component = () => render(<GenericText text="message" />);

describe("GenericText Redenring", () => {
  test("Should render text message", () => {
    component();
    const wrapper = screen.getByTestId("genericTextId");
    expect(wrapper).toHaveClass("generic-message");
    expect(screen.getByText("message")).toBeInTheDocument();
  });
});
