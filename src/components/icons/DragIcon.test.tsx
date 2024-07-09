import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import DragIcon from "./DragIcon";

const props = {
  isDragging: false,
  testId: "dragIcon-testId",
};

const component = () => render(<DragIcon {...props} />);

describe("DragIcon Redenring", () => {
  test("DragIcon should be visible", () => {
    component();
    expect(screen.getByTestId(props.testId)).toBeVisible();
  });

  test("DragIcon should be SVG element", () => {
    component();
    const svg = screen.getByTestId(props.testId);
    expect(svg.tagName).toBe("svg");
  });
});
