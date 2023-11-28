import { ReactElement } from "react";
import styled from "styled-components";

import { HrSectionOne } from "./hr-section-one";

const SectionOneWrapper = styled.div`
  min-height: 580px;
`;

export const HomeSections = (): ReactElement => {
  return (
    <SectionOneWrapper>
      <HrSectionOne />
    </SectionOneWrapper>
  );
};
