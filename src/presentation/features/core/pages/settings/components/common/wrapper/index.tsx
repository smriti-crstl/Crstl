import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  width?: string;
};

type WrapperProps = {
  $width?: string;
};

const Wrapper = styled.div<WrapperProps>`
  width: ${({ $width }) => $width || "20rem"};
  min-height: 20rem;
  margin-bottom: ${({ theme }) => theme.spacing.XL};
  padding-top: ${({ theme }) => theme.spacing.TOP};
`;

export const SettingsTabsWrapper = ({
  children,
  width,
}: Props): ReactElement => {
  return (
    <Wrapper $width={width} className="animate">
      {children}
    </Wrapper>
  );
};
