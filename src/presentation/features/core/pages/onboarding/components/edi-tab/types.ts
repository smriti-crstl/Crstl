import { EDI_OUTGOING_DOCUMENTS } from "@crstl/api/src/repositories/v1/edi/edi.config";

import {
  DOCUMENT_TYPE_SEARCH_KEY,
  TRADING_PARTNER_ID_SEARCH_KEY,
} from "./constants";

export type EdiSetupParams = {
  [DOCUMENT_TYPE_SEARCH_KEY]: string;
  [TRADING_PARTNER_ID_SEARCH_KEY]: string;
};

export type FormDocumentType = EDI_OUTGOING_DOCUMENTS | string;

