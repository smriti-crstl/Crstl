import { ICoreOrdersTextConstants } from "./interface";

export const CORE_ORDERS_TEXT_CONSTANTS: ICoreOrdersTextConstants = {
  WELCOME_MODAL: {
    BUTTON_TEXT: "Get Started",
    HEADING: "Welcome to Crstl",
    SUB_HEADING: "We’re happy to have you on board!",
  },
  TAB_NAMES: {
    ALL: "All",
    DRAFTS: "Drafts",
  },
  CTA_BUTTON: {
    TEXT: "Create New Order",
  },
  FILTER_NAMES: {
    CHANNEL_NAME: "Customer",
    CHARGEBACK_STATUS: "Chargeback Status",
    DELIVERY_STATUS: "Delivery Status",
    INVOICING_STATUS: "Invoice Status",
    ORDER_STATUS: "Order Status",
    PAYMENT_STATUS: "Payment Status",
  },
  VIEW: {
    ORDER_DETAILS: {
      TITLE: "Order Details",
      ATTACHMENT_TITLE: "Order & Related Attachments",
      ATTACHMENTS_INFO:
        "3 files maximum. Supported formats include PDF, PNG, JPEG.",
      UPLOAD_BUTTON_TEXT: "Upload",
      LIST: {
        ORDER_NAME: "Order #",
        CHANNEL: "Customer",
        PO_DATE: "Order Date",
        REQUESTED_DATE: "Requested Ship/Delivery Date",
        SHIP_TO_ADDRESS: "Ship To Address",
        NET_DAYS: "Net Days",
        DATA_ERROR: "Oops. Data not available. Please contact Crstl.",
        REQUESTED_DELIVERY: "Requested Delivery",
        EARLIEST_SHIP: "Earliest Ship",
        LATEST_SHIP: "Latest Ship",
        REQUESTED_SHIP: "Requested Ship",
        LATEST_DELIVERY: "Latest Delivery",
        SHIPMENT_TRACKING: "Shipment Tracking",
        NET_DUE_DAYS: "Net due days",
        DISCOUNT_DUE_DAYS: "Discount due days",
        DISCOUNT_PERCENTAGE: "Discount percentage",
        TERMS_TYPE: "Terms type",
        TERMS_START_DATE: "Terms start date",
      },
    },
    COMMENTS: {
      ADD_BUTTON_TEXT: "Submit",
      ADD_INFO: "Only you and other teammates can see comments",
      HEADING: "Comments",
      MENTIONS_PLACEHOLDER: "Leave a comment",
      DELETE_COMMENT_BUTTON_TEXT: "Delete Comment",
    },
  },
};
