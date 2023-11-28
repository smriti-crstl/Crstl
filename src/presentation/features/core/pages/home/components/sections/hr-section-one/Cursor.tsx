import { ReactElement } from "react";

const CursorImage = () => (
  <svg>
    <path
      fill="currentColor"
      d="M8.482,0l8.482,20.36L8.322,17.412,0,20.36Z"
      transform="translate(11 22.57) rotate(-48)"
    />
  </svg>
);

const CursorName = ({ color, name }: { color: any; name: any }) => (
  <div
    style={{
      top: "34px",
      left: "40px",
      background: color,
      position: "absolute",
      padding: "2px 11px",
    }}
  >
    <p style={{ color: "white", marginBottom: 0 }}>{name}</p>
  </div>
);

// Give cursor absolute x/y positioning
export const Cursor = ({
  x,
  y,
  color,
  name,
}: {
  x: any;
  y: any;
  color: any;
  name: any;
}): ReactElement => {
  return (
    <div
      style={{
        color: color,
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
        transition: "transform 0.5s cubic-bezier(.17, .93, .38, 1)",
        zIndex: 9999999999,
      }}
    >
      <CursorImage />
      <CursorName name={name} color={color} />
    </div>
  );
};
