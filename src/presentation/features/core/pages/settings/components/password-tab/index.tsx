import { Form } from "antd";
import { setNotification } from "domain/services/notification";
import { ChangePasswordPlugIn } from "presentation/features/common/auth/plugins/change-password";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

import { HorizontallyCenteredPaperCard } from "@crstl/components/atoms/card";
import { GenericHeading } from "@crstl/components/atoms/typography";

import { SettingsTabsWrapper } from "../common/wrapper";

export const SettingsPasswordTab = (): ReactElement => {
  const [passwordResetFormInstance] = Form.useForm();
  const handlePasswordChangeSuccess = (): void => {
    passwordResetFormInstance.resetFields();
    setNotification({
      type: "success",
      moduleName:
        CORE_SETTINGS_TEXT_CONSTANTS.PASSWORD_TAB.SUCCESS_MESSAGES
          .PASSWORD_CHANGE.MODULE_NAME,
      description:
        CORE_SETTINGS_TEXT_CONSTANTS.PASSWORD_TAB.SUCCESS_MESSAGES
          .PASSWORD_CHANGE.MESSAGE,
    });
  };
  return (
    <HorizontallyCenteredPaperCard>
      <SettingsTabsWrapper>
        <GenericHeading size="MD" weight="MEDIUM">
          {
            CORE_SETTINGS_TEXT_CONSTANTS.PASSWORD_TAB.TEXTS
              .CHANGE_PASSWORD_HEADING
          }
        </GenericHeading>
        <ChangePasswordPlugIn
          customFormInstance={passwordResetFormInstance}
          successCallback={handlePasswordChangeSuccess}
          requiredFormMark={false}
          hideHeading
          buttonPlacement="right"
          saveButtonText={
            CORE_SETTINGS_TEXT_CONSTANTS.PASSWORD_TAB.TEXTS.SAVE_BUTTON_TEXT
          }
        />
      </SettingsTabsWrapper>
    </HorizontallyCenteredPaperCard>
  );
};
