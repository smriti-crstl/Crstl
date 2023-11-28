import { UserRoleFE } from "domain/entity/shared/models";
import { CORE_ONBOARDING, CoreRouteOnboardingOptions } from "globals/configs";
import { useSearchParams, useUserDetails } from "presentation/hooks/common";
import React from "react";
import { generatePath, useHistory } from "react-router-dom";

import { CardData } from "@crstl/api/src/apis/models/v1/edi/OnboardingTaskList";

import { SetOnboardingRequestModalData } from "../../../hooks/useSetupFormModal";
import { TRADING_PARTNER_ID_SEARCH_KEY } from "../../edi-tab/constants";
import { TASK_STATUS, USER_TASK_TYPE } from "../constants";
import { StyledActionButton } from "../styles";

interface PublicProps {
  cardData: CardData;
  toggleRequestModal: () => void;
  setRequestModalData: SetOnboardingRequestModalData;
  status: string;
  isListView: boolean;
  completedDate?: string;
}

export const ActionButton: React.FC<PublicProps> = ({
  cardData,
  toggleRequestModal,
  setRequestModalData,
  status,
  isListView = true,
  completedDate,
}) => {
  const [{ data: userData, isLoading: isUserDataLoading }] = useUserDetails();
  const history = useHistory();
  const searchParams = useSearchParams();

  const isTaskForOrgAdmin =
    cardData?.user_task_type === USER_TASK_TYPE.GLOBAL_EDI_SETUP ||
    cardData?.user_task_type === USER_TASK_TYPE.ALERTS_SETUP ||
    cardData?.user_task_type === USER_TASK_TYPE.EDI_SETUP;

  const handleClick = () => {
    if (cardData?.user_task_type === USER_TASK_TYPE.EDI_SETUP) {
      const path = generatePath(CORE_ONBOARDING, {
        tabName: CoreRouteOnboardingOptions.EDI,
      });
      if (!cardData?.trading_partner_id) {
        history.push(path);
        return;
      }
      searchParams.set(
        TRADING_PARTNER_ID_SEARCH_KEY,
        cardData?.trading_partner_id
      );
      history.push(`${path}?${searchParams.toString()}`);
    } else if (cardData?.user_task_type === USER_TASK_TYPE.ALERTS_SETUP) {
      const path = generatePath(CORE_ONBOARDING, {
        tabName: CoreRouteOnboardingOptions.ALERTS,
      });
      history.push(path);
    } else if (cardData?.user_task_type === USER_TASK_TYPE.GLOBAL_EDI_SETUP) {
      const path = generatePath(CORE_ONBOARDING, {
        tabName: CoreRouteOnboardingOptions.GLOBAL_EDI,
      });
      history.push(path);
    } else {
      toggleRequestModal();
      setRequestModalData({
        tradingPartnerId: cardData?.trading_partner_id,
        requestType: cardData?.connection_type,
        onboardingTaskId: cardData?.id,
      });
    }
  };

  if (status === "Completed") {
    if (!isListView) return null;
    return <span>{completedDate}</span>;
  }

  if (
    cardData?.assigned_to_user &&
    userData?.role !== UserRoleFE.Admin &&
    isTaskForOrgAdmin
  ) {
    return <span>{TASK_STATUS[status].nonAdminText}</span>;
  }

  if (
    !cardData?.assigned_to_user ||
    userData?.role !== UserRoleFE.Admin ||
    !isTaskForOrgAdmin
  ) {
    if (!isListView) return null;
    return <span>{TASK_STATUS[status].text}</span>;
  }

  return (
    <StyledActionButton
      backgroundColor={TASK_STATUS[status].color}
      isListView={isListView}
      loading={isUserDataLoading}
      onClick={handleClick}
    >
      {TASK_STATUS[status].buttonText}
    </StyledActionButton>
  );
};
