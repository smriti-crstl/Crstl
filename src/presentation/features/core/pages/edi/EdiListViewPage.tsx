import { Popover, Tooltip } from "antd";
import { DocumentListRow } from "domain/entity/edi/models";
import {
  useGetOrdersSummaryCountQuery,
  useGetPurchaseOrderErrorsQuery,
  usePutUpdateOrderState,
  useSearchOrdersQuery,
} from "domain/interactors/edi";
import { useGetTradingPartners } from "domain/interactors/shared";
import {
  CORE_EDI_GROCERY_PURCHASE_ORDER,
  CORE_EDI_LIST_WITH_PARAMS,
  CORE_EDI_PURCHASE_ORDER,
} from "globals/configs";
import _, { cloneDeep, compact, toNumber } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { amplitude } from "presentation/utils";
import React, { useContext, useEffect, useState } from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { ThemeContext } from "styled-components";

import {
  FilterFilled,
  LoadingOutlined,
  SelectOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Spinner } from "@crstl/components/atoms/loading";
import { SimpleTable } from "@crstl/components/atoms/table";
import { Chip } from "@crstl/components/molecules/order-chips/Chip";
import { PageWrapper } from "@crstl/components/molecules/page";

import DownloadCSV from "./Download/DownloadCSV";
import { blankObject, poCsvConfig } from "./Edi.config";
import { createTitle, exportToCsv, getTpfName } from "./edi.utils";
import {
  ColouredDot,
  Label,
  LabelContainer,
  OrderIdContainer,
  StyledToolTipContainer,
  ToolTipTitleContainer,
} from "./EdiListViewPage.styles";
import EDISummaryTabs from "./EDISummaryTabs/EdiSummaryTabs";
import { useDownloadShipmentDocs } from "./Download/DownloadShipmentDocs/hooks/useDownloadShipmentDocs";
import { DownloadShipmentDocs } from "./Download/DownloadShipmentDocs/DownloadShipmentDocs";

export const EDI_LIST_VIEW_TABLE_DATA_INDEXES: Record<
  | "ORDER_ID"
  | "ORDER_DATE"
  | "TOTAL"
  | "LABEL_COUNT"
  | "ORDER_STATUS"
  | "DELIVERY_STATUS"
  | "INVOICING_STATUS"
  | "PAYMENT_STATUS"
  | "CHARGEBACK_STATUS"
  | "SOURCE"
  | "TRADING_PARTNER_ID"
  | "TRADING_PARTNER"
  | "TRADING_PARTNER_FLAVOR"
  | "SHIP_NOTICE",
  any
> = {
  ORDER_ID: "orderId",
  ORDER_DATE: "messageTimestamp",
  TOTAL: "orderTotal",
  LABEL_COUNT: "labelCount",
  ORDER_STATUS: "orderState",
  DELIVERY_STATUS: "deliveryState",
  INVOICING_STATUS: "invoiceState",
  PAYMENT_STATUS: "paymentState",
  CHARGEBACK_STATUS: "chargebackState",
  SOURCE: "source",
  TRADING_PARTNER_ID: "tradingPartnerId",
  TRADING_PARTNER: "tradingPartner",
  TRADING_PARTNER_FLAVOR: "tradingPartnerFlavor",
  SHIP_NOTICE: "asnState",
};

const OrderStatuses = [
  {
    title: "New",
    color: "rgba(78, 99, 248, 1)",
  },
  {
    title: "Open",
    color: "rgba(206, 156, 27, 1)",
  },
  {
    title: "Acknowledged",
    color: "rgba(24, 144, 255, 1)",
  },
  {
    title: "PO Change",
    color: "rgba(255, 0, 0, 1)",
  },
  {
    title: "Completed",
    color:
      "linear-gradient(97.1deg, #35BFB7 -3.64%, #34A853 59.48%, #59A834 94.45%)",
  },
  {
    title: "Cancelled",
    color: "rgba(0, 0, 0, 1)",
  },
];

const DeliveryStatuses = [
  {
    title: "Pre-Transit",
    color: "#F2C94C",
  },
  {
    title: "In-Transit",
    color: "#F2C94C",
  },
  {
    title: "Out for Delivery",
    color: "#1890FF",
  },
  {
    title: "Available for Pickup",
    color: "#9FE4E0",
  },
  {
    title: "Return to Sender",
    color: "#A15FFF",
  },
  {
    title: "Delivered",
    color: "#34A853",
  },
  {
    title: "Failure",
    color: "#FF0000",
  },
  {
    title: "Cancelled",
    color: "#000000",
  },
  {
    title: "Unfulfilled",
    color: "#948577",
  },
];

const InvoiceStatuses = [
  {
    title: "Draft",
    color: "rgba(255, 128, 0, 1)",
  },
  {
    title: "Queued",
    color: "rgba(24, 144, 255, 1)",
  },
  {
    title: "Sent",
    color: "rgba(52, 168, 83, 1)",
  },
  {
    title: "Send Failed",
    color: "rgba(255, 0, 0, 1)",
  },
  {
    title: "Accepted",
    color:
      "linear-gradient(97.1deg, #35BFB7 -3.64%, #34A853 59.48%, #59A834 94.45%)",
  },
  {
    title: "Rejected",
    color: "#000000",
  },
];

const ShipNoticeStatuses = [
  {
    title: "Draft",
    color: "rgba(255, 128, 0, 1)",
  },
  {
    title: "Queued",
    color: "rgba(24, 144, 255, 1)",
  },
  {
    title: "Sent",
    color: "rgba(52, 168, 83, 1)",
  },
  {
    title: "Send Failed",
    color: "rgba(255, 0, 0, 1)",
  },
  {
    title: "Accepted",
    color:
      "linear-gradient(97.1deg, #35BFB7 -3.64%, #34A853 59.48%, #59A834 94.45%)",
  },
  {
    title: "Rejected",
    color: "#000000",
  },
];

const PaymentStatuses = [
  {
    status: "Pending",
    backgroundColor: "#dee2fe",
    textColor: "#576af8",
  },
  {
    status: "Paid",
    backgroundColor: "#dee2fe",
    textColor: "#576af8",
  },
  {
    status: "Partially Paid",
    backgroundColor: "#dee2fe",
    textColor: "#576af8",
  },
];

function translateStatus(status: string) {
  switch (status) {
    case "open":
      return "Open";
    case "po_change":
      return "PO_Change";
    case "new":
      return "New";
    case "completed":
      return "Completed";
    case "errors":
      return "Errors";
    default:
      return "";
  }
}

const PENDING_STATES = _.uniq(
  _.merge(
    InvoiceStatuses.map((e) => e.title),
    ShipNoticeStatuses.map((e) => e.title)
  )
);
function filterData(data: any, filteredInfo: Record<string, any>) {
  if (filteredInfo.asnState?.length) {
    return data.filter((item: any) => {
      return PENDING_STATES.includes(item.asnState);
    });
  }
  if (filteredInfo.invoiceState?.length) {
    return data.filter((item: any) => {
      return PENDING_STATES.includes(item.invoiceState);
    });
  }
  return data;
}

interface PopoverLabel {
  title: string;
  color: string;
}
const EdiListViewPage = () => {
  const [isFilterManuallyChanged, setManuallyChanged] = React.useState(false);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});

  const StatusPopoverContent = (title: string, LabelArray: PopoverLabel[]) => {
    return (
      <StyledToolTipContainer>
        <ToolTipTitleContainer>{title} </ToolTipTitleContainer>
        <LabelContainer>
          {LabelArray.map((status, index) => {
            return (
              <Label key={index}>
                <ColouredDot color={status.color} />
                <span>{status.title}</span>
              </Label>
            );
          })}
        </LabelContainer>
      </StyledToolTipContainer>
    );
  };

  const history = useHistory();
  const { pageNumber, type } = useParams<{
    pageNumber: string;
    type: string;
  }>();
  const { getZonedTime } = useTimestamp();
  const [data, setData] = useState<DocumentListRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(false);
  const { mutate, isLoading: isUpdatingOrderState } = usePutUpdateOrderState();
  const [currentlyUpdatingId, setCurrentlyUpdatingId] = useState<string>("");

  const theme = useContext(ThemeContext);

  const {
    setDownloadShipmentDocsState,
    isDownloadingShipmentDocs,
  } = useDownloadShipmentDocs();

  const handlePaginationChange = (pageNumber: number): void => {
    const nextPath = generatePath(CORE_EDI_LIST_WITH_PARAMS, {
      pageNumber: pageNumber,
      type,
    });
    history.replace({ ...history.location, pathname: nextPath });
  };

  const { data: purchaseOrderError } = useGetPurchaseOrderErrorsQuery(
    1,
    "desc"
  );

  const { data: tradingPartners } = useGetTradingPartners({
    select: (response) =>
      response?.data?.map(({ id, name, flavor }) => {
        const text = getTpfName({ name, flavor });

        return {
          text,
          value: name, // todo: revert this to "id" once the backfilling of data is done
        };
      }),
  });

  const errorOrderIds = purchaseOrderError?.orders?.map(
    (poError: any) => poError.orderId
  );

  const defaultFilterValue: string[] = [];
  const location = useLocation();

  const handleChange: any = (pagination: any, filters: any, sorter: any) => {
    const newOrderState = filters?.orderState ?? [];
    const orderState = filters?.orderState === null ? [] : [...newOrderState];

    const mergedFilterState = {
      ...filteredInfo,
      ...filters,
      orderState,
    };
    setFilteredInfo(mergedFilterState);
    if (type) {
      setManuallyChanged(true);
      const pathWithoutType = generatePath(CORE_EDI_LIST_WITH_PARAMS, {
        pageNumber,
        type: undefined,
      });
      history.replace(pathWithoutType);
    }
    if (sorter.column) {
      if (sorter.order) {
        Object.values(EDI_LIST_VIEW_TABLE_DATA_INDEXES).map((key) => {
          if (searchParams.has(key)) {
            searchParams.delete(key);
          }
        });
        if (searchParams.has("orderDate")) {
          searchParams.delete(key);
        }
        if (sorter.field === EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_DATE) {
          searchParams.set("sortBy", "orderDate");
        } else {
          searchParams.set("sortBy", sorter.field);
        }
        searchParams.set("sortOrder", sorter.order);
      } else {
        history.push(`${location.pathname}`);
      }
    } else {
      searchParams.delete("sortBy");
      searchParams.delete("sortOrder");
    }
    const urlFilters = {};
    Object.keys(mergedFilterState).map((k) => {
      if (mergedFilterState[k] !== null && mergedFilterState[k]?.length > 0) {
        urlFilters[k] = mergedFilterState[k];
      }
    });
    if (Object.keys(urlFilters).length > 0) {
      searchParams.set("filter", new URLSearchParams(urlFilters).toString());
    } else {
      searchParams.delete("filter");
    }
    const search = `?${searchParams.toString()}`;
    localStorage.setItem("edi-search-query", search);
    history.push(`${location.pathname}${search}`);
  };

  const onSummaryTabClick = (data: any) => {
    const newType = type === data ? null : data;

    const path = generatePath(CORE_EDI_LIST_WITH_PARAMS, {
      pageNumber,
      type: newType,
    });
    if (filters && Object.keys(filters).length) {
      const appliedFilters = filters?.split("&") || [];
      const newFilters = {};
      appliedFilters.forEach((filter) => {
        if (filter.includes("tradingPartner")) {
          const values = filter.split("=");
          const filteredValues = values?.[1].split(",") || [];
          newFilters.tradingPartner = filteredValues;
        }
      });
      const newFilterString =
        "filter=" +
        encodeURIComponent(new URLSearchParams(newFilters).toString());
      localStorage.setItem("edi-search-query", newFilterString);
      history.push({ pathname: path, search: newFilterString });
      return;
    }
    history.push({ pathname: path });
    setManuallyChanged(false);
  };

  const EDI_LIST_VIEW_TABLE_CONFIG = () => [
    {
      title: "Order ID",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_ID,
      sorter: (a: any, b: any) => {
        return a.orderId.localeCompare(b.orderId);
      },
      width: "150px",
      ellipsis: true,
      sortOrder: tableSortOrder[EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_ID],
      render: function RenderOrderId(
        value: string,
        record: any,
        rowIndex: number
      ) {
        const isTestDocument = !!record.isTestDocument;

        return (
          <OrderIdContainer data-testid="orderId" id="orderId">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>{value ? value : "-"}</span>

              {isTestDocument && (
                <Tooltip title={"Test order"}>
                  <ExperimentOutlined
                    style={{ color: theme.palette.colors.GRAY }}
                  />
                </Tooltip>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {isUpdatingOrderState && record.id === currentlyUpdatingId ? (
                <LoadingOutlined
                  style={{ color: theme.palette.colors.KLIEN_BLUE }}
                />
              ) : (
                <SelectOutlined
                  style={{
                    transform: "scaleX(-1)",
                    color: theme.palette.colors.KLIEN_BLUE,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRowClick({ record, rowIndex, toOpenNewTab: true });
                  }}
                />
              )}
            </div>
          </OrderIdContainer>
        );
      },
      fixed: true,
    },
    {
      title: "Date",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_DATE,
      sortOrder: tableSortOrder[EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_DATE],
      sorter: (a: any, b: any) => {
        const dateA = a[EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_DATE] ?? "-";
        const dateB = b[EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_DATE] ?? "-";

        return dateA.localeCompare(dateB);
      },
      render: (value: string) => {
        const children = value
          ? getZonedTime({ ISODateString: value, withAltLabel: true })
          : "-";
        return {
          children,
          props: {
            "data-testid": "messageTimestamp",
          },
        };
      },
      width: "120px",
      fixed: true,
    },
    {
      title: "Total",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.TOTAL,
      sortOrder: tableSortOrder[EDI_LIST_VIEW_TABLE_DATA_INDEXES.TOTAL],
      sorter: (a: any, b: any) => {
        return a[EDI_LIST_VIEW_TABLE_DATA_INDEXES.TOTAL].localeCompare(
          b[EDI_LIST_VIEW_TABLE_DATA_INDEXES.TOTAL]
        );
      },
      render: (value: number, tableRow: any) => {
        const children = value ? value.toString() : "-";
        return {
          children,
          props: {
            "data-testid": "orderTotal",
          },
        };
      },
      width: "80px",
    },
    {
      title: "# Labels",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.LABEL_COUNT,
      sortOrder: tableSortOrder[EDI_LIST_VIEW_TABLE_DATA_INDEXES.LABEL_COUNT],
      sorter: (a: any, b: any) => {
        a = toNumber(a[EDI_LIST_VIEW_TABLE_DATA_INDEXES.LABEL_COUNT]) || 0;
        b = toNumber(b[EDI_LIST_VIEW_TABLE_DATA_INDEXES.LABEL_COUNT]) || 0;

        return a - b;
      },
      render: (value: number) => {
        const children = value ? value.toString() : "-";
        return {
          children,
          props: {
            "data-testid": "labelCount",
          },
        };
      },
      width: "100px",
    },
    {
      title: "Trading Partner",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.TRADING_PARTNER_ID,
      width: "120px",
      ellipsis: true,
      filterSearch: true,
      filteredValue: filteredInfo.tradingPartnerId || null,
      onFilter: (value: string, record: any) => {
        if (value === null) {
          return true;
        }
        return (
          // * note: currently filtering all "trading_partner_name" values - no matter the flavor
          // todo: revert this to "TRADING_PARTNER_ID" once the backfilling of data is done
          record[EDI_LIST_VIEW_TABLE_DATA_INDEXES.TRADING_PARTNER] === value
        );
      },
      filters: tradingPartners,
      render: (value: number, tableRow: any) => {
        const { tradingPartner, tradingPartnerFlavor } = tableRow;

        const children = tradingPartner
          ? getTpfName({ name: tradingPartner, flavor: tradingPartnerFlavor })
          : "-";

        return {
          children,
          props: {
            "data-testid": "tradingPartner",
            style: { backgroud: "red" },
          },
        };
      },
    },
    {
      title: "Order",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_STATUS,
      width: "100px",
      ellipsis: true,
      filterSearch: true,
      onFilter: (value: string, record: any) => {
        if (value === "Errors") {
          return errorOrderIds?.includes(record.orderId);
        }
        return record.orderState === value;
      },
      // eslint-disable-next-line react/display-name
      filterIcon: (filtered: boolean) => (
        <FilterFilled aria-label="orderFilterIcon" />
      ),
      defaultFilteredValue: defaultFilterValue,
      filteredValue: filteredInfo.orderState || defaultFilterValue,
      filters: [
        {
          text: "New",
          value: "New",
        },
        {
          text: "Open",
          value: "Open",
        },
        {
          text: "Acknowledged",
          value: "Acknowledged",
        },
        {
          text: "PO Change",
          value: "PO_Change",
        },
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "Cancelled",
          value: "Cancelled",
        },
        {
          text: "Errors",
          value: "Errors",
        },
      ],
      render: function RenderOrderChips(value: any, record: any) {
        const {
          backgroundColor,
          textColor,
          borderColor,
          showTick,
        } = record.stateColors.orderStateColor;
        return value ? (
          <Popover
            overlayInnerStyle={{ borderRadius: "8px" }}
            content={StatusPopoverContent("Order Statuses", OrderStatuses)}
            placement="topLeft"
          >
            <div data-testid="order">
              <Chip
                {...{
                  value: value.replace("_", " "),
                  textColor: textColor,
                  hideDropdown: true,
                  chipStyles: {
                    border: `solid 1px ${borderColor} `,
                    background: backgroundColor,
                    display: `flex`,
                    justifyContent: `center`,
                    padding: `4px 8px`,
                    width: "108px",
                  },
                  showTick: !!showTick,
                }}
              />
            </div>
          </Popover>
        ) : null;
      },
    },
    {
      title: "Ship Notice",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.SHIP_NOTICE,
      width: "100px",
      ellipsis: true,
      filteredValue: filteredInfo.asnState,
      onFilter: (value: string, record: any) => record.asnState === value,
      filters: [
        {
          text: "N/A",
          value: "NonExistent",
        },
        {
          text: "Draft",
          value: "Draft",
        },
        {
          text: "Queued",
          value: "Queued",
        },
        {
          text: "Sent",
          value: "Sent",
        },
        {
          text: "Send Failed",
          value: "Failure",
        },
        {
          text: "Accepted",
          value: "Accepted",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      render: function RenderOrderChips(value: any, record: any) {
        if (!value || value === "NonExistent")
          return {
            children: "-",
            props: {
              "data-testid": "asnState",
            },
          };
        const {
          backgroundColor,
          textColor,
          borderColor,
          showTick,
        } = record.stateColors.asnStateColor;
        return (
          <Popover
            overlayInnerStyle={{ borderRadius: "8px" }}
            content={StatusPopoverContent(
              "Ship Notice Statuses",
              ShipNoticeStatuses
            )}
          >
            <div data-testid="asnState">
              <Chip
                {...{
                  value: value,
                  textColor: textColor,
                  hideDropdown: true,
                  chipStyles: {
                    border: `solid 1px ${borderColor} `,
                    background: backgroundColor,
                    display: `flex`,
                    justifyContent: `center`,
                    padding: `4px 8px`,
                    width: "108px",
                  },
                  showTick: !!showTick,
                }}
              />
            </div>
          </Popover>
        );
      },
    },
    // {
    //   title: "Delivery",
    //   dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.DELIVERY_STATUS,
    //   width: "100px",
    //   ellipsis: true,
    //   render: function RenderOrderChips(value: any, record: any) {
    //     if (!value)
    //       return {
    //         children: "-",
    //         props: {
    //           "data-testid": "deliveryState",
    //         },
    //       };
    //     const {
    //       backgroundColor,
    //       textColor,
    //       borderColor,
    //       showTick,
    //     } = record.stateColors.deliveryStateColor;
    //     return (
    //       <Popover
    //         overlayInnerStyle={{ borderRadius: "8px" }}
    //         content={StatusPopoverContent(
    //           "Delivery Statuses",
    //           DeliveryStatuses
    //         )}
    //       >
    //         <div data-testid="deliveryState">
    //           <Chip
    //             {...{
    //               value: value,
    //               backgroundColor: backgroundColor,
    //               textColor: textColor,
    //               hideDropdown: true,
    //               chipStyles: {
    //                 border: `solid 1px ${borderColor} `,
    //                 background: backgroundColor,
    //               },
    //               showTick: !!showTick,
    //             }}
    //           />
    //         </div>
    //       </Popover>
    //     );
    //   },
    // },
    {
      title: "Invoice",
      dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.INVOICING_STATUS,
      width: "100px",
      ellipsis: true,
      onFilter: (value: string, record: any) => record.invoiceState === value,
      filters: [
        {
          text: "N/A",
          value: "NonExistent",
        },
        {
          text: "Draft",
          value: "Draft",
        },
        {
          text: "Queued",
          value: "Queued",
        },
        {
          text: "Sent",
          value: "Sent",
        },
        {
          text: "Send Failed",
          value: "Failed",
        },
        {
          text: "Accepted",
          value: "Accepted",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      filteredValue: filteredInfo.invoiceState,
      render: function RenderOrderChips(value: any, record: any) {
        if (!value || value === "NonExistent")
          return {
            children: "-",
            props: {
              "data-testid": "invoiceState",
            },
          };
        const {
          backgroundColor,
          textColor,
          borderColor,
          showTick,
        } = record.stateColors.invoiceStateColor;
        return (
          <Popover
            overlayInnerStyle={{ borderRadius: "8px" }}
            content={StatusPopoverContent("Invoice Statuses", InvoiceStatuses)}
          >
            <div data-testid="invoiceState">
              <Chip
                {...{
                  value: value,
                  textColor: textColor,
                  hideDropdown: true,
                  chipStyles: {
                    border: `solid 1px ${borderColor} `,
                    background: backgroundColor,
                    display: `flex`,
                    justifyContent: `center`,
                    padding: `4px 8px`,
                    width: "108px",
                  },
                  showTick: !!showTick,
                }}
              />
            </div>
          </Popover>
        );
      },
    },
    // Removing these columsn - Payment and Chargeback until further notice
    // {
    //   title: "Payment",
    //   dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.PAYMENT_STATUS,
    //   width: "100px",
    //   ellipsis: true,
    //   render: (value: number, tableRow: any) => {
    //     const children = value ? value.toString() : "-";
    //     return {
    //       children,
    //       props: {
    //         "data-testid": "paymentState",
    //       },
    //     };
    //   },
    // },
    // {
    //   title: "Chargeback",
    //   dataIndex: EDI_LIST_VIEW_TABLE_DATA_INDEXES.CHARGEBACK_STATUS,
    //   width: "100px",
    //   ellipsis: true,
    //   render: (value: number, tableRow: any) => {
    //     const children = value ? value.toString() : "-";
    //     return {
    //       children,
    //       props: {
    //         "data-testid": "chargebackState",
    //       },
    //     };
    //   },
    // },
  ];

  const { data: ordersSummaryData, isLoading } = useSearchOrdersQuery(
    1,
    20,
    "desc",
    "",
    "",
    "",
    "",
    ""
  );

  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const filters = searchParams.get("filter");

  const setFiltersFromURL = () => {
    if (!filters) {
      setFilteredInfo({
        ...filteredInfo,
        asnState: null,
        invoiceState: null,
        orderState: null,
      });
      return;
    }
    const urlFilters = Object.fromEntries(new URLSearchParams(filters));
    const filterObject = {
      asnState: null,
      invoiceState: null,
      orderState: null,
      tradingPartner: null,
    };
    Object.keys(urlFilters).forEach((filter) => {
      filterObject[filter] = urlFilters[filter].split(",");
    });
    setFilteredInfo(cloneDeep(filterObject));
  };

  useEffect(() => {
    /**
     * FILTER
     */
    setFiltersFromURL();
  }, [filters]);

  useEffect(() => {
    if (location.search) {
      localStorage.setItem("edi-search-query", location.search);
    }
    // cleanup - remove button from ui after going to another page, and coming back to this page
    if (!isDownloadingShipmentDocs) {
      setDownloadShipmentDocsState({ asnIds: [] });
    }
  }, []);

  type KVPair = {
    [key: string]: string;
  };

  const initializeSortOrder = () => {
    const data: KVPair = {};
    Object.values(EDI_LIST_VIEW_TABLE_DATA_INDEXES).map((i) => (data[i] = ""));
    return data;
  };
  const [tableSortOrder, setTableSortOrder] = useState<any>(
    initializeSortOrder
  );

  useEffect(() => {
    const data = initializeSortOrder();
    if (sortBy && sortOrder) {
      if (sortBy === "orderDate") {
        setTableSortOrder({
          ...data,
          [EDI_LIST_VIEW_TABLE_DATA_INDEXES.ORDER_DATE]: sortOrder,
        });
      } else {
        setTableSortOrder({
          ...data,
          [sortBy]: sortOrder,
        });
      }
      return;
    } else {
      setTableSortOrder(data);
    }
    if (!filters) {
      let search = localStorage.getItem("edi-search-query");
      if (search) {
        if (!search.includes("?")) {
          search = `?${search}`;
        }
        history.push(`${location.pathname}${search}`);
      }
    }
  }, [sortBy, sortOrder]);

  const {
    data: ordersSummaryCountData,
    isLoading: isCountLoading,
  } = useGetOrdersSummaryCountQuery();

  useEffect(() => {
    if (ordersSummaryData) {
      const _orders = ordersSummaryData.data?.orders;
      setData(cloneDeep(_orders));
    }
  }, [ordersSummaryData]);

  useEffect(() => {
    if (isFilterManuallyChanged) {
      return;
    }
    if (!type) {
      setFiltersFromURL();
      return;
    }
    const asnState = type === "asn_pending";
    const invoiceState = type === "invoice_pending";
    const asnOrInvoiceState = [asnState, invoiceState].includes(true);
    let orderState = asnOrInvoiceState ? [] : [translateStatus(type)];
    if (orderState.length === 1 && orderState[0] === "") {
      orderState = [];
    }
    setFilteredInfo((filteredInfo) => ({
      ...filteredInfo,
      orderState,
      asnState: asnState ? ["Draft", "NonExistent"] : [],
      invoiceState: invoiceState ? ["Draft", "NonExistent"] : [],
    }));
  }, [pageNumber, type, isFilterManuallyChanged]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any[]
  ) => {
    setSelectedIds(newSelectedRowKeys);
    const asnIdsToSet = compact(selectedRows?.map(({ asnId }) => asnId) ?? []);
    setDownloadShipmentDocsState({ asnIds: asnIdsToSet });
  };

  const generateLoadedCsv = (data: any) => {
    const result: any[] = [];
    data?.forEach((sampleCSVObject: any) => {
      const newObject = JSON.parse(JSON.stringify(blankObject));
      Object.keys(blankObject).forEach((ogKey) => {
        const value = sampleCSVObject[ogKey] || "";
        if (
          typeof value === "string" &&
          value.length > 0 &&
          value.indexOf("_") >= 0
        ) {
          newObject[ogKey] = createTitle(value);
        } else {
          newObject[ogKey] = value;
        }
      });
      result.push(newObject);
    });
    return result;
  };

  const downloadCsv = (data: any) => {
    setDownloadDisabled(true);
    exportToCsv(poCsvConfig, generateLoadedCsv(data), "Crstl PO Download");
    setDownloadDisabled(false);
  };

  const handleRowClick = ({
    record,
    rowIndex,
    toOpenNewTab,
  }: {
    record: any;
    rowIndex?: number;
    toOpenNewTab?: boolean;
  }) => {
    if (record.orderState === "New") {
      setCurrentlyUpdatingId(record.id);
      mutate(
        {
          orderId: record.id,
          stateType: "state",
          newValue: "Open",
          documentType: record.documentType,
        },
        {
          onSuccess: () => {
            amplitude.logClickEvent("EDI Order", {
              orderId: record.id,
              rowIndex: rowIndex,
            });
            const path = generatePath(
              record?.documentType === "875"
                ? CORE_EDI_GROCERY_PURCHASE_ORDER
                : CORE_EDI_PURCHASE_ORDER,
              {
                id: record.id,
                orderId: record.id,
              }
            );
            toOpenNewTab ? window.open(path) : history.push(path);
          },
          onSettled: () => {
            setCurrentlyUpdatingId("");
          },
        }
      );
    } else {
      amplitude.logClickEvent("EDI Order", {
        orderId: record.id,
        rowIndex: rowIndex,
      });
      const path = generatePath(
        record?.documentType === "875"
          ? CORE_EDI_GROCERY_PURCHASE_ORDER
          : CORE_EDI_PURCHASE_ORDER,
        {
          id: record.id,
          orderId: record.id,
        }
      );
      toOpenNewTab ? window.open(path) : history.push(path);
    }
  };

  return (
    <PageWrapper>
      <Spinner spinning={isCountLoading}>
        <EDISummaryTabs
          tabsData={ordersSummaryCountData?.data}
          onClick={onSummaryTabClick}
        />
      </Spinner>
      <Spinner spinning={isLoading}>
        {selectedIds.length !== 0 && (
          <DownloadCSV
            downloadCsv={downloadCsv}
            orderIds={selectedIds}
            downloadDisabled={downloadDisabled}
          />
        )}
        <DownloadShipmentDocs />
        <SimpleTable<DocumentListRow>
          rowSelection={{
            type: "checkbox",
            onChange: onSelectChange,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                handleRowClick({ record, rowIndex });
              },
              style: {
                cursor: "pointer",
              },
              "data-testid": record.id,
            };
          }}
          loading={false}
          dataSource={data}
          columns={EDI_LIST_VIEW_TABLE_CONFIG()}
          rowKey={(record) => record.id}
          pagination={{
            current: Number(pageNumber || 1),
            onChange: handlePaginationChange,
            itemRender: function PaginationButton(page, type, children) {
              const testId = type === "page" ? `${type}-${page}` : type;
              return React.cloneElement(children as React.ReactElement, {
                "data-testid": `pagination-button-${testId}`,
              });
            },
            pageSize: 500,
            showSizeChanger: false,
            position: ["bottomLeft"],
          }}
          onChange={handleChange}
        />
      </Spinner>
    </PageWrapper>
  );
};

export default EdiListViewPage;

