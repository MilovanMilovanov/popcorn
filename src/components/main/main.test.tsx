import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Main from "./main";
import Box from "../box/box";

describe("Main Rendering", () => {
  render(
    <Main>
      <Box />
    </Main>
  );
  test("Check if Box is rendered", () => {
    const box = screen.getByTestId("boxId");
    expect(box).toBeInTheDocument();
  });
});
