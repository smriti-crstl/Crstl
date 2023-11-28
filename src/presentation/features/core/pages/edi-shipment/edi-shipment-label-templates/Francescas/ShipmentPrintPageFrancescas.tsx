import { ShippingLabelModel } from "domain/entity/edi/models";
import React, { CSSProperties } from "react";
import { css } from "styled-components";

interface ShipmentPrintPageProps {
  data?: ShippingLabelModel;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100mm",
    height: "150mm",
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

function ShipmentPrintPageFrancescas(
  { data }: ShipmentPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const labels = data?.data?.labels;

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {labels?.map((shippingLabel, index) => {
        return (
          <>
            <div className="page" key={shippingLabel.id} style={styles.page}>
              <div style={{ height: "25mm", display: "flex" }}>
                <div style={{ width: "50%", ...styles.td }}>
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>From:</strong>
                  </Text>
                  <Text style={{ fontSize: "8pt", lineHeight: "11.5pt" }}>
                    {shippingLabel.from}
                  </Text>
                </div>
                <div
                  style={{
                    width: "50%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "6pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>To:</strong>
                  </Text>
                  <Text style={{ fontSize: "8pt", lineHeight: "11.5pt" }}>
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
                    width: "60%",
                    paddingTop: "2pt",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "7pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Ship To Postal Code
                  </Text>
                  <Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8pt",
                      lineHeight: "9pt",
                      marginLeft: "4pt",
                    }}
                  >
                    <strong>{shippingLabel.postalCode}</strong>
                  </Text>
                  <img
                    style={{
                      ...styles.img,
                      width: "95%",
                      height: "20mm",
                      marginLeft: "4pt",
                    }}
                    src={shippingLabel.shipToPostBarCode.base64}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    ...styles.td,
                    ...styles.borderLeft,
                    width: "40%",
                    paddingTop: "2pt",
                    paddingLeft: "2pt",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ height: "40%" }}>
                    <Text
                      style={{
                        fontSize: "7pt",
                        lineHeight: "12pt",
                      }}
                    >
                      Carrier Info
                    </Text>
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "3pt",
                      }}
                    >
                      <strong>{shippingLabel.carrierName}</strong>
                    </Text>
                  </div>
                  <div style={{ height: "60%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      PRO #:
                    </Text>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      BOL #: {shippingLabel.billOfLadingNumber}
                    </Text>
                  </div>
                </div>
              </div>
              <div style={{ height: "40mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "60%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    PO #: {shippingLabel?.poNumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Dept #: {shippingLabel?.department}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    SKU #: {shippingLabel?.sku}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Style #: {shippingLabel?.style}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Color: {shippingLabel?.colorName ?? "NO COLOR"}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                      paddingTop: "8pt",
                    }}
                  >
                    Quantity: {shippingLabel?.quantityShipped}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    Case #: {index + 1} of {labels?.length}
                  </Text>
                </div>

                <div
                  style={{
                    ...styles.td,
                    ...styles.borderLeft,
                    width: "40%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>Store #</strong>
                  </Text>
                  <Text
                    style={{
                      fontSize: "14pt",
                      lineHeight: "12pt",
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "20pt",
                    }}
                  >
                    <strong>{shippingLabel?.store}</strong>
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
                  <Text style={{ padding: "6pt 0pt", fontSize: "8pt" }}>
                    Serial Shipping Container Code
                  </Text>
                  <div
                    style={{
                      width: "80%",
                      marginLeft: "12%",
                      marginTop: "2pt",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "11pt",
                        lineHeight: "12pt",
                        paddingBottom: "2pt",
                      }}
                    >
                      {shippingLabel.ssccNumber}
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "32mm",
                      }}
                      src={shippingLabel.ssccBarCode.base64}
                      alt=""
                    />
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

const ShipmentPrintPageWithRef = React.forwardRef(ShipmentPrintPageFrancescas);

export { ShipmentPrintPageWithRef as ShipmentPrintPageFrancescas };

