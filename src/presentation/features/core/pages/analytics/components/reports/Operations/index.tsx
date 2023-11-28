import { ReactElement } from "react";
import { AmazonInventoryTable } from "./AmazonInventoryTable";
import { DeliveryStatusReports } from "./DeliveryStatus";
import { ShopifyInventoryTable } from "./ShopifyInventoryTable";
// import { EmptyPaperCard } from "@crstl/components/organisms/empty-paper-card";

export const Operations = (): ReactElement => {
  return (
    <>
      <DeliveryStatusReports />
      <ShopifyInventoryTable />
      <AmazonInventoryTable />
      {/* <EmptyPaperCard /> */}
      {/* <EmptyPaperCard /> */}
    </>
  );
};
