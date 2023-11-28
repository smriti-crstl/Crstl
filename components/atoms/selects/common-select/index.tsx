import { Select, SelectProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

// ===============Types=================
export type CommonSelectOptions = { label: string; value: string }[];

export interface ICommonSelectProps extends SelectProps<string> {
  options?: CommonSelectOptions;
}
// ==========Styled Components==========

const SelectContainer = styled.div``;

// ===============Views=================

export const CommonSelect = ({
  options,
  ...rest
}: ICommonSelectProps): ReactElement => {
  return (
    <SelectContainer>
      <Select
        {...{ options }}
        filterOption={(input, option) => {
          if (option?.label && typeof option.label === "string") {
            return (
              option?.label
                .toString()
                .toLowerCase()
                .indexOf(input.toString().toLowerCase()) >= 0
            );
          }
          return false;
        }}
        {...rest}
      />
    </SelectContainer>
  );
};
