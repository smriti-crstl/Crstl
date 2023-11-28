export interface QBOInitiateIntegrationModel {
  code: string;
  data: {
    uri: string;
    integrationLogId: string;
  }; // {uri: string, integrationLogId: string}
}

export interface QBOCreateIntegrationModel {
  code: string;
  data: boolean;
}
