import { ReactElement } from "react";

export const ShopifyInstructions = (): ReactElement => {
  return (
    <div>
      <b style={{ fontSize: "1rem" }}>Setup Instructions</b>
      <div>Let&apos;s get started by following this guide: </div>
      <br />
      <ul style={{ color: "#5c5c5c" }}>
        <li>{`Step 1: Click on the "Add" button to your right`}</li>
        <li>{`Step 2: Enter your store url - e.g., "storename" without adding ".myshopify.com`}</li>
        <li>{`Step 3: Click "OK" and your Shopify store will be connected to Crstl!`}</li>
      </ul>
    </div>
  );
};
