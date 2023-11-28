/* eslint-disable jsx-a11y/anchor-is-valid */
import { Select } from "antd";

const { Option } = Select;

export const DyDropdown = (props: any) => {
  return (
    <Select
      value={props.value}
      placeholder="Click to choose"
      onChange={props.onChange}
    >
      {props.options?.map((option: any, index: number) => (
        <Option value={option.code} key={index}>
          {option.code}
        </Option>
      ))}
    </Select>
  );
};
