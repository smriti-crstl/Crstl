export interface AuditLogs {
  status: number;
  code: string;
  data?: { data: AuditLogData[]; totalCount: number };
  message?: string;
}

export interface AuditLogData {
  tradingPartner?: string;
  tradingPartnerId?: string;
  tradingPartnerFlavor?: string;
  documentDirection: string;
  documentId?: string;
  referenceId?: string;
  eventNumber: string;
  eventType?: string;
  message?: string;
  level?: string;
  documentTypeNumber: string;
  createdTimestamp: string;
  documentDirectionStyle: {
    color: string;
    borderColor: string;
    backgroundColor: string;
  };
  documentType: string;
}

export const AuditLogConfig = {
  documentDirectionStyle: {
    Incoming: {
      color: "#FF8000",
      borderColor: "#FABF79",
      backgroundColor: "#FEF4EA"
    },
    Outgoing: {
      color: "#1890FF",
      borderColor: "#9DD0FF",
      backgroundColor: "#E7F3FF"
    }
  }
};
