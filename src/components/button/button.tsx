import { PropsWithOptionalChildren } from "../../interfaces/interfaces";
import "./button.less";

export interface BtnProps extends PropsWithOptionalChildren {
  className?: string;
  id?: string;
  "aria-expanded"?: boolean;
  onClick?: () => void;
}

export default function Button(props: BtnProps): JSX.Element {
  const { className, id, onClick, children, ...attributes } = props;

  return (
    <button
      className={className}
      onClick={() => onClick?.()}
      data-testid="btnId"
      {...attributes}
    >
      <span>{children}</span>
    </button>
  );
}
