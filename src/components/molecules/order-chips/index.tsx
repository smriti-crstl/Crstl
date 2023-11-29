import { Spin } from "antd";
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Dispatch, ReactElement, SetStateAction } from "react";

import { DropdownWithVisibleOverlay } from "@crstl/components/atoms/dropdown";

import { DropdownMenu } from "../../atoms/menu";
import { Chip } from "./Chip";

type OrderChipsTypes = {
  configArray:
    | { status: string; backgroundColor: string; textColor: string }[]
    | undefined;
  value: string;
  onChange: ((x: { [x: string]: string | undefined }) => void) | undefined;
  parentModule: string;
  isDropdownVisible?: boolean;
  setIsDropdownVisible?: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
};

const OrderChipsMemo = ({
  configArray,
  value,
  onChange,
  parentModule,
  isDropdownVisible,
  setIsDropdownVisible,
  isLoading,
}: OrderChipsTypes): ReactElement => {
  const obj = configArray?.find((item) => item.status === value);
  return (
    <span
      style={{ cursor: "pointer" }}
      onClick={(e) => e.stopPropagation()}
      onKeyPress={(e) => e.stopPropagation()}
    >
      <Spin spinning={isLoading || false}>
        <DropdownWithVisibleOverlay
          isVisibleControlled={isDropdownVisible}
          setIsDropdownVisible={setIsDropdownVisible}
          menu={
            <DropdownMenu
              data={
                configArray?.map((item) => {
                  return {
                    label: item.status,
                    value: item.status,
                    $dotColor: item.backgroundColor,
                  };
                }) || []
              }
              onChange={onChange}
              parentModule={parentModule}
              defaultSortingKey=""
              hideClear
              $showSelectionColor={true}
            />
          }
        >
          <span>
            <Chip
              {...{
                backgroundColor: obj?.backgroundColor,
                textColor: obj?.textColor,
                value,
              }}
            />
          </span>
        </DropdownWithVisibleOverlay>
      </Spin>
    </span>
  );
};

const OrderChips = React.memo(OrderChipsMemo);

export { OrderChips };
