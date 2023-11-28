const BCH_355_OPTIONS = [
  {
    value: "10",
    label: "Not Found",
    paragraph_number: "1",
  },
  {
    value: "11",
    label: "Response",
    paragraph_number: "1",
  },
  {
    value: "12",
    label: "Not Processed",
    paragraph_number: "1",
  },
  {
    value: "13",
    label: "Request",
    paragraph_number: "1",
  },
  {
    value: "14",
    label: "Advance Notification",
    paragraph_number: "1",
  },
  {
    value: "15",
    label: "Re-Submission",
    paragraph_number: "1",
  },
  {
    value: "16",
    label: "Proposed",
    paragraph_number: "1",
  },
  {
    value: "17",
    label: "Cancel, to be Reissued",
    paragraph_number: "1",
  },
  {
    value: "18",
    label: "Reissue",
    paragraph_number: "1",
  },
  {
    value: "19",
    label: "Seller initiated change",
    paragraph_number: "1",
  },
  {
    value: "20",
    label: "Final Transmission",
    paragraph_number: "1",
  },
  {
    value: "21",
    label: "Transaction on Hold",
    paragraph_number: "1",
  },
  {
    value: "22",
    label: "Information Copy",
    paragraph_number: "1",
  },
  {
    value: "24",
    label: "Draft",
    paragraph_number: "1",
  },
  {
    value: "25",
    label: "Incremental",
    paragraph_number: "1",
  },
  {
    value: "26",
    label: "Replace - Specified Buyers Parts Only",
    paragraph_number: "1",
  },
  {
    value: "27",
    label: "Verify",
    paragraph_number: "1",
  },
  {
    value: "28",
    label: "Query",
    paragraph_number: "1",
  },
  {
    value: "30",
    label: "Renewal",
    paragraph_number: "1",
  },
  {
    value: "31",
    label: "Allowance/Addition",
    paragraph_number: "1",
  },
  {
    value: "32",
    label: "Recovery/Deduction",
    paragraph_number: "1",
  },
  {
    value: "33",
    label: "Request for Payment",
    paragraph_number: "1",
  },
  {
    value: "34",
    label: "Payment Declined",
    paragraph_number: "1",
  },
  {
    value: "35",
    label: "Request Authority",
    paragraph_number: "1",
  },
  {
    value: "36",
    label: "Authority to Deduct (Reply)",
    paragraph_number: "1",
  },
  {
    value: "37",
    label: "Authority Declined (Reply)",
    paragraph_number: "1",
  },
  {
    value: "38",
    label: "No Financial Value",
    paragraph_number: "1",
  },
  {
    value: "39",
    label: "Response to Proposed Trip Plan",
    paragraph_number: "1",
  },
  {
    value: "40",
    label: "Commitment Advice",
    paragraph_number: "1",
  },
  {
    value: "41",
    label: "Corrected and Verified",
    paragraph_number: "1",
  },
  {
    value: "42",
    label: "Temporary Record",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Preliminary data that will be replaced with permanent information once \nverification of accuracy and completeness has been performed",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "43",
    label: "Request Permission to Service",
    paragraph_number: "1",
  },
  {
    value: "44",
    label: "Rejection",
    paragraph_number: "1",
  },
  {
    value: "45",
    label: "Follow-up",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A second or subsequent transmission of the transaction set when an expected \nresponse has not yet been received",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "46",
    label: "Cancellation with Refund",
    paragraph_number: "1",
  },
  {
    value: "47",
    label: "Transfer",
    paragraph_number: "1",
  },
  {
    value: "48",
    label: "Suspended",
    paragraph_number: "1",
  },
  {
    value: "49",
    label: "Original - No Response Necessary",
    paragraph_number: "1",
  },
  {
    value: "50",
    label: "Register",
    paragraph_number: "1",
    notes: [
      {
        content:
          "To provide such trading partner profile information as may be necessary to \nrequest registration as a trading partner in a system (e.g., be authorized to \nrender quotes to the government)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "51",
    label: "Historical Inquiry",
    paragraph_number: "1",
  },
  {
    value: "52",
    label: "Response to Historical Inquiry",
    paragraph_number: "1",
  },
  {
    value: "53",
    label: "Completion",
    paragraph_number: "1",
  },
  {
    value: "54",
    label: "Approval",
    paragraph_number: "1",
  },
  {
    value: "55",
    label: "Excavation",
    paragraph_number: "1",
  },
  {
    value: "56",
    label: "Expiration Notification",
    paragraph_number: "1",
  },
  {
    value: "57",
    label: "Initial",
    paragraph_number: "1",
  },
  {
    value: "77",
    label: "Simulation Exercise",
    paragraph_number: "1",
  },
  {
    value: "00",
    label: "Original",
    paragraph_number: "1",
  },
  {
    value: "01",
    label: "Cancellation",
    paragraph_number: "1",
  },
  {
    value: "02",
    label: "Add",
    paragraph_number: "1",
  },
  {
    value: "03",
    label: "Delete",
    paragraph_number: "1",
  },
  {
    value: "04",
    label: "Change",
    paragraph_number: "1",
  },
  {
    value: "05",
    label: "Replace",
    paragraph_number: "1",
  },
  {
    value: "06",
    label: "Confirmation",
    paragraph_number: "1",
  },
  {
    value: "07",
    label: "Duplicate",
    paragraph_number: "1",
  },
  {
    value: "08",
    label: "Status",
    paragraph_number: "1",
  },
  {
    value: "5C",
    label: "Chargeable Resubmission",
    paragraph_number: "1",
  },
  {
    value: "CN",
    label: "Completion Notification",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Signifies that the order is complete and the information contained within is \nfinal for the service request purchase order",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CO",
    label: "Corrected",
    paragraph_number: "1",
  },
  {
    value: "EX",
    label: "Final Loading Configuration",
    paragraph_number: "1",
  },
  {
    value: "GR",
    label: "Granted",
    paragraph_number: "1",
  },
  {
    value: "PR",
    label: "Proposed Loading Configuration",
    paragraph_number: "1",
  },
  {
    value: "RH",
    label: "Release Hold",
    paragraph_number: "1",
  },
  {
    value: "RV",
    label: "Revised Loading Configuration",
    paragraph_number: "1",
  },
  {
    value: "SU",
    label: "Status Update",
    paragraph_number: "1",
  },
  {
    value: "ZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
  {
    value: "SB",
    label: "Scan Based Trading",
    paragraph_number: "1",
  },
  {
    value: "DA",
    label: "Delgate to Alternative",
    paragraph_number: "1",
    notes: [
      {
        content:
          'Used by the currently responsible support point to delegate "ownership" of a \nProduct Quality Deficiency Report (PQDR) to an alternate support point',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ED",
    label: "Exhibit Disposition",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used by the receiver of the transaction to indicate compliance with \ninstructions for exhibit disposition confirmation",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ER",
    label: "Exhibit Receipt",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used by the receiver of the transaction to indicate an exhibit receipt",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FA",
    label: "Forward to Action Point",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used by the initial screening point to forward the Product Quality Deficiency \nReport (PQDR) from the screening point to an action point; i.e., assign a PQDR \nto an Action Point",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FC",
    label: "Forward to Contractor",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used by the inital screening point to forward ownership of a Product Quality \nDeficiency Report (PQDR) to a contractor",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FS",
    label: "Forward to Support Point",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used by an action point to forward ownership of a Product Quality Deficiency \nReport (PQDR) to a support point; i.e., assigns ownership of a PQDR to a \nsupport point",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "MD",
    label: "Materiel Disposition",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used by a support point or action point after the investigation has been \ncompleted to provide materiel disaposition",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RO",
    label: "Re-open",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Product Quality Deficiency Report (PQDR) has been re-opened by the system \nsending the transaction, and needs to be re-opened in the receiving system. \nTypically used when a PQDR is re-opened by a screening point in one system and \nneeds to be opened in another system. Also, treated as a request to re-open a \nPQDR when sent by an originator, action point, or support point to a screening \npoint",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RR",
    label: "Reply Rebuttal",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Used to provide a reply rebuttal to a previously received final reply",
        paragraph_number: "1",
      },
    ],
  },
];

export { BCH_355_OPTIONS };
