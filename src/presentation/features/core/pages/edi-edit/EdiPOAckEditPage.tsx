import React from "react";
import EdiEditPage from "./EdiEditPage";

const DOCUMENT_TYPE_ID = "855";

function EdiPOAckEditPage() {
  return <EdiEditPage documentTypeId={DOCUMENT_TYPE_ID} />;
}

function areEqual(prevProps: any, nextProps: any) {
  console.log("forcing true return");
  return true;
}

const EdiPOAckEditPageMemo = React.memo(EdiPOAckEditPage, areEqual);

export { EdiPOAckEditPageMemo as EdiPOAckEditPage };
