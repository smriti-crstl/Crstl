import { COLORS } from "globals/themes/default/colors";
import { CSSProperties } from "react";

import { EdiWorkflowStep } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";

export const getChipStyles = (item: EdiWorkflowStep): CSSProperties => ({
  background: item?.disabled ? COLORS.GRAY_DARK : item.color?.backgroundColor,
  border: item?.disabled ? "none" : `1px solid ${item.color?.borderColor}`,
  padding: "8px 24px",
  cursor: item?.disabled ? "not-allowed" : "pointer",
});

export const getButtonStyles = (item: EdiWorkflowStep): CSSProperties => ({
  background: item.disabled ? COLORS.GRAY_DARK : item.color?.backgroundColor,
  color: item.disabled ? COLORS.SILVER_FOIL : item.color?.textColor,
  height: 44,
  width: 134,
  border: item?.disabled ? "none" : `1px solid ${item.color?.borderColor}`,
  cursor: item?.disabled ? "not-allowed" : "pointer",
});

export const getDocumentTypeFromSlug = (slug: string): string => {
  if (slug === "purchase-order") {
    return "850";
  } else if (slug === "grocery-purchase-order") {
    return "875";
  } else {
    return "";
  }
};

export const getSourceDocumentTypeFromSlug = (slug: string): string => {
  if (
    slug === "grocery-invoice" ||
    slug === "grocery-purchase-order" ||
    slug === "grocery-purchase-order-change"
  ) {
    return "875";
  }

  return "850";
};

