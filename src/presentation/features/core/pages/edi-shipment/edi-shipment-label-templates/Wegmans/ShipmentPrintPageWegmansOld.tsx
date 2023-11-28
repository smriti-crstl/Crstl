import { ShippingLabelModel } from "domain/entity/edi/models";
import React, { CSSProperties } from "react";
import { css } from "styled-components";

interface ShipmentPrintPageProps {
  data?: ShippingLabelModel;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100mm",
    height: "140mm",
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

function ShipmentPrintPageWegmansOld(
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
                <div style={{ width: "40%", ...styles.td, paddingTop: "2pt" }}>
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>FROM</strong>
                  </Text>
                  <Text
                    style={{
                      fontSize: "8pt",
                      lineHeight: "10.5pt",
                      paddingLeft: "10pt",
                      width: "90%",
                    }}
                  >
                    {shippingLabel.from}
                  </Text>
                </div>
                <div
                  style={{
                    width: "60%",
                    ...styles.borderLeft,
                    ...styles.td,
                    paddingTop: "2pt",
                    display: "flex",
                    gap: "10pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "9pt",
                      lineHeight: "12pt",
                    }}
                  >
                    <strong>TO</strong>
                  </Text>
                  <Text style={{ fontSize: "8pt", lineHeight: "11.5pt" }}>
                    <TextWithLineBreaks
                      textParts={shippingLabel.shipTo.split("\n")}
                    />
                  </Text>
                </div>
              </div>
              <div style={{ height: "31mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingTop: "2pt",
                    textAlign: "left",
                  }}
                >
                  <img
                    style={{
                      ...styles.img,
                      width: "95%",
                      height: "24mm",
                      marginLeft: "4pt",
                      marginTop: "2pt",
                    }}
                    src={shippingLabel.gs128BarCode.base64}
                    alt=""
                  />
                  <Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "10pt",
                      lineHeight: "9pt",
                      marginLeft: "4pt",
                      marginTop: "3pt",
                    }}
                  >
                    {shippingLabel.gs128}
                  </Text>
                </div>
              </div>
              <div style={{ height: "16mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "100%",
                    paddingLeft: "20pt",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "12pt",
                    }}
                  >
                    PO: {shippingLabel?.poNumber}
                  </Text>
                </div>
              </div>
              <div
                style={{
                  height: "30mm",
                  display: "flex",
                  borderBottom: "1px solid black",
                }}
              ></div>
              <div style={{ height: "32mm" }}>
                <div
                  style={{
                    ...styles.td,
                    borderBottom: "none",
                    paddingTop: "2pt",
                    display: "flex",
                  }}
                >
                  <Text style={{ fontSize: "10pt" }}>
                    <strong>SSCC</strong>
                  </Text>
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

const ShipmentPrintPageWithRef = React.forwardRef(ShipmentPrintPageWegmansOld);

export { ShipmentPrintPageWithRef as ShipmentPrintPageWegmansOld };

