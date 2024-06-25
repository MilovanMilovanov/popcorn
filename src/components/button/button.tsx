import { ReactNode } from "react";
import "./button.less";

export interface BtnProps {
  className?: string;
  id?: string;
  testId?: string;
  "aria-expanded"?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export default function Button(props: BtnProps): JSX.Element {
  const { className, id, testId, onClick, children, ...attributes } = props;

  return (
    <button
      className={className}
      onClick={() => onClick?.()}
      data-testid={testId}
      {...attributes}
    >
      <span>{children}</span>
    </button>
  );
}
