import { ReactNode } from "react";
import { StrictModeDroppable } from "../../strictModeDroppable";
import styles from "./main-content.module.less";

export interface MainProps {
  testId?: string;
  children: ReactNode;
}

export default function Main(props: MainProps) {
  const { testId, children } = props;
  return (
    <StrictModeDroppable droppableId="main-content" direction="horizontal">
      {(provided, snapshot) => (
        <main
          data-testid={testId}
          className={styles["main-content"]}
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
