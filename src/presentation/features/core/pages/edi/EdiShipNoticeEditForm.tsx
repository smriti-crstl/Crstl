import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import { useListDocumentQuery } from "domain/interactors/edi";
import { useParams } from "react-router-dom";
import { EdiShipmentEditPage } from "../edi-edit/EdiShipmentEditPage";
import CVSShipmentEditForm from "../edi-forms/cvs/ship-notice/ShipmentEditPage";
import TargetShipmentEditForm from "../edi-shipment/ShipmentEditPage";

interface PageParams {
  orderId: string;
  id: string;
  customer?: string;
}

const formsByCustomerType: Record<string, any> = {
  cvs: CVSShipmentEditForm,
  target: TargetShipmentEditForm,
};

function EdiShipNoticeEditForm() {
  const { customer: customerQueryParam, id } = useParams<PageParams>();
  const customerFromQueryParam = customerQueryParam?.toLowerCase() ?? "";

  const { data: listDocumentData } = useListDocumentQuery("856", id);

  const jediDocument = listDocumentData as TargetJSON;

  const customerFromListDocument =
    jediDocument?.data?.metadata?.trading_partner_name?.toLowerCase() ?? "";

  const customer = customerFromQueryParam
    ? customerFromQueryParam
    : customerFromListDocument;

  let Form;
  if (jediDocument?.data?.file?.metadata?.isArgoForm) {
    Form = EdiShipmentEditPage;
  } else {
    Form = formsByCustomerType[customer] ?? EdiShipmentEditPage;
  }

  return <Form />;
}

export { EdiShipNoticeEditForm as default };

