import { Switch, Tooltip } from "antd";
import { UserRoleFE } from "domain/entity/shared/models";
import { usePutContactEmailMutation } from "domain/interactors/alerts-tab";

import { DeleteOutlined } from "@ant-design/icons";

import { ActionsWrapper } from "./styles";
import { AlertsTableCol } from "./types";

interface PublicProps {
  currentValue: boolean;
  record: AlertsTableCol;
}

export const Actions: React.FC<PublicProps> = ({ currentValue, record }) => {
  const { isLoading, mutate } = usePutContactEmailMutation();
  const isAdmin = record.role === UserRoleFE.Admin;

  return (
    <ActionsWrapper>
      <Tooltip
        title={
          isAdmin
            ? "Please contact support@crstl.so to toggle e-mail notifications for admins"
            : null
        }
      >
        <Switch
          disabled={isAdmin}
          defaultChecked={currentValue}
          onChange={() =>
            mutate({ email: record.email, enabled: !record.enabled })
          }
          loading={isLoading}
        />
      </Tooltip>
      {/* <DeleteOutlined onClick={() => console.log("delete")} /> */}
    </ActionsWrapper>
  );
};

