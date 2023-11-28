import { useMemo, useState } from "react";

import { shipmentLabelViewMap } from "../../edi-shipment/edi-shipment-label-templates";
import { LabelWrapper, PageWrapper } from "./styles";

const EDIShipmentLabelPlayground = () => {
  // sample response object (just keep ONE label in the data?.label?...)
  const [shippingLabelData, setShippingLabelData] = useState<string>("");
  const [isCorrectJSON, setIsCorrectJSON] = useState<boolean>(true);
  const [tpf, setTpf] = useState<string>("");

  const jsonData = useMemo(() => {
    try {
      const jsonRepresentation = JSON.parse(shippingLabelData);
      setIsCorrectJSON(true);
      return jsonRepresentation;
    } catch (error) {
      console.error("malformed JSON input");
      setIsCorrectJSON(false);
      return {};
    }
  }, [shippingLabelData]);

  const ShippingLabelComponent = shipmentLabelViewMap[tpf];

  return (
    <PageWrapper>
      <div>
        <label>
          <div>TPF Name (all lowercase)</div>
          <input
            value={tpf}
            placeholder="e.g.: harris teeter - warehouse"
            onChange={(e) => setTpf(e.target.value)}
          />
        </label>
        <label>
          <div>Label Data</div>
          <textarea
            cols={50}
            rows={30}
            value={shippingLabelData}
            onChange={(e) => setShippingLabelData(e.target.value)}
            placeholder={`{ data: { labels: [ {...data1}, {...data2} ] } }`}
          />
        </label>
      </div>
      <div>
        <div>Preview</div>
        {ShippingLabelComponent ? (
          isCorrectJSON ? (
            <LabelWrapper>
              <ShippingLabelComponent data={jsonData} />
            </LabelWrapper>
          ) : (
            <div>Malformed / empty JSON input</div>
          )
        ) : tpf ? (
          <div>
            Please add <code>{tpf}</code> as an entry in the{" "}
            <code>shipmentLabelViewMap</code>
          </div>
        ) : (
          <div>
            Please add <code>Trading Partner Name</code>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export { EDIShipmentLabelPlayground as default };

