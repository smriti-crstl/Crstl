import { Form, FormInstance } from "antd";
import { useChangePasswordQuery } from "domain/interactors/auth";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { BaseForm } from "@crstl/components/atoms/form";
import { GenericHeading } from "@crstl/components/atoms/typography";
import { CreateForm } from "@crstl/components/organisms/create-form";

import { AUTH_PLUGIN_CHANGE_PASSWORD_FORM_CONFIG } from "./config";

type Props = {
  successCallback?: () => void;
  hideHeading?: boolean;
  buttonPlacement?: "right";
  requiredFormMark?: boolean;
  saveButtonText?: string;
  customFormInstance?: FormInstance;
};

export const ChangePasswordPlugIn = ({
  successCallback,
  hideHeading,
  requiredFormMark,
  saveButtonText,
  buttonPlacement,
  customFormInstance,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useChangePasswordQuery();
  return (
    <BaseForm
      requiredMark={requiredFormMark}
      form={customFormInstance || form}
      layout="vertical"
      name="change-password"
      onFinish={(values) => {
        mutate(values, { onSuccess: () => successCallback?.() });
      }}
    >
      {!hideHeading && (
        <GenericHeading size="MD">
          {TEXT_CONSTANTS.PLUGINS.CHANGE_PASSWORD.TEXTS.CHANGE_PASSWORD_HEADING}
        </GenericHeading>
      )}
      <CreateForm data={AUTH_PLUGIN_CHANGE_PASSWORD_FORM_CONFIG} />
      <ColoredButton
        loading={isLoading}
        buttonProps={{ htmlType: "submit" }}
        $buttonPlacement={buttonPlacement}
      >
        {saveButtonText ||
          TEXT_CONSTANTS.PLUGINS.CHANGE_PASSWORD.TEXTS
            .CHANGE_PASSWORD_BUTTON_TEXT}
      </ColoredButton>
    </BaseForm>
  );
};
