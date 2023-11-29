import { Button } from "antd";
import React, { ReactElement } from "react";

import { DropdownWithVisibleOverlay } from "../../../atoms/dropdown";
import { DropdownButtonIcon } from "../../../atoms/icons";
import { CheckboxMenuConfigElement, DropdownMenu } from "../../../atoms/menu";

export type SimpleDropdownMenuProps = {
  buttonText: string;
  menuConfig: CheckboxMenuConfigElement[];
  parentModule: string;
  defaultSortingKey: string;
  onChange?: (x: { [x: string]: string | undefined }) => void;
  controlledState?: string;
  isLoading?: boolean;
  hideClear?: boolean;
};

const SimpleDropdownMenuMemo = ({
  buttonText,
  menuConfig,
  onChange,
  controlledState,
  parentModule,
  isLoading,
  defaultSortingKey,
  hideClear,
}: SimpleDropdownMenuProps): ReactElement => {
  return (
    <DropdownWithVisibleOverlay
      menu={
        <DropdownMenu
          data={menuConfig}
          onChange={onChange}
          controlledState={controlledState}
          parentModule={parentModule}
          isLoading={isLoading}
          defaultSortingKey={defaultSortingKey}
          hideClear={hideClear}
        />
      }
    >
      <Button>
        {buttonText} <DropdownButtonIcon />
      </Button>
    </DropdownWithVisibleOverlay>
  );
};

export const SimpleDropdownMenu = React.memo(SimpleDropdownMenuMemo);
