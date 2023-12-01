import { PurchaseOrderStatusModelFE } from "domain/entity/orders/models";
import {
  useChannelsQuery,
  useOrganizationConfigQuery,
} from "domain/interactors/orders";
import { uniq } from "lodash";
import { CORE_ORDERS, CORE_ORDERS_VIEW } from "globals/configs";
import { CoreRouteOrdersOptions } from "globals/configs/urls/constants";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { parse } from "qs";
import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { generatePath, useHistory, useParams } from "react-router";
import { PurchaseOrderSummaryModel } from "models/PurchaseOrderSummary";
import { SimpleTable } from "components/atoms/table";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import {
  ORDERS_EXCLUDE_COLUMNS_SHOPIFY_AMAZON,
  ORDERS_EXCLUDE_FILTERS_SHOPIFY_AMAZON,
  ORDERS_SOURCE,
  ORDERS_TABLE_CONFIG,
  ORDER_TABLE_TO_FILTER_CONSTANTS,
} from "../../config";
import { useFilteredOrdersSummary } from "../../hooks/useFilteredOrdersSummary";
import { getConfigFilterFields } from "../../utils";
import { OrdersFilters } from "../common/OrderFilters";
import { ORDERS_FILE_NAME, ORDER_COLUMN_FIELDS } from "../../constants";
import { ExcelExport } from "../../../analytics/components/common/ExcelExport";
import {
  CSV_CONFIG,
  CSV_DATE_FORMAT,
} from "../../../analytics/components/common/ExcelExport/csv.config";
import { DownloadButtonContainer } from "../../../analytics/components/common/ExcelExport/csv.styles";
import moment from "moment";

// TODO: Add Text Reservoir
// TODO: Create Search Input atom

export type ConfigFiltersState = {
  [p: string]: string;
};

export const OrdersAll = (): ReactElement => {
  const { search } = useLocation();
  const parsedObj = parse(search.slice(1));
  const [includeShopify, setIncludeShopify] = useState(false);
  const [includeAmazon, setIncludeAmazon] = useState(false);
  const [includeB2B, setIncludeB2B] = useState(false);
  const [
    configFiltersState,
    setConfigFiltersState,
  ] = useState<ConfigFiltersState>(
    (): ConfigFiltersState => {
      if (parsedObj) {
        return { ...parsedObj } as ConfigFiltersState;
      } else {
        return {};
      }
    }
  );
  const { type: orderPageType } = useParams<{ type: CoreRouteOrdersOptions }>();
  const history = useHistory();
  const { pageNumber, source } = useParams<{
    pageNumber: string;
    source: string;
  }>();

  // Fetch Channels
  const {
    data: channelsData,
    isFetching: isChannelsLoading,
  } = useChannelsQuery();

  // Fetch Organization Config
  const {
    data: organizationConfigData,
    isFetching: isOrganizationConfigLoading,
  } = useOrganizationConfigQuery({ staleTime: Infinity });

  // This function is responsible for generating filter menu configs from Channels and Config API data
  const configFilters = getConfigFilterFields({
    configObj: organizationConfigData,
    channelsData,
    isOrganizationConfigLoading,
    isChannelsLoading,
  });

  // This hook is responsible for sorting and filtering the orders on Frontend
  const [
    filteredData,
    {
      isError,
      isFetching,
      // numberOfShopifyRecords,
      // isCountSuccess,
      // isCountFetching,
    },
  ] = useFilteredOrdersSummary(includeShopify, includeAmazon, includeB2B);
  const [orderFilteredData, setOrderFilteredData] = useState(filteredData);
  useEffect(() => {
    if (Object.entries(configFiltersState)) {
      const values = Object.values(configFiltersState).join().split(",");
      const keys = Object.keys(configFiltersState).join().split(",");
      const dataFiltered: PurchaseOrderSummaryModel[] = [];

      filteredData.filter((order: PurchaseOrderSummaryModel) => {
        const orderKey = Object.keys(order);
        const orderValue = Object.values(order);
        orderKey?.filter((orderKeys) => {
          if (keys.includes(orderKeys)) {
            orderValue.filter((orderValues) => {
              if (values.includes(orderValues)) {
                if (orderValues.toLowerCase() === "open") {
                  if (
                    orderKeys === ORDER_COLUMN_FIELDS.CHARGEBACK_STATUS &&
                    order.chargebackStatus === "Open"
                  ) {
                    dataFiltered.push(order);
                  }
                  if (
                    orderKeys === ORDER_COLUMN_FIELDS.ORDER_STATUS &&
                    order.status === "Open"
                  ) {
                    dataFiltered.push(order);
                  }
                  if (
                    orderKeys === ORDER_COLUMN_FIELDS.INVOICE_STATUS &&
                    order.invoiceStatus === "Open"
                  ) {
                    dataFiltered.push(order);
                  }
                } else {
                  dataFiltered.push(order);
                }
              }
            });
          }
        });
      });

      dataFiltered.length > 0
        ? setOrderFilteredData(uniq(dataFiltered))
        : Object.keys(configFiltersState).length > 0
        ? setOrderFilteredData([])
        : setOrderFilteredData(filteredData);
    }
  }, [configFiltersState, filteredData]);

  useEffect(() => {
    if (source === ORDERS_SOURCE.SHOPIFY) {
      setIncludeShopify(true);
      setIncludeAmazon(false);
      setIncludeB2B(false);
    } else if (source === ORDERS_SOURCE.AMAZON) {
      setIncludeAmazon(true);
      setIncludeB2B(false);
      setIncludeShopify(false);
    } else if (source === ORDERS_SOURCE.B2B) {
      setIncludeB2B(true);
      setIncludeAmazon(false);
      setIncludeShopify(false);
    }
  }, [source]);

  const { getZonedTime } = useTimestamp();

  const handlePaginationChange = (pageNumber: number): void => {
    const nextPath = generatePath(CORE_ORDERS, {
      pageNumber: pageNumber,
      type: "all",
      source: source ? source : CoreRouteOrdersOptions.SHOPIFY,
    });
    history.replace({ ...history.location, pathname: nextPath });
  };

  const filterColumnsBySource = () => {
    if (!includeShopify && !includeAmazon) {
      return ORDERS_TABLE_CONFIG(organizationConfigData, getZonedTime);
    } else {
      return ORDERS_TABLE_CONFIG(organizationConfigData, getZonedTime).filter(
        (column) =>
          column.title !== ORDERS_EXCLUDE_COLUMNS_SHOPIFY_AMAZON.INVOICE &&
          column.title !== ORDERS_EXCLUDE_COLUMNS_SHOPIFY_AMAZON.PAYMENT &&
          column.title !== ORDERS_EXCLUDE_COLUMNS_SHOPIFY_AMAZON.CHARGEBACK
      );
    }
  };

  const getFiltersBySource = () => {
    if (!includeShopify && !includeAmazon) {
      return configFilters;
    } else {
      return configFilters.filter(
        (filter) =>
          filter.parentModule !==
            ORDERS_EXCLUDE_FILTERS_SHOPIFY_AMAZON.INVOICE_STATUS &&
          filter.parentModule !==
            ORDERS_EXCLUDE_FILTERS_SHOPIFY_AMAZON.CHARGEBACK_STATUS &&
          filter.parentModule !==
            ORDERS_EXCLUDE_FILTERS_SHOPIFY_AMAZON.PAYMENT_STATUS &&
          filter.parentModule !== ORDER_TABLE_TO_FILTER_CONSTANTS.CHANNEL_NAME
      );
    }
  };

  const loadCsv = () => {
    const csvData = JSON.parse(JSON.stringify(filteredData));

    csvData.map((row: any) => {
      row.receivedAt = moment(row.receivedAt).format(CSV_DATE_FORMAT);
    });
    return JSON.parse(JSON.stringify(csvData));
  };

  return (
    <div className="animate">
      {isFetching && (
        <div hidden data-testid="loading" aria-label="loading"></div>
      )}
      <DownloadButtonContainer>
        <OrdersFilters
          // numberOfShopifyRecords={numberOfShopifyRecords}
          configFilters={getFiltersBySource()}
          orderDetailsLoading={isFetching}
          configFiltersState={configFiltersState}
          setConfigFiltersState={setConfigFiltersState}
          setIncludeShopify={setIncludeShopify}
          includeShopify={includeShopify}
          includeAmazon={includeAmazon}
          setIncludeAmazon={setIncludeAmazon}
          // isCountSuccess={isCountSuccess}
          // isCountFetching={isCountFetching}
        />
        <ExcelExport
          style={{
            marginBottom: "24px",
            marginTop: "46px",
          }}
          csvData={loadCsv()}
          fileName={ORDERS_FILE_NAME[source as keyof typeof ORDERS_FILE_NAME]}
          config={
            !includeShopify && !includeAmazon
              ? CSV_CONFIG.ORDERS_B2B
              : CSV_CONFIG.ORDERS
          }
        />
      </DownloadButtonContainer>
      <ErrorBoundary isError={isError}>
        <>
          <SimpleTable<PurchaseOrderSummaryModel>
            onRow={(record) => {
              return {
                onClick: () => {
                  history.push(
                    generatePath(CORE_ORDERS_VIEW, {
                      id: record.id,
                      type: orderPageType,
                    })
                  );
                },
                style: {
                  cursor: "pointer",
                  fontWeight:
                    record.status === PurchaseOrderStatusModelFE.Open
                      ? 600
                      : "inherit",
                },
                "data-testid": record.id,
              };
            }}
            loading={isFetching}
            rowSelection={{ type: "checkbox" }}
            dataSource={orderFilteredData}
            columns={filterColumnsBySource()}
            rowKey={(record) => record.id}
            scroll={{ x: 1600 }}
            pagination={{
              showSizeChanger: false,
              current: Number(pageNumber || 1),
              onChange: handlePaginationChange,
              itemRender: function PaginationButton(page, type, children) {
                const testId = type === "page" ? `${type}-${page}` : type;
                return React.cloneElement(children as React.ReactElement, {
                  "data-testid": `pagination-button-${testId}`,
                });
              },
            }}
          />
        </>
      </ErrorBoundary>
    </div>
  );
};
