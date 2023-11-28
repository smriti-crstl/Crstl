import styled from "styled-components";
import { Select } from "antd";
import { DataSources } from "presentation/features/common/components/DataSources";
import moment from "moment";
import { Metadata } from "domain/entity/shared/models/metadata";
import { DownloadButtonContainer } from "../analytics/components/common/ExcelExport/csv.styles";
import { ExcelExport } from "../analytics/components/common/ExcelExport";
import { CSV_FILE_NAME } from "../orders/constants";
import { CSV_CONFIG } from "../analytics/components/common/ExcelExport/csv.config";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 960px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const HeaderTitle = styled.div`
  margin-bottom: 10px;

  @media (min-width: 960px) {
    margin-bottom: 0;
  }
`;

const HeaderFormControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media (min-width: 960px) {
    width: auto;
  }
`;

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.palette.text.HINT};
`;

interface Props {
  title: string;
  lastUpdatedAt?: string | null;
  metadata?: Metadata["metadata"];
  onDateRangeChange: (value: string) => void;
  data?: any;
  source?: string;
}

function MarketingHeader({
  title,
  lastUpdatedAt,
  metadata,
  onDateRangeChange,
  data,
  source,
}: Props) {
  const loadCsvData = () => {
    const finalData: {
      metric: string;
      value: number | null;
      change: string | number;
    }[] = [];
    data?.map((row: any) =>
      finalData.push({
        metric: row.label,
        value: row.value,
        change: row.change,
      })
    );
    return JSON.parse(JSON.stringify(finalData));
  };

  return (
    <HeaderContainer>
      <HeaderTitle>
        <span>{title}</span>
        {lastUpdatedAt ? (
          <StyledTimeSpan>
            Last updated {moment(lastUpdatedAt).fromNow()}
          </StyledTimeSpan>
        ) : null}
      </HeaderTitle>
      <HeaderFormControls>
        <Select
          defaultValue="d7"
          style={{ width: 130 }}
          onChange={onDateRangeChange}
        >
          <Select.Option value="d1">Today</Select.Option>
          <Select.Option value="d7">Last 7 days</Select.Option>
          <Select.Option value="d30">Last 30 days</Select.Option>
          <Select.Option value="d60">Last 60 days</Select.Option>
          <Select.Option value="d90">Last 90 days</Select.Option>
        </Select>
        <DownloadButtonContainer>
          <ExcelExport
            csvData={loadCsvData()}
            fileName={`${source} ${CSV_FILE_NAME.ADS_METRICS}`}
            config={CSV_CONFIG.ADS_METRICS}
            showDateSelection
            style={{ marginLeft: "16px" }}
          />
          {metadata ? <DataSources metadata={metadata} /> : null}
        </DownloadButtonContainer>
      </HeaderFormControls>
    </HeaderContainer>
  );
}

export { MarketingHeader };
