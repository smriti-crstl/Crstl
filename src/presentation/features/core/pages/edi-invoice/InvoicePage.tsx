import { useListDocumentQuery } from "domain/interactors/edi";
import { DynamicForm } from "presentation/features/common/components/DynaForm";
import { useParams } from "react-router-dom";

import { Container, PageWrapper } from "./InvoicePage.styles";

function InvoicePage() {
  const { mode } = useParams<{ mode: string }>();
  const documentType = "810";
  const id = "6259665f54db261689301c02";

  const { data: listDocumentData } = useListDocumentQuery(documentType, id);

  return (
    <PageWrapper>
      {mode === "edit" ? (
        <Container>
          <h2>Edit Invoice</h2>
          <hr />
          <DynamicForm invData={listDocumentData?.data?.document} />
        </Container>
      ) : null}
    </PageWrapper>
  );
}

export default InvoicePage;
