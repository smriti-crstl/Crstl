import { ShippingLabelModel } from "domain/entity/edi/models";
import React, { CSSProperties } from "react";
import { css } from "styled-components";

import CvsPharmacyLogo from "@crstl/app/src/globals/assets/images/cvs-pharmacy-logo-small.png";

interface ShipmentPackingSlipPrintPageProps {
  data?: ShippingLabelModel;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingLeft: "10mm",
    paddingTop: "20mm",
    width: "279.4mm",
    height: "214mm",
    overflow: "hidden",
    pageBreakAfter: "always",
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

function Text({
  style = {},
  children,
}: {
  style?: CSSProperties;
  children: any;
}) {
  return <p style={{ ...styles.p, ...style }}>{children}</p>;
}

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
  const textPartsTrimmed = textParts.map((textPart) => textPart.trim());
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

function ShipmentPackingSlipPrintPage(
  { data }: ShipmentPackingSlipPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const labels = data?.data?.labels;

  const cartonLabels = labels?.filter(
    (label) => label.labelType === "packing_slip"
  );

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {cartonLabels?.map((shippingLabel) => {
        return (
          <>
            <div className="page" key={shippingLabel.id} style={styles.page}>
              <div>
                <img src={CvsPharmacyLogo} alt="" style={{ width: "80mm" }} />
              </div>
              <table width="100%">
                <tr>
                  <td></td>
                  <td style={{ width: "94mm" }}>
                    <p style={{ margin: 0, fontSize: "12pt" }}>
                      <strong>Packing ship</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ width: "94mm" }}>
                      <p
                        style={{
                          marginTop: 0,
                          marginBottom: "2mm",
                          fontSize: "15pt",
                        }}
                      >
                        <strong>Ship To</strong>
                      </p>
                      <div
                        style={{
                          border: "1px solid black",
                          padding: "1mm",
                          fontSize: "12pt",
                        }}
                      >
                        <TextWithLineBreaks
                          textParts={shippingLabel.shipTo.split("\n")}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <table width="100%">
                      <tr>
                        <td align="right">
                          <div
                            style={{
                              width: "94mm",
                              textAlign: "left",
                            }}
                          >
                            <p
                              style={{
                                marginTop: 0,
                                marginBottom: "2mm",
                                fontSize: "15pt",
                              }}
                            >
                              <strong>Ship From</strong>
                            </p>
                            <div
                              style={{
                                border: "1px solid black",
                                padding: "1mm",
                                fontSize: "12pt",
                              }}
                            >
                              <TextWithLineBreaks
                                textParts={shippingLabel.from.split("\n")}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div style={{ height: "10mm" }} />
              <table
                style={{ border: "1px solid black", width: "203mm" }}
                cellSpacing={0}
                cellPadding="11mm"
                rules="all"
              >
                <thead style={{ background: "#C0C0C0" }}>
                  <tr>
                    <th align="center">Customer Order #</th>
                    <th align="center">Ship Date</th>
                    <th align="center">Shipping Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">{shippingLabel.poNumber}</td>
                    <td align="center">{shippingLabel.shipDate}</td>
                    <td align="center">{shippingLabel.shippingMethod}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ height: "10mm" }} />
              <table
                style={{ border: "1px solid black", width: "274mm" }}
                cellSpacing={0}
                cellPadding="11mm"
                rules="all"
              >
                <thead style={{ background: "#C0C0C0" }}>
                  <tr>
                    <th align="center">Item Number</th>
                    <th align="center">Item Description</th>
                    <th align="center">Case Pack</th>
                    <th align="center">Ship Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">
                      {shippingLabel.upc}
                      <br />
                      {shippingLabel.cvsLineItemNumber}
                    </td>
                    <td align="center">{shippingLabel.style}</td>
                    <td align="center">
                      {shippingLabel.casePack} Eaches per carton
                    </td>
                    <td align="center">{shippingLabel.quantityShipped} Case</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </div>
  );
}

const ShipmentPackingSlipPrintPageWithRef = React.forwardRef(
  ShipmentPackingSlipPrintPage
);

export { ShipmentPackingSlipPrintPageWithRef as CVSPackingSlipPrintPage };
