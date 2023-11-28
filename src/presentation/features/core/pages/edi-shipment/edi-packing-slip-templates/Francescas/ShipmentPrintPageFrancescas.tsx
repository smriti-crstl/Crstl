import { ShippingLabelModel } from "domain/entity/edi/models";
import { useUserDetails } from "presentation/hooks/common";
import React, { CSSProperties } from "react";
import { css } from "styled-components";

interface FrancescasPackingSlipPrintPageProps {
  data?: ShippingLabelModel;
}

const styles: Record<string, CSSProperties> = {
  page: {
    paddingLeft: "10mm",
    paddingTop: "20mm",
    width: "279.4mm",
    height: "214mm",
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

function FrancescasPackingSlipPrintPage(
  { data }: FrancescasPackingSlipPrintPageProps,
  ref: React.Ref<HTMLDivElement>
) {
  const [{ data: userDetailsData }] = useUserDetails();

  const blankArray = new Array(11).fill(0);

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {printStyles[0]}
      </style>
      <>
        <div className="page" style={styles.page}>
          <div style={{ paddingBottom: "10mm" }}>
            <table
              style={{
                border: "1px solid black",
                width: "274mm",
                height: "24mm",
              }}
              cellSpacing={0}
              cellPadding="11mm"
              rules="all"
            >
              <tr>
                <td style={{ width: "50%" }} align="center">
                  <strong>{userDetailsData?.organizationName}</strong>
                  <br />
                  <strong>PACKING LIST</strong>
                </td>
                <td style={{ width: "50%" }} align="right">
                  <div>Date__________</div>
                  <br />
                  <div>Prepared by__________</div>
                </td>
              </tr>
            </table>
          </div>
          <div
            style={{
              width: "274mm",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <table
              style={{ border: "1px solid black" }}
              cellSpacing={0}
              cellPadding="11mm"
              rules="all"
            >
              <tr>
                <td>Retailer Name</td>
                <td style={{ width: "140mm" }}></td>
              </tr>
              <tr>
                <td>PO #</td>
                <td style={{ width: "140mm" }}></td>
              </tr>
              <tr>
                <td>Total Weight</td>
                <td style={{ width: "140mm" }}></td>
              </tr>
            </table>
            <table
              style={{ border: "1px solid black" }}
              cellSpacing={0}
              cellPadding="11mm"
              rules="all"
            >
              <tr>
                <td>Total Cartons</td>
                <td style={{ width: "42mm" }}></td>
              </tr>
              <tr>
                <td>Total Pallets</td>
                <td style={{ width: "42mm" }}></td>
              </tr>
            </table>
          </div>

          <table
            style={{
              border: "1px solid black",
              width: "274mm",
              marginTop: "5mm",
            }}
            cellSpacing={0}
            cellPadding="5mm"
            rules="all"
          >
            <thead>
              <tr>
                <td align="center" style={{ width: "20%" }}>
                  Carton Size
                </td>
                <td align="center" style={{ width: "20%" }}>
                  SKU#
                </td>
                <td align="center" style={{ width: "12%" }}>
                  Units per carton
                </td>
                <td align="center" style={{ width: "12%" }}>
                  Carton Count
                </td>
                <td align="center" style={{ width: "12%" }}>
                  Carton Weight
                </td>
                <td align="center" style={{ width: "20%" }}>
                  Pallet # / Pallet Height
                </td>
              </tr>
            </thead>
            <tbody>
              <tr style={{ height: "8mm" }}>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td>1 &nbsp;&nbsp;&nbsp; of </td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>
              {blankArray.map((_, index) => (
                <tr key={index} style={{ height: "8mm" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

const FrancescasPackingSlipPrintPageWithRef = React.forwardRef(
  FrancescasPackingSlipPrintPage
);

export { FrancescasPackingSlipPrintPageWithRef as FrancescasPackingSlipPrintPage };

