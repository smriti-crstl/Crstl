import { ReactElement } from "react";
import styled from "styled-components";

import CrstlLogo from "components/assets/images/logo.png";

type ImageProps = {
  $height?: string;
  $isLarge?: boolean;
};
const Image = styled.img<ImageProps>`
  height: ${({ $height, theme }) => $height || theme.spacing.XL};
  height: ${({ $isLarge, theme }) => $isLarge && theme.spacing.XXXL};
`;

type Props = {
  image?: string;
  height?: string;
  isLarge?: boolean;
};

export const Logo = ({ height, isLarge, image }: Props): ReactElement => {
  return (
    <Image
      src={image || CrstlLogo}
      $height={height}
      $isLarge={isLarge}
      alt="Crstl Logo"
    />
  );
};
