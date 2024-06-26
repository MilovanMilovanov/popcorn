import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PromptMessage, { PromptMessageProps } from "./Prompt-message";

const props: PromptMessageProps = {
  testId: "generic-text-testId",
  children: <span>message</span>,
};

const component = () => render(<PromptMessage {...props} />);

describe("GenericText Redenring", () => {
  beforeEach(() => {
    component();
  });
  test("Prompt message component should be rendered", () => {
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
  });

  test("Should render text message", () => {
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toHaveClass("prompt-message");
    expect(screen.getByText("message")).toBeInTheDocument();
  });
});
