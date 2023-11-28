import { Tag, TagProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

const TagWrapper = styled(Tag)`
  font-size: 14px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.palette.greyScale[300]};
  align-items: center;
  margin: 4px 4px 4px 4px;
  > * {
    margin-bottom: 2px;
    font-size: 12px;
  }
`;

export const SimpleTag = (props: TagProps): ReactElement => {
  return <TagWrapper {...props} />;
};
