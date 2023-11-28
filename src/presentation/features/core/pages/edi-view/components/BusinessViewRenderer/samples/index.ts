import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";

import { config810 } from "./config810";
import { config850 } from "./config850";
import { config855 } from "./config855";
import { config856 } from "./config856";
import { config860 } from "./config860";
import { config865 } from "./config865";
import { config875 } from "./config875";
import { config876 } from "./config876";
import { config880 } from "./config880";
import { configRts } from "./configRts";

export const businessViewConfig: Record<CoreEDIDocumentNumber, any> = {
  [CoreEDIDocumentNumber.Invoice]: config810,
  [CoreEDIDocumentNumber.GroceryInvoice]: config880,
  [CoreEDIDocumentNumber.Acknowledgement]: config855,
  [CoreEDIDocumentNumber.ShipNotice]: config856,
  [CoreEDIDocumentNumber.RTS]: configRts,
  [CoreEDIDocumentNumber.PurchaseOrder]: config850,
  [CoreEDIDocumentNumber.GroceryPurchaseOrder]: config875,
  [CoreEDIDocumentNumber.PurchaseOrderChange]: config860,
  [CoreEDIDocumentNumber.PurchaseOrderChangeAck]: config865,
  [CoreEDIDocumentNumber.GroceryPurchaseOrderChange]: config876,
};

