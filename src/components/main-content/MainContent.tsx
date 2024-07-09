import { ReactNode } from "react";
import { StrictModeDroppable } from "../../strictModeDroppable";
import styles from "./main-content.module.less";

export interface MainProps {
  testId?: string;
  children: ReactNode;
}

const dragPlaceholderStyles = (isDragging: boolean) => {
  if (!isDragging) return {};

  return {
    background: "var(--dragzone-bg-color)",
    border: "0.1rem dashed var(--dragzone-border-color)",
  };
};

export default function MainContent(props: MainProps) {
  const { testId, children } = props;
  return (
    <StrictModeDroppable droppableId="main-content" direction="horizontal">
      {(provided, snapshot) => (
        <main data-testid={testId} className={styles["main-wrapper"]}>
          <div
            className={styles["main-content"]}
            style={dragPlaceholderStyles(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {children}
            {provided.placeholder}
          </div>
        </main>
      )}
    </StrictModeDroppable>
  );
}
