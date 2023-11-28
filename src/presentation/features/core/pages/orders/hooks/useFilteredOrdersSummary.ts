import {
  useOrdersSummaryQuery,
  // useShopifyOrdersCount,
} from "domain/interactors/orders";
import { useUserDetails } from "presentation/hooks/common";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { PurchaseOrderSummaryModel } from "@crstl/api/src/apis/models/PurchaseOrderSummary";

export const useFilteredOrdersSummary = (
  includeShopify: boolean,
  includeAmazon: boolean,
  includeB2B: boolean
): [
  PurchaseOrderSummaryModel[],
  {
    isFetching: boolean;
    isError: boolean;
  }
] => {
  const [{ data }] = useUserDetails();
  const { search } = useLocation();
  const [excludeShopify, setExcludeShopify] = useState("0");
  const [excludeAmazon, setExcludeAmazon] = useState("0");
  const [excludeB2B, setExcludeB2B] = useState("0");
  const orgId = data?.organizationId;
  useEffect(() => {
    setExcludeShopify(includeShopify ? "1" : "0");
  }, [includeShopify]);
  useEffect(() => {
    setExcludeAmazon(includeAmazon ? "1" : "0");
  }, [includeAmazon]);
  useEffect(() => {
    setExcludeB2B(includeB2B ? "1" : "0");
  }, [includeB2B]);
  const {
    data: ordersSummaryData,
    isError,
    isFetching,
  } = useOrdersSummaryQuery(
    orgId || "",
    excludeShopify,
    excludeAmazon,
    excludeB2B,
    {
      enabled: !!orgId,
    }
  );
  const [filteredData, setFilteredData] = useState<PurchaseOrderSummaryModel[]>(
    []
  );

  useEffect(() => {
    // All manipulations will be done on result
    const result = ordersSummaryData ? [...ordersSummaryData] : [];
    setFilteredData(result || []);
  }, [ordersSummaryData, search]);

  return [
    filteredData,
    {
      isFetching: isFetching || !orgId,
      isError,
    },
  ];
};
