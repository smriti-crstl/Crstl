import { Form } from "antd";
import {
  useGetOrgDataQuery,
  usePutOrgDataMutation,
} from "domain/interactors/edi-setup";
import { useUserTeamQuery } from "domain/interactors/shared";
import { setNotification } from "domain/services/notification";
import { useUserDetails } from "presentation/hooks/common";
import { useState } from "react";

import { BaseForm } from "components/atoms/form";
import { Spinner } from "components/atoms/loading";
import { GenericHeading } from "components/atoms/typography";
import { CreateForm } from "components/organisms/create-form";

import { StyledPrimaryButton } from "../../../../edi-edit/EdiEditPage.styles";
import { useEdiSetupFormConfig } from "../../../hooks/useEdiSetupFormConfig";
import { SectionWrapper, TitleContainer } from "../styles";
import { EdiSetupFormDataType } from "../types";

export const BasicInfo = () => {
  const [ediSetupTabForm] = Form.useForm<EdiSetupFormDataType>();

  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  const [
    { data: userDetailsData, isLoading: isUserDetailsLoading },
  ] = useUserDetails();

  const { data: orgUsers, isFetching: isOrgUsersFetching } = useUserTeamQuery(
    userDetailsData?.organizationId || "",
    {
      select: (data) =>
        data
          .filter(({ isActive }) => isActive)
          .map((user) => ({ label: user.fullName, value: user.id })),
    }
  );

  const [ediSetupFormConfig] = useEdiSetupFormConfig({
    orgUsers,
    isOrgUsersLoading: isOrgUsersFetching,
  });

  const { isFetching: isGetOrgDataFetching } = useGetOrgDataQuery(
    {},
    {
      onSuccess: (response) => {
        if (!response?.data) {
          return;
        }
        const myCompanyFormData: EdiSetupFormDataType = {
          id: response?.data.id,
          ediContacts: response?.data?.ediContacts ?? [],
          default: {
            gs1Id: response?.data?.default?.gs1Id,
            shipFromAddress: response?.data?.default?.shipFromAddress,
            remitToAddress: response?.data?.default?.remitToAddress,
          },
        };

        ediSetupTabForm.setFieldsValue({ ...myCompanyFormData });
      },
    }
  );

  const {
    mutate: updateOrgData,
    isLoading: isUpdatingOrgData,
  } = usePutOrgDataMutation();

  const handleClickSaveOrgData = () => {
    const payload = ediSetupTabForm.getFieldsValue();
    const { address1, city, countryCode, postalCode, region } =
      payload?.default?.shipFromAddress ?? {};

    // GS1 Prefix
    const gs1Id = payload?.default?.gs1Id;
    if (!payload?.default?.gs1Id) {
      setNotification({
        type: "error",
        moduleName: "Please add GS1 Prefix",
      });
      return;
    }
    if (gs1Id?.[0] !== "0") {
      setNotification({
        type: "error",
        moduleName: "GS1 Prefix should start with a 0",
      });
      return;
    }
    if (!address1 || !city || !countryCode || !postalCode || !region) {
      setNotification({
        type: "error",
        moduleName: "Please add all Ship from Address fields",
      });
      return;
    }

    if (!payload) {
      return;
    }

    updateOrgData(payload, {
      onSuccess: () => {
        setIsFormDirty(false);
        setNotification({
          type: "info",
          moduleName: "Updated successfully",
        });
      },
      onError: () =>
        setNotification({
          type: "error",
          moduleName: "Some error occurred",
        }),
    });
  };
  return (
    <SectionWrapper>
      <TitleContainer>
        <GenericHeading
          size="MD"
          weight="MEDIUM"
          style={{ alignSelf: "flex-start" }}
        >
          Global EDI Setup
        </GenericHeading>
        <StyledPrimaryButton
          onClick={handleClickSaveOrgData}
          disabled={
            isGetOrgDataFetching ||
            !isFormDirty ||
            isUpdatingOrgData ||
            isUserDetailsLoading
          }
        >
          Save
        </StyledPrimaryButton>
      </TitleContainer>
      <BaseForm
        form={ediSetupTabForm}
        layout="vertical"
        name="edi-setup"
        onValuesChange={() => setIsFormDirty(true)}
      >
        <Spinner
          spinning={
            isGetOrgDataFetching || isUpdatingOrgData || isOrgUsersFetching
          }
        >
          <CreateForm rowProps={{ gutter: 12 }} data={ediSetupFormConfig} />
        </Spinner>
      </BaseForm>
    </SectionWrapper>
  );
};

