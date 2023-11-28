import React from "react";
import EdiEditPage from "./EdiEditPage";

const DOCUMENT_TYPE_ID = "RTS";

function EdiRTSEditPage() {
  return <EdiEditPage documentTypeId={DOCUMENT_TYPE_ID} />;
}

function areEqual(prevProps: any, nextProps: any) {
  console.log("forcing true return");
  return true;
}

const EdiRTSEditPageMemo = React.memo(EdiRTSEditPage, areEqual);

export { EdiRTSEditPageMemo as EdiRTSEditPage };
