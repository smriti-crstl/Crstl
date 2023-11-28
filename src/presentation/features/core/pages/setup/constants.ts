import { QuestionKeys } from "./types";

export const QUESTIONS: Record<keyof typeof QuestionKeys, string> = {
  NUMBER_OF_EDI_TRADING_PARTNERS:
    "1. How many trading partners do you expect to transact with using EDI in the next year?",
  AVERAGE_MONTHLY_PO_PROCESSED:
    "2. On average, how many POs do you expect to process each month?",
  SUPPORT_DROPSHIP_ORDERS:
    "3. Do you support or expect to support dropship orders?",
  WORK_WITH_3PL: "4. Do you work with 3PLs for order fulfillment?",
  INTERACT_WITH_EDI_DOCUMENTS:
    "5. How do you usually interact with EDI documents?",
  INTEGRATIONS_NEEDED:
    "6. Which external systems do you need to connect to Crstl?",
};

