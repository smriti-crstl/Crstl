import React from "react";

import EdiEditPage from "./EdiEditPage";

const DOCUMENT_TYPE_ID = "865";

function EdiPOChangeAckEditPage() {
  return <EdiEditPage documentTypeId={DOCUMENT_TYPE_ID} />;
}

function areEqual(prevProps: any, nextProps: any) {
  console.log("forcing true return");
  return true;
}

const EdiPOChangeAckEditPageMemo = React.memo(EdiPOChangeAckEditPage, areEqual);

export { EdiPOChangeAckEditPageMemo as EdiPOChangeAckEditPage };

