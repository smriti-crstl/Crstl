import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";

import { POChangePanel } from "../edi-grocery-purchase-order-change/POChangePanel";
import EdiViewPage from "./EdiViewPage";

const EdiGroceryPurchaseOrderChangeView = () => {
  return (
    <>
      <POChangePanel documentType="876" sourceDocumentType="875" />
      <EdiViewPage
        documentTypeId={CoreEDIDocumentNumber.GroceryPurchaseOrderChange}
      />
    </>
  );
};

export default EdiGroceryPurchaseOrderChangeView;

