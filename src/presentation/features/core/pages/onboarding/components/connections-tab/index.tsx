// import { Tooltip } from "antd";
import { FilterFilled } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import _ from "lodash";

import { SimpleTable } from "@crstl/components/atoms/table";
import { Chip } from "@crstl/components/molecules/order-chips/Chip";
import { useGetConnectionsTPFQuery } from "domain/interactors/connections";
import {
  ConnectionsRowData,
  ActiveIntegration,
  TradingPartner,
} from "domain/entity/connections/model";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { useTable } from "presentation/hooks/common/useTable";
import EDIPartnerImage from "globals/assets/images/edi-partner.png";
import { AnalyticsList } from "./AnalyticsCard";
import {
  TableContainer,
  TradingPartnetBox,
  ImageWrapper,
  ActiveIntegrationsBox,
} from "./styles";

export const ConnectionsTab = () => {
  const TABLE_INDEXES = {
    TRADING_PARTNER: "tradingPartner",
    GO_LIVE_DATE: "goLiveDate",
    STATUS: "status",
    ACTIVE_INTEGRATIONS: "activeIntegrations",
  };

  const { getZonedTime } = useTimestamp();

  const { data, isLoading } = useGetConnectionsTPFQuery();
  const connections = data?.data.connections || [];
  const stats = data?.data.stats || {
    activeConnections: 0,
    activeTradingPartnerConnections: 0,
    activeIntegrationConnections: 0,
    inactiveConnections: 0,
  };

  const {
    tableSortOrder,
    filteredInfo,
    defaultFilterValue,
    handleChange,
    pageNumber,
  } = useTable(connections, TABLE_INDEXES);

  const cols: ColumnsType<ConnectionsRowData> = [
    {
      title: "Trading Partner",
      dataIndex: TABLE_INDEXES.TRADING_PARTNER,
      width: "150px",
      ellipsis: true,
      // eslint-disable-next-line react/display-name
      render: (value: TradingPartner) => {
        return (
          <TradingPartnetBox>
            <ImageWrapper>
              <img
                src={EDIPartnerImage}
                style={{
                  height: "40px",
                  maxWidth: "100%",
                }}
                alt="logo"
              />
            </ImageWrapper>

            <div>
              <span>{value.name}</span>
              <span>{value.flavor}</span>
            </div>
          </TradingPartnetBox>
        );
      },
    },
    {
      title: "Go-Live Date",
      dataIndex: TABLE_INDEXES.GO_LIVE_DATE,
      width: "150px",
      ellipsis: true,
      sortOrder: tableSortOrder[TABLE_INDEXES.GO_LIVE_DATE],
      sorter: (a: any, b: any) => {
        const dateA = a[TABLE_INDEXES.GO_LIVE_DATE] ?? "-";
        const dateB = b[TABLE_INDEXES.GO_LIVE_DATE] ?? "-";
        return dateA.localeCompare(dateB);
      },

      // eslint-disable-next-line react/display-name
      render: (value: string) => {
        const children = value
          ? getZonedTime({ ISODateString: value, withAltLabel: true })
          : "Go-Live pending";
        return {
          children,
          props: {
            "data-testid": "goLiveDate",
          },
        };
      },
    },
    {
      title: "Status",
      dataIndex: TABLE_INDEXES.STATUS,
      width: "150px",
      ellipsis: true,
      onFilter: (
        value: string | number | boolean,
        record: ConnectionsRowData
      ) => {
        const stringValue = value as string;
        if (value === null) {
          return true;
        }
        return record.status === stringValue;
      },
      // eslint-disable-next-line react/display-name
      filterIcon: (filtered: boolean) => (
        <FilterFilled aria-label="orderFilterIcon" />
      ),
      filteredValue: filteredInfo.status || null,
      defaultFilteredValue: defaultFilterValue,
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],

      // eslint-disable-next-line react/display-name
      render: (value: string, record: ConnectionsRowData) => {
        const { statusStyle } = record;
        const status = value
          ?.split("_")
          .map((word) => _.capitalize(word))
          .join(" ");

        return (
          <div>
            <Chip
              {...{
                value: status,
                textColor: statusStyle.textColor,
                hideDropdown: true,
                chipStyles: {
                  border: `solid 1px ${statusStyle.borderColor} `,
                  background: statusStyle.backgroundColor,
                  display: `flex`,
                  justifyContent: `center`,
                  padding: `4px 8px`,
                  width: "108px",
                },
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Active Integrations",
      dataIndex: TABLE_INDEXES.ACTIVE_INTEGRATIONS,
      width: "150px",
      ellipsis: true,
      // eslint-disable-next-line react/display-name
      render: (value: ActiveIntegration[]) => {
        return (
          <ActiveIntegrationsBox>
            {value.map((item: ActiveIntegration) => {
              if (!item?.name) return null;
              const name = item?.name
                ?.split("_")
                .map((word) => _.capitalize(word))
                .join(" ");

              return (
                <div key={item.name}>
                  <Chip
                    {...{
                      value: name,
                      textColor: "rgb(63 110 150)",
                      hideDropdown: true,
                      chipStyles: {
                        border: `solid 1px rgb(63 110 150) `,
                        background: "rgb(231, 244, 255)",
                        display: `flex`,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        width: "fit-content",
                      },
                    }}
                  />
                </div>
                // TODO: Add this after images have been added to the API
                // <Tooltip title={item.name} key={item.name}>
                //   <ImageWrapper>
                //     <img
                //       src={item.logo}
                //       style={{
                //         height: "40px",
                //         maxWidth: "100%",
                //       }}
                //       alt="logo"
                //     />
                //   </ImageWrapper>
                // </Tooltip>
              );
            })}
          </ActiveIntegrationsBox>
        );
      },
    },
  ];

  return (
    <TableContainer>
      <AnalyticsList stats={stats} />
      <SimpleTable
        loading={isLoading}
        dataSource={connections}
        columns={cols}
        rowKey={(record) => record.id}
        onChange={handleChange}
        pagination={{
          current: pageNumber,

          pageSize: 10,
          showSizeChanger: false,
          position: ["bottomLeft"],
        }}
      />
    </TableContainer>
  );
};

