export interface EnhanceJsonSchemaInput {
  tradingPartnerQualifier: string;
  tradingPartnerId: string; // this is the trading partner's EDI ID
  documentType: string;
  ediStandard: string;
  ediRelease: string;
  jsonSchema: any;
  tradingPartnerObjectId: string; // this is the _id of the trading partner document in tradin-partner collection
}

export interface EnhanceJsonSchemaResponse {
  status: number;
  code: string;
  message: string;
  errors?: Array<{ message: string }>;
}

export interface UpdateSchemaState {
  status: number;
  code: string;
  message?: string;
  errors?: Array<{ message: string }>;
}

export enum NewSchemaState {
  active = "active",
  archived = "archived"
}
