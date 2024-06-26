import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import DragIcon from "./DragIcon";

const testId = "dragIcon-testId";

const component = () => render(<DragIcon testId={testId} />);

describe("DragIcon Redenring", () => {
  test("DragIcon should be visible", () => {
    component();
    expect(screen.getByTestId(testId)).toBeVisible();
  });

  test("DragIcon should be SVG element", () => {
    component();
    const svg = screen.getByTestId(testId);
    expect(svg.tagName).toBe("svg");
  });
});
