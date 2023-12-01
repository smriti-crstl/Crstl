export const config = {
  eventType: "trigger",
  client: "Crstl"
};

export interface PagerDutyDetailsToSend {
  organizationId: string | undefined;
  documentType?: string;
  tradingPartner?: string;
  isa13?: string;
  gs06?: string;
  documentId?: string;
  messageTimestamp?: string;
}

export interface CreatePagerDutyIncidentResponse {
  status: string;
  message: string;
  incident_key?: string;
  errors?: Array<string>;
}

export const pagerDutyURL =
  "https://events.pagerduty.com/generic/2010-04-15/create_event.json";
