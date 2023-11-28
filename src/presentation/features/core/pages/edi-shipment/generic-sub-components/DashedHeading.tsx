import React from "react";
import styled from "styled-components";

function GenericDashedHeading({ children }: { children: React.ReactNode; }) {
  const StyledH2 = styled.h2`
    text-align: center;
    border-bottom: 1px dashed #000;
    line-height: 0.1em;
    margin: 10px 0 20px;

    span {
      background: #fff;
      padding: 0 10px;
    }
  `;

  return (
    <StyledH2>
      <span>{children}</span>
    </StyledH2>
  );
}

export { GenericDashedHeading };
