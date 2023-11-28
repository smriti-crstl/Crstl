import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

type SubParagraphProps = {
  children: ReactNode;
  fontFamily?: string;
  style?: React.CSSProperties;
};

const StyledSubParagraph = styled.p<SubParagraphProps>`
  font-weight: normal;
  font-size: 14px;
  color: #acadb0;
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : "")};
`;

export const SubParagraph = ({
  children,
  ...rest
}: SubParagraphProps): ReactElement => {
  return <StyledSubParagraph {...rest}>{children}</StyledSubParagraph>;
};
