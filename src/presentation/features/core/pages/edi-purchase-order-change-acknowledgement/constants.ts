export const firstTransactionSet =
  "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]";

export const responseCodeToTextMapping: Record<string, string> = {
  AI: "Add Additional Item(s) [AI]",
  add_additional_items_AI: "Add Additional Item(s) [AI]",
  CA: "Changes To Line Items [CA]",
  changes_to_line_items_CA: "Changes To Line Items [CA]",
  DI: "Delete Item(s) [DI]",
  delete_item_DI: "Delete Item(s) [DI]",
};

export const acknowledgementCodeToTextMapping: Record<string, string> = {
  AC: "Acknowledge - With Detail and Change",
  AD: "Acknowledge - With Detail, No Change",
  AK: "Acknowledge - No Detail or Change",
  AT: "Accepted",
  RJ: "Rejected - No Detail",
};
