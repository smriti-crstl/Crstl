// TODO: check active integrations on FE when api returns this data
export interface ActiveIntegration {
  logo?: string;
  name: string;
}

export interface TradingPartner {
  id: string;
  flavor?: string;
  logo?: string;
  name: string;
}

export interface Stats {
  activeConnections: number;
  activeTradingPartnerConnections: number;
  activeIntegrationConnections: number;
  inactiveConnections: number;
}
export interface ConnectionsRowData {
  id: string;
  tradingPartner: TradingPartner;
  goLiveDate?: string;
  status: "active" | "inactive";
  statusStyle: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  activeIntegrations: ActiveIntegration[];
}

export interface ConnectionsTPFRes {
  status: number;
  code: string;
  data: {
    connections: ConnectionsRowData[];
    stats: Stats;
  };
}

