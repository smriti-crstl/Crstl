import { ReactElement } from "react";
import styled from "styled-components";

import { WelcomeModal } from "../orders/components/common/WelcomeModal";
import { HomeSections } from "./components/sections";

const HomeWrapper = styled.div`
  margin: 1rem;
`;

const CoreHome = (): ReactElement => {
  return (
    <HomeWrapper>
      <WelcomeModal />
      <HomeSections />
    </HomeWrapper>
  );
};

export default CoreHome;
