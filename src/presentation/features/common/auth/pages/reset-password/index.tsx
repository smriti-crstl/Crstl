import { ColoredButton } from "@crstl/components/atoms/buttons";
import { BaseForm } from "@crstl/components/atoms/form";
import { GenericHeading } from "@crstl/components/atoms/typography";
import { CreateForm } from "@crstl/components/organisms/create-form";
import { Form } from "antd";
import { useResetPasswordQuery } from "domain/interactors/auth";
import { setNotification } from "domain/services/notification";
import { LOGIN } from "globals/configs";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { AUTH_RESET_PASSWORD_FORM_CONFIG } from "./config";
import { DisclaimerText, LoginLink, ResetPasswordWrapper } from "./styles";
import { AuthResetPasswordFormValuesContract } from "./types";

export const ResetPassword = () => {
  const [form] = Form.useForm();

  const { mutate, isLoading } = useResetPasswordQuery();

  return (
    <ResetPasswordWrapper>
      <BaseForm
        form={form}
        layout="vertical"
        name="reset-password"
        onFinish={(values: AuthResetPasswordFormValuesContract) => {
          mutate(values, {
            onSuccess: () =>
              setNotification({
                type: "success",
                moduleName:
                  TEXT_CONSTANTS.RESET_PASSWORD.MESSAGES.PASSWORD.SUCCESS,
              }),
            onError: () =>
              setNotification({
                type: "error",
                moduleName:
                  TEXT_CONSTANTS.RESET_PASSWORD.MESSAGES.PASSWORD.ERROR,
              }),
          });
        }}
      >
        <GenericHeading>
          {TEXT_CONSTANTS.RESET_PASSWORD.TEXTS.HEADING}
        </GenericHeading>
        <CreateForm data={AUTH_RESET_PASSWORD_FORM_CONFIG} />
        <ColoredButton loading={isLoading} buttonProps={{ htmlType: "submit" }}>
          {TEXT_CONSTANTS.RESET_PASSWORD.TEXTS.RESET_PASSWORD_BUTTON}
        </ColoredButton>
        <DisclaimerText>
          Go to <LoginLink to={LOGIN}>Log in</LoginLink>
        </DisclaimerText>
      </BaseForm>
    </ResetPasswordWrapper>
  );
};

