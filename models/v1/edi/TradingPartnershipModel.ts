export interface TradingPartnership {
  _id: string;
  organization_id: string;
  integration_id: string;
  partnership_type: string;
  created_at: string;
  updated_at?: string;
  trading_partner_edi_id?: string;
  trading_partner_edi_qualifier?: string;
  organization_edi_id?: string;
  organization_edi_qualifier?: string;
  as2_from?: string;
  as2_to?: string;
  subject?: string;
  attachment?: string;
  prefixes?: any;
  disable_resend?: any;
  props?: any;
  integration_key?: string;
  fetch_metadata?: string;
  trading_partner_id?: string;
}
