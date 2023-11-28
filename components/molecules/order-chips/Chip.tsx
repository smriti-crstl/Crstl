import React, { ReactElement } from "react"

import { CheckOutlined, DownOutlined } from "@ant-design/icons"

type Props = {
  backgroundColor?: string
  textColor?: string
  value: string
  hideDropdown?: boolean
  chipWidth?: string
  chipStyles?: React.CSSProperties
  underline?: boolean
  onClick?: () => void
  showTick?: boolean
}

const ChipMemo = ({
  backgroundColor,
  textColor,
  value,
  hideDropdown,
  chipWidth,
  chipStyles = {},
  underline,
  onClick,
  showTick,
}: Props): ReactElement => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      style={{
        backgroundColor: backgroundColor || "#FFFFFF",
        color: textColor || "inherit",
        borderRadius: "200px",
        textAlign: "center",
        padding: "2px 8px",
        margin: "auto 0",
        fontWeight: 300,
        minWidth: chipWidth ? chipWidth : "2rem",
        border: "solid 1px #D9D9D9",
        minHeight: "1.5rem",
        display: "inline-block",
        ...chipStyles,
      }}
      onClick={onClick}
      onKeyUp={() => console.log("")}
    >
      <span
        style={{
          minWidth: "0.4rem",
          display: "inline-block",
          marginRight: hideDropdown ? "0" : "8px",
          textDecoration: underline ? "underline" : "",
        }}
      >
        {showTick && <CheckOutlined style={{ marginRight: "6px" }} />}
        {value}
      </span>
      {!hideDropdown && (
        <DownOutlined
          style={{
            color: backgroundColor ? "inherit" : "#D9D9D9",
            fontSize: "12px",
          }}
        />
      )}
    </span>
  )
}

export const Chip = React.memo(ChipMemo)
