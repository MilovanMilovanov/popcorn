import { ReactNode, useState } from "react";
import Button from "../button/Button";
import { Draggable } from "react-beautiful-dnd";
import "./box.less";
import DragIcon from "../icons/DragIcon";

export interface BoxProps {
  id: string;
  index: number;
  testId?: string;
  children?: ReactNode;
}

export default function Box(props: BoxProps) {
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
          className="box"
          data-testid={testId}
        >
          <div className="box-header">
            <DragIcon />
            <Button
              className="btn-toggle"
              onClick={handleToggleBox}
              {...{ "aria-expanded": isOpen }}
            >
              {isOpen ? "–" : "+"}
            </Button>
          </div>
          {isOpen && children}
        </section>
      )}
    </Draggable>
  );
}
