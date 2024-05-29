import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App Rerendering", () => {
  test("Check if App is rendered", () => {
    const component = render(<App />);
    expect(component).toBeTruthy();
  });
});
