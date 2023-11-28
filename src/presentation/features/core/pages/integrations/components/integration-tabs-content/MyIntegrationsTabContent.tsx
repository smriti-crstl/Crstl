import styled from "styled-components";
import { IntegrationsTabContent } from "./IntegrationsTabContent";
import { IntegrationStatus } from "./IntegrationStatus";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 1340px) {
    flex-direction: row;
  }
`;

const IntegrationTabContentContainer = styled.div`
  flex: 1;
`;

const IntegrationStatusContainer = styled.div`
  flex: 1;
  margin-left: -12.5px;
  margin-right: -12.5px;

  @media (min-width: 1340px) {
    margin-left: 0;
    margin-right: 0;
    max-width: 600px;
  }
`;

function MyIntegrationsTabContent() {
  return (
    <Container>
      <IntegrationTabContentContainer>
        <IntegrationsTabContent />
      </IntegrationTabContentContainer>
      <IntegrationStatusContainer>
        <IntegrationStatus />
      </IntegrationStatusContainer>
    </Container>
  );
}

export { MyIntegrationsTabContent };
