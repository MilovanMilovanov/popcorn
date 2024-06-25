import { ReactNode } from "react";
import { StrictModeDroppable } from "../../strictModeDroppable";
import "./main.less";

export interface MainProps {
  testId?: string;
  children: ReactNode;
}

export default function Main(props: MainProps) {
  const { testId, children } = props;
  return (
    <StrictModeDroppable droppableId="main-content">
      {(provided, snapshot) => (
        <main
          date-testid={testId}
          className="main"
          style={{
            background: snapshot.isDraggingOver ? "rgba(90, 67, 48, 0.4)" : "",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </main>
      )}
    </StrictModeDroppable>
  );
}
