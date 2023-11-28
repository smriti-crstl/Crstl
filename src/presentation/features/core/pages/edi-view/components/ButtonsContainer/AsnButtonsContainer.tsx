import { Dropdown, Menu, Popover, Space } from "antd";
import { useListDocumentQuery } from "domain/interactors/edi";
import { CORE_EDI_SHIPMENT_EDIT_PAGE } from "globals/configs";
import html2pdf from "html2pdf.js";
import { useFlags } from "launchdarkly-react-client-sdk";
import { get } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useRef, useState } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import {
  CloudDownloadOutlined,
  DownloadOutlined,
  EditOutlined,
  PrinterOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { StyledSecondaryButton } from "../../../edi-edit/EdiEditPage.styles";
import { innerLabelViewMap } from "../../../edi-shipment/edi-inner-label-templates";
import { InnerLabelPrintPreview } from "../../../edi-shipment/edi-inner-label-templates/InnerLabelPrintPreview";
import { packingSlipViewMap } from "../../../edi-shipment/edi-packing-slip-templates";
import { ShipmentPackingSlipPrintPreview } from "../../../edi-shipment/edi-packing-slip-templates/ShipmentPackingSlipPrintPreview";
import { palletLabelViewMap } from "../../../edi-shipment/edi-pallet-label-templates";
import { ShipmentPalletLabelPrintPreview } from "../../../edi-shipment/edi-pallet-label-templates/ShipmentPalletLabelPrintPreview";
import { getShipmentNumber } from "../../../edi-shipment/generic-sub-components";
import { GenericShipmentPrintDownload } from "../../../edi-shipment/GenericShipmentPrintDownload";
import { GenericShipmentPrintPreview } from "../../../edi-shipment/GenericShipmentPrintPreview";
import { ShipmentDocumentsModal } from "../../../edi-shipment/sub-components";
import ShipNoticeConfig, {
  ShipNoticeSortByOption,
} from "../../../edi-shipment/sub-components/ShipNoticeConfig";
import { getTpfName } from "../../../edi/edi.utils";
import { useCommonModal } from "../../../onboarding/hooks/useCommonModal";
import { ButtonContainer } from "./styles";

export const AsnButtonsContainer = () => {
  const [sortBy, setSortBy] = useState<ShipNoticeSortByOption>(
    ShipNoticeSortByOption.UPC
  );
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const [
    isShipmentDocsModalVisible,
    toggleShipmentDocsModal,
  ] = useCommonModal();

  const downloadComponentRef = useRef(null);

  const { backendGeneratedShippingLabels } = useFlags();
  const searchParams = useSearchParams();
  const history = useHistory();
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();

  const { data: listDocumentData } = useListDocumentQuery(
    CoreEDIDocumentNumber.ShipNotice,
    id
  );

  const tradingPartnerName = get(
    listDocumentData,
    "data.metadata.trading_partner_name",
    ""
  )?.toLowerCase();
  const tradingPartnerFlavor = get(
    listDocumentData,
    "data.metadata.trading_partner_flavor",
    ""
  )?.toLowerCase();

  const tpfKey = getTpfName({
    name: tradingPartnerName,
    flavor: tradingPartnerFlavor,
  });
  const toShowPackingSlip =
    packingSlipViewMap[tpfKey] ?? packingSlipViewMap[tradingPartnerName];
  const toShowInnerLabel = innerLabelViewMap[tpfKey];
  const toShowPalletLabel = palletLabelViewMap[tpfKey];

  const onPrintA4 = async (printIframe: HTMLIFrameElement) => {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const filename = `Shipment-${getShipmentNumber(data)}.pdf`;

        const html = document.getElementsByTagName("html")[0];

        const exporter = new html2pdf(html, {
          margin: 10,
          filename,
          jsPDF: { unit: "mm", format: [210, 297], orientation: "landscape" }, // A4 format => [210mm X 297mm]
        });
        await exporter.getPdf(true);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleDownloadShipment = useReactToPrint({
    content: () => downloadComponentRef.current,
    print: onPrintA4,
  });

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_SHIPMENT_EDIT_PAGE, {
      id,
      orderId,
    });
    // * note: adding for the time being to keep memory of "source-document-type"
    const search = searchParams.toString();
    history.replace(`${path}?${search}`);
  };

  const printMenu = (
    <Menu>
      <Menu.Item key={"4x6"}>
        <GenericShipmentPrintPreview
          sortBy={sortBy}
          setLoader={setShowLoader}
          tradingPartnerName={tradingPartnerName}
          tradingPartnerFlavor={tradingPartnerFlavor}
        />
      </Menu.Item>
    </Menu>
  );

  const downloadMenu = (
    <Menu>
      <Menu.Item key={"4x6"}>
        <GenericShipmentPrintDownload
          sortBy={sortBy}
          setLoader={setShowLoader}
          tradingPartnerName={tradingPartnerName}
          tradingPartnerFlavor={tradingPartnerFlavor}
          asnListDocumentData={listDocumentData}
        />
      </Menu.Item>
    </Menu>
  );

  const printPackingSlipMenu = (
    <Menu>
      <Menu.Item key={"11x8.5"}>
        <ShipmentPackingSlipPrintPreview
          sortBy={sortBy}
          setLoader={setShowLoader}
          tradingPartnerName={tradingPartnerName}
          tradingPartnerFlavor={tradingPartnerFlavor}
        />
      </Menu.Item>
    </Menu>
  );

  const printInnerLabelMenu = (
    <Menu>
      <Menu.Item key={"4x6"}>
        <InnerLabelPrintPreview
          setLoader={setShowLoader}
          tradingPartnerName={tradingPartnerName}
          tradingPartnerFlavor={tradingPartnerFlavor}
          asnData={listDocumentData}
        />
      </Menu.Item>
    </Menu>
  );

  const printPalletLabelMenu = (
    <Menu>
      <Menu.Item key={"4x6"}>
        <ShipmentPalletLabelPrintPreview
          sortBy={sortBy}
          setLoader={setShowLoader}
          tradingPartnerName={tradingPartnerName}
          tradingPartnerFlavor={tradingPartnerFlavor}
        />
      </Menu.Item>
    </Menu>
  );

  const shipNoticeConfigMenu = (
    <ShipNoticeConfig sortBy={sortBy} setSortBy={setSortBy} />
  );

  return (
    <ButtonContainer>
      <StyledSecondaryButton onClick={handleDownloadShipment}>
        <CloudDownloadOutlined />
        Download Document
      </StyledSecondaryButton>
      <StyledSecondaryButton onClick={switchToEditMode}>
        <EditOutlined /> Edit Ship Notice
      </StyledSecondaryButton>
      {backendGeneratedShippingLabels ? (
        <>
          <StyledSecondaryButton onClick={toggleShipmentDocsModal}>
            <PrinterOutlined /> Shipment Documents
          </StyledSecondaryButton>
          <ShipmentDocumentsModal
            visible={isShipmentDocsModalVisible}
            toggle={toggleShipmentDocsModal}
            asnId={id}
          />
        </>
      ) : (
        <>
          <Dropdown overlay={printMenu}>
            <StyledSecondaryButton loading={showLoader}>
              <Space>
                <PrinterOutlined /> Print Shipping Label
              </Space>
            </StyledSecondaryButton>
          </Dropdown>
          <Dropdown overlay={downloadMenu}>
            <StyledSecondaryButton loading={showLoader}>
              <Space>
                <DownloadOutlined /> Download Shipping Label
              </Space>
            </StyledSecondaryButton>
          </Dropdown>
          {toShowPackingSlip && (
            <Dropdown overlay={printPackingSlipMenu}>
              <StyledSecondaryButton loading={showLoader}>
                <Space>
                  <PrinterOutlined /> Print Packing Slip
                </Space>
              </StyledSecondaryButton>
            </Dropdown>
          )}
          {toShowInnerLabel && (
            <Dropdown overlay={printInnerLabelMenu}>
              <StyledSecondaryButton loading={showLoader}>
                <Space>
                  <PrinterOutlined /> Print Inner Label
                </Space>
              </StyledSecondaryButton>
            </Dropdown>
          )}
          {toShowPalletLabel && (
            <Dropdown overlay={printPalletLabelMenu}>
              <StyledSecondaryButton loading={showLoader}>
                <Space>
                  <PrinterOutlined /> Print Pallet Label
                </Space>
              </StyledSecondaryButton>
            </Dropdown>
          )}
          <Popover content={shipNoticeConfigMenu} title="Print Options">
            <StyledSecondaryButton>
              <SettingOutlined />
            </StyledSecondaryButton>
          </Popover>
        </>
      )}
    </ButtonContainer>
  );
};

