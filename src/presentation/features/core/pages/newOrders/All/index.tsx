import { PurchaseOrderStatusModelFE } from "domain/entity/orders/models";
import {
  useChannelsQuery,
  useOrganizationConfigQuery,
} from "domain/interactors/orders";
import { uniq } from "lodash";
import { CORE_ORDERS_V2, CORE_ORDERS_VIEW } from "globals/configs";
import { CoreRouteOrdersOptions } from "globals/configs/urls/constants";
import { SomethingWentWrong } from "presentation/features/common/error-pages/pages/something-went-wrong";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { parse } from "qs";
import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { generatePath, useHistory, useParams } from "react-router";

import { PurchaseOrderSummaryModel } from "@crstl/api/src/apis/models/PurchaseOrderSummary";
import { SimpleTable } from "@crstl/components/atoms/table";
import { ORDERS_TABLE_CONFIG } from "../../orders/config";
import { useFilteredOrdersSummary } from "../../newOrders/hooks/index";
import { getConfigFilterFields } from "../../orders/utils";
import { ORDER_COLUMN_FIELDS } from "../../orders/constants";
import { NewOrdersFilters } from "./orderFilters";

// TODO: Add Text Reservoir
// TODO: Create Search Input atom

export type ConfigFiltersState = {
  [p: string]: string;
};

export const NewOrdersAll = (): ReactElement => {
  const { search } = useLocation();
  const parsedObj = parse(search.slice(1));
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
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
    { isError, isFetching, totalCount },
  ] = useFilteredOrdersSummary(
    String(page),
    String(pageCount),
    configFiltersState?.status,
    configFiltersState?.invoiceStatus,
    configFiltersState?.deliveryStatus,
    configFiltersState?.paymentStatus,
    configFiltersState?.channelName,
    configFiltersState?.chargebackStatus
  );
  const [orderFilteredData, setOrderFilteredData] = useState(filteredData);
  useEffect(() => {
    if (Object.entries(configFiltersState)) {
      const values = Object.values(configFiltersState).join().split(",");
      const keys = Object.keys(configFiltersState).join().split(",");
      const dataFiltered: PurchaseOrderSummaryModel[] = [];
      filteredData.filter((order: PurchaseOrderSummaryModel) => {
        // This check will removed when we are getting chargebackstatus attribute in our response currently this is not there
        if (keys.includes("chargebackStatus")) {
          dataFiltered.push(order);
        }
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

  const { getZonedTime } = useTimestamp();

  const handlePaginationChange = (pageNumber: number): void => {
    setPage(pageNumber);
    const nextPath = generatePath(CORE_ORDERS_V2, {
      pageNumber: pageNumber,
      type: "all",
    });
    history.replace({ ...history.location, pathname: nextPath });
  };
  const handleSizeChange = (current: number, pageSize: number): void => {
    setPageCount(pageSize);
    setPage(current);
  };

  return (
    <div className="animate">
      <NewOrdersFilters
        configFilters={configFilters}
        orderDetailsLoading={isFetching}
        configFiltersState={configFiltersState}
        setConfigFiltersState={setConfigFiltersState}
        setPage={setPage}
      />
      {!isError ? (
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
            };
          }}
          loading={isFetching}
          rowSelection={{ type: "checkbox" }}
          dataSource={orderFilteredData}
          columns={ORDERS_TABLE_CONFIG(organizationConfigData, getZonedTime)}
          rowKey={(record) => record.id}
          scroll={{ x: 1600 }}
          pagination={{
            showSizeChanger: false,
            current: Number(page || 1),
            onChange: handlePaginationChange,
            onShowSizeChange: handleSizeChange,
            total: totalCount,
          }}
        />
      ) : (
        <SomethingWentWrong />
      )}
    </div>
  );
};
