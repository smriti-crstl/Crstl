import styled from "styled-components";

export const StyledHeader = styled.header<{ isDefault?: boolean }>`
  background: ${({ theme }) => theme.palette.colors.WHITE};
  color: ${({ theme }) => theme.palette.colors.BLACK};
  padding: ${({ theme }) => `${theme.spacing.SMALL} 28px`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme, isDefault }) =>
    !isDefault ? theme.fixed.heights.header : "64px"};
`;
