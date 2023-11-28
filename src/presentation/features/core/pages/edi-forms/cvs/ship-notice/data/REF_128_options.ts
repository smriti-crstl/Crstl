const REF_128_OPTIONS = [
  {
    value: "10",
    label: "Account Managers Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the telecommunications manager assigned to this account",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "11",
    label: "Account Number",
    paragraph_number: "1",
  },
  {
    value: "12",
    label: "Billing Account",
    paragraph_number: "1",
    notes: [
      {
        content: "Account number under which billing is rendered",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "13",
    label: "Horizontal Coordinate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Positional address, horizontal component. The assigned address is based upon a \ngrid mapping scheme",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "14",
    label: "Master Account Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Account number used to represent individual billing accounts which have been \nconsolidated and/or summarized",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "15",
    label: "Vertical Coordinate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Positional Address, Vertical component. The assigned address is based upon a \ngrid mapping scheme",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "16",
    label: "Military Interdepartmental Purchase Request (MIPR) Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A specific form used to transmit obligation authority (dollars) and \nrequirements between a service or agency requiring a purchase and a military \nservice or agency responsible for procuring the requirement",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "17",
    label: "Client Reporting Category",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Code assigned by the client to categorize participants for reporting \nrequirements",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "18",
    label: "Plan Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The unique identification number assigned for a defined contribution plan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "19",
    label: "Division Identifier",
    paragraph_number: "1",
  },
  {
    value: "20",
    label: "Repair Part Number",
    paragraph_number: "1",
  },
  {
    value: "21",
    label: "American Gas Association Equation Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Indicates which American Gas Association (AGA) equation was used to calculate \nthe volumes reported",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "22",
    label: "Special Charge or Allowance Code",
    paragraph_number: "1",
  },
  {
    value: "23",
    label: "Client Number",
    paragraph_number: "1",
  },
  {
    value: "24",
    label: "Short-term Disability Policy Number",
    paragraph_number: "1",
  },
  {
    value: "25",
    label: "Reason Not Lowest Cost Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a code that identifies why a service/rate other than the least costly \nservice/rate was used",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "26",
    label: "Union Number",
    paragraph_number: "1",
  },
  {
    value: "27",
    label: "Insuror Pool Identification Number",
    paragraph_number: "1",
  },
  {
    value: "28",
    label: "Employee Identification Number",
    paragraph_number: "1",
  },
  {
    value: "29",
    label: "Foreclosure Account Number",
    paragraph_number: "1",
  },
  {
    value: "30",
    label: "United States Government Visa Number",
    paragraph_number: "1",
  },
  {
    value: "31",
    label: "Docket Number",
    paragraph_number: "1",
  },
  {
    value: "32",
    label: "Credit Repository Code",
    paragraph_number: "1",
  },
  {
    value: "33",
    label: "Lender Case Number",
    paragraph_number: "1",
  },
  {
    value: "34",
    label: "Loan Request Number",
    paragraph_number: "1",
  },
  {
    value: "35",
    label: "Multifamily Project Number",
    paragraph_number: "1",
  },
  {
    value: "36",
    label: "Underwriter Identification Number",
    paragraph_number: "1",
  },
  {
    value: "37",
    label: "Condominium Identification Number",
    paragraph_number: "1",
  },
  {
    value: "38",
    label: "Master Policy Number",
    paragraph_number: "1",
  },
  {
    value: "39",
    label: "Proposal Number",
    paragraph_number: "1",
  },
  {
    value: "40",
    label: "Lease Schedule Number - Replacement",
    paragraph_number: "1",
  },
  {
    value: "41",
    label: "Lease Schedule Number - Prior",
    paragraph_number: "1",
  },
  {
    value: "42",
    label: "Phone Calls",
    paragraph_number: "1",
  },
  {
    value: "43",
    label: "Supporting Document Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Supports or clarifies information and values represented in a document",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "44",
    label: "End Use Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Represents the final use or form of the material being manufactured or sold",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "45",
    label: "Old Account Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies accounts being changed",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "46",
    label: "Old Meter Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies meters being removed",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "47",
    label: "Plate Number",
    paragraph_number: "1",
  },
  {
    value: "48",
    label:
      "Agency's Student Number. This is the number assigned by an agency other than \nthe institution sending the record.",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Student number assigned by an agency other than the institution sending or \nreceiving the record",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "49",
    label: "Family Unit Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An identification number assigned to siblings within the same family",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "50",
    label: "State Student Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A student identification number assigned by the state education agency to \nstudents enrolled in state schools",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "51",
    label: "Picture Number",
    paragraph_number: "1",
  },
  {
    value: "52",
    label: "SWIFT (MT 100)",
    paragraph_number: "1",
  },
  {
    value: "53",
    label: "SWIFT (MT 202)",
    paragraph_number: "1",
  },
  {
    value: "54",
    label: "FEDWIRE (Federal Wire Transfer)",
    paragraph_number: "1",
  },
  {
    value: "55",
    label: "Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "56",
    label: "Corrected Social Security Number",
    paragraph_number: "1",
  },
  {
    value: "57",
    label: "Prior Incorrect Social Security Number",
    paragraph_number: "1",
  },
  {
    value: "58",
    label: "Corrected Batch Number",
    paragraph_number: "1",
  },
  {
    value: "59",
    label: "Prior Incorrect Batch Number",
    paragraph_number: "1",
  },
  {
    value: "60",
    label: "Account Suffix Code",
    paragraph_number: "1",
  },
  {
    value: "61",
    label: "Taxing Authority Identification Number",
    paragraph_number: "1",
  },
  {
    value: "63",
    label: "Prior Loan Number",
    paragraph_number: "1",
  },
  {
    value: "64",
    label: "Jurisdictional Community Name Identifier",
    paragraph_number: "1",
  },
  {
    value: "65",
    label: "Total Order Cycle Number",
    paragraph_number: "1",
  },
  {
    value: "66",
    label: "Previous Policy Number",
    paragraph_number: "1",
  },
  {
    value: "67",
    label: "Previous Claim History Identifier",
    paragraph_number: "1",
  },
  {
    value: "68",
    label: "Dental Insurance Account Number",
    paragraph_number: "1",
  },
  {
    value: "69",
    label: "Dental Insurance Policy Number",
    paragraph_number: "1",
  },
  {
    value: "70",
    label: "Calendar Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies a working calendar (for example, Monday through Friday) for a \ncompany, division, or labor group",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "71",
    label: "(Working) Shift Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies a working shift for a company with multiple working shifts per day",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "72",
    label: "Schedule Reference Number",
    paragraph_number: "1",
  },
  {
    value: "73",
    label: "Statement of Work (SOW)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Description of a product or service to be procured under a contract; statement \nof requirements",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "74",
    label: "Work Breakdown Structure (WBS)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A product-oriented family tree composed of hardware, software, services, and \ndata that completely defines the project or program",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "75",
    label: "Organization Breakdown Structure",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A functionally oriented family tree that shows organization relationships and \nis used as the framework for assigning work responsibilities",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "76",
    label: "Milestone",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A specific event that can be identified as occurring at a specific time",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "77",
    label: "Work Package",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A detailed, short span task or material item identified by a contractor for \ndoing the work required to complete the contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "78",
    label: "Planning Package",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A logical aggregation of work within a cost account (see code 79) that can be \nidentified and budgeted, but not yet defined into work packages",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "79",
    label: "Cost Account",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A management control point for cost and schedule planning and control; it \nrepresents that work assigned to one responsible organization element and to \none work breakdown structure element",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "80",
    label: "Charge Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number used by financial systems to identify accounts for costs incurred on a \ncontract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "81",
    label: "Symbol Number (for Milestone or LOB reports)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Symbols are used for graphical representation on Milestone schedule reports and \nLine of Balance reports; the various symbols indicate planned, revised, \ncompleted, and slipped events; symbols used are mutually agreed upon between \nsupplier and customer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "82",
    label: "Data Item Description (DID) Reference",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Specific data elements that the government will ask a contractor to provide and \nare spelled out in specific requirement documents",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "83",
    label: "Extended (or Exhibit) Line Item Number (ELIN)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies specific line items to be delivered for a contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "84",
    label: "Contractor Data Requirements List (CDRL)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Government or customer specific deliverables identified by line item; \nreferenced on shipping details, etc",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "85",
    label: "Subcontractor Data Requirements (SDRL)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Line item deliverables that a subcontractor is responsible for",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "86",
    label: "Operation Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies a specific operation number as part of the manufacturing process for \na part or product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "87",
    label: "Functional Category",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An organization or groups of organizations with a common operational \norientation such as Quality Control Engineering, etc",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "88",
    label: "Work Center",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies a specific work area in a manufacturing process",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "89",
    label: "Assembly Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies specific assemblies in the manufacturing process",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "90",
    label: "Subassembly Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Components of assemblies",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "91",
    label: "Cost Element",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A subdivision of costs defined by the accounting structure and the level that \ncosts are recorded at within a cost accounting system (examples are labor, \nmaterial, other direct costs)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "92",
    label: "Change Document Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Reference numbers to track changes made to a contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "93",
    label: "Funds Authorization",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Reference numbers to identify funds authorization (document or other reference \nnumber) in the government contracting environment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "94",
    label: "File Identification Number",
    paragraph_number: "1",
  },
  {
    value: "95",
    label:
      "Committee on Uniform Securities Identification Procedures (CUSIP) Number",
    paragraph_number: "1",
  },
  {
    value: "96",
    label: "Stock Certificate Number",
    paragraph_number: "1",
  },
  {
    value: "97",
    label: "Package Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A serial number indicating unit shipped",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "98",
    label: "Container/Packaging Specification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A numeric or alphanumeric identification assigned to a unique \npackaging/container configuration",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "99",
    label: "Rate Conference ID Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A group which publishes transportation rates for a group of transportation \ncarriers",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "01",
    label:
      "American Bankers Assoc. (ABA) Transit/Routing Number (Including Check Digit, 9 \nDigits)",
    paragraph_number: "1",
  },
  {
    value: "02",
    label:
      "Society for Worldwide Interbank Financial Telecommunication (S.W.I.F.T.) \nIdentification (8 or 11 Characters)",
    paragraph_number: "1",
  },
  {
    value: "03",
    label:
      "Clearing House Interbank Payment System (CHIPS) Participant Number (3 or 4 \nDigits)",
    paragraph_number: "1",
  },
  {
    value: "04",
    label: "Canadian Financial Institution Branch and Institution Number",
    paragraph_number: "1",
  },
  {
    value: "05",
    label:
      "Clearing House Interbank Payment System (CHIPS) User Identification (6 digits)",
    paragraph_number: "1",
  },
  {
    value: "06",
    label: "System Number",
    paragraph_number: "1",
  },
  {
    value: "07",
    label: "Add-On System Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned by the manufacturer to identify additional products \nadded to or used by the customer in the initial system",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "08",
    label: "Carrier Assigned Package Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A reference number assigned by a carrier to uniquely identify a single package",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "09",
    label: "Customs Bar Code Number",
    paragraph_number: "1",
  },
  {
    value: "0A",
    label: "Supervisory Appraiser Certification Number",
    paragraph_number: "1",
  },
  {
    value: "0B",
    label: "State License Number",
    paragraph_number: "1",
  },
  {
    value: "0D",
    label: "Subject Property Verification Source",
    paragraph_number: "1",
  },
  {
    value: "0E",
    label: "Subject Property Reference Number",
    paragraph_number: "1",
  },
  {
    value: "0F",
    label: "Subscriber Number",
    paragraph_number: "1",
  },
  {
    value: "0G",
    label: "Reviewer File Number",
    paragraph_number: "1",
  },
  {
    value: "0H",
    label: "Comparable Property Pending Sale Reference Number",
    paragraph_number: "1",
  },
  {
    value: "0I",
    label: "Comparable Property Sale Reference Number",
    paragraph_number: "1",
  },
  {
    value: "0J",
    label: "Subject Property Non-Sale Reference Number",
    paragraph_number: "1",
  },
  {
    value: "0K",
    label: "Policy Form Identifying Number",
    paragraph_number: "1",
  },
  {
    value: "0L",
    label: "Referenced By",
    paragraph_number: "1",
  },
  {
    value: "0M",
    label: "Mortgage Identification Number",
    paragraph_number: "1",
  },
  {
    value: "0N",
    label: "Attached To",
    paragraph_number: "1",
  },
  {
    value: "0P",
    label: "Real Estate Owned Property Identifier",
    paragraph_number: "1",
  },
  {
    value: "1A",
    label: "Blue Cross Provider Number",
    paragraph_number: "1",
  },
  {
    value: "1B",
    label: "Blue Shield Provider Number",
    paragraph_number: "1",
  },
  {
    value: "1C",
    label: "Medicare Provider Number",
    paragraph_number: "1",
  },
  {
    value: "1D",
    label: "Medicaid Provider Number",
    paragraph_number: "1",
  },
  {
    value: "1E",
    label: "Dentist License Number",
    paragraph_number: "1",
  },
  {
    value: "1F",
    label: "Anesthesia License Number",
    paragraph_number: "1",
  },
  {
    value: "1G",
    label: "Provider UPIN Number",
    paragraph_number: "1",
  },
  {
    value: "1H",
    label: "CHAMPUS Identification Number",
    paragraph_number: "1",
  },
  {
    value: "1I",
    label: "Department of Defense Identification Code (DoDIC)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a code that uniquely identifies a type of explosive or ammunition",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1J",
    label: "Facility ID Number",
    paragraph_number: "1",
  },
  {
    value: "1K",
    label: "Payor's Claim Number",
    paragraph_number: "1",
  },
  {
    value: "1L",
    label: "Group or Policy Number",
    paragraph_number: "1",
  },
  {
    value: "1M",
    label: "Preferred Provider Organization Site Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An identification number used to identify the Preferred Provider Organization \n(PPO) and/or its office location",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1N",
    label: "Diagnosis Related Group (DRG) Number",
    paragraph_number: "1",
  },
  {
    value: "1O",
    label: "Consolidation Shipment Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a single number that is a key to a group of individual shipment \nnumbers",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1P",
    label: "Accessorial Status Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a single number that describes the status of an accessorial \ntransportation service",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1Q",
    label: "Error Identification Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a single number that describes an error found in application-level \ndata",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1R",
    label: "Storage Information Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies text data that describes a storage facility used for transportation \nservices",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1S",
    label: "Ambulatory Patient Group (APG) Number",
    paragraph_number: "1",
  },
  {
    value: "1T",
    label: "Resource Utilization Group (RUG) Number",
    paragraph_number: "1",
  },
  {
    value: "1U",
    label: "Pay Grade",
    paragraph_number: "1",
  },
  {
    value: "1V",
    label: "Related Vendor Order Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A vendor's order number that is in addition to a primary order number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "1W",
    label: "Member Identification Number",
    paragraph_number: "1",
  },
  {
    value: "1X",
    label: "Credit or Debit Adjustment Number",
    paragraph_number: "1",
  },
  {
    value: "1Y",
    label: "Repair Action Number",
    paragraph_number: "1",
  },
  {
    value: "1Z",
    label: "Financial Detail Code",
    paragraph_number: "1",
  },
  {
    value: "2A",
    label: "Import License Number",
    paragraph_number: "1",
  },
  {
    value: "2B",
    label: "Terminal Release Order Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Cargo number assigned to staged material",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "2C",
    label: "Long-term Disability Policy Number",
    paragraph_number: "1",
  },
  {
    value: "2D",
    label: "Aeronautical Equipment Reference Number (AERNO)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to a particular piece of government-furnished \naeronautical equipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "2E",
    label: "Foreign Military Sales Case Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A reference number designating the foreign military sale records",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "2F",
    label: "Consolidated Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "2G",
    label: "Amendment",
    paragraph_number: "1",
  },
  {
    value: "2H",
    label: "Assigned by transaction set sender",
    paragraph_number: "1",
  },
  {
    value: "2I",
    label: "Tracking Number",
    paragraph_number: "1",
  },
  {
    value: "2J",
    label: "Floor Number",
    paragraph_number: "1",
  },
  {
    value: "2K",
    label: "Food and Drug Administration (FDA) Product Type",
    paragraph_number: "1",
  },
  {
    value: "2L",
    label: "Association of American Railroads (AAR) Railway Accounting Rules",
    paragraph_number: "1",
  },
  {
    value: "2M",
    label: "Federal Communications Commission (FCC) Identifier",
    paragraph_number: "1",
  },
  {
    value: "2N",
    label: "Federal Communications Commission (FCC) Trade/Brand Identifier",
    paragraph_number: "1",
  },
  {
    value: "2O",
    label: "Occupational Safety and Health Administration (OSHA) Claim Number",
    paragraph_number: "1",
  },
  {
    value: "2P",
    label: "Subdivision Identifier",
    paragraph_number: "1",
  },
  {
    value: "2Q",
    label: "Food and Drug Administration (FDA) Accession Number",
    paragraph_number: "1",
  },
  {
    value: "2R",
    label: "Coupon Redemption Number",
    paragraph_number: "1",
  },
  {
    value: "2S",
    label: "Catalog",
    paragraph_number: "1",
  },
  {
    value: "2T",
    label: "Sub-subhouse Bill of Lading",
    paragraph_number: "1",
  },
  {
    value: "2U",
    label: "Payer Identification Number",
    paragraph_number: "1",
  },
  {
    value: "2V",
    label:
      "Special Government Accounting Classification Reference Number (ACRN)",
    paragraph_number: "1",
  },
  {
    value: "2W",
    label: "Change Order Authority",
    paragraph_number: "1",
  },
  {
    value: "2X",
    label: "Supplemental Agreement Authority",
    paragraph_number: "1",
  },
  {
    value: "2Y",
    label: "Wage Determination",
    paragraph_number: "1",
  },
  {
    value: "2Z",
    label: "U.S. Customs Service (USCS) Anti-dumping Duty Case Number",
    paragraph_number: "1",
  },
  {
    value: "3A",
    label: "Section of the National Housing Act Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A code taken from the Mortgage Insurance Certificate indicating the specific \nNational Housing Act Program under which the mortgage is insured",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3B",
    label: "Supplemental Claim Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by claimant to a supplemental claim for benefits",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3C",
    label: "Payee Loan Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by payee to insured loan; used only when payee is different \nfrom insured lender",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3D",
    label: "Servicer Loan Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The loan number assigned by the servicer to the mortgage when the servicer is \nnot the insured entity",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3E",
    label: "Investor Loan Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The number assigned by the investor to the mortgage when the investor is \ndifferent from the insured or payee",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3F",
    label: "Show Identification",
    paragraph_number: "1",
    notes: [
      {
        content: "Identification of a broadcast program",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3G",
    label: "Catastrophe Number",
    paragraph_number: "1",
  },
  {
    value: "3H",
    label: "Case Number",
    paragraph_number: "1",
  },
  {
    value: "3I",
    label: "Precinct Number",
    paragraph_number: "1",
  },
  {
    value: "3J",
    label: "Office Number",
    paragraph_number: "1",
  },
  {
    value: "3K",
    label: "Petroleum Pool Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A code which identifies a common source of underground oil or gas supply whose \nvertical and horizontal limits are defined by a state regulatory agency",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3L",
    label: "Branch Identifier",
    paragraph_number: "1",
  },
  {
    value: "3M",
    label: "Federal Communications Commission (FCC) Condition Code",
    paragraph_number: "1",
  },
  {
    value: "3N",
    label: "Gas Custodian Identification",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identification number for custodian from whom gas was received or to whom gas \nwas delivered",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3O",
    label: "U.S. Customs Service (USCS) Pre-approval Ruling Number",
    paragraph_number: "1",
  },
  {
    value: "3P",
    label: "Third Party Originator Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number identifying the organization acting as a correspondent in originating a \nloan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3Q",
    label: "Food and Drug Administration (FDA) Product Code",
    paragraph_number: "1",
  },
  {
    value: "3R",
    label: "U.S. Customs Service (USCS) Binding Ruling Number",
    paragraph_number: "1",
  },
  {
    value: "3S",
    label: "Provincial (Canadian) Sales Tax Exemption Number",
    paragraph_number: "1",
  },
  {
    value: "3T",
    label: "U.S. Customs Service (USCS) Pre-classification Ruling Number",
    paragraph_number: "1",
  },
  {
    value: "3U",
    label: "Protraction Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The identifier of an official protraction diagram, either an official \nprotraction diagram or a leasing map",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3V",
    label: "Formation Identifier",
    paragraph_number: "1",
    notes: [
      {
        content: "A code or name identifying a subsurface formation",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "3W",
    label: "U.S. Customs Service (USCS) Commercial Description",
    paragraph_number: "1",
  },
  {
    value: "3X",
    label: "Subcontract Number",
    paragraph_number: "1",
  },
  {
    value: "3Y",
    label: "Receiver Assigned Drop Zone",
    paragraph_number: "1",
  },
  {
    value: "3Z",
    label: "Customs Broker Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4A",
    label: "Personal Identification Number (PIN)",
    paragraph_number: "1",
    notes: [
      {
        content: "A number that uniquely identifies an individual",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "4B",
    label: "Shipment Origin Code",
    paragraph_number: "1",
  },
  {
    value: "4C",
    label: "Shipment Destination Code",
    paragraph_number: "1",
  },
  {
    value: "4D",
    label: "Shipping Zone",
    paragraph_number: "1",
  },
  {
    value: "4E",
    label: "Carrier-assigned Consignee Number",
    paragraph_number: "1",
  },
  {
    value: "4F",
    label: "Carrier-assigned Shipper Number",
    paragraph_number: "1",
  },
  {
    value: "4G",
    label: "Provincial Tax Identification",
    paragraph_number: "1",
  },
  {
    value: "4H",
    label: "Commercial Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "4I",
    label: "Balance-due Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4J",
    label: "Vehicle-related Services Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4K",
    label: "Accessorial Rail Diversion Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4L",
    label: "Location-specific Services Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4M",
    label: "Special Move Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4N",
    label: "Special Payment Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4O",
    label: "Canadian Goods & Services or Quebec Sales Tax Reference Number",
    paragraph_number: "1",
  },
  {
    value: "4P",
    label: "Affiliation Number",
    paragraph_number: "1",
  },
  {
    value: "4Q",
    label: "Call Sign",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An alphanumeric name assigned by the Federal Communications Commission (FCC) to \nuniquely identify a radio system or transmitter",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "4R",
    label: "Rule Section",
    paragraph_number: "1",
  },
  {
    value: "4S",
    label: "Preferred Call Sign",
    paragraph_number: "1",
    notes: [
      {
        content: "A call sign requested by an applicant for a radio license",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "4T",
    label: "North American Datum Standard (NADS)",
    paragraph_number: "1",
  },
  {
    value: "4U",
    label: "Market Area",
    paragraph_number: "1",
  },
  {
    value: "4V",
    label: "Emission Designator",
    paragraph_number: "1",
  },
  {
    value: "4W",
    label: "Study",
    paragraph_number: "1",
    notes: [
      {
        content: "Radio Engineering Study",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "4X",
    label: "Log",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Federal Communications Commission (FCC) License Application File Number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "4Y",
    label: "Subhouse Bill of Lading",
    paragraph_number: "1",
  },
  {
    value: "4Z",
    label: "U.S. Customs Service (USCS) Countervailing Duty Case Number",
    paragraph_number: "1",
  },
  {
    value: "5A",
    label: "Offense Tracking",
    paragraph_number: "1",
  },
  {
    value: "5B",
    label: "Supplemental Account Number",
    paragraph_number: "1",
  },
  {
    value: "5C",
    label: "Congressional District",
    paragraph_number: "1",
  },
  {
    value: "5D",
    label: "Line of Credit Category",
    paragraph_number: "1",
  },
  {
    value: "5E",
    label: "Consumer Identifier",
    paragraph_number: "1",
  },
  {
    value: "5F",
    label: "Warrant",
    paragraph_number: "1",
  },
  {
    value: "5G",
    label: "Complaint",
    paragraph_number: "1",
  },
  {
    value: "5H",
    label: "Incident",
    paragraph_number: "1",
  },
  {
    value: "5I",
    label: "Offender Tracking",
    paragraph_number: "1",
  },
  {
    value: "5J",
    label: "Driver's License",
    paragraph_number: "1",
  },
  {
    value: "5K",
    label: "Commercial Driver's License",
    paragraph_number: "1",
  },
  {
    value: "5L",
    label: "Jurisdictional Community Number",
    paragraph_number: "1",
  },
  {
    value: "5M",
    label: "Previous Sequence",
    paragraph_number: "1",
  },
  {
    value: "5N",
    label: "Citation of Statute",
    paragraph_number: "1",
  },
  {
    value: "5O",
    label: "Citation of Opinion",
    paragraph_number: "1",
  },
  {
    value: "5P",
    label:
      "National Criminal Information Center Originating Agency Identification",
    paragraph_number: "1",
  },
  {
    value: "5Q",
    label: "State Criminal History Repository Individual Identification",
    paragraph_number: "1",
  },
  {
    value: "5R",
    label: "Federal Bureau of Investigation Individual Identification",
    paragraph_number: "1",
  },
  {
    value: "5S",
    label: "Processing Area",
    paragraph_number: "1",
  },
  {
    value: "5T",
    label: "Payment Location",
    paragraph_number: "1",
  },
  {
    value: "5U",
    label: "Flood Data Identifier",
    paragraph_number: "1",
  },
  {
    value: "5V",
    label: "Coupon Distribution Method",
    paragraph_number: "1",
  },
  {
    value: "5W",
    label: "Original Uniform Commercial Code Filing Number",
    paragraph_number: "1",
  },
  {
    value: "5X",
    label: "Amended Uniform Commercial Code Filing Number",
    paragraph_number: "1",
  },
  {
    value: "5Y",
    label: "Continuation Uniform Commercial Code Filing Number",
    paragraph_number: "1",
  },
  {
    value: "5Z",
    label: "Uniform Commercial Code Filing Collateral Number",
    paragraph_number: "1",
  },
  {
    value: "6A",
    label: "Consignee Reference Number",
    paragraph_number: "1",
  },
  {
    value: "6B",
    label: "U.S. Customs Service (USCS) Entry Number",
    paragraph_number: "1",
  },
  {
    value: "6C",
    label: "U.S. Customs Service (USCS) Entry Type Code",
    paragraph_number: "1",
  },
  {
    value: "6D",
    label: "U.S. Customs Service (USCS) Statement Number",
    paragraph_number: "1",
  },
  {
    value: "6E",
    label: "Map Reference",
    paragraph_number: "1",
  },
  {
    value: "6F",
    label: "Appraiser License",
    paragraph_number: "1",
  },
  {
    value: "6G",
    label: "Map Number",
    paragraph_number: "1",
  },
  {
    value: "6H",
    label: "Comparable Property Verification Source",
    paragraph_number: "1",
  },
  {
    value: "6I",
    label: "Comparable Property",
    paragraph_number: "1",
  },
  {
    value: "6J",
    label: "Census Tract",
    paragraph_number: "1",
  },
  {
    value: "6K",
    label: "Zone",
    paragraph_number: "1",
  },
  {
    value: "6L",
    label: "Agent Contract Number",
    paragraph_number: "1",
  },
  {
    value: "6M",
    label: "Application Number",
    paragraph_number: "1",
  },
  {
    value: "6N",
    label: "Claimant Number",
    paragraph_number: "1",
  },
  {
    value: "6O",
    label: "Cross Reference Number",
    paragraph_number: "1",
  },
  {
    value: "6P",
    label: "Group Number",
    paragraph_number: "1",
  },
  {
    value: "6Q",
    label: "Insurance License Number",
    paragraph_number: "1",
  },
  {
    value: "6R",
    label: "Provider Control Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by information provider company for tracking and billing \npurposes",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "6S",
    label: "Provider Order Ticket Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by information provider company for work order tracking",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "6T",
    label: "Pilot License Number",
    paragraph_number: "1",
  },
  {
    value: "6U",
    label: "Question Number",
    paragraph_number: "1",
  },
  {
    value: "6V",
    label: "Reissue Cession Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Unique identifier assigned to the individual record by the reinsurer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "6X",
    label: "Specimen Identifier",
    paragraph_number: "1",
  },
  {
    value: "6Y",
    label: "Equipment Initial",
    paragraph_number: "1",
  },
  {
    value: "6Z",
    label: "Secretaria de Comercia y Famenta Industrial (SECOFI) Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The Secretaria de Comercia y Famenta Industrial (SECOFI) Number is assigned by \nthe Mexican Government and is used to identify the producer of goods",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "7A",
    label: "Purchase Order Number Included in On-Order Position",
    paragraph_number: "1",
  },
  {
    value: "7B",
    label:
      "Purchase Order Number of Shipment Received since Last Reporting Date",
    paragraph_number: "1",
  },
  {
    value: "7C",
    label: "Purchase Order Number of Order Received since Last Reporting Date",
    paragraph_number: "1",
  },
  {
    value: "7D",
    label: "Tester Identification",
    paragraph_number: "1",
  },
  {
    value: "7E",
    label: "Collector Identification",
    paragraph_number: "1",
  },
  {
    value: "7F",
    label: "Repeat Location",
    paragraph_number: "1",
  },
  {
    value: "7G",
    label: "Data Quality Reject Reason",
    paragraph_number: "1",
  },
  {
    value: "7H",
    label: "Environmental Protection Agency (EPA) Test Type Purpose Code",
    paragraph_number: "1",
  },
  {
    value: "7I",
    label: "Subscriber Authorization Number",
    paragraph_number: "1",
  },
  {
    value: "7J",
    label: "Toll Billing Telephone Reference Number",
    paragraph_number: "1",
  },
  {
    value: "7K",
    label: "List of Materials",
    paragraph_number: "1",
  },
  {
    value: "7L",
    label: "Qualified Materials List",
    paragraph_number: "1",
  },
  {
    value: "7M",
    label: "Frame",
    paragraph_number: "1",
  },
  {
    value: "7N",
    label: "Piggyback",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A single commercial unit that consists of two different pieces of advertising \nmaterial",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "7O",
    label: "Tripleback",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A single commercial unit that consists of three different pieces of advertising \nmaterial",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "7P",
    label: "Sheet",
    paragraph_number: "1",
  },
  {
    value: "7Q",
    label: "Engineering Change Order",
    paragraph_number: "1",
  },
  {
    value: "7R",
    label: "Representative Identification Number",
    paragraph_number: "1",
  },
  {
    value: "7S",
    label: "Drawing Type",
    paragraph_number: "1",
  },
  {
    value: "7T",
    label: "Master Contract",
    paragraph_number: "1",
  },
  {
    value: "7U",
    label: "Related Transaction Reference Number",
    paragraph_number: "1",
  },
  {
    value: "7W",
    label: "Interchange Train Identification",
    paragraph_number: "1",
  },
  {
    value: "7X",
    label: "Home Mortgage Disclosure Act (HMDA) State Code",
    paragraph_number: "1",
  },
  {
    value: "7Y",
    label: "Home Mortgage Disclosure Act (HMDA) County Code",
    paragraph_number: "1",
  },
  {
    value: "7Z",
    label:
      "Home Mortgage Disclosure Act (HMDA) Metropolitan Statistical Area (MSA)",
    paragraph_number: "1",
  },
  {
    value: "8A",
    label: "Health Maintenance Organization (HMO) Authorization Number",
    paragraph_number: "1",
  },
  {
    value: "8B",
    label: "Preferred Provider Organization (PPO) Authorization Number",
    paragraph_number: "1",
  },
  {
    value: "8C",
    label: "Third-party Organization (TPO) Authorization Number",
    paragraph_number: "1",
  },
  {
    value: "8D",
    label: "Chemical Abstract Service Registry Number",
    paragraph_number: "1",
  },
  {
    value: "8E",
    label: "Guarantor Loan Number",
    paragraph_number: "1",
  },
  {
    value: "8F",
    label: "School Loan Number",
    paragraph_number: "1",
  },
  {
    value: "8G",
    label: "Automated Clearinghouse (ACH) Trace Number",
    paragraph_number: "1",
  },
  {
    value: "8H",
    label: "Check List Number",
    paragraph_number: "1",
  },
  {
    value: "8I",
    label: "FEDWIRE Confirmation Number",
    paragraph_number: "1",
  },
  {
    value: "8J",
    label:
      "Society for Worldwide Interbank Financial Telecommunications (SWIFT) \nConfirmation Number",
    paragraph_number: "1",
  },
  {
    value: "8K",
    label: "Dominion of Canada Code",
    paragraph_number: "1",
  },
  {
    value: "8L",
    label: "International Standard Industry Classification Code (ISIC)",
    paragraph_number: "1",
  },
  {
    value: "8M",
    label: "Originating Company Identifier",
    paragraph_number: "1",
  },
  {
    value: "8N",
    label: "Receiving Company Identifier",
    paragraph_number: "1",
  },
  {
    value: "8O",
    label: "Automated Clearing House (ACH) Entry Description",
    paragraph_number: "1",
  },
  {
    value: "8P",
    label: "Originating Depository Financial Institution Identifier",
    paragraph_number: "1",
  },
  {
    value: "8Q",
    label: "Receiving Depository Financial Institution Identifier",
    paragraph_number: "1",
  },
  {
    value: "8R",
    label: "Security Type",
    paragraph_number: "1",
  },
  {
    value: "8S",
    label: "Broker Identification",
    paragraph_number: "1",
  },
  {
    value: "8U",
    label: "Bank Assigned Security Identifier",
    paragraph_number: "1",
  },
  {
    value: "8V",
    label: "Credit Reference",
    paragraph_number: "1",
  },
  {
    value: "8W",
    label: "Bank to Bank Information",
    paragraph_number: "1",
  },
  {
    value: "8X",
    label: "Transaction Category or Type",
    paragraph_number: "1",
  },
  {
    value: "8Y",
    label: "Safekeeping Account Number",
    paragraph_number: "1",
  },
  {
    value: "8Z",
    label: "Alternate Clause Number",
    paragraph_number: "1",
  },
  {
    value: "9A",
    label: "Repriced Claim Reference Number",
    paragraph_number: "1",
  },
  {
    value: "9B",
    label: "Repriced Line Item Reference Number",
    paragraph_number: "1",
  },
  {
    value: "9C",
    label: "Adjusted Repriced Claim Reference Number",
    paragraph_number: "1",
  },
  {
    value: "9D",
    label: "Adjusted Repriced Line Item Reference Number",
    paragraph_number: "1",
  },
  {
    value: "9E",
    label: "Replacement Claim Number",
    paragraph_number: "1",
  },
  {
    value: "9F",
    label: "Referral Number",
    paragraph_number: "1",
  },
  {
    value: "9G",
    label: "Department of Defense Form 250 Requirement Code",
    paragraph_number: "1",
  },
  {
    value: "9H",
    label: "Packaging Group Number",
    paragraph_number: "1",
  },
  {
    value: "9I",
    label: "Automated Clearing House (ACH) Standard Entry Class",
    paragraph_number: "1",
  },
  {
    value: "9J",
    label: "Pension Contract",
    paragraph_number: "1",
  },
  {
    value: "9K",
    label: "Servicer",
    paragraph_number: "1",
  },
  {
    value: "9L",
    label: "Service Bureau",
    paragraph_number: "1",
  },
  {
    value: "9M",
    label: "Clearing House Interbank Payments System (CHIPS) Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "9N",
    label: "Investor",
    paragraph_number: "1",
  },
  {
    value: "9P",
    label: "Loan Type",
    paragraph_number: "1",
  },
  {
    value: "9Q",
    label: "Pool Suffix",
    paragraph_number: "1",
  },
  {
    value: "9R",
    label: "Job Order Number",
    paragraph_number: "1",
  },
  {
    value: "9S",
    label: "Delivery Region",
    paragraph_number: "1",
  },
  {
    value: "9T",
    label: "Tenor",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The life or term of a financial instrument or the term fixed to the payment of \na draft",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "9U",
    label: "Loan Feature Code",
    paragraph_number: "1",
  },
  {
    value: "9V",
    label: "Payment Category",
    paragraph_number: "1",
  },
  {
    value: "9W",
    label: "Payer Category",
    paragraph_number: "1",
  },
  {
    value: "9X",
    label: "Account Category",
    paragraph_number: "1",
  },
  {
    value: "9Y",
    label: "Bank Assigned Bankers Reference Number",
    paragraph_number: "1",
  },
  {
    value: "9Z",
    label: "Chamber of Commerce Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned by Chamber of Commerce to the business",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "A0",
    label: "Advertiser Number",
    paragraph_number: "1",
  },
  {
    value: "A1",
    label: "Analysis number/Test number",
    paragraph_number: "1",
  },
  {
    value: "A2",
    label: "Disability Insurance Account Number",
    paragraph_number: "1",
  },
  {
    value: "A3",
    label: "Assignment Number",
    paragraph_number: "1",
  },
  {
    value: "A4",
    label: "Disability Insurance Policy Number",
    paragraph_number: "1",
  },
  {
    value: "A5",
    label: "Educational Institution Identification Number",
    paragraph_number: "1",
  },
  {
    value: "A7",
    label: "Flexible Spending Account (FSA) Insurance Account Number",
    paragraph_number: "1",
  },
  {
    value: "A8",
    label: "Flexible Spending Account (FSA) Insurance Policy Number",
    paragraph_number: "1",
  },
  {
    value: "A9",
    label: "Health Insurance Account Number",
    paragraph_number: "1",
  },
  {
    value: "AA",
    label: "Accounts Receivable Statement Number",
    paragraph_number: "1",
  },
  {
    value: "AB",
    label: "Acceptable Source Purchaser ID",
    paragraph_number: "1",
  },
  {
    value: "AC",
    label: "Air Cargo Transfer Manifest",
    paragraph_number: "1",
  },
  {
    value: "AD",
    label: "Acceptable Source DUNS Number",
    paragraph_number: "1",
  },
  {
    value: "AE",
    label: "Authorization for Expense (AFE) Number",
    paragraph_number: "1",
  },
  {
    value: "AF",
    label: "Airlines Flight Identification Number",
    paragraph_number: "1",
  },
  {
    value: "AG",
    label: "Agent's Shipment Number",
    paragraph_number: "1",
  },
  {
    value: "AH",
    label: "Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "AI",
    label: "Associated Invoices",
    paragraph_number: "1",
  },
  {
    value: "AJ",
    label: "Accounts Receivable Customer Account",
    paragraph_number: "1",
  },
  {
    value: "AK",
    label: "Sending Company Audit Number (Automated Clearinghouse Transfers)",
    paragraph_number: "1",
  },
  {
    value: "AL",
    label: "Accounting (Equipment) Location Number",
    paragraph_number: "1",
  },
  {
    value: "AM",
    label: "Adjustment Memo (Charge Back)",
    paragraph_number: "1",
  },
  {
    value: "AN",
    label: "Associated Purchase Orders",
    paragraph_number: "1",
  },
  {
    value: "AO",
    label: "Appointment Number",
    paragraph_number: "1",
  },
  {
    value: "AP",
    label: "Accounts Receivable Number",
    paragraph_number: "1",
  },
  {
    value: "AQ",
    label: "Access Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies difficulties in accessing subassembly or part requiring repair",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AR",
    label: "Arrival Code",
    paragraph_number: "1",
  },
  {
    value: "AS",
    label: "Acceptable Source Supplier ID",
    paragraph_number: "1",
  },
  {
    value: "AT",
    label: "Appropriation Number",
    paragraph_number: "1",
  },
  {
    value: "AU",
    label: "Authorization to Meet Competition Number",
    paragraph_number: "1",
  },
  {
    value: "AV",
    label: "Health Insurance Rating Account Number",
    paragraph_number: "1",
  },
  {
    value: "AW",
    label: "Air Waybill Number",
    paragraph_number: "1",
  },
  {
    value: "AX",
    label: "Government Accounting Class Reference Number (ACRN)",
    paragraph_number: "1",
  },
  {
    value: "AY",
    label: "Floor Plan Approval Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Authorization number supplied by a finance company prior to shipment of product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AZ",
    label: "Health Insurance Policy Number",
    paragraph_number: "1",
  },
  {
    value: "B1",
    label: "Lessee Bill Code Number",
    paragraph_number: "1",
  },
  {
    value: "B2",
    label: "Axle Ratio",
    paragraph_number: "1",
    notes: [
      {
        content: "Numerical gear ratio of an axle drivetrain",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "B3",
    label: "Preferred Provider Organization Number",
    paragraph_number: "1",
  },
  {
    value: "B4",
    label: "Bilateral Car Service Agreements",
    paragraph_number: "1",
  },
  {
    value: "B5",
    label: "Health Insurance Rating Suffix Code",
    paragraph_number: "1",
  },
  {
    value: "B6",
    label: "Life Insurance Billing Account Number",
    paragraph_number: "1",
  },
  {
    value: "B7",
    label: "Life Insurance Policy Number",
    paragraph_number: "1",
  },
  {
    value: "B8",
    label: "Life Insurance Billing Suffix Code",
    paragraph_number: "1",
  },
  {
    value: "B9",
    label: "Retirement Plan Account Number",
    paragraph_number: "1",
  },
  {
    value: "BA",
    label: "Retirement Plan Policy Number",
    paragraph_number: "1",
  },
  {
    value: "BB",
    label: "Authorization Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Proves that permission was obtained to provide a service",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "BC",
    label: "Buyer's Contract Number",
    paragraph_number: "1",
  },
  {
    value: "BD",
    label: "Bid Number",
    paragraph_number: "1",
  },
  {
    value: "BE",
    label: "Business Activity",
    paragraph_number: "1",
  },
  {
    value: "BF",
    label: "Billing Center Identification",
    paragraph_number: "1",
  },
  {
    value: "BG",
    label: "Beginning Serial Number",
    paragraph_number: "1",
  },
  {
    value: "BH",
    label: "Lease Schedule Number - Blanket",
    paragraph_number: "1",
  },
  {
    value: "BI",
    label: "Bonded Carrier Internal Revenue Service Identification Number",
    paragraph_number: "1",
  },
  {
    value: "BJ",
    label: "Carrier's Customs Bond Number",
    paragraph_number: "1",
  },
  {
    value: "BK",
    label: "Broker's Order Number",
    paragraph_number: "1",
  },
  {
    value: "BL",
    label: "Government Bill of Lading",
    paragraph_number: "1",
  },
  {
    value: "BM",
    label: "Bill of Lading Number",
    paragraph_number: "1",
  },
  {
    value: "BN",
    label: "Booking Number",
    paragraph_number: "1",
  },
  {
    value: "BO",
    label: "Bin Location Number",
    paragraph_number: "1",
  },
  {
    value: "BP",
    label: "Adjustment Control Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identification assigned to an adjustment for future reference",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "BQ",
    label: "Health Maintenance Organization Code Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each individual Health Maintenance Organization \n(HMO) health insurance plan (assigned by the HMO)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "BR",
    label: "Broker or Sales Office Number",
    paragraph_number: "1",
  },
  {
    value: "BS",
    label: "Split Booking Number",
    paragraph_number: "1",
  },
  {
    value: "BT",
    label: "Batch Number",
    paragraph_number: "1",
  },
  {
    value: "BU",
    label: "Buyer's Approval Mark",
    paragraph_number: "1",
  },
  {
    value: "BV",
    label: "Purchase Order Line Item Identifier (Buyer)",
    paragraph_number: "1",
  },
  {
    value: "BW",
    label: "Blended With Batch Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of the batch with which another batch was blended prior to delivery to \ncustomer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "BX",
    label: "Buyer's Shipment Mark Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number identifying individual bales and total shipments of cotton which have \nbeen tested according to U.S. Government regulations",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "BY",
    label: "Repair Category Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Classification number for the type of repair performed on a product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "BZ",
    label: "Complaint Code",
    paragraph_number: "1",
    notes: [
      {
        content: "Number categorizing customer complaints",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "C0",
    label: "Canadian Social Insurance Number",
    paragraph_number: "1",
  },
  {
    value: "C1",
    label: "Customer material specification number",
    paragraph_number: "1",
  },
  {
    value: "C2",
    label: "Customer process specification number",
    paragraph_number: "1",
  },
  {
    value: "C3",
    label: "Customer specification number",
    paragraph_number: "1",
  },
  {
    value: "C4",
    label: "Change Number",
    paragraph_number: "1",
  },
  {
    value: "C5",
    label: "Customer Tracking Number For Loaned Materials",
    paragraph_number: "1",
  },
  {
    value: "C6",
    label: "Carnet Number",
    paragraph_number: "1",
  },
  {
    value: "C7",
    label: "Contract Line Item Number",
    paragraph_number: "1",
  },
  {
    value: "C8",
    label: "Corrected Contract Number",
    paragraph_number: "1",
  },
  {
    value: "C9",
    label: "Previous Credit/Debit Adjustment Number",
    paragraph_number: "1",
  },
  {
    value: "CA",
    label: "Cost Allocation Reference",
    paragraph_number: "1",
  },
  {
    value: "CB",
    label: "Combined Shipment",
    paragraph_number: "1",
  },
  {
    value: "CC",
    label: "Contract Co-op Number",
    paragraph_number: "1",
  },
  {
    value: "CD",
    label: "Credit Note Number",
    paragraph_number: "1",
  },
  {
    value: "CE",
    label: "Class of Contract Code",
    paragraph_number: "1",
  },
  {
    value: "CF",
    label: "Fleet Reference Number",
    paragraph_number: "1",
  },
  {
    value: "CG",
    label: "Consignee's Order Number",
    paragraph_number: "1",
  },
  {
    value: "CH",
    label: "Customer catalog number",
    paragraph_number: "1",
  },
  {
    value: "CI",
    label: "Unique Consignment Identifier",
    paragraph_number: "1",
  },
  {
    value: "CJ",
    label: "Clause Number",
    paragraph_number: "1",
  },
  {
    value: "CK",
    label: "Check Number",
    paragraph_number: "1",
  },
  {
    value: "CL",
    label: "Seller's Credit Memo",
    paragraph_number: "1",
  },
  {
    value: "CM",
    label: "Buyer's Credit Memo",
    paragraph_number: "1",
  },
  {
    value: "CN",
    label: "Carrier's Reference Number (PRO/Invoice)",
    paragraph_number: "1",
  },
  {
    value: "CO",
    label: "Customer Order Number",
    paragraph_number: "1",
  },
  {
    value: "CP",
    label: "Condition of Purchase Document Number",
    paragraph_number: "1",
  },
  {
    value: "CQ",
    label: "Customshouse Broker License Number",
    paragraph_number: "1",
  },
  {
    value: "CR",
    label: "Customer Reference Number",
    paragraph_number: "1",
  },
  {
    value: "CS",
    label: "Condition of Sale Document Number",
    paragraph_number: "1",
  },
  {
    value: "CT",
    label: "Contract Number",
    paragraph_number: "1",
  },
  {
    value: "CU",
    label: "Clear Text Clause",
    paragraph_number: "1",
  },
  {
    value: "CV",
    label: "Coil Number",
    paragraph_number: "1",
  },
  {
    value: "CW",
    label: "Canadian Wheat Board Permit Number",
    paragraph_number: "1",
  },
  {
    value: "CX",
    label: "Consignment Classification ID",
    paragraph_number: "1",
  },
  {
    value: "CY",
    label: "Commercial Registration Number",
    paragraph_number: "1",
  },
  {
    value: "CZ",
    label: "Contract Rider Number (Used in conjunction with contract number)",
    paragraph_number: "1",
  },
  {
    value: "D0",
    label: "Data Reliability Code",
    paragraph_number: "1",
  },
  {
    value: "D1",
    label: "Drug Enforcement Administration Order Blank Number",
    paragraph_number: "1",
  },
  {
    value: "D2",
    label: "Supplier Document Identification Number",
    paragraph_number: "1",
  },
  {
    value: "D3",
    label: "National Association of Boards of Pharmacy Number",
    paragraph_number: "1",
  },
  {
    value: "D4",
    label: "Cut Number",
    paragraph_number: "1",
  },
  {
    value: "D5",
    label: "Dye Lot Number",
    paragraph_number: "1",
  },
  {
    value: "D6",
    label: "Duplicate Bill Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The number of the second or subsequent invoice for the same goods or services",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "D7",
    label: "Coverage Code",
    paragraph_number: "1",
    notes: [
      {
        content: "Type of protection provided by an insurance policy",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "D8",
    label: "Loss Report Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Sequence number to identify a particular loss and its information. It will be \nassigned across all lines of business for a particular customer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "D9",
    label: "Claim Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Sequence number to track the number of claims opened within a particular line \nof business",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DA",
    label: "Domicile Branch Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Home location of product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DB",
    label: "Buyer's Debit Memo",
    paragraph_number: "1",
  },
  {
    value: "DC",
    label: "Dealer purchase order number",
    paragraph_number: "1",
  },
  {
    value: "DD",
    label: "Document Identification Code",
    paragraph_number: "1",
  },
  {
    value: "DE",
    label: "Depositor Number",
    paragraph_number: "1",
  },
  {
    value: "DF",
    label: "Defense Federal Acquisition Regulations (DFAR)",
    paragraph_number: "1",
  },
  {
    value: "DG",
    label: "Drawing Number",
    paragraph_number: "1",
  },
  {
    value: "DH",
    label: "Drug Enforcement Administration Number",
    paragraph_number: "1",
  },
  {
    value: "DI",
    label: "Distributor Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "DJ",
    label: "Delivery Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "DK",
    label: "Dock Number",
    paragraph_number: "1",
  },
  {
    value: "DL",
    label: "Seller's Debit Memo",
    paragraph_number: "1",
  },
  {
    value: "DM",
    label: "Associated Product Number",
    paragraph_number: "1",
  },
  {
    value: "DN",
    label: "Draft Number",
    paragraph_number: "1",
  },
  {
    value: "DO",
    label: "Delivery Order Number",
    paragraph_number: "1",
  },
  {
    value: "DP",
    label: "Department Number",
    paragraph_number: "1",
  },
  {
    value: "DQ",
    label: "Delivery Quote Number",
    paragraph_number: "1",
  },
  {
    value: "DR",
    label: "Dock Receipt Number",
    paragraph_number: "1",
  },
  {
    value: "DS",
    label: "Defense Priorities Allocation System (DPAS) Priority Rating",
    paragraph_number: "1",
  },
  {
    value: "DT",
    label: "Downstream Shipper Contract Number",
    paragraph_number: "1",
  },
  {
    value: "DU",
    label: "Dependents Information",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies text data that describes information about a dependent spouse or \nchildren as it pertains to the transportation of household goods",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DV",
    label: "Diversion Authority Number",
    paragraph_number: "1",
  },
  {
    value: "DW",
    label: "Deposit Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "DX",
    label: "Department/Agency Number",
    paragraph_number: "1",
  },
  {
    value: "DY",
    label:
      "Department of Defense Transportation Service Code Number (Household Goods)",
    paragraph_number: "1",
  },
  {
    value: "DZ",
    label:
      "Certified Registered Nurse Anesthetist (CRNA) Provider Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Provider number of the physician that is supervising the registered nurse \nanesthetist",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E1",
    label: "Emergency Order Number",
    paragraph_number: "1",
  },
  {
    value: "E2",
    label: "Part Causing Repair Number",
    paragraph_number: "1",
  },
  {
    value: "E3",
    label: "Expansion on Effect of Change Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Description of additional effects on test or operating procedures as a result \nof the change to the product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E4",
    label: "Charge Card Number",
    paragraph_number: "1",
  },
  {
    value: "E5",
    label: "Claimant's Claim Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Unique number assigned to the claim by the claimant",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E6",
    label: "Backout Procedure Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Description of the procedures required to remove the change to the product in \ncase the change just made causes an unwanted result",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E7",
    label: "Service Bulletin Number",
    paragraph_number: "1",
  },
  {
    value: "E8",
    label: "Service Contract (Coverage) Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number or code identifying length and terms of the coverage",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E9",
    label: "Attachment Code",
    paragraph_number: "1",
    notes: [
      {
        content: "Supplementary reference information",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EA",
    label: "Medical Record Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each patient by the provider of service (hospital) \nto assist in retrieval of medical records",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EB",
    label: "Embargo Permit Number",
    paragraph_number: "1",
  },
  {
    value: "EC",
    label: "Circular",
    paragraph_number: "1",
  },
  {
    value: "ED",
    label: "Export Declaration",
    paragraph_number: "1",
  },
  {
    value: "EE",
    label: "Election District",
    paragraph_number: "1",
  },
  {
    value: "EF",
    label: "Electronic Funds Transfer ID Number",
    paragraph_number: "1",
  },
  {
    value: "EG",
    label: "Ending Serial Number",
    paragraph_number: "1",
  },
  {
    value: "EH",
    label: "Financial Classification Code",
    paragraph_number: "1",
  },
  {
    value: "EI",
    label: "Employer's Identification Number",
    paragraph_number: "1",
  },
  {
    value: "EJ",
    label: "Patient Account Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each patient by the provider of service to \nfacilitate retrieval of individual case records tracking of claims submitted to \na payer and posting of payment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EK",
    label:
      "Healthcare Manpower Shortage Area (HMSA) Facility Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to facility located in a Health Manpower Shortage Area",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EL",
    label: "Electronic device pin number",
    paragraph_number: "1",
  },
  {
    value: "EM",
    label: "Electronic Payment Reference Number",
    paragraph_number: "1",
  },
  {
    value: "EN",
    label: "Embargo Number",
    paragraph_number: "1",
  },
  {
    value: "EO",
    label: "Submitter Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number identifying the submitter of the transaction set",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EP",
    label: "Export Permit Number",
    paragraph_number: "1",
  },
  {
    value: "EQ",
    label: "Equipment Number",
    paragraph_number: "1",
  },
  {
    value: "ER",
    label: "Container or Equipment Receipt Number",
    paragraph_number: "1",
  },
  {
    value: "ES",
    label: "Employer's Social Security Number",
    paragraph_number: "1",
  },
  {
    value: "ET",
    label: "Excess Transportation",
    paragraph_number: "1",
  },
  {
    value: "EU",
    label: "End User's Purchase Order Number",
    paragraph_number: "1",
  },
  {
    value: "EV",
    label: "Receiver Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number identifying the organization/site location designated to \nreceive the current transmitted transaction set",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EW",
    label: "Mammography Certification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Health Care Financing Administration assigned certification number of the \ncertified mammography screening center",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EX",
    label: "Estimate Number",
    paragraph_number: "1",
  },
  {
    value: "EY",
    label: "Receiver Sub-identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique code identifying the receiver's specific department or office location \nfor internal routing of electronic claims",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EZ",
    label: "Electronic Data Interchange Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "F1",
    label: "Version Code - National",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the release of a set of information or requirements to distinguish \nfrom the previous or future sets that may differ; the release in question is on \nthe national level",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F2",
    label: "Version Code - Local",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the release of a set of information or requirements to distinguish \nfrom the previous or future sets that may differ; the release in question is on \nthe local level",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F3",
    label: "Submission Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to the submitted transaction set; this number is used \nby the payer to track every file submitted",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F4",
    label: "Facility Certification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to qualifying facilities to perform services",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F5",
    label: "Medicare Version Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the release of a set of information or requirements to distinguish \nfrom previous or future sets that may differ; the version in question is that \nwhich is being used by Medicare",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F6",
    label: "Health Insurance Claim (HIC) Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned by the government to each person entitled to Medicare \nbenefits",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F7",
    label: "New Health Insurance Claim (HIC) Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A revised Health Insurance Claim Number (HIN)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "F8",
    label: "Original Reference Number",
    paragraph_number: "1",
  },
  {
    value: "F9",
    label: "Freight Payor Reference Number",
    paragraph_number: "1",
  },
  {
    value: "FA",
    label: "Federal Acquisition Regulations (FAR)",
    paragraph_number: "1",
  },
  {
    value: "FB",
    label: "File Transfer Form Number",
    paragraph_number: "1",
  },
  {
    value: "FC",
    label: "Filer Code Issued by Customs",
    paragraph_number: "1",
  },
  {
    value: "FD",
    label: "Filer Code Issued by Bureau of Census",
    paragraph_number: "1",
  },
  {
    value: "FE",
    label: "Failure mechanism number",
    paragraph_number: "1",
  },
  {
    value: "FF",
    label: "Film Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned by the film distribution company",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FG",
    label: "Fund Identification Number",
    paragraph_number: "1",
  },
  {
    value: "FH",
    label: "Clinic Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number identifying the clinic location that rendered services",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FI",
    label: "File Identifier",
    paragraph_number: "1",
  },
  {
    value: "FJ",
    label: "Line Item Control Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each charge line used for tracking purposes",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FK",
    label: "Finish Lot Number",
    paragraph_number: "1",
  },
  {
    value: "FL",
    label: "Fine Line Classification",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Fine Line Classifications are used to group related items so that retail stores \ncan perform analyses of sales and shelf space allocation by groups of products",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FM",
    label: "Federal Maritime Commission (FMC) Forwarders Number",
    paragraph_number: "1",
  },
  {
    value: "FN",
    label: "Forwarder's/Agent's Reference Number",
    paragraph_number: "1",
  },
  {
    value: "FO",
    label: "Drug Formulary Number",
    paragraph_number: "1",
  },
  {
    value: "FP",
    label: "Forestry Permit Number",
    paragraph_number: "1",
  },
  {
    value: "FQ",
    label: "Form Number",
    paragraph_number: "1",
  },
  {
    value: "FR",
    label: "Freight Bill Number",
    paragraph_number: "1",
  },
  {
    value: "FS",
    label: "Final Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "FT",
    label: "Foreign Trade Zone",
    paragraph_number: "1",
  },
  {
    value: "FU",
    label: "Fund Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Defense Fuel Supply Center to bill back fuel purchases to the appropriate \nservice or agency account fund",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FV",
    label: "Health Maintenance Organization (HMO) Reference Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each referral or authorization when a claimant \nvisits a provider other than the primary care provider",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FW",
    label: "State License Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each provider of service; this number is assigned \nby state governments and is the provider's legal identification number in the \nstate that is assigned",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FX",
    label: "Failure Analysis Report Number",
    paragraph_number: "1",
  },
  {
    value: "FY",
    label: "Claim Office Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The identification of the specific payer's location designated as responsible \nfor the submitted claim",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FZ",
    label: "Processor's Invoice Number",
    paragraph_number: "1",
    notes: [
      {
        content: "The invoice number of the third-party outside processor",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "G1",
    label: "Prior Authorization Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An authorization number acquired prior to the submission of a claim",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "G2",
    label: "Provider Commercial Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to a provider by a commercial insurer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "G3",
    label: "Predetermination of Benefits Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number assigned by a third-party payer identifying the pre-treatment estimate",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "G4",
    label: "Peer Review Organization (PRO) Approval Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An authorization number for certain surgical procedures and for an assistant at \ncataract surgery",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "G5",
    label: "Provider Site Number",
    paragraph_number: "1",
  },
  {
    value: "G6",
    label: "Payer Assigned Resubmission Reference Number",
    paragraph_number: "1",
  },
  {
    value: "G7",
    label: "Resubmission Reason Code",
    paragraph_number: "1",
    notes: [
      {
        content: "A code identifying the reason that the claim was resubmitted",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "G8",
    label: "Resubmission Number",
    paragraph_number: "1",
  },
  {
    value: "G9",
    label: "Secondary Employee Identification Number",
    paragraph_number: "1",
  },
  {
    value: "GA",
    label: "Government Advance Progress",
    paragraph_number: "1",
  },
  {
    value: "GB",
    label: "Grain Block Number",
    paragraph_number: "1",
  },
  {
    value: "GC",
    label: "Government Contract Number",
    paragraph_number: "1",
  },
  {
    value: "GD",
    label: "Return Goods Bill of Lading Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Bill of lading number for returned goods enroute",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GE",
    label: "Geographic Number",
    paragraph_number: "1",
  },
  {
    value: "GF",
    label: "Specialty License Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to each provider of service by specialty",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GG",
    label: "Gauge Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "GH",
    label: "Identification Card Serial Number",
    paragraph_number: "1",
  },
  {
    value: "GI",
    label: "Secondary Provider Number",
    paragraph_number: "1",
  },
  {
    value: "GJ",
    label: "Cornbore Certification Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Certificate stating that shipment is free of cornbores",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GK",
    label: "Third Party Reference Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned to a claim after it has been entered into the third \nparty payer's adjudication system; this number is used by the payer to track \nclaims internally",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GL",
    label: "Geographic Destination Zone Number",
    paragraph_number: "1",
  },
  {
    value: "GM",
    label: "Loan Acquisition Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a loan during the acquisition process",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GN",
    label: "Folder Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number used to identify the folder in which the loan is located",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GO",
    label: "Exhibit Identifier",
    paragraph_number: "1",
  },
  {
    value: "GP",
    label: "Government Priority Number",
    paragraph_number: "1",
  },
  {
    value: "GQ",
    label: "Internal Purchase Order Release Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The release number associated with the internal purchase order number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GR",
    label: "Grain Order Reference Number",
    paragraph_number: "1",
  },
  {
    value: "GS",
    label: "General Services Administration Regulations (GSAR)",
    paragraph_number: "1",
  },
  {
    value: "GT",
    label: "Goods and Service Tax Registration Number",
    paragraph_number: "1",
  },
  {
    value: "GU",
    label: "Internal Purchase Order Item Number",
    paragraph_number: "1",
    notes: [
      {
        content: "The item number associated with the internal purchase order",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GV",
    label: "Third Party Purchase Order Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The purchase order number from a manufacturer to a third-party which provides \nvalue added to the manufactured product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GW",
    label: "Third Party Purchase Order Release Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The release number associated with a third-party purchase order number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GX",
    label: "Third Party Purchase Order Item Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The item number associated with the third-party purchase order number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GY",
    label: "Empty Repositioning Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number used to authorize and track an empty container or bare chassis or \ngenerator set being repositioned for later use",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GZ",
    label: "General Ledger Account",
    paragraph_number: "1",
  },
  {
    value: "H1",
    label: "High Fabrication Authorization Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The purchaser's program number that authorizes the highest amount of material \nproduction",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "H2",
    label: "High Raw Material Authorization Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The purchaser's program number that authorizes the highest amount of raw \nmaterial or purchased components in their original state to be secured for \nproduction",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "H3",
    label: "Gravity Source Meter Number",
    paragraph_number: "1",
  },
  {
    value: "H5",
    label: "Special Clause",
    paragraph_number: "1",
  },
  {
    value: "H6",
    label: "Quality Clause",
    paragraph_number: "1",
  },
  {
    value: "H7",
    label: "Standard Clause",
    paragraph_number: "1",
  },
  {
    value: "H8",
    label: "Home Mortgage Disclosure Act (HMDA) Census Tract",
    paragraph_number: "1",
  },
  {
    value: "H9",
    label: "Payment History Reference Number",
    paragraph_number: "1",
  },
  {
    value: "HA",
    label: "Competent Authority",
    paragraph_number: "1",
  },
  {
    value: "HB",
    label: "Bill & Hold Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "HC",
    label: "Heat Code",
    paragraph_number: "1",
  },
  {
    value: "HD",
    label: "Department of Transportation Hazardous Number",
    paragraph_number: "1",
  },
  {
    value: "HE",
    label: "Hazardous Exemption Number",
    paragraph_number: "1",
  },
  {
    value: "HF",
    label: "Engineering Data List",
    paragraph_number: "1",
  },
  {
    value: "HG",
    label: "Civil Action Number",
    paragraph_number: "1",
  },
  {
    value: "HH",
    label: "Fiscal Code",
    paragraph_number: "1",
    notes: [
      {
        content: "Business Number assigned by the government",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "HI",
    label: "Health Industry Number (HIN)",
    paragraph_number: "1",
  },
  {
    value: "HJ",
    label: "Identity Card Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to an individual by a government",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "HK",
    label: "Judgment Number",
    paragraph_number: "1",
  },
  {
    value: "HL",
    label: "SIREN Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business by the French Government",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "HM",
    label: "SIRET Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned to a business for each location by the French Government",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "HN",
    label: "Hazardous Certification Number",
    paragraph_number: "1",
  },
  {
    value: "HO",
    label: "Shipper's Hazardous Number",
    paragraph_number: "1",
  },
  {
    value: "HP",
    label: "Pack & Hold Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "HQ",
    label: "Reinsurance Reference",
    paragraph_number: "1",
  },
  {
    value: "HR",
    label: "Horsepower",
    paragraph_number: "1",
    notes: [
      {
        content: "Horsepower rating of the engine",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "HS",
    label: "Harmonized Code System (Canada)",
    paragraph_number: "1",
  },
  {
    value: "HT",
    label: "Code of Federal Regulations",
    paragraph_number: "1",
  },
  {
    value: "HU",
    label: "Type of Escrow Number",
    paragraph_number: "1",
  },
  {
    value: "HV",
    label: "Escrow File Number",
    paragraph_number: "1",
  },
  {
    value: "HW",
    label: "High/Wide File Number",
    paragraph_number: "1",
  },
  {
    value: "HX",
    label: "Auto Loss Item Number",
    paragraph_number: "1",
  },
  {
    value: "HY",
    label: "Property Loss Item Number",
    paragraph_number: "1",
  },
  {
    value: "HZ",
    label:
      "Tax Agency Number (MERS [Mortgage Electronic Registration System] Federal \nInformation Processing Standards [FIPS] Based Number)",
    paragraph_number: "1",
  },
  {
    value: "I1",
    label: "Owning Bureau Identification Number",
    paragraph_number: "1",
  },
  {
    value: "I2",
    label: "Interstate Commerce Commission (ICC) Account Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A code which is mandatory on Joint Facility Billing that indicates that the \nfollowing is an ICC Account Number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "I3",
    label: "Non-American Identification Number",
    paragraph_number: "1",
  },
  {
    value: "I4",
    label: "Credit Counseling Identification Number",
    paragraph_number: "1",
  },
  {
    value: "I5",
    label: "Invoice Identification",
    paragraph_number: "1",
  },
  {
    value: "I7",
    label: "Credit Report Number",
    paragraph_number: "1",
  },
  {
    value: "I9",
    label: "Pollutant",
    paragraph_number: "1",
  },
  {
    value: "IA",
    label: "Internal Vendor Number",
    paragraph_number: "1",
  },
  {
    value: "IB",
    label: "In Bond Number",
    paragraph_number: "1",
  },
  {
    value: "IC",
    label: "Inbound-to Party",
    paragraph_number: "1",
  },
  {
    value: "ID",
    label: "Insurance Certificate Number",
    paragraph_number: "1",
  },
  {
    value: "IE",
    label: "Interchange Agreement Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number identifying the interchange agreement of a domestic carrier with an \nocean carrier",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "IF",
    label: "Issue Number",
    paragraph_number: "1",
  },
  {
    value: "IG",
    label: "Insurance Policy Number",
    paragraph_number: "1",
  },
  {
    value: "IH",
    label: "Initial Dealer Claim Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Claim number of previously attempted repair",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "II",
    label: "Initial Sample Inspection Report Number",
    paragraph_number: "1",
  },
  {
    value: "IJ",
    label: "Standard Industry Classification (SIC) Code",
    paragraph_number: "1",
  },
  {
    value: "IK",
    label: "Invoice Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Manufacturer's invoice number for vehicle/component",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "IL",
    label: "Internal Order Number",
    paragraph_number: "1",
  },
  {
    value: "IM",
    label: "Intergovernmental Maritime Organization (IMO) Number",
    paragraph_number: "1",
  },
  {
    value: "IN",
    label: "Consignee's Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "IO",
    label: "Inbound-to or Outbound-from Party",
    paragraph_number: "1",
  },
  {
    value: "IP",
    label: "Inspection Report Number",
    paragraph_number: "1",
  },
  {
    value: "IQ",
    label: "End Item",
    paragraph_number: "1",
  },
  {
    value: "IR",
    label: "Intra Plant Routing",
    paragraph_number: "1",
  },
  {
    value: "IS",
    label: "Invoice Number Suffix",
    paragraph_number: "1",
  },
  {
    value: "IT",
    label: "Internal Customer Number",
    paragraph_number: "1",
  },
  {
    value: "IU",
    label: "Barge Permit Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identification of permit for rail traffic moving on a barge",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "IV",
    label: "Seller's Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "IW",
    label: "Part Interchangeability",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Specifies the interchange relationship between an old part number and a new \npart number (replaced and replacing part numbers)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "IX",
    label: "Item Number",
    paragraph_number: "1",
  },
  {
    value: "IZ",
    label: "Insured Parcel Post Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned to control an insured parcel post shipment from shipper to \nconsignee",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "J0",
    label: "Proceeding",
    paragraph_number: "1",
  },
  {
    value: "J1",
    label: "Creditor",
    paragraph_number: "1",
  },
  {
    value: "J2",
    label: "Attorney",
    paragraph_number: "1",
  },
  {
    value: "J3",
    label: "Judge",
    paragraph_number: "1",
  },
  {
    value: "J4",
    label: "Trustee",
    paragraph_number: "1",
  },
  {
    value: "J5",
    label: "Originating Case",
    paragraph_number: "1",
  },
  {
    value: "J6",
    label: "Adversary Case",
    paragraph_number: "1",
  },
  {
    value: "J7",
    label: "Lead Case",
    paragraph_number: "1",
  },
  {
    value: "J8",
    label: "Jointly Administered Case",
    paragraph_number: "1",
  },
  {
    value: "J9",
    label: "Substantively Consolidated Case",
    paragraph_number: "1",
  },
  {
    value: "JA",
    label: "Beginning Job Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "JB",
    label: "Job (Project) Number",
    paragraph_number: "1",
  },
  {
    value: "JC",
    label: "Review",
    paragraph_number: "1",
  },
  {
    value: "JD",
    label: "User Identification",
    paragraph_number: "1",
  },
  {
    value: "JE",
    label: "Ending Job Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "JF",
    label: "Automated Underwriting Reference Number",
    paragraph_number: "1",
  },
  {
    value: "JH",
    label: "Tag",
    paragraph_number: "1",
  },
  {
    value: "JI",
    label: "Multiple Listing Service Area",
    paragraph_number: "1",
  },
  {
    value: "JK",
    label: "Multiple Listing Service Sub-area",
    paragraph_number: "1",
  },
  {
    value: "JL",
    label: "Packet",
    paragraph_number: "1",
  },
  {
    value: "JM",
    label: "Multiple Listing Service Map X Coordinate",
    paragraph_number: "1",
  },
  {
    value: "JN",
    label: "Multiple Listing Service Map Y Coordinate",
    paragraph_number: "1",
  },
  {
    value: "JO",
    label: "Multiple Listing Number",
    paragraph_number: "1",
  },
  {
    value: "JP",
    label: "Multiple Listing Service Book Type",
    paragraph_number: "1",
  },
  {
    value: "JQ",
    label: "Elevation",
    paragraph_number: "1",
  },
  {
    value: "JR",
    label: "Property Component Location",
    paragraph_number: "1",
  },
  {
    value: "JS",
    label: "Job Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "JT",
    label: "Prior Tax Identification Number (TIN)",
    paragraph_number: "1",
  },
  {
    value: "JU",
    label: "Prior Phone Number",
    paragraph_number: "1",
  },
  {
    value: "JV",
    label: "Prior Health Industry Number",
    paragraph_number: "1",
  },
  {
    value: "JW",
    label: "Prior Universal Provider Identification Number (UPIN)",
    paragraph_number: "1",
  },
  {
    value: "JX",
    label: "Prior Postal Zip Code",
    paragraph_number: "1",
  },
  {
    value: "JY",
    label: "Origin of Shipment Harmonized-Based Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Harmonized code of the commodity in the country which is the origin of the \nshipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "JZ",
    label: "Governing Class Code",
    paragraph_number: "1",
  },
  {
    value: "K0",
    label: "Approval Code",
    paragraph_number: "1",
  },
  {
    value: "K1",
    label: "Foreign Military Sales Notice Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned to control a foreign military sales shipment from shipper to \nconsignee",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "K2",
    label: "Certified Mail Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by U.S. Postal Service (USPS) to monitor the movement of \ncertified mail from point of acceptance by USPS to point of delivery",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "K3",
    label: "Registered Mail Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by U.S. Postal Service (USPS) to monitor the movement of mail \nfrom point of acceptance by USPS to point of delivery",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "K4",
    label: "Criticality Designator",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number assigned to a contract or order that expresses the relative importance \nof that contract or order and thereby assists the contractor in making \nperformance decisions and assists in making production surveillance decisions",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "K5",
    label: "Task Order",
    paragraph_number: "1",
  },
  {
    value: "K6",
    label: "Purchase Description",
    paragraph_number: "1",
  },
  {
    value: "K7",
    label: "Paragraph Number",
    paragraph_number: "1",
  },
  {
    value: "K8",
    label: "Project Paragraph Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A number for a nested part of a project",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "K9",
    label: "Inquiry Request Number",
    paragraph_number: "1",
  },
  {
    value: "KA",
    label: "Distribution List",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a list of addresses to which the distribution of something should be \nmade",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KB",
    label: "Beginning Kanban Serial Number",
    paragraph_number: "1",
  },
  {
    value: "KC",
    label: "Exhibit Distribution List",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a list of addressees to which the distribution of a cited contract \nexhibit must be made",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KD",
    label: "Special Instructions Number",
    paragraph_number: "1",
  },
  {
    value: "KE",
    label: "Ending Kanban Serial Number",
    paragraph_number: "1",
  },
  {
    value: "KG",
    label: "Foreclosing Status",
    paragraph_number: "1",
  },
  {
    value: "KH",
    label: "Type of Law Suit",
    paragraph_number: "1",
  },
  {
    value: "KI",
    label: "Type of Outstanding Judgment",
    paragraph_number: "1",
  },
  {
    value: "KJ",
    label: "Tax Lien Jurisdiction",
    paragraph_number: "1",
  },
  {
    value: "KK",
    label: "Delivery Reference",
    paragraph_number: "1",
  },
  {
    value: "KL",
    label: "Contract Reference",
    paragraph_number: "1",
  },
  {
    value: "KM",
    label: "Rental Account Number",
    paragraph_number: "1",
  },
  {
    value: "KN",
    label: "Census Automated Files ID",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An ID given by the U.S. Bureau of the Census to those parties having fulfilled \nthe necessary requirements to be able to file shipper's export declaration data \ndirectly with the Census through automated means",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KO",
    label: "Customs Drawback Entry Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          'A number given to importers by U.S. Customs which have filed for "drawbacks," \nof certain import duties',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KP",
    label: "Health Certificate Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A certificate given by the veterinary authorities regarding the health of \nanimals being shipped",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KQ",
    label: "Procuring Agency",
    paragraph_number: "1",
  },
  {
    value: "KR",
    label: "Response to a Request for Quotation Reference",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A discrete number assigned for identification purpose to a response to a \nrequest for quotation",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KS",
    label: "Solicitation",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A discreet number assigned by the purchasing activity to differentiate between \ndifferent solicitations",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KT",
    label: "Request for Quotation Reference",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A discrete number assigned for identification purposes to a request for \nquotation",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KU",
    label: "Office Symbol",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number assigned for reference to a specific office within an organization",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KV",
    label: "Distribution Statement Code",
    paragraph_number: "1",
  },
  {
    value: "KW",
    label: "Certification",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number, taken from an acquisition regulation, which represents a specific \ncertification that must be made by a prospective vendor before a contract or \norder can be placed with that vendor",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KX",
    label: "Representation",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number, taken from an acquisition regulation, which represents a specific \nrepresentation that must be made by a prospective vendor before a contract or \norder can be placed with that vendor",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KY",
    label: "Site Specific Procedures, Terms, and Conditions",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A set of procedures, terms, and conditions, applicable to a category of \nprocurement emanating from a specific location, which will be incorporated into \nall procurement actions in that category by referencing its unique number \nrather than by incorporating the lengthy details it represents",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KZ",
    label: "Master Solicitation Procedures, Terms, and Conditions",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A set of standard procedures, terms, and conditions, applicable to a category \nof procurement, which will be incorporated into all procurement actions in that \ncategory by referencing its unique number rather than by incorporating the \nlengthy details it represents",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L1",
    label: "Letters or Notes",
    paragraph_number: "1",
  },
  {
    value: "L2",
    label: "Location on Product Code",
    paragraph_number: "1",
  },
  {
    value: "L3",
    label: "Labor Operation Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Uniquely identifies the repair actions performed",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L4",
    label: "Proposal Paragraph Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The place in a proposal where additional information can be found",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L5",
    label: "Subexhibit Line Item Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A further subdivision of a contract exhibit line item",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L6",
    label: "Subcontract Line Item Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A further subdivision of a contract line item number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L7",
    label: "Customer's Release Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number which uniquely identifies a release against the customer's purchase \norder",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L8",
    label: "Consignee's Release Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number which uniquely identifies a release against the consignee's purchase \norder",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "L9",
    label: "Customer's Part Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned by a customer to identify a purchased material",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "LA",
    label: "Shipping Label Serial Number",
    paragraph_number: "1",
  },
  {
    value: "LB",
    label: "Lockbox",
    paragraph_number: "1",
  },
  {
    value: "LC",
    label: "Lease Number",
    paragraph_number: "1",
  },
  {
    value: "LD",
    label: "Loan Number",
    paragraph_number: "1",
  },
  {
    value: "LE",
    label: "Lender Entity Number",
    paragraph_number: "1",
  },
  {
    value: "LF",
    label: "Assembly Line Feed Location",
    paragraph_number: "1",
  },
  {
    value: "LG",
    label: "Lease Schedule Number",
    paragraph_number: "1",
  },
  {
    value: "LH",
    label: "Longitude Expressed in Seconds",
    paragraph_number: "1",
  },
  {
    value: "LI",
    label: "Line Item Identifier (Seller's)",
    paragraph_number: "1",
  },
  {
    value: "LJ",
    label: "Local Jurisdiction",
    paragraph_number: "1",
  },
  {
    value: "LK",
    label: "Longitude expressed in Degrees, Minutes and Seconds",
    paragraph_number: "1",
  },
  {
    value: "LL",
    label: "Latitude Expressed in Seconds",
    paragraph_number: "1",
  },
  {
    value: "LM",
    label: "Product Period for which Labor Costs are Firm",
    paragraph_number: "1",
  },
  {
    value: "LN",
    label: "Non pickup Limited Tariff Number",
    paragraph_number: "1",
  },
  {
    value: "LO",
    label: "Load Planning Number",
    paragraph_number: "1",
  },
  {
    value: "LP",
    label: "For Pickup Limited Freight Tariff Number",
    paragraph_number: "1",
  },
  {
    value: "LQ",
    label: "Latitude Expressed in Degrees, Minutes and Seconds",
    paragraph_number: "1",
  },
  {
    value: "LR",
    label: "Local Student Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A student identification number assigned by a local school or school district",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "LS",
    label: "Bar-Coded Serial Number",
    paragraph_number: "1",
  },
  {
    value: "LT",
    label: "Lot Number",
    paragraph_number: "1",
  },
  {
    value: "LU",
    label: "Location Number",
    paragraph_number: "1",
  },
  {
    value: "LV",
    label: "License Plate Number",
    paragraph_number: "1",
  },
  {
    value: "LW",
    label: "Location Within Equipment",
    paragraph_number: "1",
  },
  {
    value: "LX",
    label: "Qualified Products List",
    paragraph_number: "1",
  },
  {
    value: "LY",
    label: "Destination of Shipment Harmonized-Based Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Harmonized code of the commodity in the country which is the shipping \ndestination",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "LZ",
    label: "Lender Account Number",
    paragraph_number: "1",
  },
  {
    value: "M1",
    label: "Material Storage Location",
    paragraph_number: "1",
  },
  {
    value: "M2",
    label: "Major Force Program",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Defense Fuel Supply Center to bill back fuel purchases to the appropriate \nservice or agency account fund",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "M3",
    label: "Crop Year",
    paragraph_number: "1",
  },
  {
    value: "M5",
    label: "Lease Agreement Amendment Number - Master",
    paragraph_number: "1",
  },
  {
    value: "M6",
    label: "Military Ordnance Security Risk Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number that identifies the security risk of transporting arms and ammunition",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "M7",
    label: "Medical Assistance Category",
    paragraph_number: "1",
  },
  {
    value: "M8",
    label: "Limited Partnership Identification Number",
    paragraph_number: "1",
  },
  {
    value: "M9",
    label: "Tax Shelter Number",
    paragraph_number: "1",
  },
  {
    value: "MA",
    label: "Ship Notice/Manifest Number",
    paragraph_number: "1",
  },
  {
    value: "MB",
    label: "Master Bill of Lading",
    paragraph_number: "1",
  },
  {
    value: "MC",
    label: "Microfilm Number",
    paragraph_number: "1",
  },
  {
    value: "MD",
    label: "Magazine Code",
    paragraph_number: "1",
  },
  {
    value: "ME",
    label: "Message Address or ID",
    paragraph_number: "1",
  },
  {
    value: "MF",
    label: "Manufacturers Part Number",
    paragraph_number: "1",
  },
  {
    value: "MG",
    label: "Meter Number",
    paragraph_number: "1",
  },
  {
    value: "MH",
    label: "Manufacturing Order Number",
    paragraph_number: "1",
  },
  {
    value: "MI",
    label: "Mill Order Number",
    paragraph_number: "1",
  },
  {
    value: "MJ",
    label: "Model Number",
    paragraph_number: "1",
  },
  {
    value: "MK",
    label: "Manifest Key Number",
    paragraph_number: "1",
  },
  {
    value: "ML",
    label: "Military Rank/Civilian Pay Grade Number",
    paragraph_number: "1",
  },
  {
    value: "MM",
    label: "Master Lease Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "MN",
    label: "MICR Number",
    paragraph_number: "1",
  },
  {
    value: "MO",
    label: "Manufacturing Operation Number",
    paragraph_number: "1",
  },
  {
    value: "MP",
    label: "Multiple P.O.s of an Invoice",
    paragraph_number: "1",
  },
  {
    value: "MQ",
    label: "Meter Proving Report Number",
    paragraph_number: "1",
  },
  {
    value: "MR",
    label: "Merchandise Type Code",
    paragraph_number: "1",
  },
  {
    value: "MS",
    label: "Manufacturer's Material Safety Data Sheet Number",
    paragraph_number: "1",
  },
  {
    value: "MT",
    label: "Meter Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "MU",
    label: "Military Specification (MILSPEC) Number",
    paragraph_number: "1",
  },
  {
    value: "MV",
    label:
      "Migrant Number, This number is assigned by the national Migrant Records \nTransfer System",
    paragraph_number: "1",
  },
  {
    value: "MW",
    label: "Military Call Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Assigned by the military to identify a billing period",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "MX",
    label: "Material Change Notice Number",
    paragraph_number: "1",
  },
  {
    value: "MY",
    label: "Model year number",
    paragraph_number: "1",
  },
  {
    value: "MZ",
    label: "Maintenance Request Number",
    paragraph_number: "1",
  },
  {
    value: "N0",
    label: "Nomination Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Shipper-assigned bulk product number identifying a request for pipeline \ntransportation services which is used to relate an into-plane delivery to the \nbulk fuel movement from which it was derived",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "N1",
    label: "Local School Course Number",
    paragraph_number: "1",
  },
  {
    value: "N2",
    label: "Local School District Course Number",
    paragraph_number: "1",
  },
  {
    value: "N3",
    label: "Statewide Course Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A course number assigned by the state education agency to courses taught in \npublic schools",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "N4",
    label:
      "United States Department of Education, National Center for Education Statistics \n(NCES) Course Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A proposed course number to be assigned by NCES to identify a common grouping \nof subject area content and sequence",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "N5",
    label: "Provider Plan Network Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number assigned to identify a specific provider in a health care plan network",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "N6",
    label: "Plan Network Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number assigned to identify a specific health care network that provides \nhealth care services to insured members",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "N7",
    label: "Facility Network Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number assigned to identify a specific facility in a health care plan network",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "N8",
    label: "Secondary Health Insurance Identification Number",
    paragraph_number: "1",
  },
  {
    value: "N9",
    label: "Data Authentication Number",
    paragraph_number: "1",
  },
  {
    value: "NA",
    label: "North American Hazardous Classification Number",
    paragraph_number: "1",
  },
  {
    value: "NB",
    label: "Letter of Credit Number",
    paragraph_number: "1",
  },
  {
    value: "NC",
    label: "Secondary Coverage Company Number",
    paragraph_number: "1",
  },
  {
    value: "ND",
    label: "Letter of Credit Draft Number",
    paragraph_number: "1",
  },
  {
    value: "NE",
    label: "Lease Rider Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a code that identifies the authorizing documentation for a household \ngoods shipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "NF",
    label: "National Association of Insurance Commissioners (NAIC) Code",
    paragraph_number: "1",
    notes: [
      {
        content: "A unique number assigned to each insurance company",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "NG",
    label: "Natural Gas Policy Act Category Code",
    paragraph_number: "1",
  },
  {
    value: "NH",
    label: "Rate Card Number",
    paragraph_number: "1",
  },
  {
    value: "NI",
    label: "Military Standard (MIL-STD) Number",
    paragraph_number: "1",
  },
  {
    value: "NJ",
    label: "Technical Document Number",
    paragraph_number: "1",
  },
  {
    value: "NK",
    label: "Prior Case",
    paragraph_number: "1",
  },
  {
    value: "NL",
    label: "Technical Order Number",
    paragraph_number: "1",
  },
  {
    value: "NM",
    label: "Discounter Registration Number",
    paragraph_number: "1",
  },
  {
    value: "NN",
    label: "Nonconformance Report Number",
    paragraph_number: "1",
  },
  {
    value: "NO",
    label: "No OT5 Authority-zero Mileage Rate",
    paragraph_number: "1",
  },
  {
    value: "NP",
    label: "Partial Payment Number",
    paragraph_number: "1",
  },
  {
    value: "NQ",
    label: "Medicaid Recipient Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Unique identification number assigned to each member covered under a \nsubscriber's contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "NR",
    label: "Progress Payment Number",
    paragraph_number: "1",
  },
  {
    value: "NS",
    label: "National Stock Number",
    paragraph_number: "1",
  },
  {
    value: "NT",
    label: "Administrator's Reference Number",
    paragraph_number: "1",
  },
  {
    value: "NU",
    label: "Pending Case",
    paragraph_number: "1",
  },
  {
    value: "NW",
    label: "Associated Policy Number",
    paragraph_number: "1",
  },
  {
    value: "NX",
    label: "Related Nonconformance Number",
    paragraph_number: "1",
  },
  {
    value: "NY",
    label: "Agent Claim Number",
    paragraph_number: "1",
  },
  {
    value: "NZ",
    label: "Critical Application",
    paragraph_number: "1",
  },
  {
    value: "O1",
    label: "Outer Continental Shelf Area Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The designated code assigned to Outer Continental Shelf (OCS) geographical \nunits for identification purposes",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "O2",
    label: "Outer Continental Shelf Block Number",
    paragraph_number: "1",
    notes: [
      {
        content: "The number corresponding to a U.S. offshore block",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "O5",
    label: "OT5 Authority-Condition or Restriction on Car Hire Rate",
    paragraph_number: "1",
  },
  {
    value: "O7",
    label: "On-line Procurement and Accounting Control (OPAC) Transaction",
    paragraph_number: "1",
  },
  {
    value: "O8",
    label: "Original Filing",
    paragraph_number: "1",
  },
  {
    value: "O9",
    label: "Continuation Filing",
    paragraph_number: "1",
  },
  {
    value: "OA",
    label: "Outlet Number",
    paragraph_number: "1",
  },
  {
    value: "OB",
    label: "Ocean Bill of Lading",
    paragraph_number: "1",
  },
  {
    value: "OC",
    label: "Ocean Container Number",
    paragraph_number: "1",
  },
  {
    value: "OD",
    label: "Original Return Request Reference Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A sequential number assigned by the originator of the original return request",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "OE",
    label: "Open and Prepaid Station List Number",
    paragraph_number: "1",
  },
  {
    value: "OF",
    label: "Operator Identification Number",
    paragraph_number: "1",
  },
  {
    value: "OG",
    label: "Termination Filing",
    paragraph_number: "1",
  },
  {
    value: "OH",
    label: "Origin House",
    paragraph_number: "1",
    notes: [
      {
        content: "Origin House for Canadian Wheat Board",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "OI",
    label: "Original Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "OJ",
    label: "Amendment Filing",
    paragraph_number: "1",
  },
  {
    value: "OK",
    label: "Offer Group",
    paragraph_number: "1",
  },
  {
    value: "OL",
    label: "Original Shipper's Bill of Lading Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number on the Original Bill of Lading assigned by the shipper",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "OM",
    label: "Ocean Manifest",
    paragraph_number: "1",
  },
  {
    value: "ON",
    label: "Dealer Order Number",
    paragraph_number: "1",
  },
  {
    value: "OP",
    label: "Original Purchase Order",
    paragraph_number: "1",
  },
  {
    value: "OQ",
    label: "Order Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Qualifies a code that identifies the authorizing documentation for a household \ngoods",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "OR",
    label: "Order/Paragraph Number",
    paragraph_number: "1",
  },
  {
    value: "OS",
    label: "Outbound-from Party",
    paragraph_number: "1",
  },
  {
    value: "OT",
    label: "Sales Allowance Number",
    paragraph_number: "1",
  },
  {
    value: "OU",
    label: "Tariff Supplement Number",
    paragraph_number: "1",
  },
  {
    value: "OV",
    label: "Tariff Suffix Number",
    paragraph_number: "1",
  },
  {
    value: "OW",
    label: "Service Order Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned when a customer orders service and equipment and which appears \non bill",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "OX",
    label: "Statement Number",
    paragraph_number: "1",
  },
  {
    value: "OZ",
    label: "Product Number",
    paragraph_number: "1",
  },
  {
    value: "P1",
    label: "Previous Contract Number",
    paragraph_number: "1",
  },
  {
    value: "P2",
    label: "Previous Drug Enforcement Administration Number",
    paragraph_number: "1",
  },
  {
    value: "P3",
    label: "Previous customer reference number",
    paragraph_number: "1",
  },
  {
    value: "P4",
    label: "Project Code",
    paragraph_number: "1",
  },
  {
    value: "P5",
    label: "Position Code",
    paragraph_number: "1",
  },
  {
    value: "P6",
    label: "Pipeline Number",
    paragraph_number: "1",
  },
  {
    value: "P7",
    label: "Product Line Number",
    paragraph_number: "1",
  },
  {
    value: "P8",
    label: "Pickup Reference Number",
    paragraph_number: "1",
  },
  {
    value: "P9",
    label: "Page Number",
    paragraph_number: "1",
  },
  {
    value: "PA",
    label: "Price Area Number",
    paragraph_number: "1",
  },
  {
    value: "PB",
    label:
      "Payer's Financial Institution Account Number for Check, Draft, or Wire \nPayments; Originating Company Account Number for ACH Transfers",
    paragraph_number: "1",
  },
  {
    value: "PC",
    label: "Production Code",
    paragraph_number: "1",
  },
  {
    value: "PD",
    label: "Promotion/Deal Number",
    paragraph_number: "1",
  },
  {
    value: "PE",
    label: "Plant Number",
    paragraph_number: "1",
  },
  {
    value: "PF",
    label: "Prime Contractor Contract Number",
    paragraph_number: "1",
  },
  {
    value: "PG",
    label: "Product Group",
    paragraph_number: "1",
  },
  {
    value: "PH",
    label: "Priority Rating",
    paragraph_number: "1",
  },
  {
    value: "PI",
    label: "Price List Change or Issue Number",
    paragraph_number: "1",
  },
  {
    value: "PJ",
    label: "Packer Number",
    paragraph_number: "1",
  },
  {
    value: "PK",
    label: "Packing List Number",
    paragraph_number: "1",
  },
  {
    value: "PL",
    label: "Price List Number",
    paragraph_number: "1",
  },
  {
    value: "PM",
    label: "Part Number",
    paragraph_number: "1",
  },
  {
    value: "PN",
    label: "Permit Number",
    paragraph_number: "1",
  },
  {
    value: "PO",
    label: "Purchase Order Number",
    paragraph_number: "1",
  },
  {
    value: "PP",
    label: "Purchase Order Revision Number",
    paragraph_number: "1",
  },
  {
    value: "PQ",
    label: "Payee Identification",
    paragraph_number: "1",
  },
  {
    value: "PR",
    label: "Price Quote Number",
    paragraph_number: "1",
  },
  {
    value: "PS",
    label: "Purchase Order Number Suffix",
    paragraph_number: "1",
  },
  {
    value: "PT",
    label: "Purchase Option Agreement",
    paragraph_number: "1",
  },
  {
    value: "PU",
    label: "Previous Bill of Lading Number",
    paragraph_number: "1",
  },
  {
    value: "PV",
    label: "Product change information number",
    paragraph_number: "1",
  },
  {
    value: "PW",
    label: "Prior purchase order number",
    paragraph_number: "1",
  },
  {
    value: "PX",
    label: "Previous Invoice Number",
    paragraph_number: "1",
  },
  {
    value: "PY",
    label:
      "Payee's Financial Institution Account Number for Check, Draft or Wire Payments; \nReceiving Company Account Number for ACH Transfer",
    paragraph_number: "1",
  },
  {
    value: "PZ",
    label: "Product Change Notice Number",
    paragraph_number: "1",
  },
  {
    value: "Q1",
    label: "Quote Number",
    paragraph_number: "1",
  },
  {
    value: "Q2",
    label: "Starting Package Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The beginning package number in a shipment or container of numbered packages",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Q3",
    label: "Ending Package Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The ending package number in a shipment or container of numbered packages",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Q4",
    label: "Prior Identifier Number",
    paragraph_number: "1",
  },
  {
    value: "Q5",
    label: "Property Control Number",
    paragraph_number: "1",
  },
  {
    value: "Q6",
    label: "Recall Number",
    paragraph_number: "1",
  },
  {
    value: "Q7",
    label: "Receiver Claim Number",
    paragraph_number: "1",
  },
  {
    value: "Q8",
    label: "Registration Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Code describing which type of registration is being submitted",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Q9",
    label: "Repair Order Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Repairing outlet's unique order number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QA",
    label: "Press Identifier",
    paragraph_number: "1",
  },
  {
    value: "QB",
    label: "Press Form Identifier",
    paragraph_number: "1",
  },
  {
    value: "QC",
    label: "Product Specification Document Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Model designation of replacement component",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QD",
    label: "Replacement Drug Enforcement Administration Number",
    paragraph_number: "1",
  },
  {
    value: "QE",
    label: "Replacement Customer Reference Number",
    paragraph_number: "1",
  },
  {
    value: "QF",
    label: "Quality Disposition Area Identifier",
    paragraph_number: "1",
  },
  {
    value: "QG",
    label: "Replacement Assembly Model Number",
    paragraph_number: "1",
  },
  {
    value: "QH",
    label: "Replacement Assembly Serial Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Serial number of replacement component",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QI",
    label: "Quality Inspection Area Identifier",
    paragraph_number: "1",
  },
  {
    value: "QJ",
    label: "Return Material Authorization Number",
    paragraph_number: "1",
  },
  {
    value: "QK",
    label: "Sales Program Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies specific sales program/promotion",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QL",
    label: "Service Authorization Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies pre-authorized submittal or payment of a claim",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QM",
    label: "Quality Review Material Crib Identifier",
    paragraph_number: "1",
  },
  {
    value: "QN",
    label: "Stop Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "QO",
    label: "Service Estimate Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Code that identifies special handling requirements",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QP",
    label: "Substitute Part Number",
    paragraph_number: "1",
  },
  {
    value: "QQ",
    label: "Unit Number",
    paragraph_number: "1",
  },
  {
    value: "QR",
    label: "Quality Report Number",
    paragraph_number: "1",
  },
  {
    value: "QS",
    label: "Warranty Coverage Code",
    paragraph_number: "1",
    notes: [
      {
        content: "Number of code identifying length and terms of the coverage",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QT",
    label: "Warranty Registration Number",
    paragraph_number: "1",
  },
  {
    value: "QU",
    label: "Change Verification Procedure Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Description of procedures required to verify that the change made to the \nproduct accomplishes the desired effect",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QV",
    label: "Major System Affected Code",
    paragraph_number: "1",
  },
  {
    value: "QW",
    label: "New Part Number",
    paragraph_number: "1",
  },
  {
    value: "QX",
    label: "Old Part Number",
    paragraph_number: "1",
  },
  {
    value: "QY",
    label: "Service Performed Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number indicating the type of service performed to repair a product",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QZ",
    label: "Reference Drawing Number",
    paragraph_number: "1",
  },
  {
    value: "R0",
    label:
      "Regiristo Federal de Contribuyentes (Mexican Federal Tax ID Number)",
    paragraph_number: "1",
  },
  {
    value: "R1",
    label: "Current Revision Number",
    paragraph_number: "1",
  },
  {
    value: "R2",
    label: "Canceled Revision Number",
    paragraph_number: "1",
  },
  {
    value: "R3",
    label: "Correction Number",
    paragraph_number: "1",
  },
  {
    value: "R4",
    label: "Tariff Section Number",
    paragraph_number: "1",
  },
  {
    value: "R5",
    label: "Tariff Page Number",
    paragraph_number: "1",
  },
  {
    value: "R6",
    label: "Tariff Rule Number",
    paragraph_number: "1",
  },
  {
    value: "R7",
    label: "Accounts Receivable Open Item",
    paragraph_number: "1",
  },
  {
    value: "R8",
    label: "Rental Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "R9",
    label: "Rejection Number",
    paragraph_number: "1",
  },
  {
    value: "RA",
    label: "Repetitive Cargo Shipment Number",
    paragraph_number: "1",
  },
  {
    value: "RB",
    label: "Rate code number",
    paragraph_number: "1",
  },
  {
    value: "RC",
    label: "Rail Routing Code",
    paragraph_number: "1",
  },
  {
    value: "RD",
    label: "Reel Number",
    paragraph_number: "1",
  },
  {
    value: "RE",
    label: "Release Number",
    paragraph_number: "1",
  },
  {
    value: "RF",
    label: "Export Reference Number",
    paragraph_number: "1",
  },
  {
    value: "RG",
    label: "Route Order Number-Domestic",
    paragraph_number: "1",
  },
  {
    value: "RH",
    label: "Route Order Number-Export",
    paragraph_number: "1",
  },
  {
    value: "RI",
    label: "Release invoice number for prior bill and hold",
    paragraph_number: "1",
  },
  {
    value: "RJ",
    label: "Route Order Number-Emergency",
    paragraph_number: "1",
  },
  {
    value: "RK",
    label: "Rack Type Number",
    paragraph_number: "1",
  },
  {
    value: "RL",
    label: "Reserve Assembly Line Feed Location",
    paragraph_number: "1",
  },
  {
    value: "RM",
    label: "Raw material supplier Dun & Bradstreet number",
    paragraph_number: "1",
  },
  {
    value: "RN",
    label: "Run Number",
    paragraph_number: "1",
  },
  {
    value: "RO",
    label: "Repetitive Booking Number",
    paragraph_number: "1",
  },
  {
    value: "RP",
    label: "Repetitive Pattern Code",
    paragraph_number: "1",
  },
  {
    value: "RQ",
    label: "Purchase Requisition Number",
    paragraph_number: "1",
  },
  {
    value: "RR",
    label:
      "Payer's Financial Institution Transit Routing Number for Check, Draft or Wire \nPayments. Originating Depository Financial Institution Routing Number for ACH \nTransfers",
    paragraph_number: "1",
  },
  {
    value: "RS",
    label: "Returnable Container Serial Number",
    paragraph_number: "1",
  },
  {
    value: "RT",
    label:
      "Payee's Financial Institution Transit Routing Number for Check, Draft or Wire \nPayments. Receiving Depository Financial Institution Transit Routing Number for \nACH Transfers",
    paragraph_number: "1",
  },
  {
    value: "RU",
    label: "Route Number",
    paragraph_number: "1",
  },
  {
    value: "RV",
    label: "Receiving Number",
    paragraph_number: "1",
  },
  {
    value: "RW",
    label:
      "Repetitive Waybill Code (Origin Carrier, Standard Point Location Code, \nRepetitive Waybill Code Number)",
    paragraph_number: "1",
  },
  {
    value: "RX",
    label: "Resubmit number",
    paragraph_number: "1",
  },
  {
    value: "RY",
    label: "Rebate Number",
    paragraph_number: "1",
  },
  {
    value: "RZ",
    label: "Returned Goods Authorization Number",
    paragraph_number: "1",
  },
  {
    value: "S0",
    label: "Special Approval",
    paragraph_number: "1",
  },
  {
    value: "S1",
    label: "Engineering Specification Number",
    paragraph_number: "1",
  },
  {
    value: "S2",
    label: "Data Source",
    paragraph_number: "1",
  },
  {
    value: "S3",
    label: "Specification Number",
    paragraph_number: "1",
  },
  {
    value: "S4",
    label: "Shippers Bond Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number differentiating between shipper's bond movements by intermodal shippers \nand ocean carriers and in-bond movements which default to the carrier's bond",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "S5",
    label: "Routing Instruction Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Directions for Claim Routing",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "S6",
    label: "Stock Number",
    paragraph_number: "1",
  },
  {
    value: "S7",
    label: "Stack Train Identification",
    paragraph_number: "1",
  },
  {
    value: "S8",
    label: "Seal Off Number",
    paragraph_number: "1",
  },
  {
    value: "S9",
    label: "Seal On Number",
    paragraph_number: "1",
  },
  {
    value: "SA",
    label: "Salesperson",
    paragraph_number: "1",
  },
  {
    value: "SB",
    label: "Sales Region Number",
    paragraph_number: "1",
  },
  {
    value: "SC",
    label: "Shipper Car Order Number",
    paragraph_number: "1",
  },
  {
    value: "SD",
    label: "Subday Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A sequential number denoting the order of meter readings taken during a single \nday, assigned by the party responsible for the measurement of gas at the meter",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SE",
    label: "Serial Number",
    paragraph_number: "1",
  },
  {
    value: "SF",
    label: "Ship From",
    paragraph_number: "1",
  },
  {
    value: "SG",
    label: "Savings",
    paragraph_number: "1",
  },
  {
    value: "SH",
    label: "Sender Defined Clause",
    paragraph_number: "1",
  },
  {
    value: "SI",
    label: "Shipper's Identifying Number for Shipment (SID)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number (to the shipper) assigned by the shipper to identify the \nshipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SJ",
    label: "Set Number",
    paragraph_number: "1",
  },
  {
    value: "SK",
    label: "Service Change Number",
    paragraph_number: "1",
  },
  {
    value: "SL",
    label: "Sales/Territory Code",
    paragraph_number: "1",
  },
  {
    value: "SM",
    label: "Sales Office Number",
    paragraph_number: "1",
  },
  {
    value: "SN",
    label: "Seal Number",
    paragraph_number: "1",
  },
  {
    value: "SO",
    label: "Shipper's Order (Invoice Number)",
    paragraph_number: "1",
  },
  {
    value: "SP",
    label: "Scan Line",
    paragraph_number: "1",
  },
  {
    value: "SQ",
    label: "Container Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "SR",
    label: "Sales Responsibility",
    paragraph_number: "1",
  },
  {
    value: "SS",
    label: "Split Shipment Number",
    paragraph_number: "1",
  },
  {
    value: "ST",
    label: "Store Number",
    paragraph_number: "1",
  },
  {
    value: "SU",
    label: "Special Processing Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Unique code identifying the special handling requirements for the claim",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SV",
    label: "Service Charge Number",
    paragraph_number: "1",
  },
  {
    value: "SW",
    label: "Seller's Sale Number",
    paragraph_number: "1",
  },
  {
    value: "SX",
    label: "Service Interrupt Tracking Number",
    paragraph_number: "1",
  },
  {
    value: "SY",
    label: "Social Security Number",
    paragraph_number: "1",
  },
  {
    value: "SZ",
    label: "Specification Revision",
    paragraph_number: "1",
  },
  {
    value: "T0",
    label: "Dealer Type Identification",
    paragraph_number: "1",
  },
  {
    value: "T1",
    label: "Tax Exchange Code",
    paragraph_number: "1",
  },
  {
    value: "T2",
    label: "Tax Form Code",
    paragraph_number: "1",
  },
  {
    value: "T3",
    label: "Tax Schedule Code",
    paragraph_number: "1",
  },
  {
    value: "T4",
    label: "Signal Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Defense Fuel Supply Center to bill back fuel purchases to the appropriate \nservice or agency account fund",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "T5",
    label: "Trailer Use Agreements",
    paragraph_number: "1",
  },
  {
    value: "T6",
    label: "Tax Filing",
    paragraph_number: "1",
  },
  {
    value: "T7",
    label: "Affected Subsystem Code",
    paragraph_number: "1",
  },
  {
    value: "T8",
    label: "Description of Change Code",
    paragraph_number: "1",
  },
  {
    value: "T9",
    label: "Documentation Affected Number",
    paragraph_number: "1",
  },
  {
    value: "TA",
    label: "Telecommunication Circuit Supplemental ID",
    paragraph_number: "1",
  },
  {
    value: "TB",
    label: "Trucker's Bill of Lading",
    paragraph_number: "1",
  },
  {
    value: "TC",
    label: "Vendor Terms",
    paragraph_number: "1",
  },
  {
    value: "TD",
    label: "Reason for Change",
    paragraph_number: "1",
  },
  {
    value: "TE",
    label: "Federal Maritime Commission (FMC) Tariff Number",
    paragraph_number: "1",
  },
  {
    value: "TF",
    label: "Transfer Number",
    paragraph_number: "1",
  },
  {
    value: "TG",
    label: "Transportation Control Number (TCN)",
    paragraph_number: "1",
  },
  {
    value: "TH",
    label: "Transportation Account Code (TAC)",
    paragraph_number: "1",
  },
  {
    value: "TI",
    label: "TIR Number",
    paragraph_number: "1",
  },
  {
    value: "TJ",
    label: "Federal Taxpayer's Identification Number",
    paragraph_number: "1",
  },
  {
    value: "TK",
    label: "Tank Number",
    paragraph_number: "1",
  },
  {
    value: "TL",
    label: "Tax License Exemption",
    paragraph_number: "1",
  },
  {
    value: "TM",
    label: "Travel Manifest (ACI or OTR)",
    paragraph_number: "1",
  },
  {
    value: "TN",
    label: "Transaction Reference Number",
    paragraph_number: "1",
  },
  {
    value: "TO",
    label: "Terminal Operator Number",
    paragraph_number: "1",
  },
  {
    value: "TP",
    label: "Test Specification Number",
    paragraph_number: "1",
  },
  {
    value: "TQ",
    label: "Tracer Action Request Number",
    paragraph_number: "1",
  },
  {
    value: "TR",
    label: "Government Transportation Request",
    paragraph_number: "1",
  },
  {
    value: "TS",
    label: "Tariff Number",
    paragraph_number: "1",
  },
  {
    value: "TT",
    label: "Terminal Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A code assigned by a transportation carrier that identifies a freight terminal",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "TU",
    label: "Trial Location Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "To identify one of a group of possible sites within a system or set of systems \nwhere an engineering change is to be modeled and tested before proceeding to \ninstall the change on all possible sites; the change may have been specified by \na service bulletin",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "TV",
    label: "Line of Business",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Indicates the nature of policy coverage; examples of line of business include \nfire, homeowners, flood and earthquake",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "TW",
    label: "Tax Worksheet",
    paragraph_number: "1",
  },
  {
    value: "TX",
    label: "Tax Exempt Number",
    paragraph_number: "1",
  },
  {
    value: "TY",
    label: "Policy Type",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The type of policy being billed; examples of policy type include Package Policy \nand Forced Placed",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "TZ",
    label: "Total Cycle Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A complete set of events occurring in the same sequence",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "U0",
    label: "Consolidator's Receipt Number",
    paragraph_number: "1",
  },
  {
    value: "U1",
    label: "Regional Account Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number provided by the customer that is used to identify the customer across \nstates or regional areas",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "U2",
    label: "Term",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Indicates the college or university period for which permission is requested",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "U3",
    label: "Unique Supplier Identification Number (USIN)",
    paragraph_number: "1",
  },
  {
    value: "U4",
    label: "Unpaid Installment Reference Number",
    paragraph_number: "1",
  },
  {
    value: "U5",
    label: "Successor Account",
    paragraph_number: "1",
  },
  {
    value: "U6",
    label: "Predecessor Account",
    paragraph_number: "1",
  },
  {
    value: "U8",
    label: "Mortgage Backed Security (MBS) Loan Number",
    paragraph_number: "1",
  },
  {
    value: "U9",
    label: "Mortgage Backed Security (MBS) Pool Number",
    paragraph_number: "1",
  },
  {
    value: "UA",
    label: "Mortgage Number",
    paragraph_number: "1",
    notes: [
      {
        content: "The number that identifies the type of mortgage loan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UB",
    label: "Unacceptable Source Purchaser ID",
    paragraph_number: "1",
  },
  {
    value: "UC",
    label: "Mortgage Insurance Indicator Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Specifies the type of insurance coverage for the mortgage loan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UD",
    label: "Unacceptable Source DUNS Number",
    paragraph_number: "1",
  },
  {
    value: "UE",
    label: "Secondary Coverage Certificate Number",
    paragraph_number: "1",
  },
  {
    value: "UF",
    label: "Mortgage Insurance Company Number",
    paragraph_number: "1",
  },
  {
    value: "UG",
    label: "U.S. Government Transportation Control Number",
    paragraph_number: "1",
  },
  {
    value: "UH",
    label: "Removal Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the reason a mortgage is removed from default status reporting",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UI",
    label: "Previous Course Number",
    paragraph_number: "1",
  },
  {
    value: "UJ",
    label: "Current or Latest Course Number",
    paragraph_number: "1",
  },
  {
    value: "UK",
    label: "Equivalent Course Number at Requesting Institution",
    paragraph_number: "1",
  },
  {
    value: "UL",
    label: "Cross-listed Course Number",
    paragraph_number: "1",
  },
  {
    value: "UM",
    label: "Quarter Quarter Section Number",
    paragraph_number: "1",
    notes: [
      {
        content: "An identifier of 1/16 portion of a section",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UN",
    label: "United Nations Hazardous Classification Number",
    paragraph_number: "1",
  },
  {
    value: "UO",
    label: "Quarter Quarter Spot Number",
    paragraph_number: "1",
    notes: [
      {
        content: "An identifier of 1/64 portion of a section",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UP",
    label: "Upstream Shipper Contract Number",
    paragraph_number: "1",
  },
  {
    value: "UQ",
    label: "Section Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The number corresponding to a section within a township and range",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UR",
    label: "Unit Relief Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A supplemental contract number applying to per diem relief on equipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "US",
    label: "Unacceptable Source Supplier ID",
    paragraph_number: "1",
  },
  {
    value: "UT",
    label: "Unit Train",
    paragraph_number: "1",
  },
  {
    value: "UU",
    label: "Township Number",
    paragraph_number: "1",
  },
  {
    value: "UV",
    label: "Range Number",
    paragraph_number: "1",
    notes: [
      {
        content: "An identifier corresponding to a range within a township",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UW",
    label: "State Senate District",
    paragraph_number: "1",
  },
  {
    value: "UX",
    label: "State Assembly District",
    paragraph_number: "1",
  },
  {
    value: "UY",
    label: "Federal National Mortgage Association (Fannie Mae) Loan Number",
    paragraph_number: "1",
  },
  {
    value: "UZ",
    label: "State Legislative District",
    paragraph_number: "1",
  },
  {
    value: "V0",
    label: "Version",
    paragraph_number: "1",
  },
  {
    value: "V1",
    label: "Volume Purchase Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "V2",
    label: "Visa Type",
    paragraph_number: "1",
  },
  {
    value: "V3",
    label: "Voyage Number",
    paragraph_number: "1",
  },
  {
    value: "V4",
    label: "State Department I-20 Form Number",
    paragraph_number: "1",
  },
  {
    value: "V5",
    label: "State Department IAP-66 Form Number",
    paragraph_number: "1",
  },
  {
    value: "V6",
    label: "North American Free Trade Agreement (NAFTA) Compliance Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The North American Free Trade Agreement (NAFTA) compliance number is assigned \nby the U.S. Government and identifies the producer of goods",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "V7",
    label: "Judicial District",
    paragraph_number: "1",
  },
  {
    value: "V8",
    label: "Institution Number",
    paragraph_number: "1",
  },
  {
    value: "V9",
    label: "Subservicer",
    paragraph_number: "1",
  },
  {
    value: "VA",
    label: "Vessel Agent Number",
    paragraph_number: "1",
  },
  {
    value: "VB",
    label: "Department of Veterans Affairs Acquisition Regulations (VAAR)",
    paragraph_number: "1",
  },
  {
    value: "VC",
    label: "Vendor Contract Number",
    paragraph_number: "1",
  },
  {
    value: "VD",
    label: "Volume Number",
    paragraph_number: "1",
  },
  {
    value: "VE",
    label: "Vendor Abbreviation Code",
    paragraph_number: "1",
  },
  {
    value: "VF",
    label: "Vendor Change Identification Code",
    paragraph_number: "1",
    notes: [
      {
        content: "Vendor's product change notice number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "VG",
    label: "Vendor Change Procedure Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Vendor's name and document number for the affected change procedure",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "VH",
    label: "County Legislative District",
    paragraph_number: "1",
  },
  {
    value: "VI",
    label: "Pool Number",
    paragraph_number: "1",
  },
  {
    value: "VJ",
    label: "Investor Note Holder Identification",
    paragraph_number: "1",
  },
  {
    value: "VK",
    label: "Institution Note Holder Identification",
    paragraph_number: "1",
  },
  {
    value: "VL",
    label: "Third Party Note Holder Identification",
    paragraph_number: "1",
  },
  {
    value: "VM",
    label: "Ward",
    paragraph_number: "1",
  },
  {
    value: "VN",
    label: "Vendor Order Number",
    paragraph_number: "1",
  },
  {
    value: "VO",
    label: "Institution Loan Number",
    paragraph_number: "1",
  },
  {
    value: "VP",
    label: "Vendor Product Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number assigned by a vendor or manufacturer to identify its products",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "VQ",
    label: "Related Contract Line Item Number",
    paragraph_number: "1",
  },
  {
    value: "VR",
    label: "Vendor ID Number",
    paragraph_number: "1",
  },
  {
    value: "VS",
    label: "Vendor Order Number Suffix",
    paragraph_number: "1",
  },
  {
    value: "VT",
    label: "Motor Vehicle ID Number",
    paragraph_number: "1",
  },
  {
    value: "VU",
    label: "Preparer's Verification Number",
    paragraph_number: "1",
  },
  {
    value: "VV",
    label: "Voucher",
    paragraph_number: "1",
  },
  {
    value: "VW",
    label: "Standard",
    paragraph_number: "1",
  },
  {
    value: "VX",
    label: "Value-Added Tax Registration Number (Europe)",
    paragraph_number: "1",
  },
  {
    value: "VY",
    label: "Link Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "VZ",
    label: "Sponsor's Reference Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique number that references a reported test to a particular sponsor",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W1",
    label: "Disposal Turn-In Document Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies material submitted for reutilization and marketing",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W2",
    label: "Weapon System Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies a weapon system",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W3",
    label: "Manufacturing Directive Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the Management Control Activity and contract associated with \ngovernment furnished material transactions",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W4",
    label: "Procurement Request Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies a transaction resulting in a contract established to provide \nmaterial",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W5",
    label: "Inspector Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Identifies the manufacturer's material inspector",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W6",
    label: "Federal Supply Schedule Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies an item with a two-digit group number, two-digit part number, and \none-character section letter",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W7",
    label: "Commercial and Government Entity (CAGE) Code",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Code that identifies a commercial contractor authorized to do business with the \nU.S. Government",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W8",
    label: "Suffix",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Differentiates between partial actions taken on the original transaction",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "W9",
    label: "Special Packaging Instruction Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned to distinguish between special packaging instruction \nspecifications",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "WA",
    label: "Labor or Affiliation Identification",
    paragraph_number: "1",
  },
  {
    value: "WB",
    label: "American Petroleum Institute (API) Well",
    paragraph_number: "1",
  },
  {
    value: "WC",
    label: "Contract Option Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The number of contract option years remaining on the current contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "WD",
    label: "Review Period Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An indicator representing the period of time before which an action will occur",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "WE",
    label: "Well Classification Code",
    paragraph_number: "1",
  },
  {
    value: "WF",
    label: "Locally Assigned Control Number",
    paragraph_number: "1",
  },
  {
    value: "WG",
    label: "Vendor's Previous Job Number",
    paragraph_number: "1",
  },
  {
    value: "WH",
    label: "Master Reference (Link) Number",
    paragraph_number: "1",
  },
  {
    value: "WI",
    label: "Waiver",
    paragraph_number: "1",
  },
  {
    value: "WJ",
    label: "Pre-Award Survey",
    paragraph_number: "1",
  },
  {
    value: "WK",
    label: "Type of Science Code",
    paragraph_number: "1",
  },
  {
    value: "WL",
    label: "Federal Supply Classification Code",
    paragraph_number: "1",
  },
  {
    value: "WM",
    label: "Weight Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "WN",
    label: "Well Number",
    paragraph_number: "1",
  },
  {
    value: "WO",
    label: "Work Order Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned for work including material and labor beyond normal work \nrequired to fulfill a service order",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "WP",
    label: "Warehouse Pick Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "WQ",
    label: "Interim Funding Organization Loan Number",
    paragraph_number: "1",
  },
  {
    value: "WR",
    label: "Warehouse Receipt Number",
    paragraph_number: "1",
  },
  {
    value: "WS",
    label: "Warehouse storage location number",
    paragraph_number: "1",
  },
  {
    value: "WT",
    label: "Broker's Reference Number",
    paragraph_number: "1",
  },
  {
    value: "WU",
    label: "Vessel",
    paragraph_number: "1",
  },
  {
    value: "WV",
    label: "Dealer Identification",
    paragraph_number: "1",
  },
  {
    value: "WW",
    label: "Depository Trust Company Identification",
    paragraph_number: "1",
  },
  {
    value: "WX",
    label: "Distributor's Account Identification",
    paragraph_number: "1",
  },
  {
    value: "WY",
    label: "Waybill Number",
    paragraph_number: "1",
  },
  {
    value: "WZ",
    label: "Distributor's Representative Identification",
    paragraph_number: "1",
  },
  {
    value: "X0",
    label: "Debtor's Account",
    paragraph_number: "1",
  },
  {
    value: "X1",
    label: "Provider Claim Number",
    paragraph_number: "1",
  },
  {
    value: "X2",
    label: "Specification Class Number",
    paragraph_number: "1",
  },
  {
    value: "X3",
    label: "Defect Code Number",
    paragraph_number: "1",
  },
  {
    value: "X4",
    label: "Clinical Laboratory Improvement Amendment Number",
    paragraph_number: "1",
  },
  {
    value: "X5",
    label: "State Industrial Accident Provider Number",
    paragraph_number: "1",
  },
  {
    value: "X6",
    label: "Original Voucher Number",
    paragraph_number: "1",
  },
  {
    value: "X7",
    label: "Batch Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "X8",
    label: "Secondary Suffix Code Indicator",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Secondary indicator to differentiate between partial actions taken on the \noriginal transaction, e.g., identify a parent-child relationship",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "X9",
    label: "Internal Control Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by the managing office to provide internal processing \ninformation",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XA",
    label: "Substitute National Stock Number",
    paragraph_number: "1",
    notes: [
      {
        content: "A national stock number that can take the place of another",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XB",
    label: "Substitute Manufacturer's Part Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A manufacturer's part number that can take the place of another",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XC",
    label: "Cargo Control Number",
    paragraph_number: "1",
  },
  {
    value: "XD",
    label: "Subsistence Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Item identifier is a brand-name resale subsistence item",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XE",
    label: "Transportation Priority Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number indicating the level of government priority associated with the \ntransportation of a shipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XF",
    label: "Government Bill of Lading Office Code",
    paragraph_number: "1",
  },
  {
    value: "XG",
    label: "Airline Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "XH",
    label: "Contract Auditor ID Number",
    paragraph_number: "1",
  },
  {
    value: "XI",
    label: "Federal Home Loan Mortgage Corporation Loan Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Assigned by the Federal Home Loan Mortgage Corporation (FHLMC) to each FHLMC \nloan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XJ",
    label:
      "Federal Home Loan Mortgage Corporation Default/Foreclosure Specialist Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Assigned by the Federal Home Loan Mortgage Corporation (FHLMC) to a FHLMC agent \nprocessing the default and foreclosure reports",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XK",
    label: "Mortgagee Loan Number",
    paragraph_number: "1",
  },
  {
    value: "XL",
    label: "Insured's Loan Number",
    paragraph_number: "1",
  },
  {
    value: "XM",
    label: "Issuer Number",
    paragraph_number: "1",
  },
  {
    value: "XN",
    label: "Title XIX Identifier Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Identifies the state in which the individual is eligible for Medicaid.",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "XO",
    label: "Sample Number",
    paragraph_number: "1",
  },
  {
    value: "XP",
    label: "Previous Cargo Control Number",
    paragraph_number: "1",
  },
  {
    value: "XQ",
    label: "Pier Number",
    paragraph_number: "1",
  },
  {
    value: "XR",
    label: "Railroad Commission Record Number",
    paragraph_number: "1",
  },
  {
    value: "XS",
    label: "Gas Analysis Source Meter Number",
    paragraph_number: "1",
  },
  {
    value: "XT",
    label: "Toxicology ID",
    paragraph_number: "1",
  },
  {
    value: "XU",
    label: "Universal Transverse Mercator - North",
    paragraph_number: "1",
  },
  {
    value: "XV",
    label: "Universal Transverse Mercator - East",
    paragraph_number: "1",
  },
  {
    value: "XW",
    label: "Universal Transverse Mercator - Zone",
    paragraph_number: "1",
  },
  {
    value: "XX",
    label: "Rating Period",
    paragraph_number: "1",
  },
  {
    value: "XY",
    label: "Other Unlisted Type of Reference Number",
    paragraph_number: "1",
  },
  {
    value: "XZ",
    label: "Pharmacy Prescription Number",
    paragraph_number: "1",
  },
  {
    value: "Y0",
    label: "Debtor",
    paragraph_number: "1",
  },
  {
    value: "Y1",
    label: "Claim Administrator Claim Number",
    paragraph_number: "1",
  },
  {
    value: "Y2",
    label: "Third-Party Administrator Claim Number",
    paragraph_number: "1",
  },
  {
    value: "Y3",
    label: "Contract Holder Claim Number",
    paragraph_number: "1",
  },
  {
    value: "Y4",
    label: "Agency Claim Number",
    paragraph_number: "1",
  },
  {
    value: "Y5",
    label: "Delivery Trailer Manifest",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Unique identification number assigned by the delivery carrier or an agent for \nthat carrier",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Y6",
    label: "Sort and Segregate",
    paragraph_number: "1",
  },
  {
    value: "Y8",
    label: "User ID",
    paragraph_number: "1",
  },
  {
    value: "Y9",
    label: "Current Certificate Number",
    paragraph_number: "1",
  },
  {
    value: "YA",
    label: "Prior Certificate Number",
    paragraph_number: "1",
  },
  {
    value: "YB",
    label: "Revision Number",
    paragraph_number: "1",
  },
  {
    value: "YC",
    label: "Tract",
    paragraph_number: "1",
  },
  {
    value: "YD",
    label: "Buyer Identification",
    paragraph_number: "1",
  },
  {
    value: "YE",
    label: "Railroad Commission Oil Number",
    paragraph_number: "1",
  },
  {
    value: "YF",
    label: "Lessee Identification",
    paragraph_number: "1",
  },
  {
    value: "YH",
    label: "Operator Assigned Unit Number",
    paragraph_number: "1",
  },
  {
    value: "YI",
    label: "Refiner Identification",
    paragraph_number: "1",
  },
  {
    value: "YJ",
    label: "Revenue Source",
    paragraph_number: "1",
  },
  {
    value: "YK",
    label: "Rent Payor Identification",
    paragraph_number: "1",
  },
  {
    value: "YL",
    label: "Allowance Recipient Identification",
    paragraph_number: "1",
  },
  {
    value: "YM",
    label: "Resource Screening Reference",
    paragraph_number: "1",
  },
  {
    value: "YN",
    label: "Receiver ID Qualifier",
    paragraph_number: "1",
  },
  {
    value: "YO",
    label: "Formation",
    paragraph_number: "1",
  },
  {
    value: "YP",
    label: "Selling Arrangement",
    paragraph_number: "1",
  },
  {
    value: "YQ",
    label: "Minimum Royalty Payor Identification",
    paragraph_number: "1",
  },
  {
    value: "YR",
    label: "Operator Lease Number",
    paragraph_number: "1",
  },
  {
    value: "YS",
    label: "Yard Position",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Location where equipment has been placed in a yard, parking lot, etc.; may be \nstall number, row/slot, etc.; defined by sender",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "YT",
    label: "Reporter Identification",
    paragraph_number: "1",
  },
  {
    value: "YV",
    label: "Participating Area",
    paragraph_number: "1",
  },
  {
    value: "YW",
    label: "Engineering Change Proposal",
    paragraph_number: "1",
  },
  {
    value: "YX",
    label: "Geographic Score",
    paragraph_number: "1",
  },
  {
    value: "YY",
    label: "Geographic Key",
    paragraph_number: "1",
  },
  {
    value: "YZ",
    label: "Geographic Index",
    paragraph_number: "1",
  },
  {
    value: "Z1",
    label: "Safety of Ship Certificate",
    paragraph_number: "1",
    notes: [
      {
        content: "Number of a document guaranteeing the safety of a ship",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z2",
    label: "Safety of Radio Certificate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of a document guaranteeing the safety of radio equipment on board a \nvessel",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z3",
    label: "Safety Equipment Certificate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of a document specifying and guaranteeing the safety equipment on board \na vessel",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z4",
    label: "Civil Liabilities of Oil Certificate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of a document certifying the civil liabilities of oil on board a vessel",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z5",
    label: "Load Line Certificate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of a document specifying the depth to which a vessel should sink when \nproperly loaded",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z6",
    label: "Derat Certificate",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of a document guaranteeing that a vessel has been freed of rats",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z7",
    label: "Maritime Declaration of Health",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number of a document declaring the health conditions of a ship",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z8",
    label: "Federal Housing Administration Case Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The unique loan number assigned by the Federal Housing Administration (FHA) to \neach FHA loan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Z9",
    label: "Veterans Affairs Case Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The unique loan number assigned by the Veterans Affairs (VA) to each VA loan",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZA",
    label: "Supplier",
    paragraph_number: "1",
  },
  {
    value: "ZB",
    label: "Ultimate Consignee",
    paragraph_number: "1",
  },
  {
    value: "ZC",
    label: "Connecting Carrier",
    paragraph_number: "1",
  },
  {
    value: "ZD",
    label: "Family Member Identification",
    paragraph_number: "1",
  },
  {
    value: "ZE",
    label: "Coal Authority Number",
    paragraph_number: "1",
  },
  {
    value: "ZG",
    label: "Sales Representative Order Number",
    paragraph_number: "1",
  },
  {
    value: "ZH",
    label: "Carrier Assigned Reference Number",
    paragraph_number: "1",
  },
  {
    value: "ZI",
    label: "Reference Version Number",
    paragraph_number: "1",
  },
  {
    value: "ZJ",
    label: "Universal Railroad Revenue Waybill Identified Number (URRWIN)",
    paragraph_number: "1",
  },
  {
    value: "ZK",
    label: "Duplicate Waybill in Route",
    paragraph_number: "1",
  },
  {
    value: "ZL",
    label: "Duplicate Waybill Not in Route",
    paragraph_number: "1",
  },
  {
    value: "ZM",
    label: "Manufacturer Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number that identifies a manufacturer, typically a Commercial and Government \nEntity (CAGE) code, and contributes to the uniqueness of a product \nidentification",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZN",
    label: "Agency Case Number",
    paragraph_number: "1",
  },
  {
    value: "ZO",
    label: "Makegood Commercial Line Number",
    paragraph_number: "1",
  },
  {
    value: "ZP",
    label: "Spouse Tie",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A reference number used to relate the assets and or liabilities of two married \nresidential loan applicants to each other",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZQ",
    label: "Non-Spouse Tie",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A reference number used to relate the assets and or liabilities of two \nunmarried residential loan applicants to each other",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZR",
    label: "Supplier (Replacement)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number that identifies a replacement supplier typically a Commercial and \nGovernment Entity (CAGE) code, and contributes to the uniqueness of a product \nidentification from a replacement supply source",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZS",
    label: "Software Application Number",
    paragraph_number: "1",
  },
  {
    value: "ZT",
    label: "Milling in Transit",
    paragraph_number: "1",
  },
  {
    value: "ZU",
    label: "Field",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Name assigned by a regulatory agency which describes a producing oil or gas \nfield",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZV",
    label: "Block",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by a regulatory agency which describes a producing oil or gas \noffshore area",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZW",
    label: "Area",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by a regulatory agency which describes a producing oil or gas \narea",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZX",
    label: "County Code",
    paragraph_number: "1",
  },
  {
    value: "ZY",
    label: "Referenced Pattern Identification",
    paragraph_number: "1",
  },
  {
    value: "ZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
  {
    value: "AAA",
    label: "Distributor's Split Agent Number",
    paragraph_number: "1",
  },
  {
    value: "AAB",
    label: "Fund Manager's Reference Number",
    paragraph_number: "1",
  },
  {
    value: "AAC",
    label: "Agency Hierarchical Level",
    paragraph_number: "1",
  },
  {
    value: "AAD",
    label: "Officer License Number",
    paragraph_number: "1",
  },
  {
    value: "AAE",
    label: "Previous Distributor Number",
    paragraph_number: "1",
  },
  {
    value: "AAF",
    label: "Interviewer ID",
    paragraph_number: "1",
  },
  {
    value: "AAG",
    label: "Military ID",
    paragraph_number: "1",
  },
  {
    value: "AAH",
    label: "Option Policy Number",
    paragraph_number: "1",
  },
  {
    value: "AAI",
    label: "Payroll Account Number",
    paragraph_number: "1",
  },
  {
    value: "AAJ",
    label: "Prior Contract Number",
    paragraph_number: "1",
  },
  {
    value: "AAK",
    label: "Worksite Number",
    paragraph_number: "1",
  },
  {
    value: "AAL",
    label: "Agent Number",
    paragraph_number: "1",
  },
  {
    value: "AAM",
    label: "Treaty Identifier",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number identifying the reinsurance arrangement authorizing this activity",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AAN",
    label: "Associated Case Control Number",
    paragraph_number: "1",
  },
  {
    value: "AAO",
    label: "Carrier Assigned Code",
    paragraph_number: "1",
  },
  {
    value: "AAP",
    label: "Dealer Number",
    paragraph_number: "1",
  },
  {
    value: "AAQ",
    label: "Directory Number",
    paragraph_number: "1",
  },
  {
    value: "AAR",
    label: "Distributor Assigned Transaction Number",
    paragraph_number: "1",
  },
  {
    value: "AAS",
    label: "Distributor Assigned Order Number",
    paragraph_number: "1",
  },
  {
    value: "AAT",
    label: "Distributor's Account Number",
    paragraph_number: "1",
  },
  {
    value: "AAU",
    label: "General Agency Number",
    paragraph_number: "1",
  },
  {
    value: "AAV",
    label: "Laboratory Number",
    paragraph_number: "1",
  },
  {
    value: "AAW",
    label: "Agency Assigned Number",
    paragraph_number: "1",
  },
  {
    value: "AAX",
    label: "List Bill Number",
    paragraph_number: "1",
  },
  {
    value: "AAY",
    label: "Accounting Period Reference",
    paragraph_number: "1",
  },
  {
    value: "AAZ",
    label: "Paramedical ID Number",
    paragraph_number: "1",
  },
  {
    value: "ABA",
    label: "Payroll Number",
    paragraph_number: "1",
  },
  {
    value: "ABB",
    label: "Personal ID Number",
    paragraph_number: "1",
  },
  {
    value: "ABC",
    label: "Policy Link Number",
    paragraph_number: "1",
  },
  {
    value: "ABD",
    label: "Secondary Policy Number",
    paragraph_number: "1",
  },
  {
    value: "ABE",
    label: "Special Quote Number",
    paragraph_number: "1",
  },
  {
    value: "ABF",
    label: "National Property Registry System Level 1",
    paragraph_number: "1",
  },
  {
    value: "ABG",
    label: "National Property Registry System Level 2",
    paragraph_number: "1",
  },
  {
    value: "ABH",
    label: "Investor Assigned Identification Number",
    paragraph_number: "1",
  },
  {
    value: "ABJ",
    label:
      "Ginnie Mae (Government National Mortgage Association) Pool Package Number",
    paragraph_number: "1",
  },
  {
    value: "ABK",
    label: "Mortgage Electronic Registration System Organization Identifier",
    paragraph_number: "1",
  },
  {
    value: "ABL",
    label: "Seller Loan Number",
    paragraph_number: "1",
  },
  {
    value: "ABM",
    label: "Sub-Servicer Loan Number",
    paragraph_number: "1",
  },
  {
    value: "ABN",
    label: "National Property Registry System Level 3",
    paragraph_number: "1",
  },
  {
    value: "ABO",
    label: "State Hazardous Waste Entity Identifier",
    paragraph_number: "1",
  },
  {
    value: "ABP",
    label: "Bankruptcy Procedure Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned to Bankruptcy procedure used in various European countries",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ABQ",
    label: "National Business Identification Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Number assigned by a government regulatory agency to uniquely identify a \nbusiness; differs by country",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ABR",
    label:
      "Prior Data Universal Number System (D-U-N-S) Number, Dun & Bradstreet",
    paragraph_number: "1",
  },
  {
    value: "ABS",
    label: "Vessel Name",
    paragraph_number: "1",
  },
  {
    value: "ABT",
    label: "Security Instrument Number",
    paragraph_number: "1",
  },
  {
    value: "ABU",
    label: "Assignment Recording Number",
    paragraph_number: "1",
  },
  {
    value: "ABV",
    label: "Book Number",
    paragraph_number: "1",
  },
  {
    value: "ABY",
    label:
      "Health Care Financing Administration National Payer Identification Number",
    paragraph_number: "1",
  },
  {
    value: "ACA",
    label: "Growth Factor Reference",
    paragraph_number: "1",
  },
  {
    value: "ACB",
    label: "Region",
    paragraph_number: "1",
  },
  {
    value: "ACC",
    label: "Status",
    paragraph_number: "1",
  },
  {
    value: "ACD",
    label: "Class Code",
    paragraph_number: "1",
  },
  {
    value: "ACE",
    label: "Service Request Number",
    paragraph_number: "1",
  },
  {
    value: "ACF",
    label: "Supplement Number",
    paragraph_number: "1",
  },
  {
    value: "ACG",
    label: "Previous Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "ACH",
    label: "One Call Agency Ticket Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A unique identifier used to identify a One Call Agency ticket",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ACI",
    label: "Ticket Number",
    paragraph_number: "1",
  },
  {
    value: "ACJ",
    label: "Bill of Material Revision Number",
    paragraph_number: "1",
  },
  {
    value: "ACK",
    label: "Drawing Revision Number",
    paragraph_number: "1",
  },
  {
    value: "ACR",
    label:
      "Automated Clearinghouse (ACH) Return/Notification of Change (NOC) Code",
    paragraph_number: "1",
  },
  {
    value: "ACS",
    label: "Society of Property Information Compilers and Analysts",
    paragraph_number: "1",
  },
  {
    value: "ACT",
    label: "Accounting Code",
    paragraph_number: "1",
  },
  {
    value: "ADA",
    label:
      "Agency for International Development Acquisition Regulation (AIDAR)",
    paragraph_number: "1",
  },
  {
    value: "ADB",
    label: "Master Property Number",
    paragraph_number: "1",
  },
  {
    value: "ADC",
    label: "Project Property Number",
    paragraph_number: "1",
  },
  {
    value: "ADD",
    label: "Unit Property Number",
    paragraph_number: "1",
  },
  {
    value: "ADE",
    label: "Associated Property Number",
    paragraph_number: "1",
  },
  {
    value: "ADF",
    label: "Associated Number For Limited Common Element Parking",
    paragraph_number: "1",
  },
  {
    value: "ADG",
    label: "Associated Number For Unit Parking",
    paragraph_number: "1",
  },
  {
    value: "ADH",
    label: "Associated Number For Joined Unit not re-subdivided",
    paragraph_number: "1",
  },
  {
    value: "ADI",
    label: "Processor Identification Number",
    paragraph_number: "1",
  },
  {
    value: "ADM",
    label: "Air Dimension Code",
    paragraph_number: "1",
  },
  {
    value: "AEA",
    label: "Numero de Cedula de Identidad (CIN) Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business in parts of Latin America",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEB",
    label: "Company's Registry Office (CRO) Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business in Great Britain and Ireland",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEC",
    label: "Government Registration Number",
    paragraph_number: "1",
  },
  {
    value: "AED",
    label: "Judicial Number",
    paragraph_number: "1",
  },
  {
    value: "AEE",
    label: "Numero de Identificacion Tributaria (NIT)",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business in parts of Latin America",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEF",
    label: "Passport Number",
    paragraph_number: "1",
  },
  {
    value: "AEG",
    label: "Patron Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Type of Business identification number used in parts of Latin America",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEH",
    label: "Registro Informacion Fiscal (RIF)",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business in Venezuela",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEI",
    label: "Registro Unico de Contribuyente (RUC)",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business in parts of Latin America",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEJ",
    label: "Superintendencia de Inversiones Extranjeras (SIEX) Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to an individual in parts of Latin America",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEK",
    label: "Tokyo Shoko Research Business Identifier",
    paragraph_number: "1",
  },
  {
    value: "AEL",
    label: "Registro Nacional de Contribuyente (RNC)",
    paragraph_number: "1",
    notes: [
      {
        content: "Number assigned to a business in parts of Latin America",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "AEM",
    label: "Distribution Center Number",
    paragraph_number: "1",
  },
  {
    value: "AHC",
    label: "Air Handling Code",
    paragraph_number: "1",
  },
  {
    value: "ALC",
    label: "Agency Location Code",
    paragraph_number: "1",
  },
  {
    value: "ALG",
    label: "Title Company Code Book Reference",
    paragraph_number: "1",
  },
  {
    value: "ALH",
    label: "Title Document Schedule",
    paragraph_number: "1",
  },
  {
    value: "ALI",
    label: "Recording Number",
    paragraph_number: "1",
  },
  {
    value: "ALJ",
    label: "Title Policy Number",
    paragraph_number: "1",
  },
  {
    value: "ALT",
    label: "Alteration Number",
    paragraph_number: "1",
  },
  {
    value: "API",
    label: "American Petroleum Institute (API) Deduction Code",
    paragraph_number: "1",
  },
  {
    value: "ASL",
    label: "Atomic Safety and Licensing Board Panel (ASLBP) Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Uniquely identifies a specific administrative law court panel",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ASP",
    label: "Animal Species",
    paragraph_number: "1",
  },
  {
    value: "AST",
    label: "Animal Strain",
    paragraph_number: "1",
  },
  {
    value: "ATC",
    label: "Maintenance Availability Type",
    paragraph_number: "1",
  },
  {
    value: "BAA",
    label: "Franchise Tax Account Number",
    paragraph_number: "1",
  },
  {
    value: "BAB",
    label: "Certificate of Incorporation Number",
    paragraph_number: "1",
  },
  {
    value: "BAC",
    label: "Beam Assembly Code",
    paragraph_number: "1",
  },
  {
    value: "BAD",
    label: "State Tax Identification Number",
    paragraph_number: "1",
  },
  {
    value: "BAE",
    label: "Charter Number",
    paragraph_number: "1",
  },
  {
    value: "BAF",
    label: "Receipt Number",
    paragraph_number: "1",
  },
  {
    value: "BAG",
    label: "Withdrawal Account Number",
    paragraph_number: "1",
  },
  {
    value: "BAH",
    label: "Deposit Account Number",
    paragraph_number: "1",
  },
  {
    value: "BAI",
    label: "Business Identification Number",
    paragraph_number: "1",
  },
  {
    value: "BCI",
    label: "Basic Contract Line Item Number",
    paragraph_number: "1",
  },
  {
    value: "BKT",
    label: "Bank Telegraphic Number",
    paragraph_number: "1",
  },
  {
    value: "BLT",
    label: "Billing Type",
    paragraph_number: "1",
  },
  {
    value: "BMM",
    label: "Begin Mile Marker",
    paragraph_number: "1",
  },
  {
    value: "BOI",
    label: "Binary Object Identifier",
    paragraph_number: "1",
  },
  {
    value: "CBG",
    label: "Census Block Group",
    paragraph_number: "1",
  },
  {
    value: "CDN",
    label: "Citizenship Document Number",
    paragraph_number: "1",
  },
  {
    value: "CIR",
    label: "Circuit Number",
    paragraph_number: "1",
  },
  {
    value: "CIT",
    label: "Citation",
    paragraph_number: "1",
  },
  {
    value: "CMN",
    label: "Continuous Move Number",
    paragraph_number: "1",
  },
  {
    value: "CMP",
    label: "Customer Maintenance Period Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "CMT",
    label: "Component",
    paragraph_number: "1",
  },
  {
    value: "CNO",
    label: "Commitment Number",
    paragraph_number: "1",
  },
  {
    value: "COL",
    label: "Collocation Indicator",
    paragraph_number: "1",
  },
  {
    value: "COT",
    label: "Certificate of Transportation",
    paragraph_number: "1",
  },
  {
    value: "CPA",
    label: "Canadian Province Operating Authority Number",
    paragraph_number: "1",
  },
  {
    value: "CPT",
    label: "Current Procedural Terminology Code",
    paragraph_number: "1",
  },
  {
    value: "CRN",
    label: "Casualty Report Number",
    paragraph_number: "1",
  },
  {
    value: "CRS",
    label: "Casualty Report Serial Number",
    paragraph_number: "1",
  },
  {
    value: "CSC",
    label: "CS54 Key Train Indicator Code",
    paragraph_number: "1",
  },
  {
    value: "CSG",
    label: "CS54 Key Train Indicator Group Name",
    paragraph_number: "1",
  },
  {
    value: "CST",
    label: "Census State Code",
    paragraph_number: "1",
  },
  {
    value: "CTS",
    label: "Census Tract Suffix",
    paragraph_number: "1",
  },
  {
    value: "CYC",
    label: "Periodicity Code",
    paragraph_number: "1",
  },
  {
    value: "DHH",
    label:
      "Department of Health and Human Services Acquisition Regulation (HHSAR)",
    paragraph_number: "1",
  },
  {
    value: "DIS",
    label: "District Number",
    paragraph_number: "1",
  },
  {
    value: "DNR",
    label: "Deposit Number",
    paragraph_number: "1",
  },
  {
    value: "DNS",
    label: "D-U-N-S+4, D-U-N-S Number with Four Character Suffix",
    paragraph_number: "1",
  },
  {
    value: "DOA",
    label: "Department of Agriculture Acquisition Regulation (AGAR)",
    paragraph_number: "1",
  },
  {
    value: "DOC",
    label: "Department of Commerce Acquisition Regulation (CAR)",
    paragraph_number: "1",
  },
  {
    value: "DOE",
    label: "Department of Energy Acquisition Regulation (DEAR)",
    paragraph_number: "1",
  },
  {
    value: "DOI",
    label: "Department of Interior Acquisition Regulation (DIAR)",
    paragraph_number: "1",
  },
  {
    value: "DOJ",
    label: "Department of Justice Acquisition Regulation (JAR)",
    paragraph_number: "1",
  },
  {
    value: "DOL",
    label: "Department of Labor Acquisition Regulation (DOLAR)",
    paragraph_number: "1",
  },
  {
    value: "DON",
    label: "Density Order Number",
    paragraph_number: "1",
  },
  {
    value: "DOS",
    label: "Department of State Acquisition Regulation (DOSAR)",
    paragraph_number: "1",
  },
  {
    value: "DOT",
    label: "Department of Transportation Acquisition Regulation (TAR)",
    paragraph_number: "1",
  },
  {
    value: "DRN",
    label: "Drainhole Number",
    paragraph_number: "1",
  },
  {
    value: "DSC",
    label: "Departure from Specification Class Code",
    paragraph_number: "1",
  },
  {
    value: "DSI",
    label: "Departure from Specification Number",
    paragraph_number: "1",
  },
  {
    value: "DST",
    label: "Departure from Specification Type Code",
    paragraph_number: "1",
  },
  {
    value: "DTS",
    label:
      "Department of the Treasury Acquisition/Procurement Regulation (TAPR)",
    paragraph_number: "1",
  },
  {
    value: "DUN",
    label: "D-U-N-S Number Dun & Bradstreet",
    paragraph_number: "1",
  },
  {
    value: "EDA",
    label: "Department of Education Acquisition Regulation (EDAR)",
    paragraph_number: "1",
  },
  {
    value: "EMM",
    label: "End Mile Marker",
    paragraph_number: "1",
  },
  {
    value: "END",
    label: "Endorsement Number",
    paragraph_number: "1",
  },
  {
    value: "EPA",
    label: "Environmental Protection Agency Acquisition Regulation (EPAAR)",
    paragraph_number: "1",
  },
  {
    value: "EPB",
    label: "Environmental Protection Agency Transporter Identification Number",
    paragraph_number: "1",
  },
  {
    value: "ESN",
    label: "Estimate Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "FCN",
    label: "Assigned Contract Number",
    paragraph_number: "1",
  },
  {
    value: "FLZ",
    label: "Flood Zone",
    paragraph_number: "1",
  },
  {
    value: "FMP",
    label: "Facility Measurement Point Number",
    paragraph_number: "1",
  },
  {
    value: "FND",
    label: "Finder Number",
    paragraph_number: "1",
  },
  {
    value: "FSN",
    label: "Assigned Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "FTN",
    label: "Premarket Notification Number",
    paragraph_number: "1",
  },
  {
    value: "FWC",
    label: "Final Work Candidate Number",
    paragraph_number: "1",
  },
  {
    value: "GWS",
    label: "Group Work Candidate Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "HHT",
    label: "Type of Household Goods Code",
    paragraph_number: "1",
  },
  {
    value: "HMB",
    label: "Home Mortgage Disclosure Act Block Number Area",
    paragraph_number: "1",
  },
  {
    value: "HPI",
    label: "Health Care Financing Administration National Provider Identifier",
    paragraph_number: "1",
  },
  {
    value: "HUD",
    label:
      "Department of Housing and Urban Development Acquisition Regulation (HUDAR)",
    paragraph_number: "1",
  },
  {
    value: "ICD",
    label: "ICD-9-CM (International Classification of Diseases)",
    paragraph_number: "1",
  },
  {
    value: "IFT",
    label: "International Fuel Tax Agreement Account Number",
    paragraph_number: "1",
  },
  {
    value: "IID",
    label: "Image Identifier",
    paragraph_number: "1",
  },
  {
    value: "IMP",
    label: "Integrated Master Plan (IMP)",
    paragraph_number: "1",
  },
  {
    value: "IMS",
    label: "Integrated Master Schedule (IMS)",
    paragraph_number: "1",
  },
  {
    value: "IND",
    label: "Investigatorial New Drug Number",
    paragraph_number: "1",
  },
  {
    value: "IRN",
    label: "Importer's Reference Number to Letter of Credit",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Letter of credit reference number issued by buyer; cross-references the bank's \nletter of credit number, once assigned",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "IRP",
    label: "International Registration Plan Account Number",
    paragraph_number: "1",
  },
  {
    value: "ISC",
    label:
      "International Standard Industrial Classification (ISIC) Dominion of Canada Code \n(DCC)",
    paragraph_number: "1",
  },
  {
    value: "ISN",
    label: "International Registration Plan Sticker Number",
    paragraph_number: "1",
  },
  {
    value: "ISS",
    label: "Inspection and Survey Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "LEN",
    label: "Location Exception Order Number",
    paragraph_number: "1",
  },
  {
    value: "LIC",
    label:
      "Health Industry Business Communications Council (HIBCC) Labeler Identification \nCode (LIC)",
    paragraph_number: "1",
  },
  {
    value: "LOI",
    label: "Logical Observation Identifier Names and Codes (LOINC)",
    paragraph_number: "1",
  },
  {
    value: "LSD",
    label: "Logistics Support Documentation Type Code",
    paragraph_number: "1",
  },
  {
    value: "LVO",
    label: "Levying Officer Identification",
    paragraph_number: "1",
  },
  {
    value: "MBX",
    label: "Mailbox",
    paragraph_number: "1",
  },
  {
    value: "MCI",
    label: "Motor Carrier Identification Number",
    paragraph_number: "1",
  },
  {
    value: "MDN",
    label: "Hazardous Waste Manifest Document Number",
    paragraph_number: "1",
  },
  {
    value: "MSL",
    label: "Mail Slot",
    paragraph_number: "1",
  },
  {
    value: "MZO",
    label: "Multiple Zone Order Number",
    paragraph_number: "1",
  },
  {
    value: "NAS",
    label: "National Aeronautics and Space Administration FAR Supplement (NFS)",
    paragraph_number: "1",
  },
  {
    value: "NDA",
    label: "Abbreviated New Drug Application Number",
    paragraph_number: "1",
  },
  {
    value: "NDB",
    label: "New Drug Application Number",
    paragraph_number: "1",
  },
  {
    value: "NFC",
    label: "National Flood Insurance Program Community Name",
    paragraph_number: "1",
  },
  {
    value: "NFD",
    label: "National Flood Insurance Program County",
    paragraph_number: "1",
  },
  {
    value: "NFM",
    label: "National Flood Insurance Program Map Number",
    paragraph_number: "1",
  },
  {
    value: "NFN",
    label: "National Flood Insurance Program Community Number",
    paragraph_number: "1",
  },
  {
    value: "NFS",
    label: "National Flood Insurance Program State",
    paragraph_number: "1",
  },
  {
    value: "PAC",
    label: "Patent Cooperation Treaty Application Number",
    paragraph_number: "1",
  },
  {
    value: "PAN",
    label: "Nonprovisional Patent Application Number",
    paragraph_number: "1",
  },
  {
    value: "PAP",
    label: "Provisional Patent Application Number",
    paragraph_number: "1",
  },
  {
    value: "PCC",
    label: "Pool Contract Code",
    paragraph_number: "1",
  },
  {
    value: "PCN",
    label: "Protocol Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A number identifying a detailed record of a procedure and its results",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "PDL",
    label: "Previous Driver's License",
    paragraph_number: "1",
  },
  {
    value: "PGC",
    label: "Packing Group Code",
    paragraph_number: "1",
  },
  {
    value: "PGN",
    label: "Plug Number",
    paragraph_number: "1",
  },
  {
    value: "PGS",
    label: "Proposed Group Work Candidate Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "PHC",
    label: "Process Handling Code",
    paragraph_number: "1",
  },
  {
    value: "PID",
    label: "Program Identification Number",
    paragraph_number: "1",
  },
  {
    value: "PIN",
    label: "Platform Identification Number",
    paragraph_number: "1",
  },
  {
    value: "PLA",
    label: "Product Licensing Agreement Number",
    paragraph_number: "1",
  },
  {
    value: "PLN",
    label: "Proposed Contract Number",
    paragraph_number: "1",
  },
  {
    value: "PMN",
    label: "Premarket Application Number",
    paragraph_number: "1",
  },
  {
    value: "PNN",
    label: "Patent Number",
    paragraph_number: "1",
  },
  {
    value: "POL",
    label: "Policy Number",
    paragraph_number: "1",
  },
  {
    value: "PRS",
    label: "Previously Reported Social Security Number",
    paragraph_number: "1",
  },
  {
    value: "PRT",
    label: "Product Type",
    paragraph_number: "1",
  },
  {
    value: "PSI",
    label: "Previous Shipment Identification Number - Continuous Move",
    paragraph_number: "1",
  },
  {
    value: "PSL",
    label: "Next Shipment Identification Number - Continuous Move",
    paragraph_number: "1",
  },
  {
    value: "PSM",
    label: "Credit Card",
    paragraph_number: "1",
  },
  {
    value: "PSN",
    label: "Proposed Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "PTC",
    label: "Patent Type",
    paragraph_number: "1",
  },
  {
    value: "PWC",
    label: "Preliminary Work Candidate Number",
    paragraph_number: "1",
  },
  {
    value: "PWS",
    label: "Proposed Work Candidate Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "RAA",
    label: "Restricted Availability Authorization",
    paragraph_number: "1",
  },
  {
    value: "RAN",
    label: "Restricted Availability Number",
    paragraph_number: "1",
  },
  {
    value: "REC",
    label: "Related Case",
    paragraph_number: "1",
  },
  {
    value: "RGI",
    label: "Regulatory Guideline Identifier",
    paragraph_number: "1",
    notes: [
      {
        content: "Indicates the federal or state regulatory guideline number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RIG",
    label: "Rig Number",
    paragraph_number: "1",
  },
  {
    value: "RPP",
    label: "Relative Priority",
    paragraph_number: "1",
  },
  {
    value: "RPT",
    label: "Report Number",
    paragraph_number: "1",
  },
  {
    value: "RRS",
    label: "Reconciliation Report Section Identification Code",
    paragraph_number: "1",
  },
  {
    value: "RSN",
    label: "Reservation Number",
    paragraph_number: "1",
  },
  {
    value: "SBN",
    label: "Surety Bond Number",
    paragraph_number: "1",
  },
  {
    value: "SCA",
    label: "Standard Carrier Alpha Code (SCAC)",
    paragraph_number: "1",
  },
  {
    value: "SEK",
    label: "Search Key",
    paragraph_number: "1",
  },
  {
    value: "SES",
    label: "Session",
    paragraph_number: "1",
  },
  {
    value: "SHL",
    label: "Shelf Life Indicator",
    paragraph_number: "1",
  },
  {
    value: "SNH",
    label:
      "Systematized Nomenclature of Human and Veterinary Medicine (SNOMED)",
    paragraph_number: "1",
  },
  {
    value: "SNV",
    label: "State Non-Resident Violator Compact",
    paragraph_number: "1",
  },
  {
    value: "SPL",
    label: "Standard Point Location Code (SPLC)",
    paragraph_number: "1",
  },
  {
    value: "SPN",
    label: "Theater Screen Number",
    paragraph_number: "1",
  },
  {
    value: "STB",
    label: "Standard Transportation Commodity Code (STCC) Bridge Number",
    paragraph_number: "1",
  },
  {
    value: "STR",
    label: "Standard Transportation Commodity Code (STCC) Replacement Code",
    paragraph_number: "1",
  },
  {
    value: "SUB",
    label: "Title Reference",
    paragraph_number: "1",
  },
  {
    value: "SUO",
    label: "Spacing Unit Order Number",
    paragraph_number: "1",
  },
  {
    value: "TDT",
    label: "Technical Documentation Type",
    paragraph_number: "1",
  },
  {
    value: "TIP",
    label: "Technical Information Package",
    paragraph_number: "1",
  },
  {
    value: "TOC",
    label: "Type of Comment",
    paragraph_number: "1",
  },
  {
    value: "TPN",
    label: "Transponder Number",
    paragraph_number: "1",
  },
  {
    value: "TSN",
    label: "Template Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "URL",
    label: "Uniform Resource Locator",
    paragraph_number: "1",
  },
  {
    value: "WCS",
    label: "Work Candidate Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "WDR",
    label: "Withdrawal Record",
    paragraph_number: "1",
  },
  {
    value: "H4",
    label: "Federal Information Resources Management Regulation",
    paragraph_number: "1",
  },
  {
    value: "I8",
    label: "Social Insurance Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Canadian Social Insurance Number",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "Y7",
    label: "Processing Area",
    paragraph_number: "1",
  },
  {
    value: "ZF",
    label: "Contractor Establishment Code (CEC)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Government identifier to designate a contractor; it is nine characters, eight \nnumeric and a final alpha",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "6W",
    label: "Sequence Number",
    paragraph_number: "1",
  },
  {
    value: "A6",
    label: "Employee Identification Number",
    paragraph_number: "1",
  },
];

export { REF_128_OPTIONS };
