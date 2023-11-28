import { useListDocumentQuery } from "domain/interactors/edi";
import { useFlags } from "launchdarkly-react-client-sdk";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useParams } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import EdiPOChangeAckView from "../edi-view/EdiPOChangeAckView";
import { Container } from "./EdiPOChangeAckViewPage.styles";
import { POChangeAckReadView } from "./POChangeAckReadView";

const docNumber = CoreEDIDocumentNumber.PurchaseOrderChangeAck;

export const EdiPOChangeAckViewPage = () => {
  const flags = useFlags();
  const { id } = useParams<{
    orderId: string;
    id: string;
  }>();

  const { isLoading } = useListDocumentQuery(docNumber, id);

  const Page = flags?.vargo ? EdiPOChangeAckView : POChangeAckReadView;

  return (
    <Spinner spinning={isLoading}>
      <Page />
    </Spinner>
  );
};

