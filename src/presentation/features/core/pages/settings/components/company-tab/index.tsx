import { Form, Select } from "antd";
import {
  useGetOrgDataQuery,
  usePutOrgDataOptimisticMutation,
} from "domain/interactors/edi-setup";
import {
  useGetOrganizationDetailsQuery,
  useGetUserTimezonesQuery,
  usePutOrganizationDetailsQuery,
} from "domain/interactors/profile";
import { useUserTeamQuery } from "domain/interactors/shared";
import { debounce } from "lodash";
import { useUserDetails } from "presentation/hooks/common";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement, useCallback, useLayoutEffect, useState } from "react";

import { HorizontallyCenteredPaperCard } from "components/atoms/card";
import { BaseForm } from "components/atoms/form";
import { Spinner } from "components/atoms/loading";
import { GenericHeading } from "components/atoms/typography";
import { CreateForm } from "components/organisms/create-form";

import { useCompanyDetailsFormConfig } from "../../hooks/useCompanyDetailsFormConfig";
import { extractMyCompanyDetailsFormFieldsDataFromOrganizationDetails } from "../../utils";
import { SettingsTabsWrapper } from "../common/wrapper";

const transformLabel = (timezone: string, altLabel?: string): string => {
  return timezone.replace("_", " ") + `${altLabel ? " - " + altLabel : ""}`;
};

export const SettingsCompanyDetailsTab = (): ReactElement => {
  const [companyContacts, setCompanyContacts] = useState<string[]>([]);
  const [companyDetailsForm] = Form.useForm();
  const [
    { data: userDetailsData, isLoading: isUserDetailsLoading },
  ] = useUserDetails();

  const {
    data,
    isLoading: isOrganizationDetailsLoading,
  } = useGetOrganizationDetailsQuery(userDetailsData?.organizationId || "", {
    enabled: !!userDetailsData?.organizationId,
  });

  const {
    data: timezonesUS,
    isLoading: isTimezonesUSLoading,
  } = useGetUserTimezonesQuery({
    select: (data) => {
      return data.map((item) => ({
        value: item.value,
        label: transformLabel(item.label, item.altLabel),
      }));
    },
  });

  const { data: orgUsers, isLoading: isLoadingOrgUsers } = useUserTeamQuery(
    userDetailsData?.organizationId || "",
    {
      select: (data) =>
        data
          .filter(({ isActive }) => isActive)
          .map((user) => ({ label: user.fullName, value: user.id })),
    }
  );

  const { mutate: mutateOrganizationDetails } = usePutOrganizationDetailsQuery(
    userDetailsData?.organizationId || ""
  );

  const {
    mutate: updateOrgData,
    isLoading: isUpdatingOrgData,
  } = usePutOrgDataOptimisticMutation();

  const { data: orgData, isLoading: isGetOrgDataLoading } = useGetOrgDataQuery(
    {
      contactPeople: true,
    },
    {
      onSuccess: (response) =>
        setCompanyContacts(response?.data?.companyContacts ?? []),
    }
  );

  useLayoutEffect(() => {
    if (data) {
      const myCompanyFormData = extractMyCompanyDetailsFormFieldsDataFromOrganizationDetails(
        data
      );
      companyDetailsForm.setFieldsValue({ ...myCompanyFormData });
    }
  }, [companyDetailsForm, data]);

  const [companyDetailsFormConfig] = useCompanyDetailsFormConfig({
    isLoading: isTimezonesUSLoading,
    timezonesUSData: timezonesUS,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValuesChange = useCallback(
    debounce(
      (_currentValue, allValues) => {
        if (userDetailsData?.organizationId) {
          mutateOrganizationDetails({
            payload: allValues,
            organizationId: userDetailsData?.organizationId,
          });
        } else {
          // TODO: FE Error configs, Add Logger
          throw new Error("Organization id not present");
        }
      },
      2000,
      { leading: false }
    ),
    [userDetailsData?.organizationId]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateContacts = useCallback(
    debounce(
      (_currentValue) => {
        const updatedData = {
          companyContacts: _currentValue,
          id: orgData?.data?.id ?? "",
        };
        updateOrgData(updatedData);
      },
      2000,
      { leading: false }
    ),
    [userDetailsData?.organizationId]
  );

  const handleUpdateContacts = (fieldValue: string[]) => {
    setCompanyContacts(() => {
      updateContacts(fieldValue);
      return fieldValue;
    });
  };

  return (
    <HorizontallyCenteredPaperCard>
      <SettingsTabsWrapper>
        <GenericHeading size="MD" weight="MEDIUM">
          {
            CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.TEXTS
              .COMPANY_DETAILS_HEADING
          }
        </GenericHeading>
        <BaseForm
          $shrinkFormItemsGap
          form={companyDetailsForm}
          layout="vertical"
          name="company-details"
          onValuesChange={handleValuesChange}
        >
          <Spinner
            spinning={
              isOrganizationDetailsLoading ||
              isUserDetailsLoading ||
              isUpdatingOrgData
            }
          >
            <CreateForm
              data={companyDetailsFormConfig}
              rowProps={{ gutter: 12 }}
            />
            <Form.Item label="Contacts">
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                options={orgUsers}
                // TODO: write logic for showing loader while the data is being saved
                loading={isLoadingOrgUsers || isGetOrgDataLoading}
                // TODO: read from and save to API
                onChange={handleUpdateContacts}
                value={companyContacts}
              />
            </Form.Item>
          </Spinner>
        </BaseForm>
      </SettingsTabsWrapper>
    </HorizontallyCenteredPaperCard>
  );
};

