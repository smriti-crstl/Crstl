import { List, ListProps } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { ClassNameConsumer } from "../../styled-class-consumer";

type Props = { elements?: ReactNode[] } & ListProps<{
  [p: string]: string | undefined | boolean;
}>;

const SimpleListChild = ({
  style,
  dataSource,
  elements,
  ...rest
}: Props): ReactElement => {
  return (
    <List style={{ width: "100%", ...style }} {...{ dataSource }} {...rest}>
      {elements?.map((item, index) => {
        return (
          <List.Item style={{ padding: "1rem" }} key={index}>
            {item}
          </List.Item>
        );
      })}
    </List>
  );
};

const StyledClassName = styled(ClassNameConsumer)`
  .ant-list-header {
    font-weight: ${({ theme }) => theme.typography.WEIGHTS.REGULAR};
    font-size: ${({ theme }) => theme.typography.SIZES.XS};
    padding: ${({ theme }) => theme.spacing.LARGE};
  }
  .ant-list-item {
    padding: ${({ theme }) => theme.spacing.LARGE};
  }
`;

export const SimpleList = (props: Props): ReactElement => (
  <StyledClassName>
    {(className) => <SimpleListChild {...props} className={className} />}
  </StyledClassName>
);
