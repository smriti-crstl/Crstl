import { ReactElement } from "react";
import styled from "styled-components";

import { HomeAccountInformation } from "../../../account-information";

const SectionTwoWrapper = styled.div`
  background-color: #f9f9f9;
  border-radius: 21px;
  height: 100%;
`;

export const HrSectionOneVrSectionTwo = (): ReactElement => {
  return (
    <SectionTwoWrapper>
      <HomeAccountInformation />
    </SectionTwoWrapper>
  );
};
