import { Form } from "antd";
import { useLoginQuery } from "domain/interactors/auth";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_LIST_VIEW,
  CORE_SETUP,
  RESET_PASSWORD,
  ORG_SELECTION,
} from "globals/configs";
import { History } from "history";
import { useFlags } from "launchdarkly-react-client-sdk";
import { PrivateRouteLocationStateProps } from "presentation/router";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

import { Role } from "models/User";
import { ColoredButton } from "components/atoms/buttons";
import { GenericHeading } from "components/atoms/typography";
import { CreateForm } from "components/organisms/create-form";

import { AUTH_PLUGINS_LOGIN_FORM_CONFIG } from "./config";
import { ForgotPasswordSpan, ResetPasswordLink } from "./styles";

export type LoginPlugInProps = {
  history: History;
  isLoading?: boolean;
  redirectionCallback?: () => void;
};

export const LoginPlugIn = ({
  history,
  redirectionCallback,
  isLoading,
}: LoginPlugInProps): ReactElement => {
  const { mutate, isLoading: isUseLoginQueryLoading } = useLoginQuery();
  const { state, search } = useLocation<PrivateRouteLocationStateProps>();
  return (
    <Form
      layout="vertical"
      name="login"
      onFinish={(payload) =>
        mutate(payload, {
          onSuccess: (res) => {
            const { role } = res;
            const isMultiOrg = !!res.is_multi_org;
            if (isMultiOrg) {
              history.push({ pathname: ORG_SELECTION });
            } else {
              if (redirectionCallback) {
                redirectionCallback();
              } else {
                history.push({
                  pathname:
                    role === Role.Intake ? CORE_SETUP : CORE_EDI_LIST_VIEW, // TODO: Change back to CORE_HOME
                  state,
                  search,
                });
              }
            }
          },
          onError: (error) => {
            setNotification({
              type: "error",
              description: error.response?.data.general || "",
              moduleName:
                error.response?.data?.data?.message ||
                `${TEXT_CONSTANTS.ROUTER.SOMETHING_WENT_WRONG}. Please try again`,
            });
          },
        })
      }
    >
      <GenericHeading size="MD">
        {TEXT_CONSTANTS.PLUGINS.LOGIN.TEXTS.LOG_IN_HEADING}
      </GenericHeading>
      <CreateForm data={AUTH_PLUGINS_LOGIN_FORM_CONFIG} />
      <ColoredButton
        loading={isLoading || !!isUseLoginQueryLoading}
        buttonProps={{ htmlType: "submit", style: { marginTop: "4px" } }}
      >
        {TEXT_CONSTANTS.PLUGINS.LOGIN.TEXTS.LOGIN_BUTTON}
      </ColoredButton>
      <ForgotPasswordSpan>
        Unable to login?{" "}
        <ResetPasswordLink to={RESET_PASSWORD}>
          Reset password
        </ResetPasswordLink>
      </ForgotPasswordSpan>
    </Form>
  );
};

