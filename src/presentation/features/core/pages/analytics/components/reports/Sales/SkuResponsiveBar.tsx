import { ReactElement } from "react";
import { Bar } from "@nivo/bar";

export const SkuResponsiveBar = ({
  getSalesBySkuB2B,
  getSalesBySkuB2C,
  checkboxSelected,
}: {
  getSalesBySkuB2B: any;
  getSalesBySkuB2C: any;
  checkboxSelected: any;
}): ReactElement => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Bar
        data={
          checkboxSelected === "B2B"
            ? getSalesBySkuB2B.slice(0, 3)
            : getSalesBySkuB2C.slice(0, 3)
        }
        keys={["percentChange"]}
        indexBy="y"
        width={368}
        height={195}
        margin={{ top: 30, right: 24, bottom: 50, left: 40 }}
        padding={0.5}
        enableGridY={false}
        enableGridX={false}
        colors="rgba(0, 18, 166, 0.2)"
        borderColor="#0012A6"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Sales",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        theme={{
          textColor: "#8F9FAE",
          fontSize: 10,
          fontFamily: "Roboto",
          axis: {
            legend: {
              text: {
                fontSize: 10,
              },
            },
          },
        }}
        enableLabel={false}
        tooltip={({ id, value }) => (
          <div
            style={{
              padding: 12,
              background: "#222222",
            }}
          >
            <br />
            <strong>
              {id}: {value}
            </strong>
          </div>
        )}
      />
    </div>
  );
};
