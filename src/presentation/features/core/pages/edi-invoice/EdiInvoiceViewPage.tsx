import { Spinner } from "components/atoms/loading";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import { useListDocumentQuery } from "domain/interactors/edi";
import { useParams } from "react-router-dom";
import { Container } from "./EdiInvoiceViewPage.styles";
import { useFlags } from "launchdarkly-react-client-sdk";
import InvoiceReadView from "./InvoiceReadView";
import EdiInvoiceView from "../edi-view/EdiInvoiceView";
import GenericInvoiceReadView from "./InvoiceReadViewGeneric";

interface PageParams {
  orderId: string;
  id: string;
  customer?: string;
}

const formsByCustomerType: Record<string, any> = {
  cvs: InvoiceReadView,
  target: InvoiceReadView,
};

function EdiInvoiceViewPage() {
  const flags = useFlags();
  const { customer: customerQueryParam, id } = useParams<PageParams>();
  const customerFromQueryParam = customerQueryParam?.toLowerCase() ?? "";
  const result = useListDocumentQuery("810", id);

  const { data: listDocumentData, isLoading } = id
    ? result
    : { isLoading: false, data: undefined };

  const jediDocument = listDocumentData as TargetJSON;

  const customerFromListDocument =
    jediDocument?.data?.metadata?.trading_partner_name?.toLowerCase() ?? "";

  const customer = customerFromQueryParam
    ? customerFromQueryParam
    : customerFromListDocument;

  let Page;
  if (jediDocument?.data?.file?.metadata?.isArgoForm) {
    Page = flags?.vargo ? EdiInvoiceView : GenericInvoiceReadView;
  } else {
    Page =
      formsByCustomerType[customer] ??
      (flags?.vargo ? EdiInvoiceView : GenericInvoiceReadView);
  }

  return (
    <Spinner spinning={isLoading}>
      <Page />
    </Spinner>
  );
}

export { EdiInvoiceViewPage as default };

