export interface TradingPartnersModel {
  status: number;
  code: string;
  data: TradingPartner[];
}

export interface TradingPartner {
  id: string;
  name: string;
  status?: string;
  flavor?: string;
}

export interface TradingPartnerDocumentsModel {
  status: number;
  code: string;
  data?: DocumentModel[];
  message?: string;
}

export interface DocumentModel {
  label: string;
  value: string;
  isCompleted?: boolean;
}
