export interface StatusModel {
  status: string;
  backgroundColor: string;
  textColor: string;
}

export interface ConfigModel {
  InvoiceStatus: StatusModel[];
  Payment: StatusModel[];
  FulfillmentStatus: StatusModel[];
  OrderStatus: StatusModel[];
  ChargeBackStatus: StatusModel[];
  DeliveryStatus: StatusModel[];
}

// export interface ConfigModel
// {
//   InvoiceStatus: [
//     {
//       status: "Sent";
//       backgroundColor: "#03989E";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Open";
//       backgroundColor: "#F2C94C";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Closed";
//       backgroundColor: "#D4D7DE";
//       textColor: "#000000";
//     }
//   ];

//   Payment: [
//     {
//       status: "Pending";
//       backgroundColor: "#F2C94C";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Paid";
//       backgroundColor: "#D4D7DE";
//       textColor: "#000000";
//     },
//     {
//       status: "Partially Paid";
//       backgroundColor: "#C9D6F5";
//       textColor: "#002A98";
//     }
//   ];

//   FulfillmentStatus: [
//     {
//       status: "Fulfilled";
//       backgroundColor: "#03989E";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Unfulfilled";
//       backgroundColor: "#F2C94C";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Partially fulfilled";
//       backgroundColor: "#C9D6F5";
//       textColor: "#002A98";
//     },
//     {
//       status: "Scheduled";
//       backgroundColor: "#D4D7DE";
//       textColor: "#000000";
//     }
//   ];

//   OrderStatus: [
//     {
//       status: "Open";
//       backgroundColor: "#D4D7DE";
//       textColor: "#000000";
//     },
//     {
//       status: "Acknowledged";
//       backgroundColor: "#C9D6F5";
//       textColor: "#002A98";
//     },
//     {
//       status: "PO Change";
//       backgroundColor: "#F2C94C";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Ship Notice";
//       backgroundColor: "#03989E";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "In Progress";
//       backgroundColor: "#F0F0F0";
//       textColor: "#848484";
//     }
//   ];

//   ChargeBackStatus: [
//     {
//       status: "Open";
//       backgroundColor: "#F2C94C";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Submitted";
//       backgroundColor: "#D4D7DE";
//       textColor: "#000000";
//     },
//     {
//       status: "Won";
//       backgroundColor: "#03989E";
//       textColor: "#FFFFFF";
//     },
//     {
//       status: "Lost";
//       backgroundColor: "#E33436";
//       textColor: "#FFFFFF";
//     }
//   ];
// }
