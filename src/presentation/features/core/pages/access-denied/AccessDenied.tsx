import { Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import eyes from "@crstl/app/src/globals/assets/images/eyes_blinking_pause.gif";

const GlobalStyle = createGlobalStyle`
  .top-header {
    opacity: 0;
  }
`;

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const PageContainer = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;
  place-items: center;
`;

const PageContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EyesImage = styled.img`
  width: 400px;
  display: block;
  margin-bottom: 20px;
`;

function AccessDenied() {
  return (
    <PageWrapper>
      <GlobalStyle />
      <PageContainer>
        <PageContainerInner>
          <h1>Nothing to see here</h1>
          <EyesImage src={eyes} alt="eyes" />
          <Button href="/settings/profile-tab">Okay</Button>
        </PageContainerInner>
      </PageContainer>
    </PageWrapper>
  );
}

export { AccessDenied };
