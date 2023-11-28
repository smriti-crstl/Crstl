import { Select, SelectProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

// ===============Types=================

export type MultiTagsSelectOptions = { label: string; value: string }[];

type SelectContainerProps = {
  showMultipleLines: boolean;
};

export interface IMultiTagsSelectProps
  extends Omit<SelectProps<string>, "mode"> {
  options?: MultiTagsSelectOptions;
  containerProps?: SelectContainerProps;
}

// ==========Styled Components==========

const SelectContainer = styled.div<SelectContainerProps>`
  .ant-select-selector {
    min-height: ${({ showMultipleLines }) => showMultipleLines && "4rem"};
    display: block;
    ::after {
      content: none;
    }
  }
`;

// ===============Views=================

export const MultiTagsSelect = ({
  options,
  containerProps,
  ...rest
}: IMultiTagsSelectProps): ReactElement => {
  return (
    <SelectContainer showMultipleLines={!!containerProps?.showMultipleLines}>
      <Select
        options={options}
        mode="tags"
        style={{ width: "100%" }}
        {...rest}
      />
    </SelectContainer>
  );
};
