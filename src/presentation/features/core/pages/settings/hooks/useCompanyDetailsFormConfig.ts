import { useEffect, useState } from "react";

import {
  ISingleSelectProps,
  SingleSelectOptions,
} from "@crstl/components/atoms/selects";
import { CreateFormProps } from "@crstl/components/organisms/create-form";

import { PROFILE_TAB_COMPANY_DETAILS_FORM_CONFIG } from "../config";
import { COMPANY_DETAILS_FIELD_CONSTANTS } from "../constants";

type CompanyDetailsFormConfigProps = {
  isLoading: boolean;
  timezonesUSData?: SingleSelectOptions;
};

export const useCompanyDetailsFormConfig = ({
  isLoading,
  timezonesUSData,
}: CompanyDetailsFormConfigProps): Array<
  Array<CreateFormProps | CreateFormProps<ISingleSelectProps>>
> => {
  const [companyDetailsFormConfig, setCompanyDetailsFormConfig] = useState(
    PROFILE_TAB_COMPANY_DETAILS_FORM_CONFIG
  );
  useEffect(() => {
    const updatedConfig = PROFILE_TAB_COMPANY_DETAILS_FORM_CONFIG.map(
      (item) => {
        switch (item.formFields.field) {
          case COMPANY_DETAILS_FIELD_CONSTANTS.TIMEZONE:
            return {
              ...item,
              loading: isLoading,
              options: timezonesUSData || [],
            };
          default:
            return item;
        }
      }
    );
    setCompanyDetailsFormConfig(updatedConfig);
  }, [isLoading, timezonesUSData]);

  return [companyDetailsFormConfig];
};
