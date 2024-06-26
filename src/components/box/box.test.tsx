import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Box, { BoxProps } from "./Box";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const props: BoxProps = {
  id: "movieList",
  index: 1,
  testId: "box-testId",
};

const component = () =>
  render(
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Box {...props}>
              <p>Box Content</p>
            </Box>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

describe("Box Rendering", () => {
  beforeEach(() => {
    component();
  });
  test("Box component should be rendered", () => {
    const box = screen.getByTestId(props.testId!);
    expect(box).toBeInTheDocument();
  });

  test("Box content should be vissible", () => {
    const button = screen.getByRole("button", { expanded: true });
    expect(button).toHaveTextContent("–");
    expect(screen.queryByText("Box Content")).toBeInTheDocument();
  });

  test("Box content should not be vissible", () => {
    const button = screen.getByRole("button", { expanded: true });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveTextContent("+");
    expect(screen.queryByText("Box Content")).not.toBeInTheDocument();
  });
});
