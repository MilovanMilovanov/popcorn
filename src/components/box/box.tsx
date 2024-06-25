import { useState } from "react";
import Button from "../button/Button";
import { PropsWithOptionalChildren } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import "./box.less";

interface BoxProps extends PropsWithOptionalChildren {
  id: string;
  index: number;
}

export default function Box({ index, id, children }: BoxProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
          <Button
            className="btn-toggle"
            onClick={handleToggleBox}
            {...{ "aria-expanded": isOpen }}
          >
            {isOpen ? "–" : "+"}
          </Button>
          {isOpen && children}
        </section>
      )}
    </Draggable>
  );
}
