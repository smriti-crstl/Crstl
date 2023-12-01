export interface InternalSlackAlert {
  timestampISOString: string;
  eventType: string;
  poNumber?: string;
  poValue?: string;
  tradingPartner: string;
  slackAlertBlocks?: { type: string; text: { type: string; text: string } }[];
  organizationName?: string | null;
  organizationId?: string;
  tradingPartnerId?: string;
  tradingPartnerFlavor?: string;
  emoji?: string;
}

export interface InternalSlackAlertPayload {
  eventType: InternalSlackAlertEventTypes;
  poNumber?: string;
  poValue?: string;
  tradingPartner: string;
  organizationName?: string | null;
  organizationId?: string;
  tradingPartnerId?: string;
  tradingPartnerFlavor: string;
  emoji?: string;
}

export enum InternalSlackAlertEventTypes {
  PO_RECEIVED = "New PO received",
  "864_RECEIVED" = "New 864 received"
}
