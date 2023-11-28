export const firstTransactionSet =
  "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]";

export const termTypeCodeToTextMap: Record<string, string> = {
  "01": "Basic",
  "02": "End of Month (EOM)",
  "03": "Fixed Date",
  "04": "Deferred or Installment",
  "05": "Discount Not Applicable",
  "06": "Mixed",
  "07": "Extended",
  "11": "Elective",
  "23": "Payment Due Upon Receipt of Invoice",
};

export const termBasisCodeToTextMap: Record<string, string> = {
  "3": "Invoice Date",
  "5": "Invoice Receipt Date",
  "15": "Receipt of Goods",
};
