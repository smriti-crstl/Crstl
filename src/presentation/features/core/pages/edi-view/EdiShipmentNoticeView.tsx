import { ASNProductDetail } from "domain/entity/edi/models";
import {
  useGetAdditionalASNDataQuery,
  useListDocumentQuery,
} from "domain/interactors/edi";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import GenericShipmentViewPageProductList from "../edi-shipment/generic-sub-components/GenericShipmentViewPageProductList";
import { AsnButtonsContainer } from "./components/ButtonsContainer";
import EdiViewPage from "./EdiViewPage";
import { Container, PageWrapper } from "./EdiViewPage.styles";

const EdiShipmentNoticeView = () => {
  const [data, setData] = useState();
  const [productDetailsData, setProductDetailsData] = useState<
    ASNProductDetail[] | []
  >([]);
  const downloadComponentRef = useRef(null);

  const { id } = useParams<{
    orderId: string;
    id: string;
  }>();

  const { data: listDocumentData } = useListDocumentQuery(
    CoreEDIDocumentNumber.ShipNotice,
    id
  );
  const { data: asnData } = useGetAdditionalASNDataQuery(id);

  useEffect(() => {
    if (listDocumentData) {
      setData(listDocumentData?.data?.file?.json_edi);
    }
  }, [listDocumentData]);

  useEffect(() => {
    if (asnData) {
      const productDetails = asnData?.data?.productDetails;
      if (productDetails.length) {
        setProductDetailsData(productDetails);
      }
    }
  }, [asnData]);

  return (
    <PageWrapper>
      <Container>
        <AsnButtonsContainer />
        <div ref={downloadComponentRef}>
          <EdiViewPage documentTypeId={CoreEDIDocumentNumber.ShipNotice} />
          <GenericShipmentViewPageProductList
            data={data}
            productDetails={productDetailsData}
          />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default EdiShipmentNoticeView;

