import { ReactElement } from "react";
import { DynamicTextLogo } from "../../../atoms/logo";
import { HeaderIconProps, HeaderIcons } from "../../icon-groups";
import styled from "styled-components";

export const StyledHeader = styled.header<{ isDefault?: boolean }>`
  background: ${({ theme }) => theme.palette.base.SECONDARY};
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  padding: ${({ theme }) => `${theme.spacing.SMALL} ${theme.spacing.MEDIUM}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme, isDefault }) =>
    !isDefault ? theme.fixed.heights.header : "64px"};
`;

type CustomHeaderWithIconsProps = {
  text?: string;
  data?: HeaderIconProps[];
};

export const CustomHeaderWithIcons = ({
  text,
  data,
}: CustomHeaderWithIconsProps): ReactElement => {
  return (
    <StyledHeader isDefault>
      <DynamicTextLogo text={text} />
      <HeaderIcons data={data} />
    </StyledHeader>
  );
};
