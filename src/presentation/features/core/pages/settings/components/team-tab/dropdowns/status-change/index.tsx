import { Typography } from "antd";
import { UserDetailsRes } from "domain/entity/shared/models";
import { usePutActivateDeactivateTeamUserQuery } from "domain/interactors/profile";
import { ValueOf } from "globals/types";
import { get, startCase } from "lodash";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement, useState } from "react";

import {
  SingleSelect,
  SingleSelectOptions,
} from "components/atoms/selects";

import { TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES } from "../../../../constants";
import { ChangeStatusModal } from "./ChangeStatusModal";

const { Paragraph } = Typography;

type Props = {
  currentValue: boolean;
  record: UserDetailsRes;
};

const StatusOptions = {
  Activated:
    CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS.ACTIVE,
  Deactivated:
    CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS.DEACTIVATED,
} as const;

type StatusOptionsType = ValueOf<typeof StatusOptions>;

const createStatusesDropdown = (): SingleSelectOptions => {
  return [
    {
      label:
        CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS.ACTIVE,
      value:
        CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS.ACTIVE,
    },
    {
      label:
        CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS
          .DEACTIVATED,
      value:
        CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS
          .DEACTIVATED,
    },
  ];
};

export const TeamsStatusDropdown = ({
  currentValue,
  record,
}: Props): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate, isLoading } = usePutActivateDeactivateTeamUserQuery();

  const handleStatusChange = (newStatus: StatusOptionsType): void => {
    if (newStatus === StatusOptions.Deactivated) {
      return setIsModalVisible(true);
    }
    if (newStatus === StatusOptions.Activated) {
      mutate({
        userId: record.id,
        isActive: TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES.ACTIVATED,
        organizationId: record.organizationId,
      });
    }
  };

  const inviteLink = get(record, "inviteLink");
  if (inviteLink) {
    return (
      <Paragraph
        copyable={{
          text: inviteLink,
          tooltips: ["Copy Invitation URL", "Copied"],
        }}
      >
        {startCase(get(record, "status"))}
      </Paragraph>
    );
  }

  if (!(currentValue === true || currentValue === false)) {
    return <div>ERR</div>;
  }

  return (
    <>
      <ChangeStatusModal
        mutate={mutate}
        isMutateLoading={isLoading}
        setIsModalVisible={setIsModalVisible}
        record={record}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
      <SingleSelect
        style={{
          width: "100%",
          color: currentValue === false ? "#B6B6B6" : "inherit",
        }}
        loading={isLoading}
        options={createStatusesDropdown()}
        value={
          currentValue === true
            ? CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS
                .ACTIVE
            : CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_DROPDOWN_LABELS
                .DEACTIVATED
        }
        onChange={(value: string) => {
          const newStatus = value as StatusOptionsType;
          if (newStatus) {
            handleStatusChange(newStatus);
          }
        }}
      />
    </>
  );
};

