import { ReactElement } from "react";
import styled from "styled-components";

import { Logo } from "@crstl/components/atoms/logo";

const StyledHeader = styled.header<{ isDefault?: boolean }>`
  background: ${({ theme }) => theme.palette.base.SECONDARY};
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  padding: ${({ theme }) => `${theme.spacing.SMALL} ${theme.spacing.MEDIUM}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme, isDefault }) =>
    !isDefault ? theme.fixed.heights.header : "64px"};
`;

export const PlainHeader = (): ReactElement => {
  return (
    <StyledHeader isDefault>
      <Logo />
    </StyledHeader>
  );
};
