import { Spinner } from "@crstl/components/atoms/loading";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import { useListDocumentQuery } from "domain/interactors/edi";
import { useParams } from "react-router-dom";
import { useFlags } from "launchdarkly-react-client-sdk";
import CVSShipmentViewPage from "../edi-forms/cvs/ship-notice/ShipmentViewPage";
import EdiShipmentNoticeView from "../edi-view/EdiShipmentNoticeView";
import DefaultShipmentViewPage from "../edi-shipment/ShipmentViewPage";
import { Container } from "./EdiShipNoticeViewPage.styles";
import GenericShipmentViewPage from "../edi-shipment/GenericShipmentViewPage";

interface PageParams {
  orderId: string;
  id: string;
  customer?: string;
}

const formsByCustomerType: Record<string, any> = {
  cvs: CVSShipmentViewPage,
  target: DefaultShipmentViewPage,
};

function EdiShipNoticeViewPage() {
  const flags = useFlags();
  const { customer: customerQueryParam, id } = useParams<PageParams>();
  const customerFromQueryParam = customerQueryParam?.toLowerCase() ?? "";

  const { data: listDocumentData, isLoading } = useListDocumentQuery("856", id);

  const jediDocument = listDocumentData as TargetJSON;

  const customerFromListDocument =
    jediDocument?.data?.metadata?.trading_partner_name?.toLowerCase() ?? "";

  const customer = customerFromQueryParam
    ? customerFromQueryParam
    : customerFromListDocument;

  let Page;
  if (jediDocument?.data?.file?.metadata?.isArgoForm) {
    Page = flags?.vargo ? EdiShipmentNoticeView : GenericShipmentViewPage;
  } else {
    Page =
      formsByCustomerType[customer] ??
      (flags?.vargo ? EdiShipmentNoticeView : GenericShipmentViewPage);
  }

  return (
    <Spinner spinning={isLoading}>
      <Page />
    </Spinner>
  );
}

export { EdiShipNoticeViewPage as default };

