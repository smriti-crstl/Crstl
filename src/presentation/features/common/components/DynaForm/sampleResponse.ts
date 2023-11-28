/**
 * BIG_01, CAD_04, CAD_05,ST_02
 */
// const sampleResponseWithoutSubform = {
//   metadata: {
//     key: "Target-Invoice",
//     onSubmit: {
//       endpoint: "",
//     },
//   },
//   data: [
//     {
//       id: "60dfc4c6-2299-43c3-a177-ae0adcf862b8",
//       label: "Invoice Number",
//       name: "76_BIG_02",
//       type: "input",
//       dataType: "AN",
//       placeholder: "Enter Invoice Number",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Invoice Number",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 22,
//           message: "Can have at most 22 characters",
//         },
//         {
//           note:
//             "Note: Invoice numbers must not be more than 19 characters long. Invoice\nnumbers may contain alphas but no special characters. Alpha characters must\nbe in uppercase.",
//         },
//       ],
//     },
//     {
//       id: "a49dd15c-57a8-4405-af7b-9ff25f34c873",
//       label: "Purchase Order Number",
//       name: "324_BIG_04",
//       type: "input",
//       dataType: "AN",
//       placeholder: "Enter Purchase Order Number",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Purchase Order Number",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 22,
//           message: "Can have at most 22 characters",
//         },
//         {
//           note:
//             "Identifying number for Purchase Order assigned by the orderer/purchaser\nTargetStores:\nThis field is required.\nSend the same number here that was received on the 850 PO in element\nBEG03.\nThep urchase order number will be formatted either as SSSS-PPPPPPP-LLLL\n(17 characters) or SSSS-PPPPPPP (12 characters).\nSSSS = Sourcecode,PPPPPPP = PO number,LLLL = Location ID Code\nTarget.com:\nThis field is required.\nSend the same number here that was received on the 850 PO in element\nBEG03.\nThe purchase order number will be formatted as\nSSSS-PPPPPPP-LLLL (17 characters)or\nSSSS-PPPPPPPP-LLLL (18 characters)or\nSSSS-PPPPPPP (12 characters)or\nSSSS-PPPPPPPP (13 characters)\nSSSS = Sourcecode,PPPPPPP orPPPPPPPP = PO number,LLLL =\nLocation ID CodeTargetStores:\nThisfield isrequired.\nSend thesamenumberherethatwasreceived on the850 PO in element\nBEG03.\nThepurchaseordernumberwillbeformatted eitherasSSSS-PPPPPPP-LLLL\n(17 characters)orSSSS-PPPPPPP (12 characters).\nSSSS = Sourcecode,PPPPPPP = PO number,LLLL = Location ID Code\nTarget.com:\nThisfield isrequired.\nSend thesamenumberherethatwasreceived on the850 PO in element\nBEG03.\nThepurchaseordernumberwillbeformatted as\nSSSS-PPPPPPP-LLLL (17 characters)or\nSSSS-PPPPPPPP-LLLL (18 characters)or\nSSSS-PPPPPPP (12 characters)or\nSSSS-PPPPPPPP (13 characters)\nSSSS = Sourcecode,PPPPPPP orPPPPPPPP = PO number,LLLL =\nLocation ID Code.",
//         },
//       ],
//     },
//     {
//       id: "7224d299-8f3e-4ce4-a283-79181a5571f1",
//       label: "Transaction Type Code",
//       name: "640_BIG_07",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Transaction Type Code",
//       rules: [
//         {
//           requirement: "Optional",
//           message: "Please enter Transaction Type Code",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {
//           note:
//             'Code specifying the type of transaction\nThe "DO" code is required for Drop Ship to Guest Home. N1, N3 and N4 are\nalso required for this situation.\n**All other invoices (credit,display,samples,freightonly,pallets,etc.) must\nbe on paper and mailed to the appropriate area.',
//         },
//       ],
//       options: [
//         {
//           code: "DO",
//           description: "Drop Shipment Invoice",
//         },
//       ],
//     },
//     {
//       id: "cf53194e-7294-4e34-a929-5b738280306e",
//       label: "Reference Identification Qualifier",
//       name: "128_REF_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Reference Identification Qualifier",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Reference Identification Qualifier",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "DP",
//           description: "Department Number",
//         },
//         {
//           code: "IA",
//           description: "Internal Vendor Number",
//         },
//         {
//           code: "PD",
//           description: "Promotion/Deal Number",
//         },
//       ],
//     },
//     {
//       id: "e40d9455-0baf-4b4f-9b03-bad7ec6ae131",
//       label: "Reference Identification",
//       name: "127_REF_02",
//       type: "input",
//       dataType: "AN",
//       placeholder: "Enter Reference Identification",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Reference Identification",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 30,
//           message: "Can have at most 30 characters",
//         },
//         {
//           note:
//             "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\nIA = Vendor Number. Vendor number must be 7 digits. Add leading zeroes to\nmake 7 digits.\nPD = Promotion/Deal Number\nDP = Department(Not applicable for Target.com)\nNote: Department must be 3 digits. Add leading zero(s) to make 3 digits.",
//         },
//       ],
//     },
//     {
//       id: "bb383e6b-a2ba-4201-8194-570d68cb9298",
//       label: "heading_N1",
//       name: "heading_N1",
//       type: "table",
//       columns: [
//         {
//           title: "Address Information",
//           dataIndex: "N3_01_166",
//           requirement: "Mandatory",
//           editable: true,
//         },
//         {
//           title: "Address Information",
//           dataIndex: "N3_02_166",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "City Name",
//           dataIndex: "N4_01_19",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "State or Province Code",
//           dataIndex: "N4_02_156",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "Postal Code",
//           dataIndex: "N4_03_116",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "Country Code",
//           dataIndex: "N4_04_26",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "Location Qualifier",
//           dataIndex: "N4_05_309",
//           requirement: "Conditional",
//           editable: true,
//         },
//         {
//           title: "Location Identifier",
//           dataIndex: "N4_06_310",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "Entity Identifier Code",
//           dataIndex: "N1_01_98",
//           requirement: "Mandatory",
//           editable: true,
//           options: [
//             {
//               code: "BS",
//               description: "Bill and Ship To",
//             },
//             {
//               code: "BY",
//               description: "Buying Party (Purchaser)",
//             },
//             {
//               code: "SF",
//               description: "Ship From",
//             },
//             {
//               code: "ST",
//               description: "Ship To",
//             },
//           ],
//         },
//         {
//           title: "Identification Code Qualifier",
//           dataIndex: "N1_03_66",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "91",
//               description: "Assigned by Seller or Seller's Agent",
//             },
//             {
//               code: "92",
//               description: "Assigned by Buyer or Buyer's Agent",
//             },
//           ],
//         },
//         {
//           title: "Identification Code",
//           dataIndex: "N1_04_67",
//           requirement: "Conditional",
//           editable: true,
//         },
//       ],
//       placeholder: "Enter Entity Identifier Code",
//       rules: [],
//       emptyRow: {
//         N3_01_166: "Enter a value",
//         N3_02_166: "Enter a value",
//         N4_01_19: "Enter a value",
//         N4_02_156: "Enter a value",
//         N4_03_116: "Enter a value",
//         N4_04_26: "Enter a value",
//         N4_05_309: "Enter a value",
//         N4_06_310: "Enter a value",
//         N1_01_98: "Enter a value",
//         N1_03_66: "Enter a value",
//         N1_04_67: "Enter a value",
//       },
//     },
//     {
//       id: "f9a7093d-46ba-4809-a6d1-9c39ce763884",
//       label: "Terms Type Code",
//       name: "336_ITD_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Terms Type Code",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Terms Type Code",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "01",
//           description: "Basic",
//         },
//         {
//           code: "02",
//           description: "End of Month (EOM)",
//         },
//       ],
//     },
//     {
//       id: "e43a55fc-b7b6-4826-96c2-5605cf2be810",
//       label: "Terms Basis Date Code",
//       name: "333_ITD_02",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Terms Basis Date Code",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Terms Basis Date Code",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "2",
//           description: "Delivery Date",
//         },
//         {
//           code: "3",
//           description: "Invoice Date",
//         },
//       ],
//     },
//     {
//       id: "fcab97e5-be44-4209-87e6-1cefc23a37e0",
//       label: "Terms Discount Due Date",
//       name: "370_ITD_04",
//       type: "datepicker",
//       dataType: "DT",
//       placeholder: "Enter Terms Discount Due Date",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Terms Discount Due Date",
//         },
//         {
//           note:
//             "Date payment is due if discount is to be earned expressed in format CCYYMMDD\nNot used by Target Stores.\nFor Target.com only: Required for discount invoices",
//         },
//       ],
//     },
//     {
//       id: "4e0398d2-3024-4847-b361-1de7b97b695e",
//       label: "Terms Discount Days Due",
//       name: "351_ITD_05",
//       type: "input",
//       dataType: "N0",
//       placeholder: "Enter Terms Discount Days Due",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Terms Discount Days Due",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {
//           note:
//             "Number of days in the terms discount period by which payment is due if terms discount is earned",
//         },
//       ],
//     },
//     {
//       id: "eaaf7428-d5c5-4654-b154-f395ac81ad1d",
//       label: "Terms Net Due Date",
//       name: "446_ITD_06",
//       type: "datepicker",
//       dataType: "DT",
//       placeholder: "Enter Terms Net Due Date",
//       rules: [
//         {
//           requirement: "Optional",
//           message: "Please enter Terms Net Due Date",
//         },
//         {
//           note:
//             "Date when total invoice amount becomes due expressed in format CCYYMMDD\nNot used by Target Stores.\nFor Target.com only: Required for non-discount invoices",
//         },
//       ],
//     },
//     {
//       id: "3823346f-b336-4411-b81c-3198bd848f01",
//       label: "Date/Time Qualifier",
//       name: "374_DTM_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Date/Time Qualifier",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Date/Time Qualifier",
//         },
//         {
//           min: 3,
//           message: "Must have at least 3 characters",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "011",
//           description: "Shipped",
//         },
//       ],
//     },
//     {
//       id: "01c1e2a9-3641-4ae9-9c58-e8293f24d6d4",
//       label: "Date",
//       name: "373_DTM_02",
//       type: "datepicker",
//       dataType: "DT",
//       placeholder: "Enter Date",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Date",
//         },
//         {
//           note: "Date expressed as CCYYMMDD\nDate Merchandise was shipped.",
//         },
//       ],
//     },
//     {
//       id: "9088a5ea-3826-4da3-90f6-fe7bebc96aaf",
//       label: "Reference Identification Qualifier",
//       name: "128_N9_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Reference Identification Qualifier",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Reference Identification Qualifier",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "ZZ",
//           description: "Mutually Defined",
//         },
//       ],
//     },
//     {
//       id: "57dae1de-9498-4038-838d-96463f0621b6",
//       label: "Reference Identification",
//       name: "127_N9_02",
//       type: "input",
//       dataType: "AN",
//       placeholder: "Enter Reference Identification",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Reference Identification",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 30,
//           message: "Can have at most 30 characters",
//         },
//         {
//           note:
//             "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\nPACA",
//         },
//       ],
//     },
//     {
//       id: "b8540fc5-5676-47f3-982b-b232c4c3728b",
//       label: "Free-Form Message Text",
//       name: "933_MSG_01",
//       type: "textarea",
//       dataType: "AN",
//       placeholder: "Enter Free-Form Message Text",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Free-Form Message Text",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 264,
//           message: "Can have at most 264 characters",
//         },
//         {
//           note:
//             "Free-form message text\nMSG* Theperishableagriculturalcommoditieslisted on this\nMSG* invoicearesold subjectto thestatutorytrustauthorized\nMSG* bySection 5(c)ofthePerishableAgriculturalCommodities\nMSG* Act,1930 (7 U.S.C.4993(c)). Thesellerofthese\nMSG* commodities retains a trust claim over these commodities,\nMSG* alli nventories of food or other products derived from\nMGS* these commodities, and any receivables or proceeds from\nMSG* the sale of these commodities until full payment is\nMSG* recieved",
//         },
//       ],
//       maxLength: 264,
//     },
//     {
//       id: "9dbd886d-38f8-469f-8ff8-150d1e5ff003",
//       label: "Unit or Basis for Measurement Code",
//       name: "355_IT1_03",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Unit or Basis for Measurement Code",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Unit or Basis for Measurement Code",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {
//           note:
//             "Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken\nThe UOM should match the UOM received on the PO. The value in the ISS02\nmust be the same as this value.",
//         },
//       ],
//       options: [
//         {
//           code: "CA",
//           description: "Case",
//         },
//         {
//           code: "EA",
//           description: "Each",
//         },
//         {
//           code: "LB",
//           description: "Pound",
//         },
//       ],
//     },
//     {
//       id: "ae0bf9b6-c8e5-4885-8016-2b4f589063cb",
//       label: "Product/Service ID Qualifier",
//       name: "235_IT1_06",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Product/Service ID Qualifier",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Product/Service ID Qualifier",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "CB",
//           description: "Buyer's Catalog Number",
//         },
//         {
//           code: "EN",
//           description: "European Article Number (EAN) (2-5-5-1)",
//         },
//         {
//           code: "IN",
//           description: "Buyer's Item Number",
//         },
//         {
//           code: "UI",
//           description: "U.P.C. Consumer Package Code (1-5-5)",
//         },
//         {
//           code: "UP",
//           description: "U.P.C. Consumer Package Code (1-5-5-1)",
//         },
//         {
//           code: "EO",
//           description: "NA",
//         },
//       ],
//     },
//     {
//       id: "33407c1f-8eec-4a9a-93d2-8951fb2311c1",
//       label: "Product/Service ID Qualifier",
//       name: "235_IT1_08",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Product/Service ID Qualifier",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Product/Service ID Qualifier",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "CB",
//           description: "Buyer's Catalog Number",
//         },
//         {
//           code: "EN",
//           description: "European Article Number (EAN) (2-5-5-1)",
//         },
//         {
//           code: "IN",
//           description: "Buyer's Item Number",
//         },
//         {
//           code: "UI",
//           description: "U.P.C. Consumer Package Code (1-5-5)",
//         },
//         {
//           code: "UP",
//           description: "U.P.C. Consumer Package Code (1-5-5-1)",
//         },
//         {
//           code: "EO",
//           description: "NA",
//         },
//       ],
//     },
//     {
//       id: "3cb1c785-22e6-4dff-b693-8c41d0b41d36",
//       label: "Shipment/Order Status Code",
//       name: "368_IT3_03",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Shipment/Order Status Code",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Shipment/Order Status Code",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "IS",
//           description: "Item Represents Substitution from Original Order",
//         },
//       ],
//     },
//     {
//       id: "b8419e6b-1e8b-45c5-b90d-d8da479454e5",
//       label: "detail_PID",
//       name: "detail_PID-TABLE",
//       type: "table",
//       columns: [
//         {
//           title: "Item Description Type",
//           dataIndex: "PID_01_349",
//           requirement: "Mandatory",
//           editable: true,
//           options: [
//             {
//               code: "F",
//               description: "Free-form",
//             },
//           ],
//         },
//         {
//           title: "Product/Process Characteristic Code",
//           dataIndex: "PID_02_750",
//           requirement: "Optional",
//           editable: true,
//           options: [
//             {
//               code: "08",
//               description: "Product",
//             },
//           ],
//         },
//         {
//           title: "Description",
//           dataIndex: "PID_05_352",
//           requirement: "Conditional",
//           editable: true,
//         },
//       ],
//       placeholder: "Enter Item Description Type",
//       rules: [],
//       emptyRow: {
//         PID_01_349: "Enter a value",
//         PID_02_750: "Enter a value",
//         PID_05_352: "Enter a value",
//       },
//     },
//     {
//       id: "7ddbdcf2-6bd5-4a5b-a2cb-72afe90928f3",
//       label: "Pack",
//       name: "356_PO4_01",
//       type: "input",
//       dataType: "N0",
//       placeholder: "Enter Pack",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Pack",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 6,
//           message: "Can have at most 6 characters",
//         },
//         {},
//       ],
//     },
//     {
//       id: "a9418bc7-5cbf-4542-b01b-7aa6276d315f",
//       label: "detail_SAC",
//       name: "detail_SAC-TABLE",
//       type: "table",
//       columns: [
//         {
//           title: "Allowance or Charge Indicator",
//           dataIndex: "SAC_01_248",
//           requirement: "Mandatory",
//           editable: true,
//           options: [
//             {
//               code: "A",
//               description: "Allowance",
//             },
//             {
//               code: "C",
//               description: "Charge",
//             },
//           ],
//         },
//         {
//           title: "Service, Promotion, Allowance, or Charge Code",
//           dataIndex: "SAC_02_1300",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "A400",
//               description: "Allowance Non-performance",
//             },
//             {
//               code: "B310",
//               description: "Commission Amount",
//             },
//             {
//               code: "B560",
//               description: "Container Allowance",
//             },
//             {
//               code: "B950",
//               description: "Damaged Merchandise",
//             },
//             {
//               code: "C310",
//               description: "Discount",
//             },
//             {
//               code: "D170",
//               description: "Free Goods",
//             },
//             {
//               code: "D220",
//               description: "Freight Passthrough",
//             },
//             {
//               code: "D240",
//               description: "Freight",
//             },
//             {
//               code: "D270",
//               description: "Fuel Surcharge",
//             },
//             {
//               code: "F180",
//               description: "Pallet",
//             },
//             {
//               code: "F340",
//               description: "Pick/Up",
//             },
//             {
//               code: "F800",
//               description: "Promotional Allowance",
//             },
//             {
//               code: "F810",
//               description: "Promotional Discount",
//             },
//             {
//               code: "G970",
//               description: "Small Order Charge",
//             },
//             {
//               code: "H000",
//               description: "Special Allowance",
//             },
//             {
//               code: "H090",
//               description: "Special Handling",
//             },
//             {
//               code: "I170",
//               description: "Trade Discount",
//             },
//             {
//               code: "I580",
//               description: "Warehousing",
//             },
//           ],
//         },
//         {
//           title: "Agency Qualifier Code",
//           dataIndex: "SAC_03_559",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "VI",
//               description:
//                 "Voluntary Inter-Industry Commerce Standard (VICS) EDI",
//             },
//           ],
//         },
//         {
//           title: "Agency Service, Promotion, Allowance, or Charge Code",
//           dataIndex: "SAC_04_1301",
//           requirement: "Conditional",
//           editable: true,
//         },
//         {
//           title: "Amount",
//           dataIndex: "SAC_05_610",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "Unit or Basis for Measurement Code",
//           dataIndex: "SAC_09_355",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "EA",
//               description: "Each",
//             },
//           ],
//         },
//         {
//           title: "Quantity",
//           dataIndex: "SAC_10_380",
//           requirement: "Conditional",
//           editable: true,
//         },
//         {
//           title: "Allowance or Charge Method of Handling Code",
//           dataIndex: "SAC_12_331",
//           requirement: "Optional",
//           editable: true,
//           options: [
//             {
//               code: "02",
//               description: "Off Invoice",
//             },
//             {
//               code: "06",
//               description: "Charge to be Paid by Customer",
//             },
//           ],
//         },
//       ],
//       placeholder: "Enter Allowance or Charge Indicator",
//       rules: [],
//       emptyRow: {
//         SAC_01_248: "Enter a value",
//         SAC_02_1300: "Enter a value",
//         SAC_03_559: "Enter a value",
//         SAC_04_1301: "Enter a value",
//         SAC_05_610: "Enter a value",
//         SAC_09_355: "Enter a value",
//         SAC_10_380: "Enter a value",
//         SAC_12_331: "Enter a value",
//       },
//     },
//     {
//       id: "3a0f88c8-58ab-4294-8166-e91fefa5f0d6",
//       label: "detail_SLN",
//       name: "detail_SLN-TABLE",
//       type: "table",
//       columns: [
//         {
//           title: "Relationship Code",
//           dataIndex: "SLN_03_662",
//           requirement: "Mandatory",
//           editable: true,
//           options: [
//             {
//               code: "S",
//               description: "Substituted",
//             },
//           ],
//         },
//         {
//           title: "Assigned Identification",
//           dataIndex: "SLN_01_350",
//           requirement: "Mandatory",
//           editable: true,
//           options: [
//             {
//               code: "EA",
//               description: "NA",
//             },
//           ],
//         },
//         {
//           title: "Product/Service ID Qualifier",
//           dataIndex: "SLN_09_235",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "CB",
//               description: "Buyer's Catalog Number",
//             },
//             {
//               code: "EN",
//               description: "European Article Number (EAN) (2-5-5-1)",
//             },
//             {
//               code: "UP",
//               description: "U.P.C. Consumer Package Code (1-5-5-1)",
//             },
//             {
//               code: "EO",
//               description: "NA",
//             },
//           ],
//         },
//         {
//           title: "Product/Service ID Qualifier",
//           dataIndex: "SLN_11_235",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "CB",
//               description: "Buyer's Catalog Number",
//             },
//             {
//               code: "EN",
//               description: "European Article Number (EAN) (2-5-5-1)",
//             },
//             {
//               code: "UP",
//               description: "U.P.C. Consumer Package Code (1-5-5-1)",
//             },
//             {
//               code: "EO",
//               description: "NA",
//             },
//           ],
//         },
//       ],
//       placeholder: "Enter Relationship Code",
//       rules: [],
//       emptyRow: {
//         SLN_03_662: "Enter a value",
//         SLN_01_350: "Enter a value",
//         SLN_09_235: "Enter a value",
//         SLN_11_235: "Enter a value",
//       },
//     },
//     {
//       id: "30a88a84-8e6a-4751-87e0-b90a8696def1",
//       label: "Amount",
//       name: "610_TDS_01",
//       type: "input",
//       dataType: "N2",
//       placeholder: "Enter Amount",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Amount",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 15,
//           message: "Can have at most 15 characters",
//         },
//         {
//           note:
//             "Monetary amount\nTotal amount of invoice(including charges, less allowances) before terms\ndiscount.",
//         },
//       ],
//     },
//     {
//       id: "b7c32d93-5b49-45d5-8d4a-81041b0b8997",
//       label: "Amount",
//       name: "610_TDS_02",
//       type: "input",
//       dataType: "N2",
//       placeholder: "Enter Amount",
//       rules: [
//         {
//           requirement: "Optional",
//           message: "Please enter Amount",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 15,
//           message: "Can have at most 15 characters",
//         },
//         {
//           note:
//             "Monetary amount\nTotal amount of merchandise. If you offer a discount on gross amount before\nallowances, this field is required. Otherwise it is not needed.",
//         },
//       ],
//     },
//     {
//       id: "5e46c69b-0272-4cde-8d74-9fbbfa21b4dd",
//       label: "Transportation Method/Type Code",
//       name: "91_CAD_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Transportation Method/Type Code",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Transportation Method/Type Code",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "C",
//           description: "Consolidation",
//         },
//         {
//           code: "M",
//           description: "Motor (Common Carrier)",
//         },
//         {
//           code: "P",
//           description: "Private Carrier",
//         },
//         {
//           code: "U",
//           description: "Private Parcel Service",
//         },
//       ],
//     },
//     {
//       id: "60dfc4c6-2299-43c3-a177-ae0adcf862b9",
//       name: "373_BIG_01",
//       type: "datepicker",
//       label: "Date",
//       rules: [
//         {
//           requirement: "Mandatory",
//         },
//       ],
//     },
//     {
//       id: "60dfc4c6-2299-43c3-a177-ae0adcf862c9",
//       name: "140_CAD_04",
//       type: "input",
//       label: "Standard Carrier Alpha Code",
//       rules: [
//         {
//           requirement: "Conditional",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 character",
//         },
//         {
//           max: 4,
//           message: "Can have at most 4 characters",
//         },
//       ],
//     },
//     {
//       id: "60dfc4c6-2299-43c3-a177-ae0adcf862d9",
//       name: "387_CAD_05",
//       type: "input",
//       label: "Routing",
//       rules: [
//         {
//           requirement: "Conditional",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 35,
//           message: "Can have at most 35 characters",
//         },
//       ],
//     },
//     {
//       id: "2bf26391-674f-49de-ab50-50d96f129224",
//       label: "Reference Identification Qualifier",
//       name: "128_CAD_07",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Reference Identification Qualifier",
//       rules: [
//         {
//           requirement: "Optional",
//           message: "Please enter Reference Identification Qualifier",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "BM",
//           description: "Bill of Lading Number",
//         },
//         {
//           code: "CN",
//           description: "Carrier's Reference Number (PRO/Invoice)",
//         },
//       ],
//     },
//     {
//       id: "9a1b7fb5-efc0-4627-9ba8-c7e5847f7a3b",
//       label: "summary_SAC",
//       name: "summary_SAC-TABLE",
//       type: "table",
//       columns: [
//         {
//           title: "Allowance or Charge Indicator",
//           dataIndex: "SAC_01_248",
//           requirement: "Mandatory",
//           editable: true,
//           options: [
//             {
//               code: "A",
//               description: "Allowance",
//             },
//             {
//               code: "C",
//               description: "Charge",
//             },
//           ],
//         },
//         {
//           title: "Service, Promotion, Allowance, or Charge Code",
//           dataIndex: "SAC_02_1300",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "A400",
//               description: "Allowance Non-performance",
//             },
//             {
//               code: "B310",
//               description: "Commission Amount",
//             },
//             {
//               code: "B560",
//               description: "Container Allowance",
//             },
//             {
//               code: "B570",
//               description: "Container Deposits",
//             },
//             {
//               code: "B950",
//               description: "Damaged Merchandise",
//             },
//             {
//               code: "C310",
//               description: "Discount",
//             },
//             {
//               code: "D170",
//               description: "Free Goods",
//             },
//             {
//               code: "D220",
//               description: "Freight Passthrough",
//             },
//             {
//               code: "D240",
//               description: "Freight",
//             },
//             {
//               code: "D270",
//               description: "Fuel Surcharge",
//             },
//             {
//               code: "F180",
//               description: "Pallet",
//             },
//             {
//               code: "F340",
//               description: "Pick/Up",
//             },
//             {
//               code: "F800",
//               description: "Promotional Allowance",
//             },
//             {
//               code: "F810",
//               description: "Promotional Discount",
//             },
//             {
//               code: "G970",
//               description: "Small Order Charge",
//             },
//             {
//               code: "H000",
//               description: "Special Allowance",
//             },
//             {
//               code: "H090",
//               description: "Special Handling",
//             },
//             {
//               code: "H700",
//               description: "Tax - Local Tax",
//             },
//             {
//               code: "I170",
//               description: "Trade Discount",
//             },
//             {
//               code: "I580",
//               description: "Warehousing",
//             },
//           ],
//         },
//         {
//           title: "Agency Qualifier Code",
//           dataIndex: "SAC_03_559",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "VI",
//               description:
//                 "Voluntary Inter-Industry Commerce Standard (VICS) EDI",
//             },
//           ],
//         },
//         {
//           title: "Agency Service, Promotion, Allowance, or Charge Code",
//           dataIndex: "SAC_04_1301",
//           requirement: "Conditional",
//           editable: true,
//         },
//         {
//           title: "Amount",
//           dataIndex: "SAC_05_610",
//           requirement: "Optional",
//           editable: true,
//         },
//         {
//           title: "Allowance/Charge Percent Qualifier",
//           dataIndex: "SAC_06_378",
//           requirement: "Conditional",
//           editable: true,
//           options: [
//             {
//               code: "3",
//               description: "Discount/Gross",
//             },
//           ],
//         },
//         {
//           title: "Allowance or Charge Method of Handling Code",
//           dataIndex: "SAC_12_331",
//           requirement: "Optional",
//           editable: true,
//           options: [
//             {
//               code: "02",
//               description: "Off Invoice",
//             },
//             {
//               code: "06",
//               description: "Charge to be Paid by Customer",
//             },
//           ],
//         },
//         {
//           title: "Description",
//           dataIndex: "SAC_15_352",
//           requirement: "Conditional",
//           editable: true,
//         },
//       ],
//       placeholder: "Enter Allowance or Charge Indicator",
//       rules: [],
//       emptyRow: {
//         SAC_01_248: "Enter a value",
//         SAC_02_1300: "Enter a value",
//         SAC_03_559: "Enter a value",
//         SAC_04_1301: "Enter a value",
//         SAC_05_610: "Enter a value",
//         SAC_06_378: "Enter a value",
//         SAC_12_331: "Enter a value",
//         SAC_15_352: "Enter a value",
//       },
//     },
//     {
//       id: "e6479590-a0ca-41b6-8e2c-ee6c5762b7c5",
//       label: "Number of Units Shipped",
//       name: "382_ISS_01",
//       type: "input",
//       dataType: "R",
//       placeholder: "Enter Number of Units Shipped",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Number of Units Shipped",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 10,
//           message: "Can have at most 10 characters",
//         },
//         {},
//       ],
//     },
//     {
//       id: "1b2c1dd7-97d7-4338-8892-d6020a4b0ca6",
//       label: "Unit or Basis for Measurement Code",
//       name: "355_ISS_02",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Unit or Basis for Measurement Code",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Unit or Basis for Measurement Code",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "CA",
//           description: "Case",
//         },
//         {
//           code: "CT",
//           description: "Carton",
//         },
//         {
//           code: "EA",
//           description: "Each",
//         },
//         {
//           code: "LB",
//           description: "Pound",
//         },
//       ],
//     },
//     {
//       id: "19665482-b165-42af-bccd-2b7862e0befc",
//       label: "Unit or Basis for Measurement Code",
//       name: "355_ISS_04",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Unit or Basis for Measurement Code",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Unit or Basis for Measurement Code",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "LB",
//           description: "Pound",
//         },
//       ],
//     },
//     {
//       id: "7f124e29-d71e-4e74-8c3d-88ccb933081a",
//       label: "Transaction Set Identifier Code",
//       name: "143_ST_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Transaction Set Identifier Code",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Transaction Set Identifier Code",
//         },
//         {
//           min: 3,
//           message: "Must have at least 3 characters",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "810",
//           description: "Invoice",
//         },
//       ],
//     },
//     {
//       id: "7f124e29-d71e-4e74-8c3d-88ccb933081b",
//       label: "Transaction Set Control Number",
//       name: "329_ST_02",
//       type: "input",
//       dataType: "ID",
//       placeholder: "Enter Transaction Set Control Number",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Transaction Set Identifier Code",
//         },
//         {
//           min: 4,
//           message: "Must have at least 4 characters",
//         },
//         {
//           max: 9,
//           message: "Can have at most 9 characters",
//         },
//         {},
//       ],
//     },
//     {
//       id: "57f20670-f61d-4977-8907-5bccb46784c8",
//       label: "Note Reference Code",
//       name: "363_NTE_01",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Note Reference Code",
//       rules: [
//         {
//           requirement: "Optional",
//           message: "Please enter Note Reference Code",
//         },
//         {
//           min: 3,
//           message: "Must have at least 3 characters",
//         },
//         {
//           max: 3,
//           message: "Can have at most 3 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "CER",
//           description: "Certification Narrative",
//         },
//       ],
//     },
//     {
//       id: "13e29282-2d01-471e-b1fc-d98de4671327",
//       label: "Product/Service ID Qualifier",
//       name: "235_IT1_10",
//       type: "dropdown",
//       dataType: "ID",
//       placeholder: "Enter Product/Service ID Qualifier",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Product/Service ID Qualifier",
//         },
//         {
//           min: 2,
//           message: "Must have at least 2 characters",
//         },
//         {
//           max: 2,
//           message: "Can have at most 2 characters",
//         },
//         {},
//       ],
//       options: [
//         {
//           code: "CB",
//           description: "Buyer's Catalog Number",
//         },
//         {
//           code: "EN",
//           description: "European Article Number (EAN) (2-5-5-1)",
//         },
//         {
//           code: "IN",
//           description: "Buyer's Item Number",
//         },
//         {
//           code: "UI",
//           description: "U.P.C. Consumer Package Code (1-5-5)",
//         },
//         {
//           code: "EO",
//           description: "NA",
//         },
//         {
//           code: "UP",
//           description: "U.P.C. Consumer Package Code (1-5-5-1)",
//         },
//       ],
//     },
//     {
//       id: "83d09d14-d635-4c95-a21e-7717951d9e3f",
//       label: "Reference Identification",
//       name: "127_CAD_08",
//       type: "input",
//       dataType: "AN",
//       placeholder: "Enter Reference Identification",
//       rules: [
//         {
//           requirement: "Conditional",
//           message: "Please enter Reference Identification",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 30,
//           message: "Can have at most 30 characters",
//         },
//         {
//           note:
//             "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\n\nA value is not required in the CAD08 for DSD vendors.",
//         },
//       ],
//     },
//     {
//       id: "e1ed55c1-a100-4939-b358-2257aabdaf8b",
//       label: "Number of Line Items",
//       name: "354_CTT_01",
//       type: "input",
//       dataType: "N0",
//       placeholder: "Enter Number of Line Items",
//       rules: [
//         {
//           requirement: "Mandatory",
//           message: "Please enter Number of Line Items",
//         },
//         {
//           min: 1,
//           message: "Must have at least 1 character",
//         },
//         {
//           max: 6,
//           message: "Can have at most 6 characters",
//         },
//         {
//           note:
//             "Total number of line items in the transaction set\n\nSample CTT Segment\n_________________\nCTT*25",
//         },
//       ],
//     },
//   ],
// };

const sampleResponse = {
  metadata: {
    key: "Target-Invoice",
    onSubmit: {
      endpoint: "",
    },
  },
  data: [
    {
      id: "60dfc4c6-2299-43c3-a177-ae0adcf862b9",
      name: "373_BIG_01",
      type: "datepicker",
      label: "Date",
      rules: [
        {
          requirement: "Mandatory",
        },
      ],
    },
    {
      id: "60dfc4c6-2299-43c3-a177-ae0adcf862b8",
      label: "Invoice Number",
      name: "76_BIG_02",
      path: `output.interchanges[0].groups[0].transaction_sets[0].heading.beginning_segment_for_invoice_BIG.invoice_number_02`,
      type: "input",
      dataType: "AN",
      placeholder: "Enter Invoice Number",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Invoice Number",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 22,
          message: "Can have at most 22 characters",
        },
        {
          note:
            "Note: Invoice numbers must not be more than 19 characters long. Invoice\nnumbers may contain alphas but no special characters. Alpha characters must\nbe in uppercase.",
        },
      ],
    },
    {
      id: "60dfc4c6-2299-43c3-a177-ae0adcf862b9",
      name: "373_BIG_03",
      type: "datepicker",
      label: "Date",
      rules: [
        {
          requirement: "Optional",
        },
      ],
    },
    {
      id: "a49dd15c-57a8-4405-af7b-9ff25f34c873",
      label: "Purchase Order Number",
      name: "324_BIG_04",
      type: "input",
      dataType: "AN",
      placeholder: "Enter Purchase Order Number",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Purchase Order Number",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 22,
          message: "Can have at most 22 characters",
        },
        {
          note:
            "Identifying number for Purchase Order assigned by the orderer/purchaser\nTargetStores:\nThis field is required.\nSend the same number here that was received on the 850 PO in element\nBEG03.\nThep urchase order number will be formatted either as SSSS-PPPPPPP-LLLL\n(17 characters) or SSSS-PPPPPPP (12 characters).\nSSSS = Sourcecode,PPPPPPP = PO number,LLLL = Location ID Code\nTarget.com:\nThis field is required.\nSend the same number here that was received on the 850 PO in element\nBEG03.\nThe purchase order number will be formatted as\nSSSS-PPPPPPP-LLLL (17 characters)or\nSSSS-PPPPPPPP-LLLL (18 characters)or\nSSSS-PPPPPPP (12 characters)or\nSSSS-PPPPPPPP (13 characters)\nSSSS = Sourcecode,PPPPPPP orPPPPPPPP = PO number,LLLL =\nLocation ID CodeTargetStores:\nThisfield isrequired.\nSend thesamenumberherethatwasreceived on the850 PO in element\nBEG03.\nThepurchaseordernumberwillbeformatted eitherasSSSS-PPPPPPP-LLLL\n(17 characters)orSSSS-PPPPPPP (12 characters).\nSSSS = Sourcecode,PPPPPPP = PO number,LLLL = Location ID Code\nTarget.com:\nThisfield isrequired.\nSend thesamenumberherethatwasreceived on the850 PO in element\nBEG03.\nThepurchaseordernumberwillbeformatted as\nSSSS-PPPPPPP-LLLL (17 characters)or\nSSSS-PPPPPPPP-LLLL (18 characters)or\nSSSS-PPPPPPP (12 characters)or\nSSSS-PPPPPPPP (13 characters)\nSSSS = Sourcecode,PPPPPPP orPPPPPPPP = PO number,LLLL =\nLocation ID Code.",
        },
      ],
    },
    {
      id: "7224d299-8f3e-4ce4-a283-79181a5571f1",
      label: "Transaction Type Code",
      name: "640_BIG_07",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Transaction Type Code",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Transaction Type Code",
        },
        {
          min: 2,
          message: "Must have at least 2 characters",
        },
        {
          max: 2,
          message: "Can have at most 2 characters",
        },
        {
          note:
            'Code specifying the type of transaction\nThe "DO" code is required for Drop Ship to Guest Home. N1, N3 and N4 are\nalso required for this situation.\n**All other invoices (credit,display,samples,freightonly,pallets,etc.) must\nbe on paper and mailed to the appropriate area.',
        },
      ],
      options: [
        {
          code: "DO",
          description: "Drop Shipment Invoice",
        },
      ],
    },
    {
      id: "cf53194e-7294-4e34-a929-5b738280306e",
      label: "Reference Identification Qualifier",
      name: "128_REF_01",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Reference Identification Qualifier",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Reference Identification Qualifier",
        },
        {
          min: 2,
          message: "Must have at least 2 characters",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
        {},
      ],
      options: [
        {
          code: "DP",
          description: "Department Number",
        },
        {
          code: "IA",
          description: "Internal Vendor Number",
        },
        {
          code: "PD",
          description: "Promotion/Deal Number",
        },
      ],
    },
    {
      id: "e40d9455-0baf-4b4f-9b03-bad7ec6ae131",
      label: "Reference Identification",
      name: "127_REF_02",
      type: "input",
      dataType: "AN",
      placeholder: "Enter Reference Identification",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Reference Identification",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 30,
          message: "Can have at most 30 characters",
        },
        {
          note:
            "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\nIA = Vendor Number. Vendor number must be 7 digits. Add leading zeroes to\nmake 7 digits.\nPD = Promotion/Deal Number\nDP = Department(Not applicable for Target.com)\nNote: Department must be 3 digits. Add leading zero(s) to make 3 digits.",
        },
      ],
    },
    {
      id: "bb383e6b-a2ba-4201-8194-570d68cb9298",
      label: "heading_N1",
      name: "heading_N1",
      type: "table",
      columns: [
        {
          title: "Address Information",
          dataIndex: "N3_01_166",
          requirement: "Mandatory",
          editable: true,
          path:
            "output.interchanges[0].groups[0].transaction_sets[0].party_identification_N1_loop[0].party_location_N3[0].address_information_01",
        },
        {
          title: "Address Information",
          dataIndex: "N3_02_166",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "City Name",
          dataIndex: "N4_01_19",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "State or Province Code",
          dataIndex: "N4_02_156",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "Postal Code",
          dataIndex: "N4_03_116",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "Country Code",
          dataIndex: "N4_04_26",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "Location Qualifier",
          dataIndex: "N4_05_309",
          requirement: "Conditional",
          editable: true,
        },
        {
          title: "Location Identifier",
          dataIndex: "N4_06_310",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "Entity Identifier Code",
          dataIndex: "N1_01_98",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "BS",
              description: "Bill and Ship To",
            },
            {
              code: "BY",
              description: "Buying Party (Purchaser)",
            },
            {
              code: "SF",
              description: "Ship From",
            },
            {
              code: "ST",
              description: "Ship To",
            },
          ],
        },
        {
          title: "Identification Code Qualifier",
          dataIndex: "N1_03_66",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "91",
              description: "Assigned by Seller or Seller's Agent",
            },
            {
              code: "92",
              description: "Assigned by Buyer or Buyer's Agent",
            },
          ],
        },
        {
          title: "Identification Code",
          dataIndex: "N1_04_67",
          requirement: "Conditional",
          editable: true,
        },
      ],
      placeholder: "Enter Entity Identifier Code",
      rules: [],
      emptyRow: {
        N3_01_166: "Enter a value",
        N3_02_166: "Enter a value",
        N4_01_19: "Enter a value",
        N4_02_156: "Enter a value",
        N4_03_116: "Enter a value",
        N4_04_26: "Enter a value",
        N4_05_309: "Enter a value",
        N4_06_310: "Enter a value",
        N1_01_98: "Enter a value",
        N1_03_66: "Enter a value",
        N1_04_67: "Enter a value",
      },
    },
    {
      id: "f9a7093d-46ba-4809-a6d1-9c39ce763884",
      label: "Terms Type Code",
      name: "336_ITD_01",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Terms Type Code",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Terms Type Code",
        },
        {
          min: 2,
          message: "Must have at least 2 characters",
        },
        {
          max: 2,
          message: "Can have at most 2 characters",
        },
        {},
      ],
      options: [
        {
          code: "01",
          description: "Basic",
        },
        {
          code: "02",
          description: "End of Month (EOM)",
        },
      ],
    },
    {
      id: "e43a55fc-b7b6-4826-96c2-5605cf2be810",
      label: "Terms Basis Date Code",
      name: "333_ITD_02",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Terms Basis Date Code",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Terms Basis Date Code",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 2,
          message: "Can have at most 2 characters",
        },
        {},
      ],
      options: [
        {
          code: "2",
          description: "Delivery Date",
        },
        {
          code: "3",
          description: "Invoice Date",
        },
      ],
    },
    {
      id: "e23a55fc-b7b6-4826-96c2-5605cf2be810",
      label: "Terms Discount Percent",
      name: "338_ITD_03",
      type: "input",
      dataType: "ID",
      placeholder: "Enter Terms Discount Percent",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Terms Discount Percent",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 6,
          message: "Can have at most 6 characters",
        },
        {},
      ],
    },
    {
      id: "fcab97e5-be44-4209-87e6-1cefc23a37e0",
      label: "Terms Discount Due Date",
      name: "370_ITD_04",
      type: "datepicker",
      dataType: "DT",
      placeholder: "Enter Terms Discount Due Date",
      rules: [
        {
          requirement: "Conditional",
          message: "Please enter Terms Discount Due Date",
        },
        {
          note:
            "Date payment is due if discount is to be earned expressed in format CCYYMMDD\nNot used by Target Stores.\nFor Target.com only: Required for discount invoices",
        },
      ],
    },
    {
      id: "4e0398d2-3024-4847-b361-1de7b97b695e",
      label: "Terms Discount Days Due",
      name: "351_ITD_05",
      type: "input",
      dataType: "N0",
      placeholder: "Enter Terms Discount Days Due",
      rules: [
        {
          requirement: "Conditional",
          message: "Please enter Terms Discount Days Due",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
        {
          note:
            "Number of days in the terms discount period by which payment is due if terms discount is earned",
        },
      ],
    },
    {
      id: "eaaf7428-d5c5-4654-b154-f395ac81ad1d",
      label: "Terms Net Due Date",
      name: "446_ITD_06",
      type: "datepicker",
      dataType: "DT",
      placeholder: "Enter Terms Net Due Date",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Terms Net Due Date",
        },
        {
          note:
            "Date when total invoice amount becomes due expressed in format CCYYMMDD\nNot used by Target Stores.\nFor Target.com only: Required for non-discount invoices",
        },
      ],
    },
    {
      id: "eaaf7428-d5c5-4654-b154-f395ac81ad1d",
      label: "Terms Net Days",
      name: "386_ITD_07",
      type: "input",
      dataType: "DT",
      placeholder: "Enter Terms Net Days",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Terms Net Days",
        },
        {
          min: 1,
          message: "Should have at least 1 character",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
      ],
    },
    {
      id: "eaaf7428-d5c5-4654-b154-f395ac81ad1d",
      label: "Terms Discount Amount",
      name: "362_ITD_08",
      type: "input",
      dataType: "ID",
      placeholder: "Enter Terms Discount Amount",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Terms Discount Amount",
        },
        {
          min: 1,
          message: "Should have at least 1 character",
        },
        {
          max: 10,
          message: "Can have at most 10 characters",
        },
      ],
    },
    {
      id: "3823346f-b336-4411-b81c-3198bd848f01",
      label: "Date/Time Qualifier",
      name: "374_DTM_01",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Date/Time Qualifier",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Date/Time Qualifier",
        },
        {
          min: 3,
          message: "Must have at least 3 characters",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
        {},
      ],
      options: [
        {
          code: "011",
          description: "Shipped",
        },
      ],
    },
    {
      id: "01c1e2a9-3641-4ae9-9c58-e8293f24d6d4",
      label: "Date",
      name: "373_DTM_02",
      type: "datepicker",
      dataType: "DT",
      placeholder: "Enter Date",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Date",
        },
        {
          note: "Date expressed as CCYYMMDD\nDate Merchandise was shipped.",
        },
      ],
    },
    {
      id: "ba383e6b-a2ba-4201-8194-570d68cb9298",
      label: "heading_N9",
      name: "heading_N9",
      type: "table",
      columns: [
        {
          title: "Reference Identification Qualifier",
          dataIndex: "N9_01_128",
          type: "dropdown",
          dataType: "ID",
          editable: true,
          placeholder: "Enter Reference Identification Qualifier",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Reference Identification Qualifier",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 3,
              message: "Can have at most 3 characters",
            },
            {},
          ],
          options: [
            {
              code: "ZZ",
              description: "Mutually Defined",
            },
          ],
        },
        {
          tile: "Reference Identification",
          dataIndex: "N9_02_127",
          type: "input",
          dataType: "AN",
          editable: true,
          placeholder: "Enter Reference Identification",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Reference Identification",
            },
            {
              min: 1,
              message: "Must have at least 1 character",
            },
            {
              max: 30,
              message: "Can have at most 30 characters",
            },
            {
              note:
                "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\nPACA",
            },
          ],
        },
        {
          title: "Free-Form Message Text",
          dataIndex: "933_MSG_01",
          type: "textarea",
          dataType: "AN",
          placeholder: "Enter Free-Form Message Text",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Free-Form Message Text",
            },
            {
              min: 1,
              message: "Must have at least 1 character",
            },
            {
              max: 264,
              message: "Can have at most 264 characters",
            },
            {
              note:
                "Free-form message text\nMSG* Theperishableagriculturalcommoditieslisted on this\nMSG* invoicearesold subjectto thestatutorytrustauthorized\nMSG* bySection 5(c)ofthePerishableAgriculturalCommodities\nMSG* Act,1930 (7 U.S.C.4993(c)). Thesellerofthese\nMSG* commodities retains a trust claim over these commodities,\nMSG* alli nventories of food or other products derived from\nMGS* these commodities, and any receivables or proceeds from\nMSG* the sale of these commodities until full payment is\nMSG* recieved",
            },
          ],
          maxLength: 264,
        },
      ],
    },
    {
      id: "9dbd886d-38f8-469f-8ff8-150d1e5ff012",
      label: "detail_IT1",
      name: "detail_IT1",
      type: "subForm",
      rules: [],
      path:
        "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop",
      children: [
        {
          id: "9dbd886d-38f8-469f-8ff8-150d1e5ff003",
          label: "Unit or Basis for Measurement Code",
          name: "355_IT1_03",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Unit or Basis for Measurement Code",
          looping_key: "baseline_item_data_invoice_IT1_loop",
          path:
            "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop[INDEX].baseline_item_data_invoice_IT1.unit_or_basis_for_measurement_code_03",
          rules: [
            {
              requirement: "Conditional",
              message: "Please enter Unit or Basis for Measurement Code",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {
              note:
                "Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken\nThe UOM should match the UOM received on the PO. The value in the ISS02\nmust be the same as this value.",
            },
          ],
          options: [
            {
              code: "CA",
              description: "Case",
            },
            {
              code: "EA",
              description: "Each",
            },
            {
              code: "LB",
              description: "Pound",
            },
          ],
        },
        {
          id: "ae0bf9b6-c8e5-4885-8016-2b4f589063cb",
          label: "Product/Service ID Qualifier",
          name: "235_IT1_06",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Product/Service ID Qualifier",
          looping_key: "baseline_item_data_invoice_IT1_loop",
          path:
            "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop[INDEX].baseline_item_data_invoice_IT1.product_service_id_qualifier_06",
          rules: [
            {
              requirement: "Conditional",
              message: "Please enter Product/Service ID Qualifier",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {},
          ],
          options: [
            {
              code: "CB",
              description: "Buyer's Catalog Number",
            },
            {
              code: "EN",
              description: "European Article Number (EAN) (2-5-5-1)",
            },
            {
              code: "IN",
              description: "Buyer's Item Number",
            },
            {
              code: "UI",
              description: "U.P.C. Consumer Package Code (1-5-5)",
            },
            {
              code: "UP",
              description: "U.P.C. Consumer Package Code (1-5-5-1)",
            },
            {
              code: "EO",
              description: "NA",
            },
          ],
        },
        {
          id: "33407c1f-8eec-4a9a-93d2-8951fb2311c1",
          label: "Product/Service ID Qualifier",
          name: "235_IT1_08",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Product/Service ID Qualifier",
          looping_key: "baseline_item_data_invoice_IT1_loop",
          path:
            "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop[INDEX].baseline_item_data_invoice_IT1.product_service_id_qualifier_06",
          rules: [
            {
              requirement: "Conditional",
              message: "Please enter Product/Service ID Qualifier",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {},
          ],
          options: [
            {
              code: "CB",
              description: "Buyer's Catalog Number",
            },
            {
              code: "EN",
              description: "European Article Number (EAN) (2-5-5-1)",
            },
            {
              code: "IN",
              description: "Buyer's Item Number",
            },
            {
              code: "UI",
              description: "U.P.C. Consumer Package Code (1-5-5)",
            },
            {
              code: "UP",
              description: "U.P.C. Consumer Package Code (1-5-5-1)",
            },
            {
              code: "EO",
              description: "NA",
            },
          ],
        },
        {
          id: "13e29282-2d01-471e-b1fc-d98de4671327",
          label: "Product/Service ID Qualifier",
          name: "235_IT1_10",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Product/Service ID Qualifier",
          rules: [
            {
              requirement: "Conditional",
              message: "Please enter Product/Service ID Qualifier",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {},
          ],
          options: [
            {
              code: "CB",
              description: "Buyer's Catalog Number",
            },
            {
              code: "EN",
              description: "European Article Number (EAN) (2-5-5-1)",
            },
            {
              code: "IN",
              description: "Buyer's Item Number",
            },
            {
              code: "UI",
              description: "U.P.C. Consumer Package Code (1-5-5)",
            },
            {
              code: "EO",
              description: "NA",
            },
            {
              code: "UP",
              description: "U.P.C. Consumer Package Code (1-5-5-1)",
            },
          ],
        },
        {
          id: "3cb1c785-22e6-4dff-b693-8c41d0b41d36",
          label: "Shipment/Order Status Code",
          name: "368_IT3_03",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Shipment/Order Status Code",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Shipment/Order Status Code",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {},
          ],
          options: [
            {
              code: "IS",
              description: "Item Represents Substitution from Original Order",
            },
          ],
        },
        {
          id: "7ddbdcf2-6bd5-4a5b-a2cb-72afe90928f3",
          label: "Pack",
          name: "356_PO4_01",
          type: "input",
          dataType: "N0",
          placeholder: "Enter Pack",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Pack",
            },
            {
              min: 1,
              message: "Must have at least 1 character",
            },
            {
              max: 6,
              message: "Can have at most 6 characters",
            },
            {},
          ],
        },
        {
          id: "7ddbdcf2-6bd5-4a5b-a2cb-72afe90928f5",
          label: "Pack",
          name: "810_PO4_14",
          type: "input",
          dataType: "N0",
          placeholder: "Enter Inner Pack",
          rules: [
            {
              requirement: "Optional",
              message: "Please enter Inner Pack",
            },
            {
              min: 1,
              message: "Must have at least 1 character",
            },
            {
              max: 6,
              message: "Can have at most 6 characters",
            },
            {},
          ],
        },
        {
          id: "b8419e6b-1e8b-45c5-b90d-d8da479454e5",
          label: "detail_PID_subform",
          name: "detail_PID_subform",
          type: "subform",
          path:
            "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop[INDEX].product_item_description_PID_loop",
          children: [
            {
              id: "8ddbdcf2-6bd5-4a5b-a2cb-72afe90928f3",
              name: "PID_01_349",
              label: "Item Description Type",
              type: "dropdown",
              requirement: "Mandatory",
              looping_key: "product_item_description_PID_loop",
              path:
                "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop[INDEX].product_item_description_PID_loop[INDEX2].product_item_description_PID.item_description_type_code_01",
              options: [
                {
                  code: "F",
                  description: "Free-form",
                },
              ],
            },
            {
              id: "6ddbdcf2-6bd5-4a5b-a2cb-72afe90928f3",
              label: "Product/Process Characteristic Code",
              name: "PID_02_750",
              type: "dropdown",
              looping_key: "product_item_description_PID_loop",
              path:
                "output.interchanges[0].groups.[0].transaction_sets[0].detail.baseline_item_data_invoice_IT1_loop[INDEX].product_item_description_PID_loop[INDEX2].product_item_description_PID.agency_qualifier_code_03",
              requirement: "Optional",
              options: [
                {
                  code: "08",
                  description: "Product",
                },
              ],
            },
            {
              id: "7cdbdcf2-6bd5-4a5b-a2cb-72afe90928f3",
              label: "Description",
              name: "PID_05_352",
              requirement: "Conditional",
              type: "input",
            },
          ],
          placeholder: "Enter Item Description Type",
          rules: [],
        },
        {
          id: "a9418bc7-5cbf-4542-b01b-7aa6276d315f",
          label: "detail_SAC_subform",
          name: "detail_SAC_subform",
          type: "subform",
          children: [
            {
              id: "b9418bc7-5cbf-4542-b01b-7aa6276d315f",
              label: "Allowance or Charge Indicator",
              name: "SAC_01_248",
              requirement: "Mandatory",
              type: "dropdown",
              options: [
                {
                  code: "A",
                  description: "Allowance",
                },
                {
                  code: "C",
                  description: "Charge",
                },
              ],
            },
            {
              id: "c9418bc7-5cbf-4542-b01b-7aa6276d315f",
              label: "Service, Promotion, Allowance, or Charge Code",
              name: "SAC_02_1300",
              requirement: "Conditional",
              type: "dropdown",
              options: [
                {
                  code: "A400",
                  description: "Allowance Non-performance",
                },
                {
                  code: "B310",
                  description: "Commission Amount",
                },
                {
                  code: "B560",
                  description: "Container Allowance",
                },
                {
                  code: "B950",
                  description: "Damaged Merchandise",
                },
                {
                  code: "C310",
                  description: "Discount",
                },
                {
                  code: "D170",
                  description: "Free Goods",
                },
                {
                  code: "D220",
                  description: "Freight Passthrough",
                },
                {
                  code: "D240",
                  description: "Freight",
                },
                {
                  code: "D270",
                  description: "Fuel Surcharge",
                },
                {
                  code: "F180",
                  description: "Pallet",
                },
                {
                  code: "F340",
                  description: "Pick/Up",
                },
                {
                  code: "F800",
                  description: "Promotional Allowance",
                },
                {
                  code: "F810",
                  description: "Promotional Discount",
                },
                {
                  code: "G970",
                  description: "Small Order Charge",
                },
                {
                  code: "H000",
                  description: "Special Allowance",
                },
                {
                  code: "H090",
                  description: "Special Handling",
                },
                {
                  code: "I170",
                  description: "Trade Discount",
                },
                {
                  code: "I580",
                  description: "Warehousing",
                },
              ],
            },
            {
              id: "a4418bc7-5cbf-4542-b01b-7aa6276d315f",
              label: "Agency Qualifier Code",
              name: "SAC_03_559",
              requirement: "Conditional",
              type: "dropdown",
              options: [
                {
                  code: "VI",
                  description:
                    "Voluntary Inter-Industry Commerce Standard (VICS) EDI",
                },
              ],
            },
            {
              id: "a9418bc7-5cbf-4542-b01b-7aa6276d3151",
              label: "Agency Service, Promotion, Allowance, or Charge Code",
              name: "SAC_04_1301",
              requirement: "Conditional",
              type: "input",
            },
            {
              id: "a9418bc7-5cbf-4542-b01b-7aa6276d315s",
              label: "Amount",
              name: "SAC_05_610",
              requirement: "Optional",
              type: "input",
            },
            {
              id: "a9418bc7-5cbd-4542-b01b-7aa6276d3s5f",
              label: "Allowance/Charge Percent Qualifier",
              name: "SAC_06_378",
              requirement: "Conditional",
              type: "input",
            },
            {
              id: "a9418bc7-5cbd-4542-b01b-7aa6276d3s5f",
              label: "Percent",
              name: "SAC_07_332",
              requirement: "Conditional",
              type: "input",
            },
            {
              id: "a9418bc7-5cbfd4542-b01b-7aa6276d315f",
              label: "Unit or Basis for Measurement Code",
              name: "SAC_09_355",
              requirement: "Conditional",
              type: "dropdown",
              options: [
                {
                  code: "EA",
                  description: "Each",
                },
              ],
            },
            {
              id: "a9418bc7-5cbf-4542-b01b-7aa6276d3s5f",
              label: "Quantity",
              name: "SAC_10_380",
              requirement: "Conditional",
              type: "input",
            },
            {
              id: "a9418bc7-5cbf-d542-b01b-7aa6276d315f",
              label: "Allowance or Charge Method of Handling Code",
              name: "SAC_12_331",
              requirement: "Optional",
              type: "dropdown",
              options: [
                {
                  code: "02",
                  description: "Off Invoice",
                },
                {
                  code: "06",
                  description: "Charge to be Paid by Customer",
                },
              ],
            },
            {
              id: "a9418bb7-5cbf-d542-b01b-7aa6276d315f",
              label: "Description",
              name: "SAC_15_352",
              requirement: "Optional",
              type: "input",
            },
          ],
          placeholder: "Enter Allowance or Charge Indicator",
          rules: [],
        },
        {
          id: "3a0f88c8-58ab-4294-8166-e91fefa5f0d6",
          label: "detail_SLN_subform",
          name: "detail_SLN_subform",
          type: "subform",
          children: [
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5f0d1",
              label: "Assigned Identification",
              name: "SLN_01_350",
              requirement: "Mandatory",
              type: "input",
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5f0d2",
              label: "Assigned Identification",
              name: "SLN_02_350",
              requirement: "Optional",
              type: "input",
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5f0a6",
              label: "Relationship Code",
              name: "SLN_03_662",
              requirement: "Mandatory",
              type: "dropdown",
              options: [
                {
                  code: "S",
                  description: "Substituted",
                },
              ],
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5f0f6",
              label: "Quantity",
              name: "SLN_04_380",
              requirement: "Conditional",
              type: "input",
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5s0d6",
              label: "Quantity",
              name: "SLN_05_355",
              requirement: "Conditional",
              type: "dropdown",
              options: [
                {
                  code: "EA",
                  description: "Each",
                },
              ],
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5f0d8",
              label: "Product/Service ID Qualifier",
              name: "SLN_09_235",
              requirement: "Conditional",
              type: "dropdown",
              options: [
                {
                  code: "CB",
                  description: "Buyer's Catalog Number",
                },
                {
                  code: "EN",
                  description: "European Article Number (EAN) (2-5-5-1)",
                },
                {
                  code: "UP",
                  description: "U.P.C. Consumer Package Code (1-5-5-1)",
                },
                {
                  code: "EO",
                  description: "NA",
                },
              ],
            },
            {
              id: "3a0e88c8-58ab-4294-8166-e91fefa5f0d6",
              label: "Product/Service ID",
              name: "SLN_10_234",
              requirement: "Conditional",
              type: "input",
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5g0d6",
              label: "Product/Service ID Qualifier",
              name: "SLN_11_235",
              requirement: "Conditional",
              type: "dropdown",
              options: [
                {
                  code: "CB",
                  description: "Buyer's Catalog Number",
                },
                {
                  code: "EN",
                  description: "European Article Number (EAN) (2-5-5-1)",
                },
                {
                  code: "UP",
                  description: "U.P.C. Consumer Package Code (1-5-5-1)",
                },
                {
                  code: "EO",
                  description: "NA",
                },
              ],
            },
            {
              id: "3a0f88c8-58ab-4294-8166-e91fefa5f1d6",
              label: "Product/Service ID",
              name: "SLN_12_234",
              requirement: "Conditional",
              type: "input",
            },
          ],
          placeholder: "Enter Relationship Code",
          rules: [],
        },
      ],
    },
    {
      id: "30a88a84-8e6a-4751-87e0-b90a8696def1",
      label: "Amount",
      name: "610_TDS_01",
      type: "input",
      dataType: "N2",
      placeholder: "Enter Amount",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Amount",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 15,
          message: "Can have at most 15 characters",
        },
        {
          note:
            "Monetary amount\nTotal amount of invoice(including charges, less allowances) before terms\ndiscount.",
        },
      ],
    },
    {
      id: "b7c32d93-5b49-45d5-8d4a-81041b0b8997",
      label: "Amount",
      name: "610_TDS_02",
      type: "input",
      dataType: "N2",
      placeholder: "Enter Amount",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Amount",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 15,
          message: "Can have at most 15 characters",
        },
        {
          note:
            "Monetary amount\nTotal amount of merchandise. If you offer a discount on gross amount before\nallowances, this field is required. Otherwise it is not needed.",
        },
      ],
    },
    {
      id: "5e46c69b-0272-4cde-8d74-9fbbfa21b4dd",
      label: "Transportation Method/Type Code",
      name: "91_CAD_01",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Transportation Method/Type Code",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Transportation Method/Type Code",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 2,
          message: "Can have at most 2 characters",
        },
        {},
      ],
      options: [
        {
          code: "C",
          description: "Consolidation",
        },
        {
          code: "M",
          description: "Motor (Common Carrier)",
        },
        {
          code: "P",
          description: "Private Carrier",
        },
        {
          code: "U",
          description: "Private Parcel Service",
        },
      ],
    },
    {
      id: "60dfc4c6-2299-43c3-a177-ae0adcf862c9",
      name: "140_CAD_04",
      type: "input",
      label: "Standard Carrier Alpha Code",
      rules: [
        {
          requirement: "Conditional",
        },
        {
          min: 2,
          message: "Must have at least 2 character",
        },
        {
          max: 4,
          message: "Can have at most 4 characters",
        },
      ],
    },
    {
      id: "60dfc4c6-2299-43c3-a177-ae0adcf862d9",
      name: "387_CAD_05",
      type: "input",
      label: "Routing",
      rules: [
        {
          requirement: "Conditional",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 35,
          message: "Can have at most 35 characters",
        },
      ],
    },
    {
      id: "2bf26391-674f-49de-ab50-50d96f129224",
      label: "Reference Identification Qualifier",
      name: "128_CAD_07",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Reference Identification Qualifier",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Reference Identification Qualifier",
        },
        {
          min: 2,
          message: "Must have at least 2 characters",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
        {},
      ],
      options: [
        {
          code: "BM",
          description: "Bill of Lading Number",
        },
        {
          code: "CN",
          description: "Carrier's Reference Number (PRO/Invoice)",
        },
      ],
    },
    {
      id: "9a1b7fb5-efc0-4627-9ba8-c7e5847f7a3b",
      label: "summary_SAC",
      name: "summary_SAC",
      type: "table",
      columns: [
        {
          title: "Allowance or Charge Indicator",
          dataIndex: "SAC_01_248",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "A",
              description: "Allowance",
            },
            {
              code: "C",
              description: "Charge",
            },
          ],
        },
        {
          title: "Service, Promotion, Allowance, or Charge Code",
          dataIndex: "SAC_02_1300",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "A400",
              description: "Allowance Non-performance",
            },
            {
              code: "B310",
              description: "Commission Amount",
            },
            {
              code: "B560",
              description: "Container Allowance",
            },
            {
              code: "B570",
              description: "Container Deposits",
            },
            {
              code: "B950",
              description: "Damaged Merchandise",
            },
            {
              code: "C310",
              description: "Discount",
            },
            {
              code: "D170",
              description: "Free Goods",
            },
            {
              code: "D220",
              description: "Freight Passthrough",
            },
            {
              code: "D240",
              description: "Freight",
            },
            {
              code: "D270",
              description: "Fuel Surcharge",
            },
            {
              code: "F180",
              description: "Pallet",
            },
            {
              code: "F340",
              description: "Pick/Up",
            },
            {
              code: "F800",
              description: "Promotional Allowance",
            },
            {
              code: "F810",
              description: "Promotional Discount",
            },
            {
              code: "G970",
              description: "Small Order Charge",
            },
            {
              code: "H000",
              description: "Special Allowance",
            },
            {
              code: "H090",
              description: "Special Handling",
            },
            {
              code: "H700",
              description: "Tax - Local Tax",
            },
            {
              code: "I170",
              description: "Trade Discount",
            },
            {
              code: "I580",
              description: "Warehousing",
            },
          ],
        },
        {
          title: "Agency Qualifier Code",
          dataIndex: "SAC_03_559",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "VI",
              description:
                "Voluntary Inter-Industry Commerce Standard (VICS) EDI",
            },
          ],
        },
        {
          title: "Agency Service, Promotion, Allowance, or Charge Code",
          dataIndex: "SAC_04_1301",
          requirement: "Conditional",
          editable: true,
        },
        {
          title: "Amount",
          dataIndex: "SAC_05_610",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "Allowance/Charge Percent Qualifier",
          dataIndex: "SAC_06_378",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "3",
              description: "Discount/Gross",
            },
          ],
        },
        {
          title: "Percent",
          dataIndex: "SAC_07_332",
          requirement: "Conditional",
          editable: true,
        },
        {
          title: "Quantity",
          dataIndex: "SAC_10_380",
          requirement: "Conditional",
          editable: true,
        },
        {
          title: "Quantity",
          dataIndex: "SAC_11_380",
          requirement: "Optional",
          editable: true,
        },
        {
          title: "Allowance or Charge Method of Handling Code",
          dataIndex: "SAC_12_331",
          requirement: "Optional",
          editable: true,
          options: [
            {
              code: "02",
              description: "Off Invoice",
            },
            {
              code: "06",
              description: "Charge to be Paid by Customer",
            },
          ],
        },
        {
          title: "Description",
          dataIndex: "SAC_15_352",
          requirement: "Conditional",
          editable: true,
        },
      ],
      placeholder: "Enter Allowance or Charge Indicator",
      rules: [],
      emptyRow: {
        SAC_01_248: "Enter a value",
        SAC_02_1300: "Enter a value",
        SAC_03_559: "Enter a value",
        SAC_04_1301: "Enter a value",
        SAC_05_610: "Enter a value",
        SAC_06_378: "Enter a value",
        SAC_12_331: "Enter a value",
        SAC_15_352: "Enter a value",
      },
    },
    {
      id: "9a1b7fb5-efc0-4627-9ba8-c7e5847f7a3b",
      label: "summary_ISS",
      name: "summary_ISS",
      type: "table",
      columns: [
        {
          editable: true,
          title: "Number of Units Shipped",
          dataIndex: "ISS_01_382",
          type: "input",
          dataType: "R",
          placeholder: "Enter Number of Units Shipped",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Number of Units Shipped",
            },
            {
              min: 1,
              message: "Must have at least 1 character",
            },
            {
              max: 10,
              message: "Can have at most 10 characters",
            },
            {},
          ],
        },
        {
          editable: true,
          title: "Unit or Basis for Measurement Code",
          dataIndex: "ISS_02_355",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Unit or Basis for Measurement Code",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Unit or Basis for Measurement Code",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {},
          ],
          options: [
            {
              code: "CA",
              description: "Case",
            },
            {
              code: "CT",
              description: "Carton",
            },
            {
              code: "EA",
              description: "Each",
            },
            {
              code: "LB",
              description: "Pound",
            },
          ],
        },
        {
          editable: true,
          title: "Weight",
          dataIndex: "ISS_03_81",
          type: "input",
          dataType: "R",
          placeholder: "Enter Weight",
          rules: [
            {
              requirement: "Mandatory",
              message: "Please enter Weight",
            },
            {
              min: 1,
              message: "Must have at least 1 character",
            },
            {
              max: 10,
              message: "Can have at most 10 characters",
            },
            {},
          ],
        },
        {
          editable: true,
          title: "Unit or Basis for Measurement Code",
          dataIndex: "ISS_04_355",
          type: "dropdown",
          dataType: "ID",
          placeholder: "Enter Unit or Basis for Measurement Code",
          rules: [
            {
              requirement: "Conditional",
              message: "Please enter Unit or Basis for Measurement Code",
            },
            {
              min: 2,
              message: "Must have at least 2 characters",
            },
            {
              max: 2,
              message: "Can have at most 2 characters",
            },
            {},
          ],
          options: [
            {
              code: "LB",
              description: "Pound",
            },
          ],
        },
      ],
    },

    {
      id: "7f124e29-d71e-4e74-8c3d-88ccb933081a",
      label: "Transaction Set Identifier Code",
      name: "143_ST_01",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Transaction Set Identifier Code",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Transaction Set Identifier Code",
        },
        {
          min: 3,
          message: "Must have at least 3 characters",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
        {},
      ],
      options: [
        {
          code: "810",
          description: "Invoice",
        },
      ],
    },
    {
      id: "7f124e29-d71e-4e74-8c3d-88ccb933081b",
      label: "Transaction Set Control Number",
      name: "329_ST_02",
      type: "input",
      dataType: "ID",
      placeholder: "Enter Transaction Set Control Number",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Transaction Set Identifier Code",
        },
        {
          min: 4,
          message: "Must have at least 4 characters",
        },
        {
          max: 9,
          message: "Can have at most 9 characters",
        },
        {},
      ],
    },
    {
      id: "57f20670-f61d-4977-8907-5bccb46784c8",
      label: "Note Reference Code",
      name: "363_NTE_01",
      type: "dropdown",
      dataType: "ID",
      placeholder: "Enter Note Reference Code",
      rules: [
        {
          requirement: "Optional",
          message: "Please enter Note Reference Code",
        },
        {
          min: 3,
          message: "Must have at least 3 characters",
        },
        {
          max: 3,
          message: "Can have at most 3 characters",
        },
        {},
      ],
      options: [
        {
          code: "CER",
          description: "Certification Narrative",
        },
      ],
    },
    {
      id: "57f20670-f61d-4977-8907-5bccb46784c8",
      label: "Description",
      name: "363_NTE_02",
      type: "textarea",
      dataType: "ID",
      maxLength: 80,
      placeholder: "Enter Note Reference Code",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Description",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 80,
          message: "Can have at most 80 characters",
        },
      ],
    },
    {
      id: "83d09d14-d635-4c95-a21e-7717951d9e3f",
      label: "Reference Identification",
      name: "127_CAD_08",
      type: "input",
      dataType: "AN",
      placeholder: "Enter Reference Identification",
      rules: [
        {
          requirement: "Conditional",
          message: "Please enter Reference Identification",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 30,
          message: "Can have at most 30 characters",
        },
        {
          note:
            "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\n\nA value is not required in the CAD08 for DSD vendors.",
        },
      ],
    },
    {
      id: "e1ed55c1-a100-4939-b358-2257aabdaf8b",
      label: "Number of Line Items",
      name: "354_CTT_01",
      type: "input",
      dataType: "N0",
      placeholder: "Enter Number of Line Items",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Number of Line Items",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 6,
          message: "Can have at most 6 characters",
        },
        {
          note:
            "Total number of line items in the transaction set\n\nSample CTT Segment\n_________________\nCTT*25",
        },
      ],
    },
    {
      id: "e1ed55c1-a100-4939-b358-2257aabvaf8b",
      label: "Number of Included Segments",
      name: "96_SE_01",
      type: "input",
      dataType: "N0",
      placeholder: "Enter Number of Included Segments",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Number of Included Segments",
        },
        {
          min: 1,
          message: "Must have at least 1 character",
        },
        {
          max: 10,
          message: "Can have at most 10 characters",
        },
      ],
    },
    {
      id: "e1ed55c1-a100-4939-a358-2257aabdaf8b",
      label: "Transaction Set Control Number",
      name: "329_SE_02",
      type: "input",
      dataType: "N0",
      placeholder: "Enter Transaction Set Control Number",
      rules: [
        {
          requirement: "Mandatory",
          message: "Please enter Transaction Set Control Number",
        },
        {
          min: 4,
          message: "Must have at least 4 characters",
        },
        {
          max: 9,
          message: "Can have at most 9 characters",
        },
      ],
    },
  ],
};

export { sampleResponse };
