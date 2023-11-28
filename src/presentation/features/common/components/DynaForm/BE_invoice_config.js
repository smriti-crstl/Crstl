{
  metadata: {
    key: "Target-Invoice",
    onSubmit: {
      endpoint: ""
    }
  },
  data: [
    {
      id: "fa803b1c-e26b-441a-bde0-07a827f97c15",
      label: "Date",
      name: "373_BIG_01",
      type: "DatePicker",
      dataType: "AN",
      placeholder: "Enter Date",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Date"
        },
        {
          min: 1,
          message: "Must have at least 8 character"
        },
        {
          max: 22,
          message: "Can have at most 8 characters"
        }
      ]
    },
    {
      id: "bcfe30ee-fc8b-478d-9058-ed0c12168486",
      label: "Invoice Number",
      name: "76_BIG_02",
      type: "Input",
      dataType: "AN",
      placeholder: "Enter Invoice Number",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Invoice Number"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 22,
          message: "Can have at most 22 characters"
        },
        {
          note: "Note: Invoice numbers must not be more than 19 characters long. Invoice\nnumbers may contain alphas but no special characters. Alpha characters must\nbe in uppercase.
        }
      ]
    },
    {
      id: "ec803b1e-e26b-441a-bde0-07a827f97c15",
      label: "Purchase Order Number",
      name: "324_BIG_04",
      type: "Input",
      dataType: "AN",
      placeholder: "Enter Purchase Order Number",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Purchase Order Number"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 22,
          message: "Can have at most 22 characters"
        },
        {
          note: "Identifying number for Purchase Order assigned by the orderer/purchaser\nTargetStores:\nThis field is required.\nSend the same number here that was received on the 850 PO in element\nBEG03.\nThep urchase order number will be formatted either as SSSS-PPPPPPP-LLLL\n(17 characters) or SSSS-PPPPPPP (12 characters).\nSSSS = Sourcecode,PPPPPPP = PO number,LLLL = Location ID Code\nTarget.com:\nThis field is required.\nSend the same number here that was received on the 850 PO in element\nBEG03.\nThe purchase order number will be formatted as\nSSSS-PPPPPPP-LLLL (17 characters)or\nSSSS-PPPPPPPP-LLLL (18 characters)or\nSSSS-PPPPPPP (12 characters)or\nSSSS-PPPPPPPP (13 characters)\nSSSS = Sourcecode,PPPPPPP orPPPPPPPP = PO number,LLLL =\nLocation ID CodeTargetStores:\nThisfield isrequired.\nSend thesamenumberherethatwasreceived on the850 PO in element\nBEG03.\nThepurchaseordernumberwillbeformatted eitherasSSSS-PPPPPPP-LLLL\n(17 characters)orSSSS-PPPPPPP (12 characters).\nSSSS = Sourcecode,PPPPPPP = PO number,LLLL = Location ID Code\nTarget.com:\nThisfield isrequired.\nSend thesamenumberherethatwasreceived on the850 PO in element\nBEG03.\nThepurchaseordernumberwillbeformatted as\nSSSS-PPPPPPP-LLLL (17 characters)or\nSSSS-PPPPPPPP-LLLL (18 characters)or\nSSSS-PPPPPPP (12 characters)or\nSSSS-PPPPPPPP (13 characters)\nSSSS = Sourcecode,PPPPPPP orPPPPPPPP = PO number,LLLL =\nLocation ID Code
        }
      ]
    },
    {
      id: "71920d3e-7035-4982-9793-46f0790ca8bf",
      label: "Transaction Type Code",
      name: "640_BIG_07",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Transaction Type Code",
      rules: [
        {
          required: "Optional",
          message: "Please enter Transaction Type Code"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {
          note: "Code specifying the type of transaction\nThe \"DO\" code is required for Drop Ship to Guest Home. N1, N3 and N4 are\nalso required for this situation.\n**All other invoices (credit,display,samples,freightonly,pallets,etc.) must\nbe on paper and mailed to the appropriate area.
        }
      ],
      options: [
        {
          code: "DO",
          description: "Drop Shipment Invoice"
        }
      ]
    },
    {
      id: "514cc49f-91ac-4499-b45f-7389a109fb4b",
      label: "Reference Identification Qualifier",
      name: "128_REF_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Reference Identification Qualifier",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Reference Identification Qualifier"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {}
      ],
      options: [
        {
          code: "DP",
          description: "Department Number"
        },
        {
          code: "IA",
          description: "Internal Vendor Number"
        },
        {
          code: "PD",
          description: "Promotion/Deal Number"
        }
      ]
    },
    {
      id: "b04495e8-42f5-4e7d-b20d-4a4d49d26757",
      label: "Reference Identification",
      name: "127_REF_02",
      type: "Input",
      dataType: "AN",
      placeholder: "Enter Reference Identification",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Reference Identification"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 30,
          message: "Can have at most 30 characters"
        },
        {
          note: "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\nIA = Vendor Number. Vendor number must be 7 digits. Add leading zeroes to\nmake 7 digits.\nPD = Promotion/Deal Number\nDP = Department(Not applicable for Target.com)\nNote: Department must be 3 digits. Add leading zero(s) to make 3 digits.
        }
      ]
    },
    {
      id: "95a2c93b-2652-4009-b7d8-cf490f4f7c34",
      label: "heading_N1",
      name: "heading_N1",
      type: "Table",
      columns: [
        {
          title: "Address Information",
          dataIndex: "N3_01_166",
          requirement: "Mandatory",
          editable: true
        },
        {
          title: "Address Information",
          dataIndex: "N3_02_166",
          requirement: "Optional",
          editable: true
        },
        {
          title: "City Name",
          dataIndex: "N4_01_19",
          requirement: "Optional",
          editable: true
        },
        {
          title: "State or Province Code",
          dataIndex: "N4_02_156",
          requirement: "Optional",
          editable: true
        },
        {
          title: "Postal Code",
          dataIndex: "N4_03_116",
          requirement: "Optional",
          editable: true
        },
        {
          title: "Country Code",
          dataIndex: "N4_04_26",
          requirement: "Optional",
          editable: true
        },
        {
          title: "Location Qualifier",
          dataIndex: "N4_05_309",
          requirement: "Conditional",
          editable: true
        },
        {
          title: "Location Identifier",
          dataIndex: "N4_06_310",
          requirement: "Optional",
          editable: true
        },
        {
          title: "Entity Identifier Code",
          dataIndex: "N1_01_98",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "BS",
              description: "Bill and Ship To"
            },
            {
              code: "BY",
              description: "Buying Party (Purchaser)"
            },
            {
              code: "SF",
              description: "Ship From"
            },
            {
              code: "ST",
              description: "Ship To"
            }
          ]
        },
        {
          title: "Identification Code Qualifier",
          dataIndex: "N1_03_66",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "91",
              description: "Assigned by Seller or Seller's Agent"
            },
            {
              code: "92",
              description: "Assigned by Buyer or Buyer's Agent"
            }
          ]
        },
        {
          title: "Identification Code",
          dataIndex: "N1_04_67",
          requirement: "Conditional",
          editable: true
        }
      ],
      placeholder: "Enter Entity Identifier Code",
      rules: []
    },
    {
      id: "32b97b0a-ab85-4c08-bce2-853f69f4c64e",
      label: "Terms Type Code",
      name: "336_ITD_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Terms Type Code",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Terms Type Code"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "01",
          description: "Basic"
        },
        {
          code: "02",
          description: "End of Month (EOM)"
        }
      ]
    },
    {
      id: "00ce5569-bb22-433d-8dd6-d8fba6c4fb71",
      label: "Terms Basis Date Code",
      name: "333_ITD_02",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Terms Basis Date Code",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Terms Basis Date Code"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "2",
          description: "Delivery Date"
        },
        {
          code: "3",
          description: "Invoice Date"
        }
      ]
    },
    {
      id: "e7f4f774-9234-4811-a9c7-db2237f469f3",
      label: "Terms Discount Due Date",
      name: "370_ITD_04",
      type: "DatePicker",
      dataType: "DT",
      placeholder: "Enter Terms Discount Due Date",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Terms Discount Due Date"
        },
        {
          min: 8,
          message: "Must have at least 8 characters"
        },
        {
          max: 8,
          message: "Can have at most 8 characters"
        },
        {
          note: "Date payment is due if discount is to be earned expressed in format CCYYMMDD\nNot used by Target Stores.\nFor Target.com only: Required for discount invoices
        }
      ]
    },
    {
      id: "47331df4-eacf-4f84-841e-f531c8cd6b73",
      label: "Terms Discount Days Due",
      name: "351_ITD_05",
      type: "Input",
      dataType: "N0",
      placeholder: "Enter Terms Discount Days Due",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Terms Discount Days Due"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {
          note: "Number of days in the terms discount period by which payment is due if terms discount is earned"
        }
      ]
    },
    {
      id: "f095d8f7-9eb4-41b3-8242-12c82056ee61",
      label: "Terms Net Due Date",
      name: "446_ITD_06",
      type: "DatePicker",
      dataType: "DT",
      placeholder: "Enter Terms Net Due Date",
      rules: [
        {
          required: "Optional",
          message: "Please enter Terms Net Due Date"
        },
        {
          min: 8,
          message: "Must have at least 8 characters"
        },
        {
          max: 8,
          message: "Can have at most 8 characters"
        },
        {
          note: "Date when total invoice amount becomes due expressed in format CCYYMMDD\nNot used by Target Stores.\nFor Target.com only: Required for non-discount invoices
        }
      ]
    },
    {
      id: "0b52d075-3bfb-4711-8fab-e8d2346f2f2c",
      label: "Date/Time Qualifier",
      name: "374_DTM_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Date/Time Qualifier",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Date/Time Qualifier"
        },
        {
          min: 3,
          message: "Must have at least 3 characters"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {}
      ],
      options: [
        {
          code: "011",
          description: "Shipped"
        }
      ]
    },
    {
      id: "034c77aa-7ec9-47d1-a8af-3a6565d89225",
      label: "Date",
      name: "373_DTM_02",
      type: "DatePicker",
      dataType: "DT",
      placeholder: "Enter Date",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Date"
        },
        {
          min: 8,
          message: "Must have at least 8 characters"
        },
        {
          max: 8,
          message: "Can have at most 8 characters"
        },
        {
          note: "Date expressed as CCYYMMDD\nDate Merchandise was shipped.
        }
      ]
    },
    {
      id: "5cd48c21-7d59-4f9a-af4e-67d883510bcd",
      label: "Reference Identification Qualifier",
      name: "128_N9_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Reference Identification Qualifier",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Reference Identification Qualifier"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {}
      ],
      options: [
        {
          code: "ZZ",
          description: "Mutually Defined"
        }
      ]
    },
    {
      id: "90e5112c-d3bd-4e0e-8191-c994046b3f30",
      label: "Reference Identification",
      name: "127_N9_02",
      type: "Input",
      dataType: "AN",
      placeholder: "Enter Reference Identification",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Reference Identification"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 30,
          message: "Can have at most 30 characters"
        },
        {
          note: "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\nPACA
        }
      ]
    },
    {
      id: "9bb24f36-e4e2-4165-8c65-d7cfe4c0275f",
      label: "Free-Form Message Text",
      name: "933_MSG_01",
      type: "TextArea",
      dataType: "AN",
      placeholder: "Enter Free-Form Message Text",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Free-Form Message Text"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 264,
          message: "Can have at most 264 characters"
        },
        {
          note: "Free-form message text\nMSG* Theperishableagriculturalcommoditieslisted on this\nMSG* invoicearesold subjectto thestatutorytrustauthorized\nMSG* bySection 5(c)ofthePerishableAgriculturalCommodities\nMSG* Act,1930 (7 U.S.C.4993(c)). Thesellerofthese\nMSG* commodities retains a trust claim over these commodities,\nMSG* alli nventories of food or other products derived from\nMGS* these commodities, and any receivables or proceeds from\nMSG* the sale of these commodities until full payment is\nMSG* recieved
        }
      ],
      maxLength: 264
    },
    {
      id: "26e28662-a90a-4f8f-bc6c-473831058d6a",
      label: "Unit or Basis for Measurement Code",
      name: "355_IT1_03",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Unit or Basis for Measurement Code",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Unit or Basis for Measurement Code"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {
          note: "Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken\nThe UOM should match the UOM received on the PO. The value in the ISS02\nmust be the same as this value.
        }
      ],
      options: [
        {
          code: "CA",
          description: "Case"
        },
        {
          code: "EA",
          description: "Each"
        },
        {
          code: "LB",
          description: "Pound"
        }
      ]
    },
    {
      id: "9acfbb01-5454-4308-bf9c-544df6531ffb",
      label: "Product/Service ID Qualifier",
      name: "235_IT1_06",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Product/Service ID Qualifier",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Product/Service ID Qualifier"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "CB",
          description: "Buyer's Catalog Number"
        },
        {
          code: "EN",
          description: "European Article Number (EAN) (2-5-5-1)"
        },
        {
          code: "IN",
          description: "Buyer's Item Number"
        },
        {
          code: "UI",
          description: "U.P.C. Consumer Package Code (1-5-5)"
        },
        {
          code: "UP",
          description: "U.P.C. Consumer Package Code (1-5-5-1)"
        },
        {
          code: "EO",
          description: "NA"
        }
      ]
    },
    {
      id: "73518e3e-96f6-4d22-8858-f66e51070ef8",
      label: "Product/Service ID Qualifier",
      name: "235_IT1_08",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Product/Service ID Qualifier",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Product/Service ID Qualifier"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "CB",
          description: "Buyer's Catalog Number"
        },
        {
          code: "EN",
          description: "European Article Number (EAN) (2-5-5-1)"
        },
        {
          code: "IN",
          description: "Buyer's Item Number"
        },
        {
          code: "UI",
          description: "U.P.C. Consumer Package Code (1-5-5)"
        },
        {
          code: "UP",
          description: "U.P.C. Consumer Package Code (1-5-5-1)"
        },
        {
          code: "EO",
          description: "NA"
        }
      ]
    },
    {
      id: "231a0b12-48c0-4aab-8f75-9109b9ce126d",
      label: "Shipment/Order Status Code",
      name: "368_IT3_03",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Shipment/Order Status Code",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Shipment/Order Status Code"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "IS",
          description: "Item Represents Substitution from Original Order"
        }
      ]
    },
    {
      id: "ad676fec-fc3a-495c-bdd1-87ea2a032852",
      label: "detail_PID",
      name: "detail_PID",
      type: "Table",
      columns: [
        {
          title: "Item Description Type",
          dataIndex: "PID_01_349",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "F",
              description: "Free-form"
            }
          ]
        },
        {
          title: "Product/Process Characteristic Code",
          dataIndex: "PID_02_750",
          requirement: "Optional",
          editable: true,
          options: [
            {
              code: "08",
              description: "Product"
            }
          ]
        },
        {
          title: "Description",
          dataIndex: "PID_05_352",
          requirement: "Conditional",
          editable: true
        }
      ],
      placeholder: "Enter Item Description Type",
      rules: []
    },
    {
      id: "c555834b-1616-4bae-8377-f22ae142d388",
      label: "Pack",
      name: "356_PO4_01",
      type: "Input",
      dataType: "N0",
      placeholder: "Enter Pack",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Pack"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 6,
          message: "Can have at most 6 characters"
        },
        {}
      ]
    },
    {
      id: "b4416e4f-4264-4d1b-a4c0-fb486a25a8ae",
      label: "detail_SAC",
      name: "detail_SAC",
      type: "Table",
      columns: [
        {
          title: "Allowance or Charge Indicator",
          dataIndex: "SAC_01_248",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "A",
              description: "Allowance"
            },
            {
              code: "C",
              description: "Charge"
            }
          ]
        },
        {
          title: "Service, Promotion, Allowance, or Charge Code",
          dataIndex: "SAC_02_1300",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "A400",
              description: "Allowance Non-performance"
            },
            {
              code: "B310",
              description: "Commission Amount"
            },
            {
              code: "B560",
              description: "Container Allowance"
            },
            {
              code: "B950",
              description: "Damaged Merchandise"
            },
            {
              code: "C310",
              description: "Discount"
            },
            {
              code: "D170",
              description: "Free Goods"
            },
            {
              code: "D220",
              description: "Freight Passthrough"
            },
            {
              code: "D240",
              description: "Freight"
            },
            {
              code: "D270",
              description: "Fuel Surcharge"
            },
            {
              code: "F180",
              description: "Pallet"
            },
            {
              code: "F340",
              description: "Pick/Up"
            },
            {
              code: "F800",
              description: "Promotional Allowance"
            },
            {
              code: "F810",
              description: "Promotional Discount"
            },
            {
              code: "G970",
              description: "Small Order Charge"
            },
            {
              code: "H000",
              description: "Special Allowance"
            },
            {
              code: "H090",
              description: "Special Handling"
            },
            {
              code: "I170",
              description: "Trade Discount"
            },
            {
              code: "I580",
              description: "Warehousing"
            }
          ]
        },
        {
          title: "Agency Qualifier Code",
          dataIndex: "SAC_03_559",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "VI",
              description: "Voluntary Inter-Industry Commerce Standard (VICS) EDI"
            }
          ]
        },
        {
          title: "Agency Service, Promotion, Allowance, or Charge Code",
          dataIndex: "SAC_04_1301",
          requirement: "Conditional",
          editable: true
        },
        {
          title: "Amount",
          dataIndex: "SAC_05_610",
          requirement: "Optional",
          editable: true
        },
        {
          title: "Unit or Basis for Measurement Code",
          dataIndex: "SAC_09_355",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "EA",
              description: "Each"
            }
          ]
        },
        {
          title: "Quantity",
          dataIndex: "SAC_10_380",
          requirement: "Conditional",
          editable: true
        },
        {
          title: "Allowance or Charge Method of Handling Code",
          dataIndex: "SAC_12_331",
          requirement: "Optional",
          editable: true,
          options: [
            {
              code: "02",
              description: "Off Invoice"
            },
            {
              code: "06",
              description: "Charge to be Paid by Customer"
            }
          ]
        }
      ],
      placeholder: "Enter Allowance or Charge Indicator",
      rules: []
    },
    {
      id: "a36afadd-7656-4ebb-8deb-d6a657bebd49",
      label: "detail_SLN",
      name: "detail_SLN",
      type: "Table",
      columns: [
        {
          title: "Relationship Code",
          dataIndex: "SLN_03_662",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "S",
              description: "Substituted"
            }
          ]
        },
        {
          title: "Assigned Identification",
          dataIndex: "SLN_01_350",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "EA",
              description: "NA"
            }
          ]
        },
        {
          title: "Product/Service ID Qualifier",
          dataIndex: "SLN_09_235",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "CB",
              description: "Buyer's Catalog Number"
            },
            {
              code: "EN",
              description: "European Article Number (EAN) (2-5-5-1)"
            },
            {
              code: "UP",
              description: "U.P.C. Consumer Package Code (1-5-5-1)"
            },
            {
              code: "EO",
              description: "NA"
            }
          ]
        },
        {
          title: "Product/Service ID Qualifier",
          dataIndex: "SLN_11_235",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "CB",
              description: "Buyer's Catalog Number"
            },
            {
              code: "EN",
              description: "European Article Number (EAN) (2-5-5-1)"
            },
            {
              code: "UP",
              description: "U.P.C. Consumer Package Code (1-5-5-1)"
            },
            {
              code: "EO",
              description: "NA"
            }
          ]
        }
      ],
      placeholder: "Enter Relationship Code",
      rules: []
    },
    {
      id: "cadfca03-961f-460b-9f28-7cb9b9c5f3ff",
      label: "Amount",
      name: "610_TDS_01",
      type: "Input",
      dataType: "N2",
      placeholder: "Enter Amount",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Amount"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 15,
          message: "Can have at most 15 characters"
        },
        {
          note: "Monetary amount\nTotal amount of invoice(including charges, less allowances) before terms\ndiscount.
        }
      ]
    },
    {
      id: "db28cbec-88f0-4325-8cbc-bc0ae9db5448",
      label: "Amount",
      name: "610_TDS_02",
      type: "Input",
      dataType: "N2",
      placeholder: "Enter Amount",
      rules: [
        {
          required: "Optional",
          message: "Please enter Amount"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 15,
          message: "Can have at most 15 characters"
        },
        {
          note: "Monetary amount\nTotal amount of merchandise. If you offer a discount on gross amount before\nallowances, this field is required. Otherwise it is not needed.
        }
      ]
    },
    {
      id: "a10efb07-9654-49d0-9e5a-3344b7e0ef71",
      label: "Transportation Method/Type Code",
      name: "91_CAD_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Transportation Method/Type Code",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Transportation Method/Type Code"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "C",
          description: "Consolidation"
        },
        {
          code: "M",
          description: "Motor (Common Carrier)"
        },
        {
          code: "P",
          description: "Private Carrier"
        },
        {
          code: "U",
          description: "Private Parcel Service"
        }
      ]
    },
    {
      id: "a11cfa07-9654-49d0-9e5a-3344b7e0ef71",
      label: "Routing",
      name: "387_CAD_05",
      type: "Input",
      dataType: "ID",
      placeholder: "Enter Routing",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Routing"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 2,
          message: "Can have at most 35 characters"
        }
      ]
    },
    {
      id: "b11aff09-8654-59d0-9e5a-3344b7e0ef71",
      label: "Standard Alpha Carrier Code",
      name: "140_CAD_04",
      type: "Input",
      dataType: "ID",
      placeholder: "Enter Standard Alpha Carrier Code",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Standard Alpha Carrier Code"
        },
        {
          min: 1,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 4 characters"
        }
      ]
    },
    {
      id: "b661328b-5c69-4d39-8aec-6291c281823d",
      label: "Reference Identification Qualifier",
      name: "128_CAD_07",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Reference Identification Qualifier",
      rules: [
        {
          required: "Optional",
          message: "Please enter Reference Identification Qualifier"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {}
      ],
      options: [
        {
          code: "BM",
          description: "Bill of Lading Number"
        },
        {
          code: "CN",
          description: "Carrier's Reference Number (PRO/Invoice)"
        }
      ]
    },
    {
      id: "ccc8f19b-672d-4472-bcc6-c0fea77a531e",
      label: "summary_SAC",
      name: "summary_SAC",
      type: "Table",
      columns: [
        {
          title: "Allowance or Charge Indicator",
          dataIndex: "SAC_01_248",
          requirement: "Mandatory",
          editable: true,
          options: [
            {
              code: "A",
              description: "Allowance"
            },
            {
              code: "C",
              description: "Charge"
            }
          ]
        },
        {
          title: "Service, Promotion, Allowance, or Charge Code",
          dataIndex: "SAC_02_1300",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "A400",
              description: "Allowance Non-performance"
            },
            {
              code: "B310",
              description: "Commission Amount"
            },
            {
              code: "B560",
              description: "Container Allowance"
            },
            {
              code: "B570",
              description: "Container Deposits"
            },
            {
              code: "B950",
              description: "Damaged Merchandise"
            },
            {
              code: "C310",
              description: "Discount"
            },
            {
              code: "D170",
              description: "Free Goods"
            },
            {
              code: "D220",
              description: "Freight Passthrough"
            },
            {
              code: "D240",
              description: "Freight"
            },
            {
              code: "D270",
              description: "Fuel Surcharge"
            },
            {
              code: "F180",
              description: "Pallet"
            },
            {
              code: "F340",
              description: "Pick/Up"
            },
            {
              code: "F800",
              description: "Promotional Allowance"
            },
            {
              code: "F810",
              description: "Promotional Discount"
            },
            {
              code: "G970",
              description: "Small Order Charge"
            },
            {
              code: "H000",
              description: "Special Allowance"
            },
            {
              code: "H090",
              description: "Special Handling"
            },
            {
              code: "H700",
              description: "Tax - Local Tax"
            },
            {
              code: "I170",
              description: "Trade Discount"
            },
            {
              code: "I580",
              description: "Warehousing"
            }
          ]
        },
        {
          title: "Agency Qualifier Code",
          dataIndex: "SAC_03_559",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "VI",
              description: "Voluntary Inter-Industry Commerce Standard (VICS) EDI"
            }
          ]
        },
        {
          title: "Agency Service, Promotion, Allowance, or Charge Code",
          dataIndex: "SAC_04_1301",
          requirement: "Conditional",
          editable: true
        },
        {
          title: "Amount",
          dataIndex: "SAC_05_610",
          requirement: "Optional",
          editable: true
        },
        {
          title: "Allowance/Charge Percent Qualifier",
          dataIndex: "SAC_06_378",
          requirement: "Conditional",
          editable: true,
          options: [
            {
              code: "3",
              description: "Discount/Gross"
            }
          ]
        },
        {
          title: "Allowance or Charge Method of Handling Code",
          dataIndex: "SAC_12_331",
          requirement: "Optional",
          editable: true,
          options: [
            {
              code: "02",
              description: "Off Invoice"
            },
            {
              code: "06",
              description: "Charge to be Paid by Customer"
            }
          ]
        },
        {
          title: "Description",
          dataIndex: "SAC_15_352",
          requirement: "Conditional",
          editable: true
        }
      ],
      placeholder: "Enter Allowance or Charge Indicator",
      rules: []
    },
    {
      id: "23db6c39-6ad6-47be-977a-5534bd6605c4",
      label: "Number of Units Shipped",
      name: "382_ISS_01",
      type: "Input",
      dataType: "R",
      placeholder: "Enter Number of Units Shipped",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Number of Units Shipped"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 10,
          message: "Can have at most 10 characters"
        },
        {}
      ]
    },
    {
      id: "fc649b05-687c-463d-8775-6559ca1bd24e",
      label: "Unit or Basis for Measurement Code",
      name: "355_ISS_02",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Unit or Basis for Measurement Code",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Unit or Basis for Measurement Code"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "CA",
          description: "Case"
        },
        {
          code: "CT",
          description: "Carton"
        },
        {
          code: "EA",
          description: "Each"
        },
        {
          code: "LB",
          description: "Pound"
        }
      ]
    },
    {
      id: "91cae9e6-b39e-46ae-b100-0392cc2a820a",
      label: "Unit or Basis for Measurement Code",
      name: "355_ISS_04",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Unit or Basis for Measurement Code",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Unit or Basis for Measurement Code"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "LB",
          description: "Pound"
        }
      ]
    },
    {
      id: "4cdcbb1e-3502-45e6-8bad-9e971b9464e2",
      label: "Transaction Set Identifier Code",
      name: "143_ST_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Transaction Set Identifier Code",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Transaction Set Identifier Code"
        },
        {
          min: 3,
          message: "Must have at least 3 characters"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {}
      ],
      options: [
        {
          code: "810",
          description: "Invoice"
        }
      ]
    },
    {
      id: "4abcdb1e-3502-45e6-8bad-9e971b9464e2",
      label: "Transaction Set Control Number",
      name: "329_ST_02",
      type: "Input",
      dataType: "ID",
      placeholder: "Enter Transaction Set Control Number",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Transaction Set Control Number"
        },
        {
          min: 3,
          message: "Must have at least 4 characters"
        },
        {
          max: 3,
          message: "Can have at most 9 characters"
        }
      ]
    },
    {
      id: "4c178953-fc3b-4616-8073-b8197bcb2702",
      label: "Note Reference Code",
      name: "363_NTE_01",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Note Reference Code",
      rules: [
        {
          required: "Optional",
          message: "Please enter Note Reference Code"
        },
        {
          min: 3,
          message: "Must have at least 3 characters"
        },
        {
          max: 3,
          message: "Can have at most 3 characters"
        },
        {}
      ],
      options: [
        {
          code: "CER",
          description: "Certification Narrative"
        }
      ]
    },
    {
      id: "c9dff09b-3066-442e-82e0-43879ef8b350",
      label: "Product/Service ID Qualifier",
      name: "235_IT1_10",
      type: "Dropdown",
      dataType: "ID",
      placeholder: "Enter Product/Service ID Qualifier",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Product/Service ID Qualifier"
        },
        {
          min: 2,
          message: "Must have at least 2 characters"
        },
        {
          max: 2,
          message: "Can have at most 2 characters"
        },
        {}
      ],
      options: [
        {
          code: "CB",
          description: "Buyer's Catalog Number"
        },
        {
          code: "EN",
          description: "European Article Number (EAN) (2-5-5-1)"
        },
        {
          code: "IN",
          description: "Buyer's Item Number"
        },
        {
          code: "UI",
          description: "U.P.C. Consumer Package Code (1-5-5)"
        },
        {
          code: "EO",
          description: "NA"
        },
        {
          code: "UP",
          description: "U.P.C. Consumer Package Code (1-5-5-1)"
        }
      ]
    },
    {
      id: "7a83292a-bfb4-4d64-810e-c5d9136e7580",
      label: "Reference Identification",
      name: "127_CAD_08",
      type: "Input",
      dataType: "AN",
      placeholder: "Enter Reference Identification",
      rules: [
        {
          required: "Conditional",
          message: "Please enter Reference Identification"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 30,
          message: "Can have at most 30 characters"
        },
        {
          note: "Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier\n\nA value is not required in the CAD08 for DSD vendors.
        }
      ]
    },
    {
      id: "6827d301-676c-400c-b44c-5eb0004f59c5",
      label: "Number of Line Items",
      name: "354_CTT_01",
      type: "Input",
      dataType: "N0",
      placeholder: "Enter Number of Line Items",
      rules: [
        {
          required: "Mandatory",
          message: "Please enter Number of Line Items"
        },
        {
          min: 1,
          message: "Must have at least 1 character"
        },
        {
          max: 6,
          message: "Can have at most 6 characters"
        },
        {
          note: "Total number of line items in the transaction set\n\nSample CTT Segment\n_________________\nCTT*25
        }
      ]
    }
  ]
}