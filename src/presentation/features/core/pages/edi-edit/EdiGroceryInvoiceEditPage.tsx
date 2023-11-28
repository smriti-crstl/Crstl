import { memo } from "react";

import EdiEditPage from "./EdiEditPage";

const DOCUMENT_TYPE_ID = "880";

function EdiGroceryInvoiceEditPage() {
  return <EdiEditPage documentTypeId={DOCUMENT_TYPE_ID} />;
}

function areEqual(_prevProps: any, _nextProps: any) {
  return true;
}

const EdiGroceryInvoiceEditPageMemo = memo(EdiGroceryInvoiceEditPage, areEqual);

export { EdiGroceryInvoiceEditPageMemo as EdiGroceryInvoiceEditPage };

