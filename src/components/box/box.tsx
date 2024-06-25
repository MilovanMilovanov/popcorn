import { useState } from "react";
import Button from "../button/Button";
import { PropsWithOptionalChildren } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import "./box.less";
import DragIcon from "../icons/DragIcon";

interface BoxProps extends PropsWithOptionalChildren {
  id: string;
  index: number;
}

export default function Box(props: BoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { index, id, children } = props;

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
          data-testid="boxId"
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
