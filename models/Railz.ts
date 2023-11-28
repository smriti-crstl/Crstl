export interface RailzBusinessModel {
  data: {
    businessName: string | null;
  };
}

export interface RailzIntegrationModel {
  data: {
    integrationId: string;
    businessName: string | null;
    connectionId: string;
    serviceName: string;
    status: string;
    institution?: string;
    createdAt: Date;
    createdAtExt: string;
    accounts?: any[];
    isEnabled: boolean;
    createdBy?: string;
    integrationAppName: string;
  };
}
