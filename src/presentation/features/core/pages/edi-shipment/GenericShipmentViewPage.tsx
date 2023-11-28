import { ASNProductDetail, ASNShiptoObject } from "domain/entity/edi/models";
import {
  useGetAdditionalASNDataQuery,
  useListDocumentQuery,
} from "domain/interactors/edi";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Spinner } from "@crstl/components/atoms/loading";

import {
  OrderViewContainer,
  PageWrapper,
} from "../edi-purchase-order/PurchaseOrderPage.styles";
import { AsnButtonsContainer } from "../edi-view/components/ButtonsContainer";
import { Container } from "../edi/EdiPurchaseOrderSection.styles";
import GenericShipmentViewPageFreight from "./generic-sub-components/GenericShipmentViewPageFreight";
import GenericShipmentViewPageFrom from "./generic-sub-components/GenericShipmentViewPageFrom";
import GenericShipmentViewPageHeader from "./generic-sub-components/GenericShipmentViewPageHeader";
import GenericShipmentViewPageProductList from "./generic-sub-components/GenericShipmentViewPageProductList";
import GenericShipmentViewPageSupplier from "./generic-sub-components/GenericShipmentViewPageSupplier";
import GenericShipmentViewPageTo from "./generic-sub-components/GenericShipmentViewPageTo";
import {
  ShipmentHeaderBottomRowContainer,
  ShipmentHeaderContainer,
  ShipNoticeHeader,
} from "./ShipmentPage.styles";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  strong {
    font-weight: 600;
  }
`;

const GenericShipmentViewPage = () => {
  const [title, setTitle] = useState("Advance Ship Notice");
  const [data, setData] = useState();
  const [shipToData, setShipToData] = useState<ASNShiptoObject>();
  const [productDetailsData, setProductDetailsData] = useState<
    ASNProductDetail[] | []
  >([]);

  const downloadComponentRef = useRef(null);

  const { id } = useParams<{
    orderId: string;
    id: string;
  }>();

  const { data: listDocumentData, isFetching } = useListDocumentQuery(
    "856",
    id
  );
  const {
    data: asnData,
    isFetching: asnDataFetching,
  } = useGetAdditionalASNDataQuery(id);

  useEffect(() => {
    if (listDocumentData) {
      setData(listDocumentData?.data?.file?.json_edi);
    }
  }, [listDocumentData]);

  useEffect(() => {
    if (asnData) {
      const shipTo = asnData?.data?.shipTo;
      const productDetails = asnData?.data?.productDetails;
      if (shipTo) {
        setShipToData(shipTo);
      }
      if (productDetails.length) {
        setProductDetailsData(productDetails);
      }
    }
  }, [asnData]);

  return (
    <PageWrapper>
      <Container>
        <OrderViewContainer>
          <AsnButtonsContainer />
          <div ref={downloadComponentRef}>
            <ShipNoticeHeader>
              <h2>{title}</h2>
            </ShipNoticeHeader>
            <Spinner spinning={isFetching || asnDataFetching}>
              <ShipmentHeaderContainer>
                <GenericShipmentViewPageHeader data={data} />
                <ShipmentHeaderBottomRowContainer>
                  <GenericShipmentViewPageFrom data={data} asnData={asnData} />
                  <GenericShipmentViewPageSupplier data={data} />
                  <GenericShipmentViewPageTo data={shipToData} />
                </ShipmentHeaderBottomRowContainer>
                <GenericShipmentViewPageFreight data={data} />
                <GenericShipmentViewPageProductList
                  data={data}
                  productDetails={productDetailsData}
                />
              </ShipmentHeaderContainer>
            </Spinner>
          </div>
        </OrderViewContainer>
      </Container>
    </PageWrapper>
  );
};

export default GenericShipmentViewPage;

