import { INTEGRATION_QUERY_KEYS } from "domain/interactors/integrations";
import { useUserDetails } from "presentation/hooks/common";
import { useCallback, useReducer } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

import { FluidWidthCard } from "components/atoms/card";
import { ResultModal } from "components/molecules/modals";
import { usePostIntegrationSearchParams } from "../../hooks/usePostIntegrationSearchParams";
import {
  InitialIntegrationState,
  IntegrationActionTypes,
  IntegrationsReducer,
} from "../../reducer";
import { generateIntegrationResultModalTextConstants } from "../../utils";
import { useIntegrationsList } from "./useIntegrationsList";
import { useViewResultModal } from "./useViewResultModal";
import { StyedTable } from "components/atoms/table";
import moment from "moment";
import { IntegrationStatusChip } from "./IntegrationStatusChip";
import { IntegrationStatusModel } from "models/v1/integration/IntegrationStatus";
import { useGetIntegrationStatus } from "domain/interactors/integrations";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { EmptyData } from "components/atoms/empty";
import { GenericLoading } from "components/atoms/loading";
import styled from "styled-components";
import { IntegrationStatusModelRes } from "domain/entity/integrations/models";

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const PageContainer = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-bottom: 56px;
`;

const StyledCardBody = styled.div`
  padding: 10px 20px;
  padding-bottom: 20px;
`;

const TableContainer = styled.div`
  font-size: 16px;
`;

const SourceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SourceImage = styled.img`
  width: 50px;
  margin-right: 20px;
`;

const columns = [
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
    render(source: string, tableRow: IntegrationStatusModelRes) {
      return (
        <SourceContainer>
          {tableRow.imageUrl ? (
            <SourceImage src={tableRow.imageUrl} alt="" />
          ) : null}
          {source}
        </SourceContainer>
      );
    },
  },
  {
    title: "First added",
    dataIndex: "firstAdded",
    key: "firstAdded",
    render(_: unknown, tableRow: IntegrationStatusModelRes) {
      const { addedBy, firstAddedAt } = tableRow;
      const safeAddedBy = addedBy.replace(/^-/, "");
      const formattedDate = moment(firstAddedAt).format("MMM DD, YYYY, h:mm A");
      if (safeAddedBy) {
        return (
          <p>
            {addedBy} on <br />
            {formattedDate}
          </p>
        );
      }
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Last reauthorized",
    dataIndex: "lastReauthorized",
    key: "lastReauthorized",
    render(_: unknown, tableRow: IntegrationStatusModelRes) {
      const { lastReAuthorizedAt, lastReAuthorizedBy } = tableRow;

      const safeLastReauthorizedAt = lastReAuthorizedAt?.replace(/^-/, "");
      const safeLastReauthorizedBy = lastReAuthorizedBy?.replace(/^-/, "");

      if (safeLastReauthorizedAt && safeLastReauthorizedBy) {
        const formattedDate = moment(lastReAuthorizedAt).format(
          "MMM DD, YYYY, h:mm A"
        );
        return (
          <p>
            {lastReAuthorizedBy} <br />
            {formattedDate}
          </p>
        );
      }

      return "N/A";
    },
  },
  {
    title: "Current Status",
    dataIndex: "currentStatus",
    key: "currentStatus",
    render(
      status: IntegrationStatusModel["currentStatus"],
      tableRow: IntegrationStatusModelRes
    ) {
      const title = status === "OK" ? "Active" : "Needs reauthorization";
      return (
        <IntegrationStatusChip
          value={title}
          status={status}
          integrationType={tableRow.integrationType}
        />
      );
    },
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdatedAt",
    key: "lastUpdatedAt",
    render(value: string) {
      if (!value) {
        return "N/A";
      }
      const date = moment(value);
      const fromNow = date.fromNow();
      const formattedDate = date.format("MMM D, hh:mmA");
      return (
        <div>
          {fromNow}
          <br />
          {formattedDate}
        </div>
      );
    },
  },
];

function IntegrationsDashboard() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [{ data: userData }] = useUserDetails();

  const [
    { serverIntegrations, isServerIntegrationsLoading },
  ] = useIntegrationsList(userData?.organizationId);

  const [
    {
      isFailure,
      isLoading: isIntegrationLoading,
      isSuccess,
      currentIntegrationSource,
    },
    dispatchIntegrationsAction,
  ] = useReducer(IntegrationsReducer, InitialIntegrationState);

  const resultProps = {
    isFailure: isFailure,
    isSuccess: isSuccess,
    isLoading: history.location.search
      ? isIntegrationLoading || isServerIntegrationsLoading
      : isIntegrationLoading,
  };

  const [isModalVisible, setIsModalVisible] = useViewResultModal({
    ...resultProps,
  });

  usePostIntegrationSearchParams({
    dispatchIntegrationsAction,
    serverIntegrations,
    organizationId: userData?.organizationId,
  });

  const onModalCancel = useCallback((): void => {
    setIsModalVisible(false);
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetCurrentIntegrationSource,
      payload: null,
    });
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsFailure,
      payload: false,
    });
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsSuccess,
      payload: false,
    });
    queryClient.invalidateQueries([
      INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
      userData?.organizationId,
    ]);
    history.replace(history.location.pathname);
  }, [userData?.organizationId, history, queryClient, setIsModalVisible]);

  const { data, isLoading, isError } = useGetIntegrationStatus();

  return (
    <PageWrapper>
      <PageContainer>
        <ResultModal
          maskClosable={false}
          showPartyPopper
          closable={false}
          texts={generateIntegrationResultModalTextConstants(
            currentIntegrationSource?.name || ""
          )}
          {...resultProps}
          open={isModalVisible}
          cancelCallback={onModalCancel}
        />
        <FluidWidthCard title="Integration status">
          <ErrorBoundary isError={isError}>
            <StyledCardBody>
              {!isLoading && data ? (
                data.length ? (
                  <TableContainer>
                    <StyedTable
                      dataSource={data}
                      columns={columns}
                      rowKey="source"
                      pagination={false}
                    />
                  </TableContainer>
                ) : (
                  <EmptyData />
                )
              ) : (
                <GenericLoading
                  type="spinner"
                  spinnerProps={{ "aria-label": "Loading" }}
                />
              )}
            </StyledCardBody>
          </ErrorBoundary>
        </FluidWidthCard>
      </PageContainer>
    </PageWrapper>
  );
}

export { IntegrationsDashboard };
