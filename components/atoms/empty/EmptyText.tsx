import { ReactElement } from "react";
import styled from "styled-components";

const BoldText = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing.LARGE} calc(${theme.fixed.paddings.tabLeft} - 16px)`};
  font-weight: 500;
`;

export const EmptyText = ({ text }: { text: string }): ReactElement => {
  return <BoldText>{text}</BoldText>;
};
