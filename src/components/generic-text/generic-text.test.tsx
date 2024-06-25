import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import GenericText, { GenericMessageProps } from "./Generic-text";

const props: GenericMessageProps = {
  testId: "generic-text-testId",
  children: <span>message</span>,
};
const component = () => render(<GenericText {...props} />);

describe("GenericText Redenring", () => {
  test("Should render text message", () => {
    component();
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toHaveClass("generic-message");
    expect(screen.getByText("message")).toBeInTheDocument();
  });
});
