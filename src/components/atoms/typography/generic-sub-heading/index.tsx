import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { getSizeToElementMapping, Size, Weight } from "../utils";

type GenericSubHeadingProps = {
  children: ReactNode;
  size?: Size;
  weight?: Weight;
  style?: React.CSSProperties;
  isGreyDisabled?: boolean;
  $removeMargin?: boolean;
};

const StyledHeading = styled.h1<GenericSubHeadingProps>`
  font-size: ${({ theme, size = "SM" }) => theme.typography.SIZES[size]};
  font-weight: ${({ theme, weight = "MEDIUM" }) =>
    theme.typography.WEIGHTS[weight]};
  color: ${({ theme, isGreyDisabled }) =>
    !isGreyDisabled && theme.palette.text.DISABLED};
  margin: ${({ $removeMargin }) => $removeMargin && 0};
`;

export const GenericSubHeading = ({
  children,
  size = "SM",
  weight = "MEDIUM",
  style = {},
  isGreyDisabled,
  $removeMargin,
}: GenericSubHeadingProps): ReactElement => {
  const htmlHeadingType = getSizeToElementMapping(size);
  return (
    <StyledHeading
      style={style}
      as={htmlHeadingType}
      size={size}
      weight={weight}
      isGreyDisabled={isGreyDisabled}
      $removeMargin={$removeMargin}
    >
      {children}
    </StyledHeading>
  );
};
