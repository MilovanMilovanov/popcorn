import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App Rendering", () => {
  test("App should be rendered", () => {
    const component = render(<App />);
    expect(component).toBeTruthy();
  });
});
