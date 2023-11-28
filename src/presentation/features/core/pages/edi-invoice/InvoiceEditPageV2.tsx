import { useSearchParams } from "presentation/hooks/common";

import InvoiceEditPageFullEntryDynamicForm from "./v2/InvoiceEditPageFullEntryDynamicForm";
import InvoiceEditPageQuickEntryDynamicForm from "./v2/InvoiceEditPageQuickEntryDynamicForm";

function DynamicInvoicePageV2() {
  const searchParams = useSearchParams()
  const isFullEntryForm = searchParams.get("fullEntryForm")

  if (isFullEntryForm) {
    return <InvoiceEditPageFullEntryDynamicForm />
  }

  return <InvoiceEditPageQuickEntryDynamicForm />
}

export { DynamicInvoicePageV2 as default }
