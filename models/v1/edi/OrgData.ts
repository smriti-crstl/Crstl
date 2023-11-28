import { EDI_OUTGOING_DOCUMENTS } from "../../../../repositories/v1/edi/edi.config";
import { SortDirection, SortKey } from "./ShippingLabel";

export interface OrgDataModel {
  id: string;
  companyContacts?: string[];
  ediContacts?: string[];
  default?: DefaultDataResponse;
  tradingPartnerOverrides?: TradingPartnerOverrides;
  intakeForm?: IntakeFormResponse;
}

export interface DefaultDataResponse {
  gs1Id?: string;
  shipFromAddress?: EDIAddressModel;
  remitToAddress?: EDIAddressModel;
}

export interface TradingPartnerOverrides {
  gs1Id?: string;
  tradingPartnerName?: string;
  tradingPartnerEdiId?: string;
  tradingPartnerId?: string;
  vendorId?: string;
  tradingPartnerEdiQualifier?: string;
  documentPreferences?: {
    documentType?: EDI_OUTGOING_DOCUMENTS;
    jedi: any;
    isCompleted?: boolean;
  };
}

export interface OrgDataResponse {
  code: string;
  status: number;
  data?: OrgDataModel;
  message?: string;
}

export interface EDIAddressModel {
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  countryCode?: string;
}

export interface UpdateOrgDataResponseModel {
  status: number;
  code: string;
  message?: string;
  errors?: Array<{ message?: string }>;
}

export interface EDIAddressInputModel {
  label: string;
  address_type: string;
  value: {
    name?: string;
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    country_code?: string;
  };
}

export interface IntakeFormResponse {
  processed?: string;
  vendorIds?: Array<{
    tradingPartnerId?: string;
    tradingPartnerName?: string;
    vendorId?: string;
    processed?: string;
  }>;
  questions?: {
    numberOfEdiTradingPartners?: number;
    averageMonthlyPoProcessed?: number;
    supportDropshipOrders?: string;
    workWith3pl?: string;
    interactWithEdiDocuments?: string;
    integrationsNeeded?: string[];
  };
}

export interface SaveCustomSortRequest {
  sortKey: SortKey;
  customSortOrder: string;
  direction?: SortDirection;
}

export interface SaveCustomSortResponse {
  status: number;
  code: string;
  message?: string;
}
export interface ContactEmailResponse {
  status: number;
  code: string;
  data: Array<{ email?: string; enabled?: boolean }>;
}
export interface UpdateContactEmailResponse {
  status: number;
  code: string;
  message: string;
}

export interface UpdateContactEmailRequest {
  email: string;
  enabled: boolean;
}
