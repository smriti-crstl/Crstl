import { ShippingLabelModel } from "domain/entity/edi/models";
import React, { CSSProperties } from "react";
import { css } from "styled-components";

interface ShipmentPalletLabelPrintPageProps {
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

function ShipmentPalletLabelPrintPage(
  { data }: ShipmentPalletLabelPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const labels = data?.data?.labels ?? [];

  const palletLabels = labels?.filter(
    (label) => label?.labelType === "pallet_label"
  );

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {palletLabels?.map((shippingLabel) => {
        return (
          <>
            <div className="page" key={shippingLabel.id} style={styles.page}>
              <div style={{ height: "42mm", display: "flex" }}>
                <div
                  style={{
                    width: "48%",
                    ...styles.td,
                    paddingTop: "2pt",
                    paddingRight: "25pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "11pt",
                    }}
                  >
                    FROM:
                  </Text>
                  <Text
                    style={{
                      fontSize: "11pt",
                      lineHeight: "12pt",
                      width: "90%",
                    }}
                  >
                    <TextWithLineBreaks
                      textParts={shippingLabel?.from?.split("\n")}
                    />
                  </Text>
                </div>
                <div
                  style={{
                    width: "52%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "2pt",
                    paddingRight: "25pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "11pt",
                    }}
                  >
                    TO:
                  </Text>
                  <Text style={{ fontSize: "11pt", lineHeight: "12pt" }}>
                    <TextWithLineBreaks
                      textParts={shippingLabel?.shipTo?.split("\n")}
                    />
                  </Text>
                </div>
              </div>
              <div style={{ height: "42mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "48%",
                    paddingTop: "4pt",
                    textAlign: "left",
                    fontSize: "11pt",
                    lineHeight: "12px",
                  }}
                >
                  <div>SHIP TO POST:</div>
                  <img
                    style={{
                      ...styles.img,
                      width: "88%",
                      height: "28mm",
                      marginLeft: "13pt",
                    }}
                    src={shippingLabel?.shipToPostBarCode?.base64}
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8pt",
                    }}
                  >
                    {shippingLabel?.postalCode}
                  </div>
                </div>
                <div
                  style={{
                    width: "52%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "1pt",
                    fontSize: "12pt",
                    lineHeight: "13pt",
                  }}
                >
                  <div>CARRIER: {shippingLabel?.carrierName}</div>
                  <div>B/L: {shippingLabel?.billOfLadingNumber}</div>
                  <div>PRO: </div>
                  <div>PO#: {shippingLabel?.poNumber}</div>
                </div>
              </div>
              <div style={{ height: "28mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingTop: "14pt",
                    paddingLeft: "8pt",
                    fontSize: "11pt",
                  }}
                >
                  MULTI ITEM PALLET
                </div>
              </div>
              <div style={{ height: "32mm" }}>
                <div
                  style={{
                    ...styles.td,
                    borderBottom: "none",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "4pt",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <div style={{ fontSize: "11pt", lineHeight: "11pt" }}>
                      SSCC:
                    </div>
                    <div style={{ width: "65%", margin: "auto" }}>
                      <img
                        style={{
                          ...styles.img,
                          width: "100%",
                          height: "22mm",
                        }}
                        src={shippingLabel?.ssccBarCode?.base64}
                        alt=""
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: "9pt",
                          lineHeight: "12pt",
                          paddingBottom: "2pt",
                        }}
                      >
                        {shippingLabel?.ssccNumber}
                      </Text>
                    </div>
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

const ShipmentPalletLabelPrintPageWithRef = React.forwardRef(
  ShipmentPalletLabelPrintPage
);

export { ShipmentPalletLabelPrintPageWithRef as HEBWarehousePalletLabelPrintPage };

