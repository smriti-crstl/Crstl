import { Select, SelectProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

// ===============Types=================
export type SingleSelectOptions = { label: string; value: string }[];

export interface ISingleSelectProps extends Omit<SelectProps<string>, "mode"> {
  options?: SingleSelectOptions;
}
// ==========Styled Components==========

const SelectContainer = styled.div``;

// ===============Views=================

export const SingleSelect = ({
  options,
  ...rest
}: ISingleSelectProps): ReactElement => {
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
