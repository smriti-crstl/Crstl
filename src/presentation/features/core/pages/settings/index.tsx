import { UserRoleFE } from "domain/entity/shared/models";
import { CORE_SETTINGS } from "globals/configs";
import {
  CoreRouteSettingsOptions,
  ICoreRouteSettingsOptions
} from "globals/configs/urls/constants";
import { ValueOf } from "globals/types";
import { useUserDetails } from "presentation/hooks/common";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { Tabs } from "@crstl/components/atoms/tabs";

import { InviteTeammatesModal } from "./components/team-tab/invite-teammates";
import { useSettingsTabsConfig } from "./hooks/useSettingsTabsConfig";
import { useTeammatesModal } from "./hooks/useTeammatesModal";

const CoreSettings = (): ReactElement => {
  const history = useHistory();
  const { tabName } = useParams<{
    tabName: ValueOf<ICoreRouteSettingsOptions>;
  }>();

  const [{ data }] = useUserDetails();

  const onSettingsTabClick = (tabKey: string): void => {
    history.replace(generatePath(CORE_SETTINGS, { tabName: tabKey }));
  };

  const [settingsTabsConfig] = useSettingsTabsConfig({
    filterTeamsTab: data?.role !== UserRoleFE.Admin,
  });

  const [isTeammatesModalVisible, toggleTeammatesModal] = useTeammatesModal();

  return (
    <>
      <InviteTeammatesModal
        {...{
          isVisible: isTeammatesModalVisible,
          toggleModal: toggleTeammatesModal,
        }}
      />
      <Tabs
        activeKey={tabName}
        data={settingsTabsConfig}
        onTabClick={onSettingsTabClick}
        tabBarExtraContent={
          tabName === CoreRouteSettingsOptions.TEAM ? (
            <ColoredButton onClick={toggleTeammatesModal}>
              {CORE_SETTINGS_TEXT_CONSTANTS.TEAM_TAB.TEXTS.INVITE_BUTTON_TEXT}
            </ColoredButton>
          ) : null
        }
      />
    </>
  );
};

export default CoreSettings;

