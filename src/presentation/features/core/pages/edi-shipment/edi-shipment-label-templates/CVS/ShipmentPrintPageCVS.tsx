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

function ShipmentPrintPageCVS(
  { data }: ShipmentPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const labels = data?.data?.labels;

  const cartonLabels = labels?.filter(
    (label) => label.labelType === "carton_label"
  );

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      {cartonLabels?.map((shippingLabel) => {
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
                    colSpan={2}
                  >
                    <Text style={{ fontSize: "8pt", lineHeight: "9pt" }}>
                      <TextWithLineBreaks
                        textParts={shippingLabel.from.split("\n")}
                      />
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td style={styles.td} colSpan={2} valign="top">
                    <Text>
                      <span style={{ textTransform: "uppercase" }}>
                        Purchase Order #
                      </span>
                      <br />
                      {shippingLabel.poNumber}
                    </Text>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td style={styles.td} colSpan={2} valign="top">
                    <table
                      className="transparent-table"
                      style={{ width: "100%" }}
                    >
                      <tr style={{ width: "100%" }}>
                        <td width="50%" valign="top">
                          CVS Item Number
                        </td>
                        <td width="50%" valign="top">
                          {shippingLabel.cvsLineItemNumber}
                        </td>
                      </tr>
                      <tr style={{ width: "100%" }}>
                        <td width="50%" valign="top">
                          Product Desc
                        </td>
                        <td width="50%" valign="top">
                          {shippingLabel.style}
                        </td>
                      </tr>
                      <tr style={{ width: "100%" }}>
                        <td width="50%" valign="top">
                          Case Pack
                        </td>
                        <td width="50%" valign="top">
                          {shippingLabel.casePack} pieces per case
                        </td>
                      </tr>
                      <tr style={{ width: "100%" }}>
                        <td width="50%" valign="top">
                          Weight
                        </td>
                        <td width="50%" valign="top">
                          {shippingLabel.weight}
                        </td>
                      </tr>
                      <tr style={{ width: "100%" }}>
                        <td width="50%" valign="top">
                          Exp. Date
                        </td>
                        <td width="50%" valign="top">
                          {shippingLabel.expiryDate}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr style={{ height: "20mm" }}>
                  <td style={styles.td} colSpan={2}>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: "15pt",
                        fontSize: "14pt",
                      }}
                    >
                      Case UPC unavailable
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "32mm" }}>
                  <td
                    colSpan={2}
                    valign="top"
                    style={{ ...styles.td, borderBottom: "none" }}
                  >
                    <img
                      style={{
                        ...styles.img,
                        width: "180px",
                        height: "113px",
                      }}
                      src={shippingLabel.upcaBarcode?.base64}
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

const ShipmentPrintPageWithRef = React.forwardRef(ShipmentPrintPageCVS);

export { ShipmentPrintPageWithRef as ShipmentPrintPageCVS };
