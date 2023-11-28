import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

import { HorizontallyCenteredPaperCard } from "@crstl/components/atoms/card";
import { GenericHeading } from "@crstl/components/atoms/typography";

import { SettingsTabsWrapper } from "../common/wrapper";
import { ProfileTabMyProfileFields } from "./my-profile";

export const SettingsProfileTab = (): ReactElement => {
  return (
    <HorizontallyCenteredPaperCard>
      <SettingsTabsWrapper>
        <GenericHeading size="MD" weight="MEDIUM">
          {CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.TEXTS.MY_PROFILE_HEADING}
        </GenericHeading>
        <ProfileTabMyProfileFields />
      </SettingsTabsWrapper>
    </HorizontallyCenteredPaperCard>
  );
};
