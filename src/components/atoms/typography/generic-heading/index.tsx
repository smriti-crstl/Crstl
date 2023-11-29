import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { getSizeToElementMapping, Size, Weight } from "../utils";

type GenericHeadingProps = {
  children: ReactNode;
  size?: Size;
  weight?: Weight;
  style?: React.CSSProperties;
  $alignCenter?: boolean;
  $removeMargin?: boolean;
  className?: string;
};

const StyledHeading = styled.h1<GenericHeadingProps>`
  font-size: ${({ theme, size = "LG" }) => theme.typography.SIZES[size]};
  font-weight: ${({ theme, weight = "BOLD" }) =>
    theme.typography.WEIGHTS[weight]};
  text-align: ${({ $alignCenter }) => $alignCenter && "center"};
  margin: ${({ $removeMargin }) => $removeMargin && 0};
`;
export const SIZES = {
  small: "SM",
  extraSmall: "XS",
  doubleExtraSmall: "XXS",
  medium: "MD",
  large: "LG",
  extraLarge: "XL",
  doubleExtraLarge: "XXL",
  tripleExtraLarge: "XXXL",
};

export const WEIGHTS = {
  light: "LIGHT",
  regular: "REGULAR",
  medium: "MEDIUM",
  bold: "BOLD",
};
export const GenericHeading = ({
  children,
  size = "LG",
  weight = "BOLD",
  style = {},
  className,
  $alignCenter,
  $removeMargin,
}: GenericHeadingProps): ReactElement => {
  const htmlHeadingType = getSizeToElementMapping(size);
  return (
    <StyledHeading
      style={style}
      as={htmlHeadingType}
      size={size}
      weight={weight}
      $alignCenter={$alignCenter}
      $removeMargin={$removeMargin}
      className={className}
    >
      {children}
    </StyledHeading>
  );
};
