import { useListDocumentQuery } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import { get } from "lodash";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

import { getLineItemsFromObject, getTpfName } from "../../edi/edi.utils";
import { innerLabelViewMap } from "./";

const uomCodeToTextMapping: Record<string, string> = {
  EA: "pieces",
  each_EA: "pieces",
  CA: "sets",
  case_CA: "sets",
};

interface PublicProps {
  asnData: any;
  setLoader: Dispatch<SetStateAction<boolean>>;
  tradingPartnerName?: string;
  tradingPartnerFlavor?: string;
}

const StyledContainer = styled.div`
  border: none;
  justify-content: center;
  display: flex;
`;

export interface InnerLabelData {
  sku: string;
  description: string;
  quantity: string;
}

export const InnerLabelPrintPreview: React.FC<PublicProps> = ({
  asnData,
  setLoader,
  tradingPartnerName,
  tradingPartnerFlavor,
}) => {
  const componentRef = useRef(null);
  const { orderId } = useParams<Record<string, string>>();
  const [innerLabelData, setInnerLabelData] = useState<InnerLabelData[]>();

  const { isLoading: isLoadingPoData, refetch } = useListDocumentQuery(
    CoreEDIDocumentNumber.PurchaseOrder,
    orderId,
    undefined,
    undefined,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    setLoader(isLoadingPoData);
  }, [isLoadingPoData, setLoader]);

  async function getInnerLabels() {
    const { data: poData, isError } = await refetch();

    if (isError) {
      setNotification({
        type: "error",
        description:
          "Error printing labels. Please try again in a few minutes, and contact support@crstl.so in case of any questions.",
      });
      return Promise.reject();
    }

    const innerLabelData: InnerLabelData[] = [];

    // looping over PO data to get descriptions
    const skuDescriptionMap: Record<string, string> = {};
    const baseLineItems = get(
      poData,
      "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0].detail.baseline_item_data_PO1_loop",
      []
    );
    baseLineItems.forEach((lineItem: any) => {
      const { buyersItemNo } = getLineItemsFromObject(
        lineItem?.baseline_item_data_PO1
      );

      if (!buyersItemNo) {
        return;
      }

      skuDescriptionMap[buyersItemNo] = get(
        lineItem,
        "product_item_description_PID_loop[0].product_item_description_PID.description_05",
        ""
      );
    });

    // looping over ASN data to get SKU and Quantity data
    const asnPacks = get(
      asnData,
      "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_pack",
      []
    );
    asnPacks.forEach((pack: any) => {
      const lineItem = get(pack, "HL_loop_item[0].item_identification_LIN");
      let sku = "";
      let description = "";
      let quantity = "";

      const { buyersItemNo } = getLineItemsFromObject(lineItem);

      if (buyersItemNo) {
        description = skuDescriptionMap[buyersItemNo] ?? "";

        const firstPart = buyersItemNo.substring(0, buyersItemNo.length / 2);
        const secondPart = buyersItemNo.substring(buyersItemNo.length / 2);
        sku = `${firstPart}-${secondPart}`;
      }

      const innerQty = get(
        pack,
        "HL_loop_item[0].item_physical_details_PO4.inner_pack_14",
        ""
      );
      const uomCode = get(
        pack,
        "HL_loop_item[0].item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
      );
      const uom = uomCodeToTextMapping[uomCode] ?? "";
      quantity = `${innerQty} ${uom}`;

      // calculate how many inner labels will be needed
      const totalQty = get(
        pack,
        "HL_loop_item[0].item_physical_details_PO4.pack_01",
        ""
      );
      const innerLabelQty = totalQty / innerQty;

      const singlePackLabelData = Array.from({ length: innerLabelQty }, () => ({
        sku,
        description,
        quantity,
      }));
      innerLabelData.push(...singlePackLabelData);
    });

    setInnerLabelData(innerLabelData);

    return innerLabelData;
  }

  const tpfKey = getTpfName({
    name: tradingPartnerName,
    flavor: tradingPartnerFlavor,
  });
  const InnerLabelComponent = innerLabelViewMap[tpfKey];

  return (
    <>
      <ReactToPrint
        onBeforeGetContent={getInnerLabels}
        trigger={() => <StyledContainer>{`4" x 6"`}</StyledContainer>}
        content={() => componentRef.current}
        copyStyles={false}
      ></ReactToPrint>
      <div style={{ display: "none" }}>
        <InnerLabelComponent data={innerLabelData} ref={componentRef} />
      </div>
    </>
  );
};

