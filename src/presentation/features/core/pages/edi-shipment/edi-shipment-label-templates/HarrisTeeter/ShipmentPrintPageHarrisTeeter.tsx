import { ShippingLabelModel } from "domain/entity/edi/models";
import React, { CSSProperties } from "react";
import { css } from "styled-components";

interface ShipmentPrintPageProps {
  data?: ShippingLabelModel;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingTop: "1mm",
    width: "100mm",
    height: "149mm",
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

function ShipmentPrintPageHarrisTeeter(
  { data }: ShipmentPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const labels = data?.data?.labels; // concat(data?.data?.labels);

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {labels?.map((shippingLabel, index) => {
        return (
          <>
            <div className="page" key={shippingLabel.id} style={styles.page}>
              <div style={{ height: "18mm", display: "flex" }}>
                <div style={{ width: "35%", ...styles.td }}>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>From:</strong>
                  </Text>
                  <Text style={{ fontSize: "6.5pt", lineHeight: "7.5pt" }}>
                    {shippingLabel.from}
                  </Text>
                </div>
                <div
                  style={{
                    width: "65%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "6pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>To: CUSTOMER</strong>
                  </Text>
                  <Text style={{ fontSize: "6.2pt", lineHeight: "7.2pt" }}>
                    <TextWithLineBreaks
                      textParts={shippingLabel.shipTo.split("\n")}
                    />
                  </Text>
                </div>
              </div>
              <div style={{ height: "30mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "55%",
                    paddingTop: "2pt",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>SHIP TO POST:</strong>
                  </Text>
                  <img
                    style={{
                      ...styles.img,
                      width: "50%",
                      height: "20mm",
                      marginLeft: "4pt",
                    }}
                    src={shippingLabel.shipToPostBarCode.base64}
                    alt=""
                  />
                  <Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8pt",
                      lineHeight: "9pt",
                      width: "50%",
                      marginLeft: "4pt",
                    }}
                  >
                    {shippingLabel.postalCode}
                  </Text>
                </div>
                <div
                  style={{
                    ...styles.td,
                    ...styles.borderLeft,
                    width: "45%",
                    paddingTop: "2pt",
                    paddingLeft: "2pt",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ height: "50%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      <strong>CARRIER:</strong>
                    </Text>
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      <strong>{shippingLabel.carrierName}</strong>
                    </Text>
                  </div>
                  <div style={{ height: "50%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      <strong>B/L:</strong>
                    </Text>
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      {shippingLabel.billOfLadingNumber}
                    </Text>
                  </div>
                </div>
              </div>
              <div style={{ height: "16mm", display: "flex" }}>
                <div style={{ ...styles.td, width: "50%", paddingTop: "2pt" }}>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <div>PO: {shippingLabel.poNumber}</div>
                    <div style={{ marginTop: "6pt" }}>
                      Product #: {shippingLabel.sku}
                    </div>
                  </Text>
                </div>
                <div
                  style={{
                    ...styles.td,
                    width: "50%",
                    paddingTop: "2pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                      textAlign: "left",
                      width: "max-content",
                      margin: "auto",
                    }}
                  >
                    <div>
                      LBL: {index + 1} of {labels.length}
                    </div>
                    <div style={{ marginTop: "6pt" }}>
                      QTY: {shippingLabel.quantityShipped}
                    </div>
                  </Text>
                </div>
              </div>
              <div style={{ height: "30mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "50%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Product #
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Qty
                  </Text>
                </div>
                <div
                  style={{
                    ...styles.td,
                    width: "50%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Product #
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Qty
                  </Text>
                </div>
              </div>
              <div style={{ height: "32mm" }}>
                <div
                  style={{
                    ...styles.td,
                    borderBottom: "none",
                    paddingTop: "2pt",
                  }}
                >
                  <Text>
                    <strong>SSCC</strong>
                  </Text>
                  <div
                    style={{
                      width: "80%",
                      marginLeft: "12%",
                      marginTop: "2pt",
                    }}
                  >
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "42mm",
                      }}
                      src={shippingLabel.ssccBarCode.base64}
                      alt=""
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      {shippingLabel.ssccNumber}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

const ShipmentPrintPageWithRef = React.forwardRef(
  ShipmentPrintPageHarrisTeeter
);

export { ShipmentPrintPageWithRef as ShipmentPrintPageHarrisTeeter };

