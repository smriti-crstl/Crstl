import React from "react";
import styled from "styled-components";

import { Spinner } from "@crstl/components/atoms/loading";

export const FullPageBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100999;
`;

const Backdrop = () => {
  return (
    <FullPageBackdrop>
      <Spinner />
    </FullPageBackdrop>
  );
};

export default Backdrop;

