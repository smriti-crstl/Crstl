import React from "react";
import { css } from "styled-components";

import { InnerLabelData } from "../InnerLabelPrintPreview";

interface ShipmentInnerLabelPrintPageProps {
  data?: InnerLabelData[];
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100mm",
    height: "150mm",
    overflow: "hidden",
    pageBreakAfter: "always",
    padding: "10mm",
  },
  p: { margin: 0, lineHeight: "11pt", fontSize: "12pt" },
  borderLeft: { borderLeft: "1pt solid black" },
  th: {
    borderBottom: "1pt solid black",
    borderCollapse: "collapse",
    padding: "8pt",
  },
  td: {
    borderBottom: "1pt solid black",
    borderCollapse: "collapse",
    padding: "8pt",
  },
  img: { display: "block", marginLeft: "auto", marginRight: "auto" },
};

const printStyles = css`
  html,
  body {
    font-family: "Inter", sans-serif, Roboto;
    margin: 0;
    padding: 0;
  }
`;

function TextWithLineBreaks({
  text = "",
  textParts: textPartsProp,
  delimiter = ",",
}: {
  text?: string;
  textParts?: string[];
  delimiter?: string;
}) {
  const safeTextPartsProp = textPartsProp ?? [];
  const textParts = textPartsProp ? safeTextPartsProp : text.split(delimiter);
  const textPartsTrimmed = textParts?.map((textPart) => textPart?.trim() ?? "");
  return (
    <>
      {textPartsTrimmed.map((item, index) => {
        const isLast = index + 1 === textParts.length;
        if (isLast) {
          return item;
        }
        return (
          <>
            {item}
            <br />
          </>
        );
      })}
    </>
  );
}

function ShipmentInnerLabelPrintPage(
  { data: labels }: ShipmentInnerLabelPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {labels?.map(
        ({ sku, description, quantity }: InnerLabelData, index: number) => {
          return (
            <>
              <div className="page" key={index} style={styles.page}>
                <div style={{ marginTop: 30, display: "flex" }}>
                  <span style={{ marginRight: 10 }}>(1)</span>
                  <TextWithLineBreaks textParts={[sku]} />
                </div>
                <div style={{ marginTop: 30, display: "flex" }}>
                  <span style={{ marginRight: 10 }}>(2)</span>
                  <TextWithLineBreaks textParts={[description]} />
                </div>
                <div style={{ marginTop: 30, display: "flex" }}>
                  <span style={{ marginRight: 10 }}>(3)</span>
                  <TextWithLineBreaks textParts={[quantity]} />
                </div>
              </div>
            </>
          );
        }
      )}
    </div>
  );
}

const ShipmentInnerLabelPrintPageWithRef = React.forwardRef(
  ShipmentInnerLabelPrintPage
);

export { ShipmentInnerLabelPrintPageWithRef as ShipmentPrintPageCrateAndBarrelWarehouse };

