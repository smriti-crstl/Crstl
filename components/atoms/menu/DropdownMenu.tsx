import { Menu, MenuProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

import { EmptyData } from "../empty";
import { MenuClearButton } from "./common/MenuClearButton";
import { MenuLoading } from "./common/MenuLoading";
import { MenuWrapper } from "./common/MenuWrapper";

type StyledProps = Omit<MenuProps, "onChange"> & {
  $showSelectionColor?: boolean;
  $dotColor?: string;
};

const MenuParent = styled(Menu)<StyledProps>`
  && .ant-menu-item-selected {
    background-color: #f5f5f5;
    color: inherit;
  }
  .ant-menu-item:hover {
    color: ${({ $showSelectionColor }) => $showSelectionColor && "inherit"};
  }
`;

const StyledDot = styled.span<StyledProps>`
  height: 8px;
  width: 8px;
  background-color: ${({ $dotColor }) => $dotColor};
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
`;

export type DropdownMenuProps = StyledProps & {
  data: { label: string; value: string; $dotColor?: string }[];
  parentModule: string;
  defaultSortingKey: string;
  controlledState?: string;
  isLoading?: boolean;
  onChange?: (x: { [x: string]: string | undefined }) => void;
  hideClear?: boolean;
};

export const DropdownMenu = ({
  data,
  controlledState,
  onChange,
  parentModule,
  defaultSortingKey,
  hideClear,
  isLoading,
}: DropdownMenuProps): ReactElement => {
  const handleClear = (): void => {
    if (onChange) {
      onChange({ [parentModule]: undefined });
    }
  };

  const handleOnSelect = (key: string): void => {
    if (onChange) {
      onChange({ [parentModule]: key });
    }
  };

  if (isLoading) {
    return <MenuLoading />;
  }

  // Only one controlled state because only one sorting can be applied at a time
  return (
    <MenuWrapper>
      <MenuParent
        selectedKeys={[controlledState || defaultSortingKey]}
        onSelect={({ key }) => handleOnSelect(key.toString())}
      >
        {data.map(({ label, value, $dotColor }) => {
          return (
            <Menu.Item
              style={{
                margin: 0,
                padding: "0 16px",
              }}
              key={value}
            >
              <StyledDot $dotColor={$dotColor} />
              {label}
            </Menu.Item>
          );
        })}
        {data.length > 0 && !hideClear && (
          <MenuClearButton
            disabled={!controlledState}
            handleClear={handleClear}
          />
        )}
        {data.length === 0 && <EmptyData />}
      </MenuParent>
    </MenuWrapper>
  );
};
