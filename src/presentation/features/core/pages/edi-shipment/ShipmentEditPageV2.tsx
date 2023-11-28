import { useSearchParams } from "presentation/hooks/common";
import React, { useEffect } from "react";

import ShipmentEditPageFullEntryDynamicForm from "./v2/ShipmentEditPageFullEntryDynamicForm";
import ShipmentEditPageQuickEntryDynamicForm from "./v2/ShipmentEditPageQuickEntryDynamicForm";

function ShipmentEditPageV2() {
  const searchParams = useSearchParams()
  const isFullEntryForm = searchParams.get("fullEntryForm")

  if (isFullEntryForm) {
    return <ShipmentEditPageFullEntryDynamicForm />
  }

  return <ShipmentEditPageQuickEntryDynamicForm />
}

export default ShipmentEditPageV2
