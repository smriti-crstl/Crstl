import { ReactElement, ReactNode } from "react";
import { CustomHeaderWithIcons } from "components/molecules/headers";
import { WaveFooter } from "components/molecules/footers/wave";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: ${({ theme }) => theme.palette.background.SECONDARY};
`;

const MainWrapper = styled.main`
  flex-grow: 1;
  padding: 4rem;
  display: flex;
  justify-content: center;
  > * {
    max-width: 40rem;
  }
`;

export const CenteredLayout = ({ children }: Props): ReactElement => {
  return (
    <CenteredWrapper>
      <CustomHeaderWithIcons text="Crstl" />
      <MainWrapper>{children}</MainWrapper>
      <WaveFooter />
    </CenteredWrapper>
  );
};
