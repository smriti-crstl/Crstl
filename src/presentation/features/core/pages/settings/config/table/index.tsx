import { ColumnsType } from "antd/lib/table";
import { USER_DEFAULT_IMAGE_URL } from "presentation/constants";
import { RenderTimestamp } from "presentation/features/common/components";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { UserModel } from "@crstl/api/src/apis/models/User";
import { AvatarWithBackground } from "@crstl/components/atoms/avatar";

import { TeamsJobFunctionsDropdown } from "../../components/team-tab/dropdowns/job-functions";
import { TeamsStatusDropdown } from "../../components/team-tab/dropdowns/status-change";
import { TeamsJobRolesDropdown } from "../../components/team-tab/dropdowns/user-roles";

const SETTINGS_TEAM_TABLE_DATA_INDEXES: {
  NAME: "fullName";
  EMAIL: "email";
  ROLE: "role";
  JOB_FUNCTION: "jobFunction";
  LAST_SIGN_IN_TIME: "lastSignInTime";
  STATUS: "isActive";
  IMAGE_URL: "imageUrl";
} = {
  NAME: "fullName",
  EMAIL: "email",
  ROLE: "role",
  JOB_FUNCTION: "jobFunction",
  LAST_SIGN_IN_TIME: "lastSignInTime",
  STATUS: "isActive",
  IMAGE_URL: "imageUrl",
};

export const SETTINGS_TEAMS_TABLE_CONFIG: ColumnsType<UserModel> = [
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.IMAGE_URL,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.IMAGE_URL,
    render: function RenderAvatar(value) {
      return <AvatarWithBackground src={value || USER_DEFAULT_IMAGE_URL} />;
    },
    width: "80px",
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.NAME,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.NAME,
    width: "120px",
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.EMAIL,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.EMAIL,
    width: "220px",
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.ROLE,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.ROLE,
    render: function RenderJobRoles(value, record) {
      return <TeamsJobRolesDropdown currentValue={value} record={record} />;
    },
    width: "180px",
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.JOB_FUNCTION,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.JOB_FUNCTION,
    render: function RenderJobFunctions(value, record) {
      return <TeamsJobFunctionsDropdown currentValue={value} record={record} />;
    },
    width: "180px",
  },
  {
    title:
      CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.LAST_SIGN_IN_TIME,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.LAST_SIGN_IN_TIME,
    render: function RenderLastSignIn(value: string, _record) {
      return <RenderTimestamp ISODateString={value} />;
    },
  },
  {
    title: CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TABLE_COLUMNS.STATUS,
    dataIndex: SETTINGS_TEAM_TABLE_DATA_INDEXES.STATUS,
    render: function RenderStatus(value, record) {
      return <TeamsStatusDropdown currentValue={value} record={record} />;
    },
    width: "140px",
  },
];

export { SETTINGS_TEAM_TABLE_DATA_INDEXES };

