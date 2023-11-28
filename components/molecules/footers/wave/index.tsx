import React, { ReactElement } from "react";
import styled from "styled-components";
import Wave from "@crstl/components/assets/images/wave.png";

const StyledWave = styled.img`
  height: 10rem;
  width: 100%;
  object-fit: cover;
  object-position: top;
`;

export const WaveFooter = (): ReactElement => {
  return (
    <footer>
      <StyledWave src={Wave} />
    </footer>
  );
};
