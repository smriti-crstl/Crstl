import { ColumnsType } from "antd/lib/table";
import { RenderTimestamp } from "presentation/features/common/components";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { SETTINGS_TEAM_TABLE_DATA_INDEXES } from "../../../settings/config";
import { Actions } from "../../components/alerts-tab/Actions";
import { AlertsTableCol } from "../../components/alerts-tab/types";

export const SETTINGS_ALERTS_TABLE_CONFIG: ColumnsType<AlertsTableCol> = [
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.NAME,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.NAME,
    width: "180px",
    render: (value: string) => {
      return value ?? "—";
    },
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.EMAIL,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.EMAIL,
    width: "240px",
    render: (value: string) => {
      return value ?? "—";
    },
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.ROLE,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.ROLE,
    width: "120px",
    render: (value: string) => {
      return value ?? "—";
    },
  },
  {
    title:
      CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.LAST_SIGN_IN_TIME,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.LAST_SIGN_IN_TIME,
    render: function RenderLastSignIn(value: string, _record) {
      return value ? <RenderTimestamp ISODateString={value} /> : "—";
    },
  },
  {
    title: "Alerts",
    dataIndex: "enabled",
    render: function RenderLastSignIn(value: boolean, _record) {
      return <Actions currentValue={value} record={_record} />;
    },
  },
];

