import { Form } from "antd";
import { useCreateUserFromInviteQuery } from "domain/interactors/auth";
import { CORE_EDI_LIST_PAGE } from "globals/configs";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { parseSearchParams } from "presentation/utils";
import { ReactElement, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { BaseForm } from "@crstl/components/atoms/form";
import { GenericHeading } from "@crstl/components/atoms/typography";
import { CreateForm } from "@crstl/components/organisms/create-form";

import { AUTH_EMAIL_SIGNUP_FORM_CONFIG } from "./config";
import { AuthEmailSignUpFormValuesContract } from "./constants";
import { setNotification } from "domain/services/notification";
import { logout } from "domain/interactors/auth/service";

const EmailSignUpWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.MEDIUM} ${theme.spacing.XL}`};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > form {
    width: 80%;
    max-width: 22.5rem;
  }
`;

export const EmailSignUp = (): ReactElement => {
  const [form] = Form.useForm();
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = parseSearchParams<{
    organizationName: string;
    token: string;
    email: string;
    redirect?: string;
  }>(search);

  const { mutate, isLoading } = useCreateUserFromInviteQuery();

  console.log("AUTH_EMAIL_SIGNUP_FORM_CONFIG", AUTH_EMAIL_SIGNUP_FORM_CONFIG);
  const emailFieldIndex = AUTH_EMAIL_SIGNUP_FORM_CONFIG?.findIndex(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => {
      return item.formFields.id === "email-field";
    }
  );
  if (emailFieldIndex !== undefined && emailFieldIndex > -1) {
    AUTH_EMAIL_SIGNUP_FORM_CONFIG[emailFieldIndex].formFields.initialValue =
      searchParams.email;
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <EmailSignUpWrapper>
      <BaseForm
        form={form}
        layout="vertical"
        name="email-sign-up"
        onFinish={(values: AuthEmailSignUpFormValuesContract) => {
          const payload = {
            fullName: values.fullName,
            password: values.password,
            confirmPassword: values.confirmPassword,
          };
          mutate(
            {
              payload,
              params: {
                token: searchParams.token || "",
              },
            },
            {
              onSuccess: () => {
                const redirectUrl =
                  searchParams?.redirect ?? CORE_EDI_LIST_PAGE;
                history.replace(redirectUrl, {
                  showWelcomeModal: true,
                });
              },
              onError: (error) => {
                setNotification({
                  type: "error",
                  moduleName:
                    TEXT_CONSTANTS.EMAIL_SIGN_UP.MESSAGES.ACCOUNT.ERROR,
                  description: `${error.response?.data.message}`,
                });
              },
            }
          );
        }}
      >
        <GenericHeading>
          {TEXT_CONSTANTS.EMAIL_SIGN_UP.TEXTS.HEADING(
            searchParams.organizationName || ""
          )}
        </GenericHeading>
        <CreateForm data={AUTH_EMAIL_SIGNUP_FORM_CONFIG} />
        <ColoredButton
          style={{ width: "100%" }}
          loading={isLoading}
          buttonProps={{ htmlType: "submit" }}
        >
          {TEXT_CONSTANTS.EMAIL_SIGN_UP.TEXTS.CREATE_ACCOUNT_BUTTON}
        </ColoredButton>
      </BaseForm>
    </EmailSignUpWrapper>
  );
};

