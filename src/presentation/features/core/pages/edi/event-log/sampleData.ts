import { EventLogResponseModelDataItem } from "domain/entity/edi/models";

export const sampleData: EventLogResponseModelDataItem[] = [
  {
    id: "6877654",
    eventNumber: "6877654",
    tradingPartner: "Target",
    documentId: "123456789098765432",
    documentType: "Purchase Order",
    documentTypeNumber: "850",
    documentDirection: "Incoming",
    documentDirectionStyle: {
      color: "#FF8000",
      borderColor: "#FABF79",
      backgroundColor: "#FEF4EA",
    },
    createdTimestamp: "2022-11-11T06:48:20Z",
    status: "N/A",
    statusTimestamp: "2022-11-11T06:48:20Z",
    statusStyle: {
      color: "#B0B0B0",
      borderColor: "#D9D9D9",
      backgroundColor: "#F4F4F4",
    },
    routing: {
      documentType: "purchase-order",
      id: "636b4e028813d877d15c07b8",
      tabName: "view",
      orderId: "636b4e028813d877d15c07b8",
    },
  },
  {
    id: "6877649",
    eventNumber: "6877649",
    tradingPartner: "Target",
    documentId: "68776490987654321",
    documentType: "Invoice",
    documentTypeNumber: "810",
    documentDirection: "Outgoing",
    documentDirectionStyle: {
      color: "#1890FF",
      borderColor: "#9DD0FF",
      backgroundColor: "#E7F3FF",
    },
    createdTimestamp: "2022-11-11T06:48:20Z",
    status: "Received",
    statusTimestamp: "2022-11-11T06:48:20Z",
    statusStyle: {
      color: "#34A853",
      borderColor: "rgba(52, 168, 83, 0.25)",
      backgroundColor: "rgba(52, 168, 83, 0.17)",
    },
  },
  {
    id: "6877652",
    eventNumber: "6877652",
    tradingPartner: "CVS",
    documentId: "68776520987654321",
    documentType: "Purchase Order",
    documentTypeNumber: "850",
    documentDirection: "Incoming",
    documentDirectionStyle: {
      color: "#FF8000",
      borderColor: "#FABF79",
      backgroundColor: "#FEF4EA",
    },
    createdTimestamp: "2022-11-11T06:48:20Z",
    status: "Sent",
    statusTimestamp: "2022-11-11T06:48:20Z",
    statusStyle: {
      color: "#1890FF",
      borderColor: "#9DD0FF",
      backgroundColor: "#E7F3FF",
    },
  },
];

