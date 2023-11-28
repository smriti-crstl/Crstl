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

function ShipmentPrintPageThriveMarketDC(
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
                <div
                  style={{
                    width: "50%",
                    ...styles.td,
                    paddingTop: "2pt",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: "9pt",
                      lineHeight: "10pt",
                    }}
                  >
                    Ship From:
                  </Text>

                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "11pt",
                      width: "90%",
                    }}
                  >
                    {shippingLabel.from}
                  </Text>
                </div>
                <div
                  style={{
                    width: "50%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "2pt",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: "9pt",
                      lineHeight: "10pt",
                    }}
                  >
                    Ship To:
                  </Text>
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "11pt",
                    }}
                  >
                    <TextWithLineBreaks
                      textParts={shippingLabel.shipTo.split("\n")}
                    />
                  </Text>
                </div>
              </div>
              <div style={{ height: "29mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "50%",
                    paddingTop: "1pt",
                    textAlign: "left",
                    fontSize: "9pt",
                    lineHeight: "16px",
                  }}
                >
                  <div style={{ fontSize: "9pt" }}>
                    (420) Ship to Postal Code
                  </div>
                  <img
                    style={{
                      ...styles.img,
                      width: "95%",
                      height: "75%",
                      marginLeft: "6pt",
                    }}
                    src={shippingLabel?.shipToPostBarCode?.base64}
                    alt=""
                  />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {shippingLabel?.postalCode}
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "1pt",
                    fontSize: "9pt",
                  }}
                >
                  <div style={{ fontSize: "9pt" }}>
                    <strong>Carrier: </strong>
                    <div style={{ display: "inline" }}>
                      {shippingLabel?.carrierName}
                    </div>
                    <br />
                    <strong>B/L#: </strong>
                    <div style={{ display: "inline" }}>
                      {shippingLabel?.billOfLadingNumber}
                    </div>
                    <br />
                    <strong>PRO: </strong>
                    <div style={{ display: "inline" }}>
                      {shippingLabel?.carrierReferenceNumber}
                    </div>
                    <br />
                    <div style={{ marginTop: "10pt" }}>
                      <strong>Number of Cartons: </strong>
                      <br />
                      <div style={{ display: "inline" }}>
                        {index + 1} of {data?.data?.labels?.length}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <div style={{ height: "29mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingLeft: "10pt",
                  }}
                >
                  <div style={{ marginTop: "-5pt", lineHeight: "13pt" }}>
                    <div
                      style={{
                        fontSize: "10pt",
                        display: "inline",
                        fontWeight: "bold",
                      }}
                    >
                      Contents :
                    </div>
                    <div
                      style={{
                        fontSize: "10pt",
                        display: "inline",
                        lineHeight: "10pt",
                      }}
                    >
                      {shippingLabel?.contents}
                    </div>
                    <br />
                    <Text
                      style={{
                        fontSize: "10pt",
                        display: "inline",
                        fontWeight: "bold",
                      }}
                    >
                      PO #:
                    </Text>
                    <Text style={{ fontSize: "10pt", display: "inline" }}>
                      {shippingLabel?.poNumber}
                    </Text>
                    <br />
                    <Text
                      style={{
                        fontSize: "10pt",
                        display: "inline",
                        fontWeight: "bold",
                      }}
                    >
                      Item #:
                    </Text>
                    <Text style={{ fontSize: "10pt", display: "inline" }}>
                      {shippingLabel?.sku}
                    </Text>
                    <br />
                    <Text
                      style={{
                        fontSize: "10pt",
                        display: "inline",
                        fontWeight: "bold",
                      }}
                    >
                      Item Desc:
                    </Text>
                    <Text style={{ fontSize: "10pt", display: "inline" }}>
                      {shippingLabel?.itemDescription}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginTop: "7pt",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "9pt",
                        display: "inline",
                        fontWeight: "bold",
                      }}
                    >
                      Carton QTY:
                    </Text>
                    1
                  </div>
                </div>
              </div>
              <div style={{ height: "29mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50%",
                    ...styles.borderLeft,
                    ...styles.td,
                  }}
                ></div>
              </div>
              <div style={{ height: "38mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingTop: "1pt",
                    textAlign: "left",
                    fontSize: "9pt",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "10pt",
                      justifyContent: "center",
                    }}
                  >
                    Serialized Shipping Container Number
                  </div>
                  <img
                    style={{
                      ...styles.img,
                      width: "95%",
                      height: "40%",
                      marginTop: "6pt",
                    }}
                    src={shippingLabel?.ssccBarCode?.base64}
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10pt",
                    }}
                  >
                    {shippingLabel?.ssccNumber}
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
  ShipmentPrintPageThriveMarketDC
);

export { ShipmentPrintPageWithRef as ShipmentPrintPageThriveMarketDC };
