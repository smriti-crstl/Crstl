import { Form } from "antd";
import {
  useGetOrganizationsQuery,
  useSwitchOrganizationQuery,
} from "domain/interactors/auth";
import { setNotification } from "domain/services/notification";
import { CORE_EDI_LIST_VIEW, CORE_SETUP } from "globals/configs";
import { History } from "history";
import { PrivateRouteLocationStateProps } from "presentation/router";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

import { Role } from "@crstl/api/src/apis/models/User";
import { ColoredButton } from "@crstl/components/atoms/buttons";
import { GenericHeading } from "@crstl/components/atoms/typography";
import { CreateForm } from "@crstl/components/organisms/create-form";

export type OrgSelectionPlugInProps = {
  history: History;
  isLoading?: boolean;
  redirectionCallback?: () => void;
};

export const OrgSelectionPlugIn = ({
  history,
  redirectionCallback,
  isLoading,
}: OrgSelectionPlugInProps): ReactElement => {
  const {
    mutate,
    isLoading: isUseLoginQueryLoading,
  } = useSwitchOrganizationQuery(false);
  const {
    data: organizationsRes,
    isLoading: organizationsLoading,
  } = useGetOrganizationsQuery();
  const organizations = organizationsRes?.data || [];
  const { state, search } = useLocation<PrivateRouteLocationStateProps>();
  // const [{ isLoggedIn }] = useAuthentication();

  return (
    <Form
      layout="vertical"
      name="org-selection"
      onFinish={(payload) =>
        mutate(payload, {
          onSuccess: ({ role }) => {
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
          },
          onError: (error) => {
            setNotification({
              type: "error",
              description: error.response?.data.general || "",
              moduleName:
                error.response?.data.message ||
                `${TEXT_CONSTANTS.ROUTER.SOMETHING_WENT_WRONG}. Please try again`,
            });
          },
        })
      }
    >
      <GenericHeading size="MD">{"Select Organization"}</GenericHeading>
      <CreateForm
        data={[
          {
            componentType: "single-select",
            options: organizations.map((org: any) => ({
              label: org.name,
              value: org.id,
            })),
            loading: organizationsLoading,
            formFields: {
              field: "organization_id",
              label: "Organization",
              name: "organization_id",

              rules: [
                {
                  required: true,
                  message:
                    "Please select an organisation to continue with login",
                },
              ],
            },
          },
        ]}
      />

      <ColoredButton
        loading={isLoading || !!isUseLoginQueryLoading}
        buttonProps={{ htmlType: "submit", style: { marginTop: "4px" } }}
      >
        {"Complete login"}
      </ColoredButton>
    </Form>
  );
};

