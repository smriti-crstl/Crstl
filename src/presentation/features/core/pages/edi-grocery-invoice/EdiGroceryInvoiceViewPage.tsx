import { useListDocumentQuery } from "domain/interactors/edi";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useParams } from "react-router-dom";

import { Spinner } from "components/atoms/loading";

import EdiGroceryInvoiceView from "../edi-view/EdiGroceryInvoiceView";
import { GroceryInvoiceReadView } from "./GroceryInvoiceReadView";
import { Container } from "./styles";

export const EdiGroceryInvoiceViewPage = () => {
  const flags = useFlags();
  const { id } = useParams<{
    orderId: string;
    id: string;
  }>();

  const { isLoading } = useListDocumentQuery("880", id);
  const Page = flags?.vargo ? EdiGroceryInvoiceView : GroceryInvoiceReadView;

  return (
    <Spinner spinning={isLoading}>
      <Page />
    </Spinner>
  );
};

