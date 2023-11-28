import { EDIAddressModelFE } from "domain/entity/edi-setup/models";

import { OrgDataResponse } from "@crstl/api/src/apis/models/v1/edi/OrgData";
import {
  ICommonSelectProps,
  ISingleSelectProps,
} from "@crstl/components/atoms/selects";
import { CreateFormProps } from "@crstl/components/organisms/create-form";

// TODO: add types in packages/app/src/domain/entity/profile/models/index.ts for org data api

interface GetOrgDataRes {
  companyContacts: string[];
  ediContacts: string[];
  default: {
    gs1Id: string;
    shipFromAddress: EDIAddressModelFE;
    remitToAddress: EDIAddressModelFE;
  };
}

export type EdiSetupTabFieldConstants = {
  [key in
    | "COMPANY_CONTACTS"
    | "EDI_CONTACTS"
    | "GS1_PREFIX"
    | "SHIP_FROM_STREET_ADDRESS"
    | "SHIP_FROM_APT_ADDRESS"
    | "SHIP_FROM_CITY"
    | "SHIP_FROM_COUNTRY"
    | "SHIP_FROM_STATE"
    | "SHIP_FROM_ZIP_CODE"
    | "REMIT_TO_STREET_ADDRESS"
    | "REMIT_TO_APT_ADDRESS"
    | "REMIT_TO_CITY"
    | "REMIT_TO_COUNTRY"
    | "REMIT_TO_STATE"
    | "REMIT_TO_ZIP_CODE"]:
    | keyof GetOrgDataRes
    | Array<
        | keyof GetOrgDataRes
        | keyof GetOrgDataRes["default"]
        | keyof EDIAddressModelFE
      >;
};

export type EdiSetupFormConfigType = Array<
  | CreateFormProps
  | CreateFormProps<ISingleSelectProps>
  | CreateFormProps<ICommonSelectProps>
>;

export type EdiSetupFormDataType = OrgDataResponse["data"];

