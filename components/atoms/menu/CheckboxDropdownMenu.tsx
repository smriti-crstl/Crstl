import { Menu } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { ReactElement } from "react";
import { EmptyData } from "../empty";
import { MenuClearButton } from "./common/MenuClearButton";
import { MenuLoading } from "./common/MenuLoading";
import { MenuWrapper } from "./common/MenuWrapper";

export type CheckboxMenuConfigElement = {
  label: string;
  value: string;
};

type HandleStateChangeParams = {
  checked: boolean;
  value: string;
};

type CheckboxMenuConfig = {
  data: CheckboxMenuConfigElement[];
  onChange?: (x: { [x: string]: string | undefined }) => void;
  parentModule: string;
  controlledState?: string;
  isLoading?: boolean;
};

export const CheckboxMenu = ({
  data,
  onChange,
  parentModule,
  controlledState,
  isLoading,
}: CheckboxMenuConfig): ReactElement => {
  const menuState = controlledState?.split(",") || [];

  const handleStateChange = ({
    checked,
    value,
  }: HandleStateChangeParams): void => {
    if (onChange) {
      let newMenuState = null;
      if (checked) {
        newMenuState = [...menuState, value].join(",") || undefined;
      } else {
        newMenuState =
          menuState.filter((item) => item !== value).join(",") || undefined;
      }
      onChange({
        [parentModule]: newMenuState,
      });
    }
  };

  const handleClear = (): void => {
    if (onChange && controlledState) {
      onChange({ [parentModule]: undefined });
    }
  };

  if (isLoading) {
    return <MenuLoading />;
  }

  return (
    <MenuWrapper>
      <Menu selectedKeys={menuState || []}>
        {data.map(({ label, value }) => (
          <Menu.Item
            style={{ margin: 0, padding: 0, background: "inherit" }}
            key={value}
            data-testid={`${parentModule} ${value}`}
          >
            <Checkbox
              checked={menuState.includes(value)}
              style={{ width: "100%", padding: "0 16px" }}
              onChange={({ target: { checked } }) =>
                handleStateChange({ checked, value })
              }
            >
              {label}
            </Checkbox>
          </Menu.Item>
        ))}
        {data.length > 0 && (
          <MenuClearButton
            disabled={!controlledState}
            handleClear={handleClear}
          />
        )}
        {data.length === 0 && <EmptyData />}
      </Menu>
    </MenuWrapper>
  );
};
