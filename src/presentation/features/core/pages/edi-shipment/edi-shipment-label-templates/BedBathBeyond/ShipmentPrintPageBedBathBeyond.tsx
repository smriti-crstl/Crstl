import { ShippingLabelModel } from "domain/entity/edi/models";
import React, { CSSProperties } from "react";
import { css } from "styled-components";
import moment from "moment";

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
    padding: "2pt 4pt",
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

function ShipmentPrintPageBedBathBeyond(
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
              <table className="table" cellSpacing={0}>
                <tr style={{ height: "20mm" }}>
                  <td
                    style={styles.td}
                    className="from-address"
                    width="50%"
                    valign="top"
                  >
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      <strong>FROM:</strong>
                    </Text>
                    <Text style={{ fontSize: "8pt", lineHeight: "9pt" }}>
                      {shippingLabel.from}
                    </Text>
                  </td>
                  <td
                    style={{ ...styles.td, ...styles.borderLeft }}
                    width="50%"
                    valign="top"
                  >
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: "9pt",
                        lineHeight: "10pt",
                      }}
                    >
                      <strong>To:</strong>
                    </Text>
                    <Text style={{ fontSize: "9pt", lineHeight: "10pt" }}>
                      <TextWithLineBreaks
                        textParts={shippingLabel.shipTo.split("\n")}
                      />
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td style={styles.td} width="50%" valign="top">
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      <strong>To Zip:</strong>
                    </Text>
                    <Text
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "8pt",
                        lineHeight: "9pt",
                        marginTop: "-6pt",
                      }}
                    >
                      {shippingLabel.postalCode}
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "18mm",
                      }}
                      src={shippingLabel?.shipToPostBarCode?.base64}
                      alt=""
                    />
                  </td>
                  <td
                    style={{ ...styles.td, ...styles.borderLeft }}
                    width="50%"
                    valign="top"
                  >
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      <strong>Mark For:</strong>
                    </Text>
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      {shippingLabel.markFor}
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td
                    style={{ ...styles.td, textAlign: "center" }}
                    colSpan={2}
                    valign="top"
                  >
                    <Text style={{ fontSize: "10pt", lineHeight: "12pt" }}>
                      PO NUMBER: {shippingLabel.poNumber}
                      <br />
                      <img
                        style={{
                          ...styles.img,
                          height: "12mm",
                        }}
                        src={shippingLabel?.poNumberBarCode?.base64}
                        alt=""
                      />
                      Label Create Date:{" "}
                      {moment(shippingLabel?.createdAt).format("MM/DD/YYYY")}
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "2pt" }}>
                    <Text style={{ fontSize: "10pt", lineHeight: "12pt" }}>
                      Description: {shippingLabel.productDescription}
                    </Text>
                    <Text style={{ fontSize: "10pt", lineHeight: "12pt" }}>
                      UPC: {shippingLabel.upc}
                    </Text>
                  </td>
                  <td style={{ width: "50%" }}>
                    <Text style={{ textAlign: "center" }}>
                      <strong>QTY: {shippingLabel.quantity}</strong>
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "12mm",
                      }}
                      src={shippingLabel?.upcBarCode?.base64}
                      alt=""
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      ...styles.td,
                      textAlign: "center",
                      paddingBottom: "2pt",
                    }}
                  >
                    <Text style={{ fontSize: "14pt", lineHeight: "16pt" }}>
                      Category: {shippingLabel.category}
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ ...styles.td, verticalAlign: "top" }}>
                    <Text
                      style={{
                        fontSize: "10pt",
                        lineHeight: "12pt",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Pool ID:
                      <span>
                        {/* TODO: shippingLabel.poolId - clarify from BBB Specs */}
                        {index + 1} of {labels?.length}
                      </span>
                    </Text>
                  </td>
                  <td style={{ ...styles.td, ...styles.borderLeft }}>
                    <Text style={{ fontSize: "10pt", lineHeight: "12pt" }}>
                      Store #:
                    </Text>
                    <Text
                      style={{
                        fontSize: "22pt",
                        lineHeight: "24pt",
                        textAlign: "center",
                      }}
                    >
                      {shippingLabel.store}
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} valign="top" style={{ ...styles.td }}>
                    <Text style={{ fontSize: "10pt", lineHeight: "12pt" }}>
                      Event:
                      <br />
                      <br />
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "32mm" }}>
                  <td
                    colSpan={2}
                    valign="top"
                    style={{ ...styles.td, borderBottom: "none" }}
                  >
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      (00) Serial Container Number
                    </Text>
                    <Text
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "4pt",
                      }}
                    >
                      {shippingLabel.ssccNumber}
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "24mm",
                      }}
                      src={shippingLabel?.ssccBarCode?.base64}
                      alt=""
                    />
                  </td>
                </tr>
              </table>
            </div>
          </>
        );
      })}
    </div>
  );
}

const ShipmentPrintPageWithRef = React.forwardRef(
  ShipmentPrintPageBedBathBeyond
);

export { ShipmentPrintPageWithRef as ShipmentPrintPageBedBathBeyond };

