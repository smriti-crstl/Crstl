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

function ShipmentPrintPageMeijer(
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
              <div style={{ height: "24mm", display: "flex" }}>
                <div style={{ width: "40%", ...styles.td }}>
                  <Text
                    style={{
                      fontSize: "10pt",
                      lineHeight: "11pt",
                    }}
                  >
                    <strong>{shippingLabel.from}</strong>
                  </Text>
                </div>
                <div
                  style={{
                    ...styles.td,
                    ...styles.borderLeft,
                    width: "60%",
                    paddingTop: "6pt",
                    paddingLeft: "20pt",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                ></div>
              </div>
              <div style={{ height: "27mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "20%",
                    paddingTop: "6pt",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      display: "flex",
                      fontSize: "10pt",
                      width: "65%",
                      marginLeft: "4pt",
                      paddingTop: "5pt",
                    }}
                  >
                    TO:
                  </Text>
                </div>
                <div
                  style={{
                    ...styles.td,
                    width: "80%",
                    paddingTop: "6pt",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ height: "90%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "14pt",
                        paddingTop: "3pt",
                      }}
                    >
                      <strong>
                        <TextWithLineBreaks
                          textParts={shippingLabel.shipTo.split("\n")}
                        />
                      </strong>
                    </Text>
                  </div>
                </div>
              </div>
              <div style={{ height: "22mm", display: "flex" }}>
                <div
                  style={{
                    ...styles.td,
                    width: "55%",
                    paddingTop: "8pt",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      fontSize: "9pt",
                      lineHeight: "9pt",
                      marginLeft: "4pt",
                      marginTop: "2pt",
                    }}
                  >
                    {shippingLabel.postalCode}
                  </Text>
                  <img
                    style={{
                      ...styles.img,
                      width: "100%",
                      height: "14mm",
                      marginLeft: "4pt",
                      marginRight: "4pt",
                    }}
                    src={shippingLabel?.shipToPostBarCode?.base64}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    ...styles.td,
                    ...styles.borderLeft,
                    width: "45%",
                    paddingTop: "5pt",
                    paddingLeft: "5pt",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ height: "30%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      <strong>DEPT: {shippingLabel?.department ?? ""}</strong>
                    </Text>
                  </div>
                  <div style={{ height: "30%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      <strong>PO: {shippingLabel?.poNumber ?? ""}</strong>
                    </Text>
                  </div>
                  <div style={{ height: "30%" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                      }}
                    >
                      <strong>FOR: {shippingLabel?.store ?? ""}</strong>
                    </Text>
                  </div>
                </div>
              </div>
              <div
                style={{
                  ...styles.td,
                  height: "16mm",
                  display: "flex",
                }}
              >
                <div></div>
              </div>
              <div style={{ height: "32mm" }}>
                <div
                  style={{
                    ...styles.td,
                    borderBottom: "none",
                  }}
                >
                  <Text>
                    <strong>(00) SERIAL SHIPPING CONTAINER</strong>
                  </Text>
                  <div
                    style={{
                      width: "80%",
                      marginLeft: "4pt",
                      marginTop: "6pt",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "10pt",
                        lineHeight: "12pt",
                        padding: "3pt",
                        paddingBottom: "5pt",
                      }}
                    >
                      {shippingLabel.ssccNumber}
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "20mm",
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

const ShipmentPrintPageWithRef = React.forwardRef(ShipmentPrintPageMeijer);

export { ShipmentPrintPageWithRef as ShipmentPrintPageMeijer };

