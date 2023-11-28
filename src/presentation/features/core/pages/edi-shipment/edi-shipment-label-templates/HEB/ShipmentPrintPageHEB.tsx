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

function ShipmentPrintPageHEB(
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
              <div style={{ height: "26mm", display: "flex" }}>
                <div style={{ width: "50%", ...styles.td, paddingTop: "2pt" }}>
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>From:</strong>
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
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>To:</strong>
                  </Text>
                  <Text style={{ fontSize: "9pt", lineHeight: "11pt" }}>
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
                  <div>Ship to Postal Code:</div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <strong>{shippingLabel?.postalCode}</strong>
                  </div>
                  <img
                    style={{
                      ...styles.img,
                      width: "80%",
                      height: "18mm",
                      marginLeft: "13pt",
                    }}
                    src={shippingLabel?.shipToPostBarCode?.base64}
                    alt=""
                  />
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
                  <div style={{ height: "30%" }}>
                    <strong>BOL: {shippingLabel?.billOfLadingNumber}</strong>
                  </div>
                  <div>
                    <strong>PO#: {shippingLabel?.poNumber}</strong>
                  </div>
                </div>
              </div>
              <div style={{ height: "12mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingLeft: "10pt",
                    fontSize: "9pt",
                  }}
                >
                  <strong>Expiration Date:</strong>
                </div>
              </div>
              <div
                style={{
                  height: "26mm",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    ...styles.td,
                    width: "18%",
                    fontSize: "9pt",
                    paddingLeft: "10pt",
                    display: "flex",
                    gap: "10pt",
                    paddingTop: "0pt",
                  }}
                >
                  H E B
                </div>
                <div
                  style={{
                    ...styles.td,
                    width: "82%",
                    fontSize: "9pt",
                    paddingTop: "0pt",
                    paddingLeft: "0pt",
                    fontWeight: "bold",
                  }}
                >
                  <div>Item # and Description:</div>
                  <div
                    style={{
                      textOverflow: "clip",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {shippingLabel?.productIdentifier},{" "}
                    {shippingLabel?.productDescription}
                  </div>
                  <div>Quantity: {shippingLabel?.quantityShipped}</div>
                  <div>Vendor Part #:</div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    ...styles.td,
                    borderBottom: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "4pt",
                  }}
                >
                  <div
                    style={{
                      width: "80%",
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
                      {shippingLabel?.ssccNumber}
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "46mm",
                      }}
                      src={shippingLabel?.ssccBarCode?.base64}
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

const ShipmentPrintPageWithRef = React.forwardRef(ShipmentPrintPageHEB);

export { ShipmentPrintPageWithRef as ShipmentPrintPageHEB };

