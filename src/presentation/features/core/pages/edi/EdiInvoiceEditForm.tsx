import { TargetJSON } from "domain/entity/edi/models/TargetJson810";
import { useListDocumentQuery } from "domain/interactors/edi";
import { useParams } from "react-router-dom";
import { EdiInvoiceEditPage } from "../edi-edit/EdiInvoiceEditPage";
import CVSInvoiceEditForm from "../edi-forms/cvs/invoice/InvoiceEditPage";
import TargetInvoiceEditForm from "../edi-invoice/InvoiceEditPage";

interface PageParams {
  orderId: string;
  id: string;
  customer?: string;
}

const formsByCustomerType: Record<string, any> = {
  cvs: CVSInvoiceEditForm,
  target: TargetInvoiceEditForm,
};

function EdiInvoiceEditForm() {
  const { customer: customerQueryParam, id } = useParams<PageParams>();
  const customerFromQueryParam = customerQueryParam?.toLowerCase() ?? "";

  const { data: listDocumentData, isFetching } = useListDocumentQuery(
    "810",
    id
  );

  const jediDocument = listDocumentData as TargetJSON;

  const customerFromListDocument =
    jediDocument?.data?.metadata?.trading_partner_name?.toLowerCase() ?? "";

  const customer = customerFromQueryParam
    ? customerFromQueryParam
    : customerFromListDocument;

  let Form;
  if (jediDocument?.data?.file?.metadata?.isArgoForm) {
    Form = EdiInvoiceEditPage;
  } else {
    Form = formsByCustomerType[customer] ?? EdiInvoiceEditPage;
  }

  return <Form />;
}

export { EdiInvoiceEditForm as default };

