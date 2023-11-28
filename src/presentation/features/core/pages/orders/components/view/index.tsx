import { ReactElement } from "react";
import styled from "styled-components";

import { OrderViewSections } from "./sections";

// Keeping this code as reference to implement TopBar

// const TopBar = styled(Row)`
//   ${TopBarWrapperCss}
//   box-shadow: 0px 7px 10px -3px #d4d9e4;
// `;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.MEDIUM};
`;

const CoreOrdersView = (): ReactElement => {
  return (
    <>
      <Wrapper>
        <OrderViewSections />
      </Wrapper>
    </>
  );
};

export default CoreOrdersView;
