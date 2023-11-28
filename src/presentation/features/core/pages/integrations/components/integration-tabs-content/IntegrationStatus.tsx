import moment from "moment";
import { AnalyticsPaperCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { Table } from "antd";
import { useGetIntegrationStatus } from "domain/interactors/integrations";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import styled from "styled-components";
import { IntegrationStatusModel } from "@crstl/api/src/apis/models/v1/integration/IntegrationStatus";
import { IntegrationStatusChip } from "./IntegrationStatusChip";
import { ColumnsType } from "antd/lib/table";

const StyledCard = styled(AnalyticsPaperCard)`
  width: auto;
  margin-top: 0;
`;

const StyledCardBody = styled.div`
  padding: 5px;
  padding-top: 10px;
`;

const columns: ColumnsType<IntegrationStatusModel> = [
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
    align: "center",
  },
  {
    title: "Current Status",
    dataIndex: "currentStatus",
    key: "currentStatus",
    align: "center",
    render(
      status: IntegrationStatusModel["currentStatus"],
      tableRow: IntegrationStatusModel
    ) {
      const title = status === "OK" ? "Good" : "Needs reauthorization";
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
    align: "center",
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

function IntegrationStatus() {
  const { data, isLoading, isError } = useGetIntegrationStatus();
  return (
    <StyledCard title="Integration Status">
      <ErrorBoundary isError={isError}>
        <StyledCardBody>
          {!isLoading && data ? (
            data.length ? (
              <Table
                dataSource={data}
                columns={columns}
                size="small"
                rowKey="source"
                pagination={false}
              />
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
    </StyledCard>
  );
}

export { IntegrationStatus };
