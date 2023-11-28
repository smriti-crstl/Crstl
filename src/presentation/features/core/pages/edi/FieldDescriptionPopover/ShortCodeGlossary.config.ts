export interface GlossaryObject {
  code: string;
  name: string;
  description: string;
}

interface DocumentGlossary {
  [key: string]: GlossaryObject;
}

interface Glossary {
  [key: string]: DocumentGlossary;
}

export const EDI_GLOSSARY_KEYS = {
  TARGET_NON_DVS_856_EDI_GLOSSARY: "TARGET_NON_DVS_856_EDI_GLOSSARY",
  TARGET_NON_DVS_810_EDI_GLOSSARY: "TARGET_NON_DVS_810_EDI_GLOSSARY",
  CVS_SOPI_856_EDI_GLOSSARY: "CVS_SOPI_856_EDI_GLOSSARY",
  CVS_SOPI_810_EDI_GLOSSARY: "CVS_SOPI_810_EDI_GLOSSARY",
};

export const EDI_GLOSSARY: any = {
  TARGET_NON_DVS_856_EDI_GLOSSARY: {
    BSN: {
      SEGMENT: {
        code: "BSN",
        name: "Beginning Segment for Ship Notice",
        description:
          "To transmit identifying numbers, dates, and other basic data relating to the transaction set",
      },
      ELEMENTS: {
        BSN_01: {
          code: "BSN_01",
          name: "",
          description: `Code identifying purpose of transaction set\n
00 Original
07 Duplicate`,
        },
        BSN_02: {
          code: "BSN_02",
          name: "Shipment Identification",
          description:
            "Shipment Identification. This number should be different than the Purchase Order or Bill of Lading Number",
        },
        BSN_03: {
          code: "BSN_03",
          name: "",
          description:
            "BSN03 is the date the shipment transaction set is created. Date expressed as CCYYMMDD",
        },
        BSN_04: {
          code: "BSN_04",
          name: "",
          description: `BSN04 is the time the shipment transaction set is created.
Time expressed in 24-hour clock time as follows: HHMM, or HHMMSS, or HHMMSSD, or HHMMSSDD, where H = hours (00-23), M = minutes (00- 59), S = integer seconds (00-59) and DD = decimal seconds; decimal seconds are expressed as follows: D = tenths (0-9) and DD = hundredths (00-99)`,
        },
        BSN_05: {
          code: "BSN_05",
          name: "",
          description: `Code indicating the hierarchical application structure of a transaction set that utilizes the HL segment to define the structure of the transaction set
          
0001 Shipment, Order, Packaging, Item
(Pick & Pack Format - allows for multiple SKUs on
pallet)

0002 Shipment, Order, Item, Packaging
(Standard Pack Format - used when identical SKUs are
packed)`,
        },
        BSN_06: {
          code: "BSN_06",
          name: "",
          description: "Not applicable",
        },
        BSN_07: {
          code: "BSN_07",
          name: "",
          description: "Not applicable",
        },
      },
    },
    TD5: {
      SEGMENT: {
        code: "TD5",
        name: "Carrier Details (Routing Sequence/Transit Time)",
        description: `To specify the carrier and sequence of routing and provide transit time information`,
      },
      ELEMENTS: {
        TD5_01: {
          code: "TD5_01",
          name: "",
          description: `Code describing the relationship of a carrier to a specific shipment movement

B Origin/Delivery Carrier (Any Mode)`,
        },
        TD5_02: {
          code: "TD5_02",
          name: "",
          description: `Code designating the system/method of code structure used for Identification
Code (67)

2    Standard Carrier Alpha Code (SCAC)`,
        },
        TD5_03: {
          code: "TD5_03",
          name: "",
          description: `Target requires the 4-character alpha code.
The SCAC code must be sent in upper case.`,
        },
        TD5_04: {
          code: "TD5_04",
          name: "",
          description: `Code specifying the method or type of transportation for the shipment
The mode of transportation determines both the transportation method type code (TD504) and the REF segment qualifier (REF01).

TRANSPORTATION
____________________________________
Mode of :        TD504  REF01  REF02
Transportation
___________________________________
Air                      A         CN      Carrier Ref.# (Carrier Tracking Number)
____________________________________
Consolidation   C        MB      Master Bill of Lading#
(Optional)                    BM      Underlying (When used with MB)
_____________________________________
TL or LTL          M        BM       Bill of Lading #
____________________________________
Private Parcel.  U        CN       Carrier Ref.# (Carrier Tracking Number)`,
        },
        TD5_05: {
          code: "TD5_05",
          name: "",
          description:
            "Free-form description of the routing or requested routing for shipment, or the originating carrier's identity",
        },
      },
    },
    REF: {
      SEGMENT: {
        code: "REF",
        name: "Reference Identification",
        description: "To specify identifying information",
      },
      ELEMENTS: {
        REF_01: {
          code: "REF_01",
          name: "",
          description: `BM - Bill of Lading Number

Required when shipping via motor carrier (TD504
equals "M").

CN - Carrier's Reference Number (PRO/Invoice)
Required when shipping parcel package shipments
(TD504 equals "U" or "A").

MB - Master Bill of Lading

Master Bill of Lading required for all consolidated
shipments (TD504 equals "C").
Please note: if the Master Bill of Lading (MB) and Bill
of Lading (BM) are both sent, Target will only use the
Master Bill of Lading (MB) number.

LT - Lot Number

Lot number required based on Food Distribution Center
Shipments, as these are designated by Target as lot
number controlled product.`,
        },
        REF_02: {
          code: "REF_02",
          name: "",
          description: `Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier A unique Bill of Lading (BOL) number for each shipment is required. When the mode of transportation is for Consolidation, a unique Master BOL # is required for all ship to locations on that shipment.`,
        },
      },
    },
    HL: {
      SEGMENT: {
        code: "HL",
        name: "Hierarchical Level",
        description:
          "To identify dependencies among and the content of hierarchically related groups of data segments",
      },
      ELEMENTS: {
        HL_01: {
          code: "HL_01",
          name: "",
          description:
            "A unique number assigned by the sender to identify a particular data segment in a hierarchical structure",
        },
        HL_02: {
          code: "HL_02",
          name: "",
          description:
            "Identification number of the next higher hierarchical data segment that the data segment being described is subordinate to Not used by the Retail Industry",
        },
        HL_03: {
          code: "HL_03",
          name: "",
          description: `Code defining the characteristic of a level in a hierarchical structure:

S   Shipment
O   Order
T   Shipping Tare
P   Pack
I    Item`,
        },
      },
    },
    MAN: {
      SEGMENT: {
        code: "MAN",
        name: "Marks and Numbers",
        description:
          "To indicate identifying marks and numbers for shipping containers",
      },
      ELEMENTS: {
        MAN_01: {
          code: "MAN_01",
          name: "",
          description: `Code specifying the application or source of Marks and Numbers

AA     SSCC-18
EN     EAN European Article Number (2-5-5-1)
GM      SSCC-18 and Application Identifier
UC     U.P.C. Shipping Container Code
UP     U.P.C. Consumer Package Code (1-5-5-1)

Used when case pack is one and selling unit is shipping
unit`,
        },
        MAN_02: {
          code: "MAN_02",
          name: "",
          description:
            "Marks and numbers used to identify a shipment or parts of a shipment When GM is present in the MAN01, the value in this field must be 20 digits.",
        },
        MAN_03: {
          code: "MAN_03",
          name: "",
          description:
            "Marks and numbers used to identify a shipment or parts of a shipment",
        },
        MAN_04: {
          code: "MAN_04",
          name: "",
          description: `Code specifying the application or source of Marks and Numbers 

AA       SSCC-18
GM      SSCC-18 and Application Identifier
UC       U.P.C. Shipping Container Code`,
        },
        MAN_05: {
          code: "MAN_05",
          name: "",
          description:
            "Marks and numbers used to identify a shipment or parts of a shipment When GM is present in the MAN01, the value in this field must be 20 digits.",
        },
        MAN_06: {
          code: "MAN_06",
          name: "",
          description:
            "Marks and numbers used to identify a shipment or parts of a shipment",
        },
      },
    },
    N1: {
      SEGMENT: {
        code: "N1",
        name: "Name",
        description:
          "To identify a party by type of organization, name, and code",
      },
      ELEMENTS: {
        N1_01: {
          code: "N1_01",
          name: "",
          description: `ST   Ship To
BY   Buying Party (Purchaser)`,
        },
        N1_02: {
          code: "N1_02",
          name: "",
          description: `Free-form name
Not used by Target`,
        },
        N1_03: {
          code: "N1_03",
          name: "",
          description: `Per Target Standards:
*N103 code '92' is only valid with an N101 equal to ST
92   Assigned by Buyer or Buyer's Agent`,
        },
        N1_04: {
          code: "N1_04",
          name: "",
          description: `When N101 = ST, this will be a four digit location number.`,
        },
      },
    },
    PRF: {
      SEGMENT: {
        code: "PRF",
        name: "Purchase Order Reference",
        description: "To provide reference to a specific purchase order",
      },
      ELEMENTS: {
        PRF_01: {
          code: "PRF_01",
          name: "",
          description: `Identifying number for Purchase Order assigned by the orderer/purchaser
Identifying number sent on 850 Purchase Order in the BEG03 segment. Send
back what was received in the BEG03 segment on 850 Purchase Order.`,
        },
      },
    },
    PID: {
      SEGMENT: {
        code: "PID",
        name: "Product/Item Description",
        description:
          "To describe a product or process in coded or free-form format",
      },
      ELEMENTS: {
        PID_01: {
          code: "PID_01",
          name: "S      Structured (From Industry Code List)",
          description: "S       Structured (From Industry Code List)",
        },
        PID_02: {
          code: "PID_02",
          name: "",
          description: `Code identifying the general class of a product or process characteristic
Not used by Target`,
        },
        PID_03: {
          code: "PID_03",
          name: "",
          description:
            "VI       Voluntary Inter-Industry Commerce Standard (VICS) EDI",
        },
        PID_04: {
          code: "PID_04",
          name: "",
          description: `FL      Compliant with Fair Labor Standards Act
ZZ      FLSA Non-Compliance or Not applicable.`,
        },
      },
    },
    TD1: {
      SEGMENT: {
        code: "TD1",
        name: "Carrier Details (Quantity and Weight)",
        description:
          "To specify the transportation details relative to commodity, weight, and quantity",
      },
      ELEMENTS: {
        TD1_01: {
          code: "TD1_01",
          name: "",
          description: `Code identifying the type of packaging; Part 1: Packaging Form, Part 2:
Packaging Material; if the Data Element is used, then Part 1 is always required
This data element contains 2 parts. Part 1 is comprised of the first 3 positions.
For Target, Part 1 must always contain the alpha code CTN. Part 2 is
comprised of the final 2 positions and must always be numeric. For Target, the
three valid codes for Part 2 are listed below. Spaces may also be used in place
of the valid codes. See Sample TD1 segments above.

CTN Carton

25 - Carton Corrugated
31 - Carton Fiber
76 - Carton Paper
          `,
        },
        TD1_02: {
          code: "TD1_02",
          name: "",
          description: `Lading Quantity

Number of units (pieces) of the lading commodity
          `,
        },
      },
    },
    PO4: {
      SEGMENT: {
        code: "PO4",
        name: "Item Physical Details",
        description:
          "To specify the physical qualities, packaging, weights, and dimensions relating to the item",
      },
      ELEMENTS: {
        PO4_01: {
          code: "PO4_01",
          name: "",
          description:
            "The number of inner containers, or number of eaches if there are no inner",
        },
        PO4_02: {
          code: "PO4_02",
          name: "",
          description: "Size of supplier units in pack",
        },
        PO4_03: {
          code: "PO4_03",
          name: "",
          description: "Unit or Basis for Measurement Code",
        },
        PO4_04: {
          code: "PO4_04",
          name: "",
          description: `Code identifying the type of packaging; Part 1: Packaging Form, Part 2:
Packaging Material; if the Data Element is used, then Part 1 is always required`,
        },
        PO4_05: {
          code: "PO4_05",
          name: "",
          description: "Code defining the type of weight",
        },
        PO4_06: {
          code: "PO4_06",
          name: "",
          description: "Numeric value of gross weight per pack",
        },
        PO4_07: {
          code: "PO4_07",
          name: "",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken`,
        },
        PO4_08: {
          code: "PO4_08",
          name: "",
          description: "Numeric value of gross volume per pack",
        },
        PO4_09: {
          code: "PO4_09",
          name: "",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken`,
        },
        PO4_10: {
          code: "PO4_10",
          name: "",
          description: `Largest horizontal dimension of an object measured when the object is in the upright position`,
        },
        PO4_11: {
          code: "PO4_11",
          name: "",
          description: `Shorter measurement of the two horizontal dimensions measured with the object in the upright position`,
        },
        PO4_12: {
          code: "PO4_12",
          name: "",
          description: `Vertical dimension of an object measured when the object is in the upright
position`,
        },
        PO4_13: {
          code: "PO4_13",
          name: "",
          description: `IN Inch`,
        },
        PO4_14: {
          code: "PO4_14",
          name: "",
          description: `The number of eaches per inner container. If inner cartons are being sent, this must represent the number of selling units within one inner pack. If the PO414 element is received on the PO, then it is required to be sent back on the 856.`,
        },
      },
    },
    DTM: {
      SEGMENT: {
        code: "DTM",
        name: "Date/Time Reference",
        description: "To specify pertinent dates and times",
      },
      ELEMENTS: {
        DTM_01: {
          code: "DTM_01",
          name: "",
          description: `036      Expiration
Date coverage expires
Expiration date required based on Food Distribution Center Shipments, as these are designated by Target as expiration date controlled product.`,
        },
        DTM_02: {
          code: "DTM_02",
          name: "",
          description: "Date expressed as CCYYMMDD",
        },
      },
    },
    LIN: {
      SEGMENT: {
        code: "LIN",
        name: "Item Identification",
        description: "To specify basic item identification data",
      },
      ELEMENTS: {
        LIN_01: {
          code: "LIN_01",
          name: "",
          description:
            "Alphanumeric characters assigned for differentiation within a transaction set",
        },
        LIN_02: {
          code: "LIN_02",
          name: "",
          description: `Code identifying the type/source of the descriptive number used in
Product/Service ID (234)
CB    Buyer's Catalog Number
         Target 9 digit DPCI number
EN    European Article Number (EAN) (2-5-5-1)
EO    EAN-8
IN     Buyer's Item Number
         Target Corporation Item Number (TCIN)
UP    U.P.C. Consumer Package Code (1-5-5-1)`,
        },
        LIN_03: {
          code: "LIN_03",
          name: "",
          description: "Identifying number for a product or service",
        },
        LIN_04: {
          code: "LIN_04",
          name: "",
          description: `Code identifying the type/source of the descriptive number used in
Product/Service ID (234)
CB    Buyer's Catalog Number
         Target 9 digit DPCI number
EN    European Article Number (EAN) (2-5-5-1)
EO    EAN-8
IN     Buyer's Item Number
        Target Corporation Item Number (TCIN)
UP    U.P.C. Consumer Package Code (1-5-5-1)`,
        },
        LIN_05: {
          code: "LIN_05",
          name: "",
          description: "Identifying number for a product or service",
        },
        LIN_06: {
          code: "LIN_06",
          name: "",
          description: `Code identifying the type/source of the descriptive number used in
Product/Service ID (234)
CB    Buyer's Catalog Number
         Target 9 digit DPCI number
EN    European Article Number (EAN) (2-5-5-1)
EO    EAN-8
IN     Buyer's Item Number
        Target Corporation Item Number (TCIN)
UP    U.P.C. Consumer Package Code (1-5-5-1)`,
        },
        LIN_07: {
          code: "LIN_07",
          name: "",
          description: "Identifying number for a product or service",
        },
      },
    },
    SN1: {
      SEGMENT: {
        code: "SN1",
        name: "Item Detail (Shipment)",
        description: "To specify line-item detail relative to shipment",
      },
      ELEMENTS: {
        SN1_01: {
          code: "SN1_01",
          description: `Alphanumeric characters assigned for differentiation within a transaction set
Not used by Retail Industry`,
          name: "",
        },
        SN1_02: {
          code: "SN1_02",
          description: `Number of Units Shipped`,
          name: "",
        },
        SN1_03: {
          code: "SN1_03",
          description: `Unit or Basis for Measurement Code
CA Case
EA Each
LB Pound

Pound is only allowed on Food Distribution Center shipments. The LB qualifier is interchangeable with the EA qualifier within Target's application systems for non-random weight food items.`,
          name: "",
        },
      },
    },
    CTT: {
      SEGMENT: {
        code: "CTT",
        name: "Transaction Totals",
        description:
          "To transmit a hash total for a specific element in the transaction set",
      },
      ELEMENTS: {
        CTT_01: {
          code: "CTT_01",
          name: "",
          description: `Total number of line items in the transaction set
The number of HL segments present in the transaction set.`,
        },
      },
    },
  },
  TARGET_NON_DVS_810_EDI_GLOSSARY: {
    BIG: {
      SEGMENT: {
        code: "BIG",
        name: "Beginning Segment of Invoice",
        description: `To indicate the beginning of an invoice transaction set and transmit identifying numbers and dates`,
      },
      ELEMENTS: {
        BIG_01: {
          code: "BIG_01",
          name: "",
          description: "Invoice issue date.",
        },
        BIG_02: {
          code: "BIG_02",
          name: "",
          description: `Identifying number assigned by issuer
Note: Invoice numbers must not be more than 19 characters long. Invoice numbers may contain alphas but no special characters. Alpha characters must be in upper case.`,
        },
        BIG_03: {
          code: "BIG_03",
          name: "",
          description: `Date expressed as CCYYMMDD
Not used by Target`,
        },
        BIG_04: {
          code: "BIG_04",
          name: "",
          description: "PO number",
        },
        BIG_05: {
          code: "BIG_05",
          name: "",
          description: `Number identifying a release against a Purchase Order previously placed by the parties involved in the transaction
Not used by Target`,
        },
        BIG_06: {
          code: "BIG_06",
          name: "",
          description: `Number assigned by the orderer identifying a specific change or revision to a previously transmitted transaction set
Not used by Target`,
        },
        BIG_07: {
          code: "BIG_07",
          name: "",
          description: `Code specifying the type of transaction
**All other invoices (credit, display, samples, freight only, pallets, etc.) must
be on paper and mailed to the appropriate area.
DO Drop Shipment Invoice`,
        },
      },
    },
    NTE: {
      SEGMENT: {
        code: "NTE",
        description: `To transmit information in a free-form format, if necessary, for comment or special instruction`,
        name: "Note/Special Instruction",
      },
      ELEMENTS: {
        NTE_01: {
          code: "NTE_01",
          description: `Code identifying the functional area or purpose for which the note applies
CER Certification Narrative
Any notes associated with the certification involved`,
          name: "",
        },
        NTE_02: {
          code: "NTE_02",
          description:
            "A free-form description to clarify the related data elements and their content",
          name: "",
        },
      },
    },
    REF: {
      SEGMENT: {
        code: "REF",
        description: "To specify identifying information",
        name: "Reference Identification",
      },
      ELEMENTS: {
        REF_01: {
          code: "REF_01",
          description: `Code qualifying the Reference Identification
DP = Department Number
IA = Internal Vendor Number
PD = Promotion/Deal Number`,
          name: "",
        },
        REF_02: {
          code: "REF_02",
          description: `Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier
IA = Vendor Number. Vendor number must be 7 digits. Add leading zeroes to make 7 digits.
PD = Promotion/Deal Number
DP = Department
Note: Department must be 3 digits. Add leading zero(s) to make 3 digits.`,
          name: "",
        },
      },
    },
    N1: {
      SEGMENT: {
        code: "N1",
        description:
          "To identify a party by type of organization, name, and code",
        name: "Name",
      },
      ELEMENTS: {
        N1_01: {
          code: "N1_01",
          name: "",
          description: `Code identifying an organizational entity, a physical location, property or an individual

BS Bill and Ship To
BY Buying Party (Purchaser)
SF Ship From
ST Ship To`,
        },
        N1_02: {
          code: "N1_02",
          name: "",
          description: `Free-form name
Not used by Target`,
        },
        N1_03: {
          code: "N1_03",
          name: "",
          description: `Code designating the system/method of code structure used for Identification
Code (67)

91 Assigned by Seller or Seller's Agent

Used when N101 = SF.

92 Assigned by Buyer or Buyer's Agent`,
        },
        N1_04: {
          code: "N_104",
          name: "",
          description: `Code identifying a party or other code
A list of Target location codes may be found on the Partners Online website`,
        },
      },
    },
    ITD: {
      SEGMENT: {
        code: "ITD",
        description: "To specify terms of sale",
        name: "Terms of Sale/Deferred Terms of Sale",
      },
      ELEMENTS: {
        ITD_01: {
          code: "ITD_01",
          name: "",
          description: `Code identifying type of payment terms
01 Basic
02 End of Month (EOM)

When this code is used, ITD07 should NOT be sent.

14 Previously agreed upon
Not used by Target at this time.`,
        },
        ITD_02: {
          code: "ITD_02",
          name: "",
          description: `Code identifying the beginning of the terms period
2 Delivery Date
3 Invoice Date`,
        },
        ITD_03: {
          code: "ITD_03",
          name: "",
          description: `Terms discount percentage, expressed as a percent, available to the purchaser if
an invoice is paid on or before the Terms Discount Due Date`,
        },
        ITD_04: {
          code: "ITD_04",
          name: "",
          description: `Date payment is due if discount is to be earned expressed in format CCYYMMDD
Not used by Target.`,
        },
        ITD_05: {
          code: "ITD_05",
          name: "",
          description: `Number of days in the terms discount period by which payment is due if terms discount is earned`,
        },
        ITD_06: {
          code: "ITD_06",
          name: "",
          description: `Date when total invoice amount becomes due expressed in format CCYYMMDD
Not used by Target.`,
        },
        ITD_07: {
          code: "ITD_07",
          name: "",
          description: `Number of days until total invoice amount is due (discount not applicable)`,
        },
        ITD_08: {
          code: "ITD_08",
          name: "",
          description: `Total amount of terms discount`,
        },
      },
    },
    N3: {
      SEGMENT: {
        code: "N3",
        name: "Address Information",
        description: "To specify the location of the named party",
      },
      ELEMENTS: {
        N3_01: {
          code: "N3_01",
          description: "Address information",
          name: "",
        },
        N3_02: {
          code: "N3_01",
          description: "Address information",
          name: "",
        },
      },
    },
    N4: {
      SEGMENT: {
        code: "N4",
        description: "To specify the geographic place of the named party",
        name: "Geographic location",
      },
      ELEMENTS: {
        N4_01: {
          code: "N4_01",
          name: "",
          description: "City Name",
        },
        N4_02: {
          code: "N4_02",
          name: "",
          description: "State or Province Code",
        },
        N4_03: {
          code: "N4_03",
          name: "",
          description: `Postal Code
Code defining international postal zone code excluding punctuation and blanks (zip code for United States)`,
        },
      },
    },
    MSG: {
      SEGMENT: {
        code: "MSG",
        name: "Message Text",
        description:
          "To provide a free-form format that allows the transmission of text information",
      },
      ELEMENTS: {
        MSG_01: {
          code: "MSG_01",
          description: `Free-form message text
MSG*The perishable agricultural commodities listed on this
MSG*invoice are sold subject to the statutory trust authorized
MSG*by Section 5(c) of the Perishable Agricultural Commodities
MSG*Act, 1930 (7 U.S.C. 4993(c)). The seller of these
MSG*commodities retains a trust claim over these commodities,
MSG*all inventories of food or other products derived from
MGS*these commodities, and any receivables or proceeds from
MSG*the sale of these commodities until full payment is
MSG*received.`,
          name: "",
        },
      },
    },
    N9: {
      SEGMENT: {
        code: "N9",
        description:
          "To transmit identifying information as specified by the Reference Identification Qualifier",
        name: "Reference Identification",
      },
      ELEMENTS: {
        N9_01: {
          code: "N9_01",
          name: "",
          description: `Code qualifying the Reference Identification
ZZ Mutually Defined`,
        },
        N9_02: {
          code: "N9_02",
          name: "",
          description: `Reference information as defined for a particular Transaction Set or as
specified by the Reference Identification Qualifier
PACA`,
        },
      },
    },
    IT1: {
      SEGMENT: {
        code: "IT1",
        description:
          "To specify the basic and most frequently used line item data for the invoice and related transactions",
        name: "Baseline Item Data (Invoice)",
      },
      ELEMENTS: {
        IT1_01: {
          code: "IT1_01",
          description:
            "Alphanumeric characters assigned for differentiation within a transaction set",
          name: "",
        },
        IT1_02: {
          code: "IT1_02",
          description: "Number of units invoiced (supplier units)",
          name: "",
        },
        IT1_03: {
          code: "IT1_03",
          description: `Code specifying the units in which a value is being expressed, or manner in
which a measurement has been taken
The UOM should match the UOM received on the PO. The value in the ISS02
must be the same as this value.
CA Case
EA Each
LB Pound`,
          name: "",
        },
        IT1_04: {
          code: "IT1_04",
          description: `Price per unit of product, service, commodity, etc.
Target only reads out five places after the decimal point, sending more than 5
places can result in a fatal error.`,
          name: "",
        },
        IT1_05: {
          code: "IT1_05",
          description: `Code identifying the type of unit price for an item
Not used by Target`,
          name: "",
        },
        IT1_06: {
          code: "IT1_06",
          description: `Code identifying the type/source of the descriptive number used in Product/Service ID (234)
Either a CB or UP or UI or EN must be sent.

CB    Buyer's Catalog Number
EN    European Article Number (EAN) (2-5-5-1)
EO    EAN/UCC - 8
IN     Buyer's Item Number
        Target Corporation Item Number (TCIN)
UI     U.P.C. Consumer Package Code (1-5-5)
        To be used by direct to store delivery beverage vendors only.
UP    U.P.C. Consumer Package Code (1-5-5-1)`,
          name: "",
        },
        IT1_07: {
          code: "IT1_07",
          description: `Identifying number for a product or service`,
          name: "",
        },
        IT1_08: {
          code: "IT1_08",
          description: `Code identifying the type/source of the descriptive number used in Product/Service ID (234)
Either a CB or UP or UI or EN must be sent.

CB    Buyer's Catalog Number
EN    European Article Number (EAN) (2-5-5-1)
EO    EAN/UCC - 8
IN     Buyer's Item Number
        Target Corporation Item Number (TCIN)
UI     U.P.C. Consumer Package Code (1-5-5)
        To be used by direct to store delivery beverage vendors only.
UP    U.P.C. Consumer Package Code (1-5-5-1)`,
          name: "",
        },
        IT1_09: {
          code: "IT1_09",
          description: "Identifying number for a product or service",
          name: "",
        },
        IT1_10: {
          code: "IT1_10",
          description: `Code identifying the type/source of the descriptive number used in Product/Service ID (234)
Either a CB or UP or UI or EN must be sent.

CB    Buyer's Catalog Number
EN    European Article Number (EAN) (2-5-5-1)
EO    EAN/UCC - 8
IN     Buyer's Item Number
        Target Corporation Item Number (TCIN)
UI     U.P.C. Consumer Package Code (1-5-5)
        To be used by direct to store delivery beverage vendors only.
UP    U.P.C. Consumer Package Code (1-5-5-1)`,
          name: "",
        },
        IT1_11: {
          code: "IT1_11",
          description: "Identifying number for a product or service",
          name: "",
        },
      },
    },
    TDS: {
      SEGMENT: {
        code: "TDS",
        description: "To specify the total invoice discounts and amounts",
        name: "Total Monetary Value Summary",
      },
      ELEMENTS: {
        TDS_01: {
          code: "TDS_01",
          name: "",
          description: `Monetary amount
Total amount of invoice (including charges, less allowances) before terms
discount.`,
        },
        TDS_02: {
          code: "TDS_02",
          name: "",
          description: `Monetary amount
Total amount of merchandise. If you offer a discount on gross amount before
allowances, this field is required. Otherwise it is not needed.`,
        },
      },
    },
    SAC: {
      SEGMENT: {
        code: "SAC",
        description: `To request or identify a service, promotion, allowance, or charge; to specify the amount or percentage for the service, promotion, allowance, or charge`,
        name: "Service, Promotion, Allowance, or Charge Information",
      },
      ELEMENTS: {
        SAC_01: {
          code: "SAC_01",
          description: `Code which indicates an allowance or charge for the service specified

A Allowance
C Charge`,
          name: "",
        },
        SAC_02: {
          code: "SAC_02",
          description: `Below is a list of the most common codes.
B950    Damaged Merchandise
C310    Discount
D170    Free Goods
D270    Fuel Surcharge
F800     Promotional Allowance
H000    Special Allowance
H090    Special Handling
H700    Tax - Local Tax
             CRV - Container Redemption (bottle deposit)
H750    State and Local Tax`,
          name: "",
        },
        SAC_03: {
          code: "SAC_03",
          description:
            "VI Voluntary Inter-Industry Commerce Standard (VICS) EDI",
          name: "",
        },
        SAC_04: {
          code: "SAC_04",
          description: "HA Hanger Service",
          name: "",
        },
        SAC_05: {
          code: "SAC_05",
          description: `Monetary amount
Monetary amount must be 10 cents or greater. Anything less than 10 cents will be rejected and will not feed into Target's application system. Two decimal places are implied, do not send a decimal point.`,
          name: "",
        },
        SAC_06: {
          code: "SAC_06",
          description:
            "Code indicating on what basis allowance or charge percent is calculated",
          name: "",
        },
        SAC_07: {
          code: "SAC_07",
          description: "Percent expressed as a percent",
          name: "",
        },
        SAC_08: {
          code: "SAC_08",
          description: `Rate expressed in the standard monetary denomination for the currency specified
Not used by Target`,
          name: "",
        },
        SAC_09: {
          code: "SAC_09",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken
EA Each`,
          name: "",
        },
        SAC_10: {
          code: "SAC_10",
          description: `Numeric value of quantity
When SAC02 = D170, this data element is required and should contain the quantity of free goods. SAC09 should contain the unit of measure of the free goods.`,
          name: "",
        },
        SAC_11: {
          code: "SAC_11",
          description: `Numeric value of quantity
Not used by Target`,
          name: "",
        },
        SAC_12: {
          code: "SAC_12",
          description: `Code indicating method of handling for an allowance or charge
02 Off Invoice
06 Charge to be Paid by Customer`,
          name: "",
        },
        SAC_13: {
          code: "SAC_13",
          description: `Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier
Not used by Target`,
          name: "",
        },
        SAC_14: {
          code: "SAC_14",
          description: `A unique number identifying available promotion or allowance options when more than one is offered
Not used by Target`,
          name: "",
        },
        SAC_15: {
          code: "SAC_15",
          description: `A free-form description to clarify the related data elements and their content`,
          name: "",
        },
      },
    },
    ISS: {
      SEGMENT: {
        code: "ISS",
        description:
          "To specify summary details of total items shipped in terms of quantity, weight, and volume",
        name: "Invoice Shipment Summary",
      },
      ELEMENTS: {
        ISS_01: {
          code: "ISS_01",
          name: "",
          description:
            "Numeric value of units shipped in manufacturer's shipping units for a line item or transaction set",
        },
        ISS_02: {
          code: "ISS_02",
          name: "",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken
CA Case
CT Carton
EA Each
LB Pound`,
        },
        ISS_03: {
          code: "ISS_03",
          name: "",
          description: "Numeric value of weight",
        },
        ISS_04: {
          code: "ISS_04",
          name: "",
          description: `Code specifying the units in which a value is being expressed, or manner in
which a measurement has been taken
LB Pound`,
        },
      },
    },
    CTT: {
      SEGMENT: {
        code: "CTT",
        description:
          "To transmit a hash total for a specific element in the transaction set",
        name: "Transaction Totals",
      },
      ELEMENTS: {
        CTT_01: {
          code: "CTT_01",
          name: "",
          description: "Total number of line items in the transaction set",
        },
      },
    },
    DTM: {
      SEGMENT: {
        code: "DTM",
        description: "To specify pertinent dates and times",
        name: "Date/Time Reference",
      },
      ELEMENTS: {
        DTM_01: {
          code: "DTM_01",
          description: `Code specifying type of date or time, or both date and time

011 Shipped`,
          name: "",
        },
        DTM_02: {
          code: "DTM_02",
          description: `Date expressed as CCYYMMDD
Date Merchandise was shipped.`,
          name: "",
        },
      },
    },
    CAD: {
      SEGMENT: {
        code: "CAD",
        name: "Carrier Detail",
        description: "To specify transportation details for the transaction",
      },
      ELEMENTS: {
        CAD_01: {
          code: "CAD_01",
          description: `Code specifying the method or type of transportation for the shipment
C    Consolidation
       Used for domestic consolidation
M    Motor (Common Carrier)
       used for larger quantity shipments

P     Private Carrier
       used for Direct Store Delivery (DSD)

U     Private Parcel Service
       Used for small package or small quantities. ONLY
       UPSN or FDEG may use this.`,
          name: "",
        },
        CAD_02: {
          code: "CAD_02",
          description: `Prefix or alphabetic part of an equipment unit's identifying number
Not used by Target`,
          name: "",
        },
        CAD_03: {
          code: "CAD_03",
          description: `Sequencing or serial part of an equipment unit's identifying number (pure
numeric form for equipment number is preferred)
Not used by Target`,
          name: "",
        },
        CAD_04: {
          code: "CAD_04",
          description: `Standard Carrier Alpha Code`,
          name: "",
        },
        CAD_05: {
          code: "CAD_05",
          description: `Free-form description of the routing or requested routing for shipment, or the
originating carrier's identity`,
          name: "",
        },
        CAD_06: {
          code: "CAD_06",
          description: `Code indicating the status of an order or shipment or the disposition of any difference between the quantity ordered and the quantity shipped for a line item or transaction
Not used by Target`,
          name: "",
        },
        CAD_07: {
          code: "CAD_07",
          description: `Code qualifying the Reference Identification
A value is not required in the CAD07 for DSD vendors.
BM    Bill of Lading Number
          Required when shipping via motor carrier or
          consolidation.

CN     Carrier's Reference Number (PRO/Invoice)
          Required when shipping parcel package shipments.`,
          name: "",
        },
        CAD_08: {
          code: "CAD_08",
          description: `Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier
A value is not required in the CAD08 for DSD vendors.`,
          name: "",
        },
      },
    },
    PO4: {
      SEGMENT: {
        code: "PO4",
        description:
          "To specify the physical qualities, packaging, weights, and dimensions relating to the item",
        name: "Item Physical Details",
      },
      ELEMENTS: {
        PO4_01: {
          code: "PO4_01",
          description: `The number of inner containers, or number of eaches if there are no inner containers, per outer container`,
          name: "",
        },
        PO4_02: {
          code: "PO4_02",
          description: `Size of supplier units in pack
Not used by Target`,
          name: "",
        },
        PO4_03: {
          code: "PO4_03",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken
Not used by Target`,
          name: "",
        },
        PO4_04: {
          code: "PO4_04",
          description: `Code identifying the type of packaging; Part 1: Packaging Form, Part 2: Packaging Material; if the Data Element is used, then Part 1 is always required
Not used by Target`,
          name: "",
        },
        PO4_05: {
          code: "PO4_05",
          description: `Code defining the type of weight
Not used by Target`,
          name: "",
        },
        PO4_06: {
          code: "PO4_06",
          description: `Numeric value of gross weight per pack
Not used by Target`,
          name: "",
        },
        PO4_07: {
          code: "PO4_07",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken
Not used by Target`,
          name: "",
        },
        PO4_08: {
          code: "PO4_08",
          description: `Numeric value of gross volume per pack
Not used by Target`,
          name: "",
        },
        PO4_09: {
          code: "PO4_09",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken
Not used by Target`,
          name: "",
        },
        PO4_10: {
          code: "PO4_10",
          description: `Largest horizontal dimension of an object measured when the object is in the upright position
Not used by Target`,
          name: "",
        },
        PO4_11: {
          code: "PO4_11",
          description: `Shorter measurement of the two horizontal dimensions measured with the object in the upright position
Not used by Target`,
          name: "",
        },
        PO4_12: {
          code: "PO4_12",
          description: `Vertical dimension of an object measured when the object is in the upright position
Not used by Target`,
          name: "",
        },
        PO4_13: {
          code: "PO4_13",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken
Not used by Target`,
          name: "",
        },
        PO4_14: {
          code: "PO4_14",
          description: `The number of eaches per inner container`,
          name: "",
        },
      },
    },
    PID: {
      SEGMENT: {
        code: "PID",
        name: "Product/Item Description",
        description:
          "To describe a product or process in coded or free-form format",
      },
      ELEMENTS: {
        PID_01: {
          code: "PID_01",
          description: "F Free-form",
          name: "",
        },
        PID_02: {
          code: "PID_02",
          description: `Code identifying the general class of a product or process characteristic
08 Product`,
          name: "",
        },
        PID_03: {
          code: "PID_03",
          description: `Code identifying the agency assigning the code values
Not used by Target`,
          name: "",
        },
        PID_04: {
          code: "PID_04",
          description: `A code from an industry code list which provides specific data about a product characteristic
Not used by Target`,
          name: "",
        },
        PID_05: {
          code: "PID_05",
          description: `A free-form description to clarify the related data elements and their content`,
          name: "",
        },
      },
    },
  },
  CVS_SOPI_856_EDI_GLOSSARY: {
    BSN: {
      SEGMENT: {
        code: "BSN",
        description:
          "To transmit identifying numbers, dates, and other basic data relating to the transaction set",
        name: "Beginning Segment for Ship Notice",
      },
      ELEMENTS: {
        BSN_01: {
          code: "BSN_01",
          description: `Code identifying purpose of transaction set

00 Original`,
          name: "",
        },
        BSN_02: {
          code: "BSN_02",
          description: `Shipment Identification - a unique control number assigned by original shipper`,
          name: "",
        },
        BSN_03: {
          code: "BSN_03",
          description: `BSN03 is the date the shipment transaction set is created.
Date expressed as CCYYMMDD`,
          name: "",
        },
        BSN_04: {
          code: "BSN_04",
          description: `BSN04 is the time the shipment transaction set is created.
Time expressed in 24-hour clock time as follows: HHMM, or HHMMSS, or HHMMSSD, or HHMMSSDD, where H = hours (00-23), M = minutes (00-59), S = integer seconds (00-59) and DD = decimal seconds; decimal seconds are expressed as follows: D = tenths (0-9) and DD = hundredths (00-99)`,
          name: "",
        },
        BSN_05: {
          code: "BSN_05",
          description: `Code indicating the hierarchical application structure of a transaction set that utilizes the HL segment to define the structure of the transaction set

0001 Shipment, Order, Packaging, Item (if SOTI-formatted ASN)
0003 Shipment, Packaging, Order, Item (if STOI-formatted ASN)
0004 Shipment, Order, Item`,
          name: "",
        },
      },
    },
    HL: {
      SEGMENT: {
        code: "HL",
        description:
          "To identify dependencies among and the content of hierarchically related groups of data segments",
        name: "Hierarchical Level",
      },
      ELEMENTS: {
        HL_01: {
          code: "HL_01",
          description:
            "A unique number assigned by the sender to identify a particular data segment in a hierarchical structure",
          name: "",
        },
        HL_02: {
          code: "HL_02",
          description: `Identification number of the next higher hierarchical data segment that the data segment being described is subordinate to
Not used by the Retail Industry`,
          name: "",
        },
        HL_03: {
          code: "HL_03",
          description: `Code defining the characteristic of a level in a hierarchical structure:
S Shipment
O Order
T  Shipping Tare
P Pack
I  Item`,
          name: "",
        },
        HL_04: {
          code: "HL_04",
          description: `Code indicating if there are hierarchical child data segments subordinate to the level being described.

0 No subordinate hierarchical levels present
1 Subordinate hierarchical levels present `,
          name: "",
        },
      },
    },
    TD5: {
      SEGMENT: {
        code: "TD5",
        description:
          "To specify the carrier and sequence of routing and provide transit time information",
        name: "Carrier Details (Routing Sequence/Transit Time)",
      },
      ELEMENTS: {
        TD5_01: {
          code: "TD5_01",
          description: `Code describing the relationship of a carrier to a specific shipment movement

B Origin/Delivery Carrier (Any Mode)`,
          name: "",
        },
        TD5_02: {
          code: "TD5_02",
          description: `Code designating the system/method of code structure used for Identification Code (67)
          
2        Standard Carrier Alpha Code (SCAC)`,
          name: "",
        },
        TD5_03: {
          code: "TD5_03",
          description: `Target requires the 4-character alpha code.
The SCAC code must be sent in upper case.`,
          name: "",
        },
        TD5_04: {
          code: "TD5_04",
          description: `Code specifying the method or type of transportation for the shipment.

A Air
AE Air Express
M Motor (Common Carrier)
R Rail
S Ocean
SR Supplier Truck
U Private Parcel Sevice
X Intermodal (Piggyback)`,
          name: "",
        },
        TD5_05: {
          code: "TD5_05",
          description: `Free-form description of the routing or requested routing for shipment, or the originating carrier's identity`,
          name: "",
        },
      },
    },
    TD3: {
      SEGMENT: {
        code: "TD3",
        description:
          "To specify transportation details relating to the equipment used by the carrier",
        name: "Carrier Details (Equipment)",
      },
      ELEMENTS: {
        TD3_01: {
          code: "TD3_01",
          description: `Code identifying type of equipment used for shipment

CN Container
CZ Refrigerated Container
RT Controlled Temp Trailer (Reefer)
TL Trailer (not otherwise specified)
VE Vessel, Ocean`,
          name: "",
        },
        TD3_03: {
          code: "TD3_03",
          description: `Trailer Number / Air Bill Number`,
          name: "",
        },
      },
    },
    REF: {
      SEGMENT: {
        code: "REF",
        description: "To specify identifying information",
        name: "Reference Identification",
      },
      ELEMENTS: {
        REF_01: {
          code: "REF_01",
          name: "",
          description: `Code qualifying the Reference Identification

BM Bill of Lading Number - Provide Bill of Lading else alternate reference - Mandatory

CN Carrier's Reference Number (PRO/Invoice) - If Applicable

2I Tracking Number (Optional) - If Applicable`,
        },
        REF_02: {
          code: "REF_02",
          description: `Reference information as defined for a particular Transaction Set or as specified by the Reference Identification Qualifier`,
          name: "",
        },
      },
    },
    FOB: {
      SEGMENT: {
        code: "FOB",
        description:
          "To specify transportation instructions relating to shipment",
        name: "F.O.B. Related Instructions",
      },
      ELEMENTS: {
        FOB_01: {
          code: "FOB_01",
          description: `Shipment Method of Payment

Code identifying payment terms for transportation charges
CC Collect
PP Prepaid (By Seller)
PB Customer Pickup/Backhaul`,
          name: "",
        },
        FOB_02: {
          code: "FOB_02",
          description: `Location Qualifier

Code identifying type of location
OR Origin (Shipping Point)
PS 5-Digit US Zip Code
PU 6-Digit Canadian Postal Code`,
          name: "",
        },
        FOB_03: {
          code: "FOB_03",
          description: `Description`,
          name: "",
        },
        FOB_04: {
          code: "FOB_04",
          description: `Transportation Terms Qualifier Code

Code identifying the source of the transportation terms
02 Trade Terms`,
          name: "",
        },
        FOB_05: {
          code: "FOB_05",
          description: `Transportation Terms Code

Code identifying the trade terms which apply to the shipment transportation responsibility
FOB Free on Board`,
          name: "",
        },
      },
    },
    N1: {
      SEGMENT: {
        code: "N1",
        description:
          "To identify a party by type of organization, name, and code",
        name: "Name",
      },
      ELEMENTS: {
        N1_01: {
          code: "N1_01",
          description: `ST   Ship To
BY   Buying Party (Purchaser)`,
          name: "",
        },
        N1_02: {
          code: "N1_02",
          description: `Free-form name`,
          name: "",
        },
        N1_03: {
          code: "N1_03",
          description: `Code designating the system/method of code structure used for Identification Code.
          
1 D-U-N-S Number, Dun & Bradstreet
9 D-U-N-S+4, D-U-N-S Number with Four Character Suffix
11 Drug Enforcement Administration (DEA)
54 Warehouse
92 CVS store number`,
          name: "",
        },
        N1_04: {
          code: "N1_04",
          description: `Code identifying a party or other code

When N101 = ST, this will be a four digit location number.`,
          name: "",
        },
      },
    },
    N3: {
      SEGMENT: {
        code: "N3",
        description: "To specify the location of the named party",
        name: "Address information",
      },
      ELEMENTS: {
        N3_01: {
          code: "N3_01",
          description: `Address information`,
          name: "",
        },
        N3_02: {
          code: "N3_02",
          description: `Address information`,
          name: "",
        },
      },
    },
    N4: {
      SEGMENT: {
        code: "N4",
        description: "To specify the geographic place of the named party",
        name: "Geographic Location",
      },
      ELEMENTS: {
        N4_01: {
          code: "N4_01",
          description: `City name`,
          name: "",
        },
        N4_02: {
          code: "N4_02",
          description: `State or Province Code`,
          name: "",
        },
        N4_03: {
          code: "N4_03",
          description: `Postal Code`,
          name: "",
        },
        N4_04: {
          code: "N4_04",
          description: `Country Code`,
          name: "",
        },
      },
    },
    PRF: {
      SEGMENT: {
        code: "PRF",
        description: "To provide reference to a specific purchase order",
        name: "Purchase Order Reference",
      },
      ELEMENTS: {
        PRF_01: {
          code: "PRF_01",
          description: `CVSHealth Purchase Order Number`,
          name: "",
        },
        PRF_02: {
          code: "PRF_02",
          description: `Release number

Number identifying a release against a Purchase Order previously placed by the parties involved in the transaction`,
          name: "",
        },
        PRF_04: {
          code: "PRF_04",
          description: `Original Purchase Order Date`,
          name: "",
        },
      },
    },
    PID: {
      SEGMENT: {
        code: "PID",
        description:
          "To describe a product or process in coded or free-form format",
        name: "Product/Item Description",
      },
      ELEMENTS: {
        PID_01: {
          code: "PID_01",
          description: `Item description type

F Free-form`,
          name: "",
        },
        PID_05: {
          code: "PID_05",
          description: `A free-form description to clarify the related data elements and their content`,
          name: "",
        },
      },
    },
    TD1: {
      SEGMENT: {
        code: "TD1",
        description:
          "To specify the transportation details relative to commodity, weight, and quantity",
        name: "Carrier Details (Quantity and Weight)",
      },
      ELEMENTS: {
        TD1_01: {
          code: "TD1_01",
          description: `Code identifying the type of packaging.

CTN - Carton
CAS - Case
PLT - Pallet
TBN - Tote bin`,
          name: "",
        },
        TD1_02: {
          code: "TD1_02",
          description: `Lading Quantity

Number of units (pieces) of the lading commodity`,
          name: "",
        },
        TD1_06: {
          code: "TD1_06",
          description: `Weight qualifier

Code defining the type of weight.

G - Gross weight`,
          name: "",
        },
        TD1_07: {
          code: "TD1_07",
          description: `Numeric value of the weight`,
          name: "",
        },
        TD1_08: {
          code: "TD1_08",
          description: `Unit or basis of measurement code

LB - Pounds`,
          name: "",
        },
        TD1_09: {
          code: "TD1_09",
          description: `Numeric value of the Volume`,
          name: "",
        },
        TD1_10: {
          code: "TD1_10",
          description: `Unit or basis of measurement code

CF - Cubic feet`,
          name: "",
        },
      },
    },
    MAN: {
      SEGMENT: {
        code: "MAN",
        description:
          "To indicate identifying marks and numbers for shipping containers",
        name: "Marks and Numbers",
      },
      ELEMENTS: {
        MAN_01: {
          code: "MAN_01",
          description: `Code specifying the application or source of Marks and Numbers 

GM SSCC-18 and Application Identifier
AI Case UPC`,
          name: "",
        },
        MAN_02: {
          code: "MAN_02",
          description: `Marks and numbers used to identify a shipment or parts of a shipment

Must match SSCC-18 number that is sent on shipping label`,
          name: "",
        },
      },
    },
    PO4: {
      SEGMENT: {
        code: "PO4",
        description:
          "To specify the physical qualities, packaging, weights, and dimensions relating to the item",
        name: "Item Physical Details",
      },
      ELEMENTS: {
        PO4_01: {
          code: "PO4_01",
          description: `The number of inner containers, or number of eaches if there are no inner`,
          name: "",
        },
        PO4_02: {
          code: "PO4_02",
          description: `Size of supplier units in pack`,
          name: "",
        },
        PO4_03: {
          code: "PO4_03",
          description: `Unit or Basis for Measurement Code

CA Case
DZ Dozen
EA Each
PC Piece
SP Shelf Package - Used for RX only`,
          name: "",
        },
        PO4_04: {
          code: "PO4_04",
          description: `Code identifying the type of packaging.

PCS - Pieces`,
          name: "",
        },
        PO4_05: {
          code: "PO4_05",
          description: `Code defining the type of weight

G Gross Weight`,
          name: "",
        },
        PO4_06: {
          code: "PO4_06",
          description: `Numeric value of gross weight per pack`,
          name: "",
        },
        PO4_07: {
          code: "PO4_07",
          description: `Code specifying the units in which a value is being expressed, or manner in
which a measurement has been taken

LB Pound
OZ Ounce`,
          name: "",
        },
        PO4_08: {
          code: "PO4_08",
          description: `Numeric value of gross volume per pack`,
          name: "",
        },
        PO4_09: {
          code: "PO4_09",
          description: `Code specifying the units in which a value is being expressed, or manner in
which a measurement has been taken

CC Cubic Centimeter
CF Cubic Feet
CI Cubic Inches`,
          name: "",
        },
        PO4_10: {
          code: "PO4_10",
          description: `Length

Largest horizontal dimension of an object measured when the object is in the
upright position`,
          name: "",
        },
        PO4_11: {
          code: "PO4_11",
          description: `Width 

Shorter measurement of the two horizontal dimensions measured with the
object in the upright position`,
          name: "",
        },
        PO4_12: {
          code: "PO4_12",
          description: `Height

Vertical dimension of an object measured when the object is in the upright
position`,
          name: "",
        },
        PO4_13: {
          code: "PO4_13",
          description: `Unit or basis for measurement Code

CM Centimeter
IN Inch
MM Millimeter`,
          name: "",
        },
        PO4_18: {
          code: "PO4_18",
          description: `Total number of sellable units on the tare/pallet.`,
          name: "",
        },
      },
    },
    DTM: {
      SEGMENT: {
        code: "DTM",
        description: "To specify pertinent dates and times",
        name: "Date/Time Reference",
      },
      ELEMENTS: {
        DTM_01: {
          code: "DTM_01",
          description: `036      Expiration
011      Date Shipped
067      Current Scheduled Delivery`,
          name: "",
        },
        DTM_02: {
          code: "DTM_02",
          description: `Date expressed as CCYYMMDD`,
          name: "",
        },
        DTM_03: {
          code: "DTM_03",
          description: `Time expressed in 24-hour clock time as follows: HHMM, or HHMMSS`,
          name: "",
        },
      },
    },
    LIN: {
      SEGMENT: {
        code: "LIN",
        description: "To specify basic item identification data",
        name: "Item Identification",
      },
      ELEMENTS: {
        LIN_01: {
          code: "LIN_01",
          description: `Alphanumeric characters assigned for differentiation within a transaction set`,
          name: "",
        },
        LIN_02: {
          code: "LIN_02",
          description: `
Code identifying the type/source of the descriptive number used in Product/Service ID (234)

UA U.P.C./EAN Case Code (2-5-5)
or
UK U.P.C./EAN Shipping Container Code (1-2-5-5-1)
Data structure for the 14 digit EAN.UCC (EAN International.Uniform Code Council) Global Trade Identification Number (GTIN)

UI U.P.C. (1-5-5), if non-RX item
UD U.P.C./EAN (2-5-5), if non-RX item
ND NDC, if RX item`,
          name: "",
        },
        LIN_03: {
          code: "LIN_03",
          description: `Identifying number for a product or service

UPC/EAN case or container code as appropriate, aligned with LIN 02`,
          name: "",
        },
        LIN_04: {
          code: "LIN_04",
          description: `Code identifying the type/source of the descriptive number used in
Product/Service ID (234)

ND National Drug Code (NDC) if Rx
UI U.P.C. Consumer Package Code (1-5-5) if non-Rx`,
          name: "",
        },
        LIN_05: {
          code: "LIN_05",
          description: `Identifying number for a product or service`,
          name: "",
        },
        LIN_06: {
          code: "LIN_06",
          description: `Code identifying the type/source of the descriptive number used in
Product/Service ID (234)

VC Vendor's (Seller's) Catalog Number
PI Purchaser's (CVS Health) Item Number`,
          name: "",
        },
        LIN_07: {
          code: "LIN_07",
          description: `Identification number`,
          name: "",
        },
        LIN_08: {
          code: "LIN_08",
          description: `Product ID qualifier

VN Vendor Item Number/
LT Lot number`,
          name: "",
        },
        LIN_09: {
          code: "LIN_09",
          description: `Product/Service ID

Vendor's Item Number`,
          name: "",
        },
        LIN_10: {
          code: "LIN_10",
          description: `Product ID qualifier

VC Vendor (Seller's) Catalog Number, if different than Vendor Item Number.
If provided, must align with any 832/Product Catalog EDI documents sent to
CVS Health.`,
          name: "",
        },
        LIN_11: {
          code: "LIN_11",
          description: `Product/Service ID`,
          name: "",
        },
        LIN_12: {
          code: "LIN_12",
          description: `Product ID qualifier 

LT Lot number`,
          name: "",
        },
        LIN_13: {
          code: "LIN_13",
          description: `Lot number`,
          name: "",
        },
      },
    },
    SN1: {
      SEGMENT: {
        code: "SN1",
        description: "To specify line-item detail relative to shipment",
        name: "Item Detail (Shipment)",
      },
      ELEMENTS: {
        SN1_01: {
          code: "SN1_01",
          description: `Alphanumeric characters assigned for differentiation within a transaction set

ASN Line Number or Original PO Line Number, as referenced in LIN01`,
          name: "",
        },
        SN1_02: {
          code: "SN1_02",
          description: `Number of Units Shipped`,
          name: "",
        },
        SN1_03: {
          code: "SN1_03",
          description: `Unit or Basis for Measurement Code

Use any appropriate code from data element 355, as expected by CVSHealth.
For most non-RX shipments, 'CA' is preferred in the SN1 segment and the Case
Pack and Item information in the following PO4 segment.
CA Case
DZ Dozen
EA Each
PC Piece
SP Shelf Package - used for RX only
PK Pack`,
          name: "",
        },
        SN1_04: {
          code: "SN1_04",
          description: `Number of Units Shipped to date, for partial orders`,
          name: "",
        },
        SN1_05: {
          code: "SN1_05",
          description: `Quantity ordered in original PO`,
          name: "",
        },
        SN1_06: {
          code: "SN1_06",
          description: `Unit or Basis for Measurement Code

CA Case
DZ Dozen
EA Each
PC Piece
SP Shelf Package - used for RX only
PK Pack`,
          name: "",
        },
      },
    },
    CTT: {
      SEGMENT: {
        code: "CTT",
        description:
          "To transmit a hash total for a specific element in the transaction set",
        name: "Transaction Totals",
      },
      ELEMENTS: {
        CTT_01: {
          code: "CTT_01",
          description: `Total number of line items in the transaction set
The number of HL segments present in the transaction set.`,
          name: "",
        },
      },
    },
  },
  CVS_SOPI_810_EDI_GLOSSARY: {
    BIG: {
      SEGMENT: {
        code: "BIG",
        description:
          "To indicate the beginning of an invoice transaction set and transmit identifying numbers and dates",
        name: "Beginning Segment of Invoice",
      },
      ELEMENTS: {
        BIG_01: {
          code: "BIG_01",
          description: `Invoice issue date.`,
          name: "",
        },
        BIG_02: {
          code: "BIG_02",
          description: `Invoice number number assigned by issuer`,
          name: "",
        },
        BIG_03: {
          code: "BIG_03",
          description: `Date expressed as CCYYMMDD`,
          name: "",
        },
        BIG_04: {
          code: "BIG_04",
          description: `PO number`,
          name: "",
        },
        BIG_07: {
          code: "BIG_07",
          description: `Code specifying the type of transaction`,
          name: "",
        },
      },
    },
    REF: {
      SEGMENT: {
        code: "REF",
        description: "To specify identifying information",
        name: "Reference Identification",
      },
      ELEMENTS: {
        REF_01: {
          code: "REF_01",
          description: `Code qualifying the Reference Identification

VR Vendor ID Number`,
          name: "",
        },
        REF_02: {
          code: "REF_02",
          description: `CVS Vendor Number`,
          name: "",
        },
      },
    },
    N1: {
      SEGMENT: {
        code: "N1",
        description:
          "To identify a party by type of organization, name, and code",
        name: "Name",
      },
      ELEMENTS: {
        N1_01: {
          code: "N1_01",
          description: `Code identifying an organizational entity, a physical location, property or an individual
          
RE  Party to receive commercial invoice remittance
ST  Ship To
SF  Ship From`,
          name: "",
        },
        N1_02: {
          code: "N1_02",
          description: `Free-form name`,
          name: "",
        },
        N1_03: {
          code: "N1_03",
          description: `Code designating the system/method of code structure used for Identification Code.
          
54  Warehouse
11  Drug Enforcement Administration (DEA)`,
          name: "",
        },
        N1_04: {
          code: "N1_04",
          description: `Identification code`,
          name: "",
        },
      },
    },
    N3: {
      SEGMENT: {
        code: "N3",
        description: "To specify the location of the named party",
        name: "Address Information",
      },
      ELEMENTS: {
        N3_01: {
          code: "N3_01",
          description: `Address information`,
          name: "",
        },
        N3_02: {
          code: "N3_02",
          description: `Address information`,
          name: "",
        },
      },
    },
    N4: {
      SEGMENT: {
        code: "N4",
        description: "To specify the geographic place of the named party",
        name: "Geographic location",
      },
      ELEMENTS: {
        N4_01: {
          code: "N4_01",
          description: `City Name`,
          name: "",
        },
        N4_02: {
          code: "N4_02",
          description: `State or Province Code`,
          name: "",
        },
        N4_03: {
          code: "N4_03",
          description: `Postal Code
Code defining international postal zone code excluding punctuation and blanks (zip code for United States)`,
          name: "",
        },
      },
    },
    ITD: {
      SEGMENT: {
        code: "ITD",
        description: "To specify terms of sale",
        name: "Terms of Sale/Deferred Terms of Sale",
      },
      ELEMENTS: {
        ITD_01: {
          code: "ITD_01",
          description: `Code identifying type of payment terms

01  Basic
02  End of Month (EOM)
04  Deferred or Installment
07  Extended`,
          name: "",
        },
        ITD_02: {
          code: "ITD_02",
          description: `Code identifying the beginning of the terms period

15 Receipt of Goods
4   Specified Date`,
          name: "",
        },
        ITD_03: {
          code: "ITD_03",
          description: `CVS SOPI Glossary
CVS SOPI Glossary
100%
8
E25

Terms discount percentage, expressed as a percent, available to the purchaser if an invoice is paid on or before the Terms Discount Due Date
To enable screen reader support, press ⌘+Option+Z To learn about keyboard shortcuts, press ⌘slash
 
 
     
Terms discount percentage, expressed as a percent, available to the purchaser if an invoice is paid on or before the Terms Discount Due Date
Turn on screen reader support`,
          name: "",
        },
        ITD_05: {
          code: "ITD_05",
          description: `Number of days in the terms discount period by which payment is due if terms discount is earned`,
          name: "",
        },
        ITD_07: {
          code: "ITD_07",
          description: `Number of days until total invoice amount is due (discount not applicable)`,
          name: "",
        },
        ITD_10: {
          code: "ITD_10",
          description: `Deferred amount due for payment`,
          name: "",
        },
      },
    },
    DTM: {
      SEGMENT: {
        code: "DTM",
        description: "To specify pertinent dates and times",
        name: "Date/Time Reference",
      },
      ELEMENTS: {
        DTM_01: {
          code: "DTM_01",
          description: `Code specifying type of date or time, or both date and time

011 Shipped`,
          name: "",
        },
        DTM_02: {
          code: "DTM_02",
          description: `Date expressed as CCYYMMDD
Date Merchandise was shipped.`,
          name: "",
        },
      },
    },
    FOB: {
      SEGMENT: {
        code: "FOB",
        description:
          "To specify transportation instructions relating to shipment",
        name: "F.O.B. Related Instructions",
      },
      ELEMENTS: {
        FOB_01: {
          code: "FOB_01",
          description: `Code identifying payment terms for transportation charges

BP  Paid by Buyer
CC  Collect
FO  FOB Port of Call
PC  Prepaid but Charged to Customer
PP  Prepaid (by Seller)
TP  Third Party Pay`,
          name: "",
        },
        FOB_02: {
          code: "FOB_02",
          description: `Code identifying type of location

OR  Origin (Shipping Point)`,
          name: "",
        },
        FOB_03: {
          code: "FOB_03",
          description: `A free-form description to clarify the related data elements and their content`,
          name: "",
        },
      },
    },
    IT1: {
      SEGMENT: {
        code: "IT1",
        description:
          "To specify the basic and most frequently used line item data for the invoice and related transactions",
        name: "Baseline Item Data (Invoice)",
      },
      ELEMENTS: {
        IT1_02: {
          code: "IT1_02",
          description: `Number of units invoiced (supplier units)`,
          name: "",
        },
        IT1_03: {
          code: "IT1_03",
          description: `Code specifying the units in which a value is being expressed, or manner in which a measurement has been taken

CA  Case
PC  Piece
EA  Each
DZ  Dozen`,
          name: "",
        },
        IT1_04: {
          code: "IT1_04",
          description: `Price per unit of product, service, commodity, etc.`,
          name: "",
        },
        IT1_05: {
          code: "IT1_05",
          description: `Code identifying the type of unit price for an item

CP  Current Price (Subject to Change)
DS  Discount
PR  Promotion`,
          name: "",
        },
        IT1_06: {
          code: "IT1_06",
          description: `Code identifying the type/source of the descriptive number used in Product/Service ID

UI  U.P.C. Consumer Package Code (1-5-5)
ND  National Drug Code (NDC)
UD  U.P.C./EAN Consumer Package Code (2-5-5)`,
          name: "",
        },
        IT1_07: {
          code: "IT1_07",
          description: `Identifying number for a product or service.

If no UPC is available, will be Purchaser's Item Number (6 characters)`,
          name: "",
        },
        IT1_08: {
          code: "IT1_08",
          description: `Code identifying the type/source of the descriptive number used in Product/Service ID 

UA  U.P.C./EAN Case Code (2-5-5)
PI  Purchaser's Item Code`,
          name: "",
        },
        IT1_09: {
          code: "IT1_09",
          description: `Identifying number for a product or service`,
          name: "",
        },
        IT1_10: {
          code: "IT1_10",
          description: `Code identifying the type/source of the descriptive number used in Product/Service ID

PI Purchaser's Item Code`,
          name: "",
        },
        IT1_11: {
          code: "IT1_11",
          description: `Identifying number for a product or service`,
          name: "",
        },
      },
    },
    PID: {
      SEGMENT: {
        code: "PID",
        description:
          "To describe a product or process in coded or free-form format",
        name: "Product/Item Description",
      },
      ELEMENTS: {
        PID_01: {
          code: "PID_01",
          description: `F Free-form`,
          name: "",
        },
        PID_05: {
          code: "PID_05",
          description: `A free-form description to clarify the related data elements and their content`,
          name: "",
        },
      },
    },
    PO4: {
      SEGMENT: {
        code: "PO4",
        description:
          "To specify the physical qualities, packaging, weights, and dimensions relating to the item",
        name: "Item Physical Details",
      },
      ELEMENTS: {
        PO4_01: {
          code: "PO4_01",
          description: `CVS ordered Case Pack (Number of selling Units per Case)`,
          name: "",
        },
      },
    },
    SAC: {
      SEGMENT: {
        code: "SAC",
        description:
          "To request or identify a service, promotion, allowance, or charge; to specify the amount or percentage for the service, promotion allowance, or charge",
        name: "Service, Promotion, Allowance, or Charge Information",
      },
      ELEMENTS: {
        SAC_01: {
          code: "SAC_01",
          description: `Code which indicates an allowance or charge for the service specified

A Allowance`,
          name: "",
        },
        SAC_02: {
          code: "SAC_02",
          description: `Code identifying the service, promotion, allowance, or charge

ZZZZ Mutually Defined if not one of the following:
G020 Bottle redemption/CRV charges(Alcohol ONLY)
H850 Taxes
H650 Tax for Hawaii DC only
D240 Freight`,
          name: "",
        },
        SAC_05: {
          code: "SAC_05",
          description: `Monetary amount`,
          name: "",
        },
        SAC_12: {
          code: "SAC_12",
          description: `Code indicating method of handling for an allowance or charge

02 Off Invoice`,
          name: "",
        },
        SAC_15: {
          code: "SAC_15",
          description: `A free-form description to clarify the related data elements and their content`,
          name: "",
        },
      },
    },
    TDS: {
      SEGMENT: {
        code: "TDS",
        description: "To specify the total invoice discounts and amounts",
        name: "Total Monetary Value Summary",
      },
      ELEMENTS: {
        TDS_01: {
          code: "TDS_01",
          description: `Monetary amount

Total amount of invoice (including charges, less allowances) before terms discount.`,
          name: "",
        },
        TDS_02: {
          code: "TDS_02",
          description: `Monetary amount

Invoice Amount subject to discount. The amount upon which the terms discount amount is calculated.`,
          name: "",
        },
        TDS_03: {
          code: "TDS_03",
          description: `The amount of invoice due if paid by terms discount due date (total invoice amount less cash discount).`,
          name: "",
        },
        TDS_04: {
          code: "TDS_04",
          description: `The total amount of terms discount.`,
          name: "",
        },
      },
    },
    ISS: {
      SEGMENT: {
        code: "ISS",
        description:
          "To specify summary details of total items shipped in terms of quantity, weight, and volume",
        name: "Invoice Shipment Summary",
      },
      ELEMENTS: {
        ISS_01: {
          code: "ISS_01",
          description: `Number of Units Shipped`,
          name: "",
        },
        ISS_02: {
          code: "ISS_02",
          description: `Unit or Basis for Measurement Code

CA  Case`,
          name: "",
        },
      },
    },
    CTT: {
      SEGMENT: {
        code: "CTT",
        description:
          "To transmit a hash total for a specific element in the transaction set",
        name: "Transaction Totals",
      },
      ELEMENTS: {
        CTT_01: {
          code: "CTT_01",
          description: `Total number of line items in the transaction set`,
          name: "",
        },
      },
    },
    N9: {
      SEGMENT: {},
      ELEMENTS: {},
    },
  },
};
