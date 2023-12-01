import { Button, Dropdown, Menu, Popover, Space } from "antd";
import { ASNProductDetail, ASNShiptoObject } from "domain/entity/edi/models";
import {
  useGetAdditionalASNDataQuery,
  useListDocumentQuery
} from "domain/interactors/edi";
import { CORE_EDI_SHIPMENT_EDIT_PAGE } from "globals/configs";
import { useSearchParams } from "presentation/hooks/common";
import { useEffect, useState } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  DownloadOutlined,
  EditOutlined,
  PrinterOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Spinner } from "components/atoms/loading";

import {
  OrderViewContainer,
  PageWrapper
} from "../../../edi-purchase-order/PurchaseOrderPage.styles";
import { ShipmentPackingSlipDownload } from "../../../edi-shipment/edi-packing-slip-templates/ShipmentPackingSlipDownload";
import { ShipmentPackingSlipPrintPreview } from "../../../edi-shipment/edi-packing-slip-templates/ShipmentPackingSlipPrintPreview";
import ShipNoticeConfig, { ShipNoticeSortByOption } from "../../../edi-shipment/sub-components/ShipNoticeConfig";
import { Container } from "../../../edi/EdiPurchaseOrderSection.styles";
import {
  ButtonContainer,
  LoadingContainer,
  ShipmentHeaderBottomRowContainer,
  ShipmentHeaderContainer,
  ShipNoticeHeader
} from "./ShipmentPage.styles";
import { ShipmentPrintDownload } from "./ShipmentPrintDownload";
import { ShipmentPrintPreview } from "./ShipmentPrintPreview";
import ShipmentViewPageFreight from "./sub-components/ShipmentViewPageFreight";
import ShipmentViewPageFrom from "./sub-components/ShipmentViewPageFrom";
import ShipmentViewPageHeader from "./sub-components/ShipmentViewPageHeader";
import ShipmentViewPageProductList from "./sub-components/ShipmentViewPageProductList";
import ShipmentViewPageSupplier from "./sub-components/ShipmentViewPageSupplier";
import ShipmentViewPageTo from "./sub-components/ShipmentViewPageTo";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  strong {
    font-weight: 600;
  }
`;

const ShipmentViewPage = () => {
  const [title, setTitle] = useState("Advance Ship Notice");
  const [data, setData] = useState();
  const [shipToData, setShipToData] = useState<ASNShiptoObject>();
  const [productDetailsData, setProductDetailsData] = useState<
    ASNProductDetail[] | []
  >([]);
  const [sortBy, setSortBy] = useState<ShipNoticeSortByOption>(
    ShipNoticeSortByOption.UPC
  );

  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const history = useHistory();

  const result = useListDocumentQuery("856", id);
  const additionalAsnData = useGetAdditionalASNDataQuery(id);

  const { data: listDocumentData, isFetching } = id
    ? result
    : { isFetching: false, data: undefined };

  const { data: asnData, isFetching: asnDataFetching } = id
    ? additionalAsnData
    : { isFetching: false, data: undefined };

  useEffect(() => {
    if (listDocumentData) {
      setData(listDocumentData.data?.file?.json_edi);
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

  const searchParams = useSearchParams();

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_SHIPMENT_EDIT_PAGE, {
      id: id,
      orderId: orderId,
    });
    // * note: adding for the time being to keep memory of "source-document-type"
    const search = searchParams.toString();
    history.replace(`${path}?${search}`);
  };
  const [printLoader, setPrintLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);
  const [packingSlipPrintLoader, setPackingSlipPrintLoader] = useState(false);
  const [packingSlipDownloadLoader, setPackingSlipDownloadLoader] = useState(
    false
  );

  const printMenu = (
    <Menu>
      <Menu.Item key={"4x6"}>
        <ShipmentPrintPreview sortBy={sortBy} setLoader={setPrintLoader} />
      </Menu.Item>
    </Menu>
  );

  const downloadMenu = (
    <Menu>
      <Menu.Item key={"4x6"}>
        <ShipmentPrintDownload sortBy={sortBy} setLoader={setDownloadLoader} />
      </Menu.Item>
    </Menu>
  );

  const printPackingSlipMenu = (
    <Menu>
      <Menu.Item key={"11x8.5"}>
        <ShipmentPackingSlipPrintPreview
          sortBy={sortBy}
          setLoader={setPackingSlipPrintLoader}
        />
      </Menu.Item>
    </Menu>
  );

  const shipNoticeConfigMenu = (
    <ShipNoticeConfig sortBy={sortBy} setSortBy={setSortBy} />
  );

  // const downloadPackingSlipMenu = (
  //   <Menu>
  //     <Menu.Item key={"11x8.5"}>
  //       <ShipmentPackingSlipDownload setLoader={setPackingSlipDownloadLoader} />
  //     </Menu.Item>
  //   </Menu>
  // );

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
        <OrderViewContainer>
          <ButtonContainer>
            <Button onClick={switchToEditMode}>
              <EditOutlined /> Edit Ship Notice
            </Button>
            <Dropdown overlay={printMenu} trigger="hover">
              <Button loading={printLoader}>
                <Space>
                  <PrinterOutlined /> Print Shipping Label
                </Space>
              </Button>
            </Dropdown>
            <Dropdown overlay={downloadMenu} trigger="hover">
              <Button loading={downloadLoader}>
                <Space>
                  <DownloadOutlined /> Download Shipping Label
                </Space>
              </Button>
            </Dropdown>
            <Dropdown overlay={printPackingSlipMenu} trigger="hover">
              <Button loading={packingSlipPrintLoader}>
                <Space>
                  <PrinterOutlined /> Print packing slip
                </Space>
              </Button>
            </Dropdown>
            <Popover content={shipNoticeConfigMenu} title="Print Options">
              <Button>
                <SettingOutlined />
              </Button>
            </Popover>
            {/* <Dropdown overlay={downloadPackingSlipMenu} trigger="hover">
              <Button loading={packingSlipDownloadLoader}>
                <Space>
                  <DownloadOutlined /> Download packing slip
                </Space>
              </Button>
            </Dropdown> */}
          </ButtonContainer>
          <ShipNoticeHeader>
            <h2>{title}</h2>
          </ShipNoticeHeader>
          {isFetching || asnDataFetching ? (
            <Spinner />
          ) : (
            <ShipmentHeaderContainer>
              <ShipmentViewPageHeader data={data} />
              <ShipmentHeaderBottomRowContainer>
                <ShipmentViewPageFrom data={data} asnData={asnData} />
                <ShipmentViewPageSupplier data={data} />
                <ShipmentViewPageTo data={shipToData} />
              </ShipmentHeaderBottomRowContainer>
              <ShipmentViewPageFreight data={data} />
              <ShipmentViewPageProductList
                data={data}
                productDetails={productDetailsData}
              />
            </ShipmentHeaderContainer>
          )}
        </OrderViewContainer>
      </Container>
    </PageWrapper>
  );
};

export default ShipmentViewPage;

