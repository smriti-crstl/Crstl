import { AxiosError } from "axios";
import {
  ActivateOrDeactivateTeamUsersReq,
  ActivateOrDeactivateTeamUsersRes,
} from "domain/entity/profile/models";
import { UserDetailsRes } from "domain/entity/shared/models";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { UseMutateFunction } from "react-query";
import styled from "styled-components";

import { IPaddedModalProps, PaddedModal } from "components/atoms/modal";
import {
  GenericHeading,
  GenericSubHeading,
} from "components/atoms/typography";
import { SimpleButtonGroup } from "components/molecules/button-groups";

import { TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES } from "../../../../constants";

type Props = Omit<IPaddedModalProps, "children"> & {
  record: UserDetailsRes;
  mutate: UseMutateFunction<
    ActivateOrDeactivateTeamUsersRes,
    AxiosError,
    ActivateOrDeactivateTeamUsersReq,
    unknown
  >;
  isMutateLoading: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};

const TextWrapper = styled.div`
  padding: 0 4rem;
  text-align: center;
`;

const ButtonGroupWrapper = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.LARGE};
  display: flex;
  justify-content: flex-end;
`;

const SpaceWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.TOP};
`;

export const ChangeStatusModal = ({
  record,
  setIsModalVisible,
  mutate,
  isMutateLoading,
  ...props
}: Props): ReactElement => {
  const handleDeactivate = (): void => {
    mutate(
      {
        isActive: TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES.DEACTIVATED,
        userId: record.id,
        organizationId: record.organizationId,
      },
      { onSuccess: () => setIsModalVisible(false) }
    );
  };

  return (
    <PaddedModal {...props} width="35rem" customTopAndBottomPadding="32px">
      <TextWrapper>
        <GenericHeading size="MD" weight="MEDIUM">
          {CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_CHANGE_MODAL.HEADING}
          {record.fullName ||
            CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_CHANGE_MODAL
              .USER_NAME_NOT_PRESENT_FALLBACK}
          ?
        </GenericHeading>
        <SpaceWrapper />
        <GenericSubHeading isGreyDisabled size="XS">
          {
            CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_CHANGE_MODAL
              .SUB_HEADING
          }
        </GenericSubHeading>
        <ButtonGroupWrapper>
          <SimpleButtonGroup
            firstButtonProps={{
              text:
                CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_CHANGE_MODAL
                  .CANCEL_BUTTON_TEXT,
              onClick: () => setIsModalVisible(false),
            }}
            secondButtonProps={{
              text:
                CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.STATUS_CHANGE_MODAL
                  .DEACTIVATE_BUTTON_TEXT,
              customType: "ERROR",
              loading: isMutateLoading,
              onClick: handleDeactivate,
            }}
          />
        </ButtonGroupWrapper>
      </TextWrapper>
    </PaddedModal>
  );
};
