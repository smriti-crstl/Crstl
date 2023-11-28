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
  borderLeft: { borderLeft: "3pt solid black" },
  th: {
    borderBottom: "1pt solid black",
    borderCollapse: "collapse",
    padding: "8pt",
  },
  td: {
    borderBottom: "3pt solid black",
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

function ShipmentPrintPageCrateAndBarrelWarehouse(
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
              <div style={{ height: "38mm", display: "flex" }}>
                <div style={{ width: "56%", ...styles.td, paddingTop: "5pt" }}>
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>FROM:</strong>
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
                    ...styles.td,
                    ...styles.borderLeft,
                    width: "44%",
                    paddingTop: "8pt",
                    textAlign: "left",
                    fontSize: "14pt",
                    lineHeight: "16px",
                  }}
                >
                  <img
                    style={{
                      ...styles.img,
                      width: "80%",
                      height: "21mm",
                      marginLeft: "12pt",
                      paddingTop: "2pt",
                    }}
                    src={shippingLabel?.skuBarCode?.base64}
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "5pt",
                    }}
                  >
                    {shippingLabel?.sku}
                  </div>
                </div>
              </div>
              <div style={{ height: "29mm", display: "flex" }}>
                <div
                  style={{
                    width: "65%",
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
                    <strong>TO:</strong>
                  </Text>
                  <Text style={{ fontSize: "9pt", lineHeight: "11pt" }}>
                    <TextWithLineBreaks
                      textParts={shippingLabel?.shipTo.split("\n")}
                    />
                  </Text>
                </div>
                <div
                  style={{
                    width: "50%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "8pt",
                    fontSize: "9pt",
                    display: "flex",
                    paddingLeft: "18pt",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ height: "30%" }}>
                    Carton QTY: {shippingLabel?.quantityShipped}
                  </div>
                  <div>Weight: {shippingLabel?.weight}</div>
                </div>
              </div>
              <div style={{ height: "18mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingLeft: "5pt",
                    fontSize: "9pt",
                    paddingTop: "2pt",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ fontSize: "18pt", fontWeight: 400 }}>
                    {shippingLabel?.skuDescription}
                  </div>
                  <div>{shippingLabel?.vendorItemId}</div>
                </div>
              </div>
              <div style={{ height: "12mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingLeft: "5pt",
                    paddingTop: "1pt",
                    fontSize: "9pt",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ fontSize: "10pt" }}>
                    {shippingLabel?.departmentNumber}{" "}
                    {shippingLabel?.departmentDescription}
                  </div>
                  <div>
                    {shippingLabel?.classNumber}{" "}
                    {shippingLabel?.classDescription}
                  </div>
                </div>
              </div>
              <div style={{ height: "12mm", display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    ...styles.td,
                    paddingTop: "2pt",
                    paddingLeft: "5pt",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "10pt", lineHeight: "12pt" }}>
                      PO: {shippingLabel?.poNumber} <br />
                      Country: {shippingLabel?.itemCountryOfOrigin}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingLeft: "35pt",
                    paddingTop: "1pt",
                    fontSize: "23pt",
                    fontWeight: 400,
                    lineHeight: "1.3",
                  }}
                >
                  <div>{shippingLabel?.ssccNumberLast4Chars}</div>
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
                    paddingTop: "2pt",
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
                        fontSize: "10pt",
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
                        height: "18mm",
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

const ShipmentPrintPageWithRef = React.forwardRef(
  ShipmentPrintPageCrateAndBarrelWarehouse
);

export { ShipmentPrintPageWithRef as ShipmentPrintPageCrateAndBarrelWarehouse };

