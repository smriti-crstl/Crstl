import { Button } from "antd";
import React, { ReactElement } from "react";
import { DropdownWithVisibleOverlay } from "../../../atoms/dropdown";
import { DropdownButtonIcon } from "../../../atoms/icons";
import { CheckboxMenuConfigElement, CheckboxMenu } from "../../../atoms/menu";

export type DropdownMenuProps = {
  buttonText: string;
  menuConfig: CheckboxMenuConfigElement[];
  parentModule: string;
  onChange?: (x: { [x: string]: string | undefined }) => void;
  controlledState?: string;
  isLoading?: boolean;
};

const CheckboxDropdownMenuMemo = ({
  buttonText,
  menuConfig,
  onChange,
  controlledState,
  parentModule,
  isLoading,
}: DropdownMenuProps): ReactElement => {
  return (
    <DropdownWithVisibleOverlay
      menu={
        <CheckboxMenu
          data={menuConfig}
          onChange={onChange}
          controlledState={controlledState}
          parentModule={parentModule}
          isLoading={isLoading}
        />
      }
    >
      <Button>
        {buttonText} <DropdownButtonIcon />
      </Button>
    </DropdownWithVisibleOverlay>
  );
};

export const CheckboxDropdownMenu = React.memo(CheckboxDropdownMenuMemo);
