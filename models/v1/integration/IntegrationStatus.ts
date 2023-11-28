export interface IntegrationStatusModel {
  source: string;
  currentStatus: "NotOK" | "OK";
  lastUpdatedAt?: string;
  integrationType: string;
}
