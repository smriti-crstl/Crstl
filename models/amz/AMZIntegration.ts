export interface AMZInitiateIntegrationModel {
  code: string;
  data: {
    uri: string;
    integrationLogId: string;
  }; // {uri: string, integrationLogId: string}
}

export interface AMZCreateIntegrationModel {
  code: string;
  data: boolean;
}
