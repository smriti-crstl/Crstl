import {
  useNewOrdersSummaryQuery,
  // useShopifyOrdersCount,
} from "domain/interactors/newOrders";
import { useUserDetails } from "presentation/hooks/common";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { PurchaseOrderSummaryModel } from "models/PurchaseOrderSummary";

export const useFilteredOrdersSummary = (
  page?: string,
  pageCount?: string,
  orderStatus?: string,
  invoiceStatus?: string,
  deliveryStatus?: string,
  paymentStatus?: string,
  customer?: string,
  chargebackStatus?: string
): [
  PurchaseOrderSummaryModel[],
  {
    totalCount: number;
    isFetching: boolean;
    isError: boolean;
  }
] => {
  const [{ data }] = useUserDetails();
  const { search } = useLocation();
  const orgId = data?.organizationId;

  const {
    data: ordersSummaryData,
    isError,
    isFetching,
  } = useNewOrdersSummaryQuery(
    orgId || "",
    page,
    pageCount,
    orderStatus,
    invoiceStatus,
    deliveryStatus,
    paymentStatus,
    customer,
    chargebackStatus
  );
  const [filteredData, setFilteredData] = useState<PurchaseOrderSummaryModel[]>(
    []
  );
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // All manipulations will be done on result
    const result = ordersSummaryData ? [...ordersSummaryData.orders] : [];
    setFilteredData(result || []);
    setTotal(ordersSummaryData?.totalResults);
  }, [ordersSummaryData, search]);

  return [
    filteredData,
    {
      totalCount: total,
      isFetching: isFetching || !orgId,
      isError,
    },
  ];
};
