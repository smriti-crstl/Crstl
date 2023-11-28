/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from "react";
import styled from "styled-components";
import { useFlags } from "launchdarkly-react-client-sdk";

import { LIVE_TABS } from "../../config";
import { CustomDateRangePicker } from "../common";
import { useDateRange } from "presentation/hooks/contexts";
import { ShopifyInventoryTable } from "./Operations/ShopifyInventoryTable";
import { AmazonInventoryTable } from "./Operations/AmazonInventoryTable";
import { DeliveryStatusReports } from "./Operations/DeliveryStatus";
interface IAnalyticsTabWrapper {
  tabSelected?: string;
}

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const AnalyticsTabWrapper = styled.div<IAnalyticsTabWrapper>`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1444px;
  max-width: 100%;
  margin: 20px auto;
  padding: 0;
`;

const ShopifyInventoryTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const AmazonInventoryTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const DeliveryStatusReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-end: span 4;
  width: 50%;
`;

const OperationsReport = (): ReactElement => {
  const { datesSelected, changeDates } = useDateRange();

  const flags = useFlags();

  return (
    <PageWrapper>
      <AnalyticsTabWrapper>
        {flags.shopifyInventoryLevels && (
          <ShopifyInventoryTableContainer>
            <ShopifyInventoryTable />
          </ShopifyInventoryTableContainer>
        )}
        {flags.amazonInventoryLevels && (
          <AmazonInventoryTableContainer>
            <AmazonInventoryTable />
          </AmazonInventoryTableContainer>
        )}
        {flags.deliveryStatus && (
          <DeliveryStatusReportsContainer>
            <DeliveryStatusReports />
          </DeliveryStatusReportsContainer>
        )}
      </AnalyticsTabWrapper>
    </PageWrapper>
  );
};

export { OperationsReport };
