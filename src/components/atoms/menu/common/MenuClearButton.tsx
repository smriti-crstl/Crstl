import { Menu } from "antd";
import { ReactElement } from "react";
import { UnderlinedButton } from "../../buttons/underlined-button";

export const MenuClearButton = ({
  disabled,
  handleClear,
}: {
  disabled: boolean;
  handleClear: () => void;
}): ReactElement => {
  return (
    <Menu>
      <Menu.Divider />
      <Menu.Item
        style={{
          padding: 0,
          background: "transparent",
          cursor: "default",
        }}
      >
        <UnderlinedButton disabled={disabled} onClick={handleClear}>
          Clear
        </UnderlinedButton>
      </Menu.Item>
    </Menu>
  );
};
