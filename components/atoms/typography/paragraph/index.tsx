import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { TypographyWeights } from "@crstl/app/src/globals/themes/default/contract";

type Size = "14" | "16" | "18" | "12";

type ParagraphProps = {
  children: ReactNode;
  weight?: TypographyWeights;
  style?: React.CSSProperties;
  isDisabled?: boolean;
  size?: Size;
};

const StyledParagraph = styled.p<ParagraphProps>`
  font-weight: ${({ theme, weight = "REGULAR" }) =>
    theme.typography.WEIGHTS[weight]};
  color: ${({ isDisabled, theme }) =>
    isDisabled && theme.palette.text.DISABLED};
  font-size: ${({ size }) => size && size + "px"};
`;
export const Paragraph = ({
  children,
  ...rest
}: ParagraphProps): ReactElement => {
  return <StyledParagraph {...rest}>{children}</StyledParagraph>;
};
