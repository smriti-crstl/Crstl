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

function ShipmentPrintPage(
  { data }: ShipmentPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const labels = data?.data?.labels; // concat(data?.data?.labels);

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {labels?.map((shippingLabel) => {
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
                      From:
                    </Text>
                    <Text style={{ fontSize: "8pt", lineHeight: "9pt" }}>
                      {shippingLabel.from}
                    </Text>
                  </td>
                  <td
                    style={{ ...styles.td, ...styles.borderLeft }}
                    // className="borderLeft"
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
                      <strong>
                        <TextWithLineBreaks
                          textParts={shippingLabel.shipTo.split("\n")}
                        />
                      </strong>
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td style={styles.td} width="50%" valign="top">
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      Ship to Post:
                    </Text>
                    <Text
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      {shippingLabel.postalCode}
                    </Text>
                    <img
                      style={{
                        ...styles.img,
                        width: "100%",
                        height: "16.76mm",
                      }}
                      src={shippingLabel.shipToPostBarCode.base64}
                      alt=""
                    />
                  </td>
                  <td
                    style={{ ...styles.td, ...styles.borderLeft }}
                    // className="borderLeft"
                    width="50%"
                    valign="top"
                  >
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      Carrier:
                    </Text>
                    <Text
                      style={{
                        fontSize: "8pt",
                        lineHeight: "9pt",
                      }}
                    >
                      <strong>{shippingLabel.carrierName}</strong>
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td style={styles.td} colSpan={2} valign="top">
                    <Text>
                      <strong>
                        PO#: {shippingLabel.poNumber}
                        <br />
                        DCPI: {shippingLabel.dpci}
                        <br />
                        Casepack: {shippingLabel.casePack}
                        <br />
                      </strong>
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "15mm" }}>
                  <td style={{ ...styles.td, padding: 0 }} colSpan={2}>
                    <table
                      className="transparent-table"
                      style={{ width: "100%" }}
                    >
                      <tr style={{ width: "100%" }}>
                        <td
                          style={{ ...styles.td, borderBottom: "none" }}
                          width="50%"
                          valign="top"
                        >
                          <Text style={{ fontSize: "9pt", lineHeight: "10pt" }}>
                            Style: <strong>{shippingLabel.style}</strong>
                            <br />
                            Size:
                          </Text>
                        </td>
                        <td
                          style={{ ...styles.td, borderBottom: "none" }}
                          width="50%"
                          valign="top"
                        >
                          <Text style={{ fontSize: "9pt", lineHeight: "10pt" }}>
                            UPC #: <strong>{shippingLabel.upc}</strong>
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8pt" }} colSpan={2}>
                          <Text style={{ fontSize: "9pt", lineHeight: "10pt" }}>
                            Product Description:{" "}
                            <strong>{shippingLabel.productDescription}</strong>
                          </Text>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr style={{ height: "32mm" }}>
                  <td
                    colSpan={2}
                    valign="top"
                    style={{ ...styles.td, borderBottom: "none" }}
                  >
                    <Text style={{ display: "flex", justifyContent: "center" }}>
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

const ShipmentPrintPageWithRef = React.forwardRef(ShipmentPrintPage);

export { ShipmentPrintPageWithRef as ShipmentPrintPage };
