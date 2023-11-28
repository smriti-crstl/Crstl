import { StatusLabel as _StatusLabel } from "@crstl/api/src/apis/models/PurchaseOrder";
import {
  JobFunctions as _JobFunctions,
  Role as _Role,
  UserModel,
} from "@crstl/api/src/apis/models/User";
import {
  SearchDocumentsDocumentModel,
  SearchDocumentsInput,
  SearchDocumentsResponseDataModel,
} from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import {
  DocumentModel,
  TradingPartnerDocumentsModel,
  TradingPartnersModel,
} from "@crstl/api/src/apis/models/v1/edi/TradingPartner";
import { InvitedUser } from "@crstl/api/src/apis/models/v1/InviteUser";

export type AdvancedSearchDocsType = SearchDocumentsInput;
export type AdvancedSearchDocsRes = SearchDocumentsResponseDataModel;
export type SearchDocumentsDocumentModelFE = SearchDocumentsDocumentModel;

export type UserDetailsRes = UserModel;
export type InvitedUserFe = InvitedUser;

export type OrgTradingPartnerRes = TradingPartnersModel;
export type OrgTradingPartnerDocsRes = TradingPartnerDocumentsModel;
export type OrgTPDocType = DocumentModel;

export type SearchTradingPartnerRes = TradingPartnersModel;

export { _Role as UserRoleFE };
export { _JobFunctions as UserJobFunctionsFE };
export { _StatusLabel as StatusLabelFE };

export interface UserResponse {
  full_name: string;
  email: string;
  id: string;
  organization_id?: string;
  organization_name: string;
  role: string;
  job_function: string;
  created_at: string;
  is_registered: string;
  is_active: string;
  email_domain: string;
  last_sign_in_time: string;
  last_active_at: string;
  timezone: string;
  alt_label: string;
  timezone_id: string;
  auth_app_id: string;
  deleted_at: string;
}

