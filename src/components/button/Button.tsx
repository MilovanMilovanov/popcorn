import { ReactNode } from "react";
export interface BtnProps {
  id?: string;
  testId?: string;
  "aria-expanded"?: boolean;
  children: ReactNode;
  className: string;
  onClick?: () => void;
}

export default function Button(props: BtnProps) {
  const { className, id, testId, onClick, children, ...attributes } = props;

  return (
    <button
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      data-testid={testId}
      {...attributes}
    >
      <span>{children}</span>
    </button>
  );
}
