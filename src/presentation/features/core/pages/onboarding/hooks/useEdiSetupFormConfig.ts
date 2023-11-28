import { useEffect, useState } from "react";

import { CommonSelectOptions } from "@crstl/components/atoms/selects";

import {
  EDI_SETUP_FIELD_CONSTANTS,
  EDI_SETUP_FORM_CONFIG,
} from "../components/global-edi-tab/constants";
import { EdiSetupFormConfigType } from "../components/global-edi-tab/types";

type UseEdiSetupFormConfigProps = {
  orgUsers?: CommonSelectOptions;
  isOrgUsersLoading: boolean;
};

export const useEdiSetupFormConfig = ({
  orgUsers,
  isOrgUsersLoading,
}: UseEdiSetupFormConfigProps): [EdiSetupFormConfigType] => {
  const [ediSetupFormConfig, setEdiSetupFormConfig] = useState(
    EDI_SETUP_FORM_CONFIG
  );

  useEffect(() => {
    const updatedConfig = EDI_SETUP_FORM_CONFIG.map((item) => {
      switch (item.formFields.field) {
        case EDI_SETUP_FIELD_CONSTANTS.EDI_CONTACTS:
          return {
            ...item,
            loading: isOrgUsersLoading,
            options: orgUsers || [],
          };
        default:
          return item;
      }
    });
    setEdiSetupFormConfig(updatedConfig);
  }, [isOrgUsersLoading, orgUsers]);

  return [ediSetupFormConfig];
};

