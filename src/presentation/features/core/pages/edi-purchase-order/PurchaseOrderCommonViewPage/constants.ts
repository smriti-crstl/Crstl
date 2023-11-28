import { DocumentType } from "./types";

export const PageTitleMap: Record<DocumentType, string> = {
  acknowledgement: "Purchase Order Acknowledgement",
  rts: "Ready To Ship",
};

export const EditTextMap: Record<DocumentType, string> = {
  acknowledgement: "Acknowledgement",
  rts: "RTS",
};

export const DocumentTypeNumberMap: Record<DocumentType, string> = {
  acknowledgement: "855",
  rts: "RTS",
};
