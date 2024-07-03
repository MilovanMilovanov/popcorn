import { ReactNode, useState } from "react";
import Button from "../button/Button";
import { Draggable } from "react-beautiful-dnd";
import styles from "./movie-container.module.less";
import DragIcon from "../icons/DragIcon";

export interface MovieContainerProps {
  id: string;
  index: number;
  testId?: string;
  children?: ReactNode;
}

export default function MovieContainer(props: MovieContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { index, id, testId, children } = props;

  const handleToggleBox = () => {
    setIsOpen((open) => !open);
  };

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <section
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles["movie-container"]}
          data-testid={testId}
        >
          <div className={styles["movie-container__header"]}>
            <DragIcon />
            <Button
              className={styles["btn-toggle"]}
              onClick={handleToggleBox}
              {...{ "aria-expanded": isOpen }}
            >
              {isOpen ? "–" : "+"}
            </Button>
          </div>
          {isOpen && (
            <div className={styles["movie-container__body"]}>{children}</div>
          )}
        </section>
      )}
    </Draggable>
  );
}
