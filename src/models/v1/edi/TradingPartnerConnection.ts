export interface ActiveIntegrationType {
  logo?: string;
  name: string;
}
export interface ConnectionsRowData {
  id: string;
  tradingPartner: {
    id: string;
    flavor?: string;
    logo?: string;
    name: string;
  };
  goLiveDate?: string;
  status: ConnectionsStatus;
  statusStyle: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  activeIntegrations: ActiveIntegrationType[];
}

export interface ConnectionsTPFResponse {
  status: number;
  code: string;
  data: {
    connections: ConnectionsRowData[];
    stats: {
      activeConnections: number;
      activeTradingPartnerConnections: number;
      activeIntegrationConnections: number;
      inactiveConnections: number;
    };
  };
}

export enum ConnectionsStatus {
  Active = "active",
  Inactive = "inactive"
}

export const StatusStyles = {
  active: {
    backgroundColor: "rgba(52, 168, 83, 0.17)",
    textColor: "rgb(52, 168, 83)",
    borderColor: "#00A74A"
  },
  inactive: {
    backgroundColor: "rgb(255, 239, 239)",
    textColor: "rgb(255, 0, 0)",
    borderColor: "rgb(255, 172, 172)"
  }
};
