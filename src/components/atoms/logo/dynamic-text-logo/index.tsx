import { ReactElement } from "react";
import styled from "styled-components";

import Crstl from "components/assets/svgs/logo.svg";

type DynamicTextLogoProps = {
  text?: string;
  imageHeight?: string;
};

const Wrapper = styled.div`
  min-height: 80px;
  max-width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.colors.RHINO};
`;

const Image = styled.img`
  padding-right: 8px;
`;

export const DynamicTextLogo = ({
  text,
  imageHeight = "40px",
}: DynamicTextLogoProps): ReactElement => {
  return (
    <Wrapper>
      <Image src={Crstl} alt="Crstl" height={imageHeight} />
      {text}
    </Wrapper>
  );
};
