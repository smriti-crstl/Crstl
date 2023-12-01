import { GenericLoading } from "components/atoms/loading";
import { GenericHeading } from "components/atoms/typography";
import { Divider } from "antd";
import { usePlaidIntegrationsListQuery } from "domain/interactors/integrations/plaid";
import styled from "styled-components";
import { ConnectedIntegrationsList } from "../connected/ConnectedIntegrationsList";

const Section = styled.div`
  margin-left: ${({ theme }) => theme.spacing.LARGE};
`;

function ConnectedAccountsSection() {
  const { isLoading, data, isFetching } = usePlaidIntegrationsListQuery();

  if (isLoading) {
    return (
      <div data-testid="Loading">
        <GenericLoading type="skeleton" />
      </div>
    );
  }

  return data?.length ? (
    <Section>
      <GenericHeading size="SM" weight="MEDIUM">
        Connected accounts
      </GenericHeading>
      <Divider style={{ margin: "1rem 0 0.5rem 0" }} />
      <GenericLoading type="spinner" spinnerProps={{ spinning: isFetching }}>
        <ConnectedIntegrationsList plaidIntegrations={data} />
      </GenericLoading>
    </Section>
  ) : null;
}

export { ConnectedAccountsSection };
