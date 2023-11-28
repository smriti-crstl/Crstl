import { Form } from "antd";
import { useAuthentication } from "domain/interactors/auth/hooks";
import { CORE_INTEGRATIONS_ALL, CoreShopifyAppTypes } from "globals/configs";
import { AuthContainerLayout } from "presentation/features/common/auth/containers";
import { SHOPIFY_ONBOARDING_TEXT_CONSTANTS } from "presentation/texts-reservoir/common/shopify";
import { ReactElement, useLayoutEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import styled from "styled-components";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { BaseForm } from "@crstl/components/atoms/form";
import { GenericHeading } from "@crstl/components/atoms/typography";
import { CreateForm } from "@crstl/components/organisms/create-form";

import { SHOPIFY_ONBOARDING_FORM_CONFIG } from "./config";
import { ShopifyOnboardingFormValuesContract } from "./constants";

const ShopifyOnboardingWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.MEDIUM} ${theme.spacing.XL}`};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > form {
    width: 80%;
    max-width: 20rem;
  }
`;
export const ShopifyOnboarding = (): ReactElement => {
  const [form] = Form.useForm();
  const [{ isAuthenticated }] = useAuthentication();
  const history = useHistory();
  const { search } = useLocation();
  const { type } = useParams<{ type: CoreShopifyAppTypes }>();

  useLayoutEffect(() => {
    // Redirecting to the integrations page if already logged in
    if (isAuthenticated) {
      history.replace({
        pathname: CORE_INTEGRATIONS_ALL,
        search,
        state: { isCustom: type === "custom" ? true : false },
      });
    }
  }, [history, isAuthenticated, search, type]);

  return (
    <AuthContainerLayout>
      <ShopifyOnboardingWrapper>
        <BaseForm
          form={form}
          layout="vertical"
          name="email-sign-up"
          onFinish={(values: ShopifyOnboardingFormValuesContract) => {
            console.log(values);
            // const payload = {
            //   fullName: values.fullName,
            //   password: values.password,
            //   confirmPassword: values.confirmPassword,
            // };
            // mutate(
            //   { payload, params: { token: searchParams.token || "" } },
            //   {
            //     onSuccess: () => {
            //       history.replace(CORE_HOME, { showWelcomeModal: true });
            //     },
            //   }
            // );
          }}
        >
          <GenericHeading>
            {SHOPIFY_ONBOARDING_TEXT_CONSTANTS.TEXTS.HEADING("")}
          </GenericHeading>
          <CreateForm data={SHOPIFY_ONBOARDING_FORM_CONFIG} />
          <ColoredButton
            style={{ width: "100%" }}
            loading={false}
            buttonProps={{ htmlType: "submit" }}
          >
            {SHOPIFY_ONBOARDING_TEXT_CONSTANTS.TEXTS.CREATE_ACCOUNT_BUTTON}
          </ColoredButton>
        </BaseForm>
      </ShopifyOnboardingWrapper>
    </AuthContainerLayout>
  );
};
