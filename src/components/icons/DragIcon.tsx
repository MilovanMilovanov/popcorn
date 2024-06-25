import "./drag-icon.less";

export default function DragIcon() {
  return (
    <svg
      className="dragIcon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="drag-indicator"
    >
      <path
        style={{ fill: "var(--drag-icon-bg-color)" }}
        d="M0 0h24v24H0V0z"
      ></path>
      <path
        style={{ fill: "var(--drag-icon-color)" }}
        d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      ></path>
    </svg>
  );
}
