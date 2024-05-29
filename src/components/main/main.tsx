import { PropsWithOptionalChildren } from "../../interfaces/interfaces";
import { StrictModeDroppable } from "../../strictModeDroppable";
import "./main.less";

export default function Main(props: PropsWithOptionalChildren) {
  return (
    <StrictModeDroppable droppableId="main-content">
      {(provided, snapshot) => (
        <main
          className="main"
          style={{
            background: snapshot.isDraggingOver ? "rgba(90, 67, 48, 0.4)" : "",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.children}
          {provided.placeholder}
        </main>
      )}
    </StrictModeDroppable>
  );
}
