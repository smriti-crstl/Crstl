import { Button } from "antd";
import {
  useGetInvoiceAdditionalData,
  useListDocumentQuery,
} from "domain/interactors/edi";
import { CORE_EDI_INVOICE_EDIT_PAGE } from "globals/configs";
import React, { useEffect } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { Spinner } from "components/atoms/loading";

import { Container } from "../../../edi/EdiPurchaseOrderSection.styles";
import { PageWrapper } from "../edi-purchase-order/PurchaseOrderPage.styles";
import initialData from "./data/target-neuro-1021.json";
import {
  GridContainer,
  InvoiceViewContainer,
  LoadingContainer,
} from "./InvoiceReadView.styles";
import {
  InvoiceReadViewFreight,
  InvoiceReadViewHeader,
  InvoiceReadViewProductList,
  InvoiceReadViewShipment,
} from "./sub-components";
import { EditOutlined } from "@ant-design/icons";

function InvoiceReadView() {
  const [title] = React.useState("Invoice");
  const [data, setData] = React.useState<unknown>(initialData);
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const result = useListDocumentQuery("810", id);
  const additionalData = useGetInvoiceAdditionalData(id);
  const history = useHistory();

  const { data: listDocumentData, isFetching } = id
    ? result
    : { isFetching: false, data: undefined };

  const { data: additionalInvoiceData, isFetching: additionalDataFetching } = id
    ? additionalData
    : { isFetching: false, data: undefined };

  useEffect(() => {
    if (listDocumentData) {
      setData(listDocumentData.data?.file?.json_edi);
    }
  }, [listDocumentData]);

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_INVOICE_EDIT_PAGE, {
      id: id,
      orderId: orderId,
    });
    history.replace(path);
  };

  if (isFetching) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <InvoiceViewContainer>
          <Button onClick={switchToEditMode}>
            <EditOutlined />
            Edit Invoice
          </Button>
          <h2 style={{ marginTop: 18 }}>{title}</h2>
          <InvoiceReadViewHeader data={data} />
          <InvoiceReadViewShipment data={data} />
          <InvoiceReadViewFreight data={data} />
          <InvoiceReadViewProductList
            data={data}
            additionalData={additionalData?.data?.data}
          />
        </InvoiceViewContainer>
      </Container>
    </PageWrapper>
  );
}

export default InvoiceReadView;
