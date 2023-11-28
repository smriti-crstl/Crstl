import { formatValue } from "../utils/formatValue";

interface Props {
  format?: string;
  formattedDate: string;
  seriesName: string;
  seriesColor?: string;
  x: number;
  y: number;
  currency?: string;
}

function ChartTooltip({
  format,
  formattedDate,
  seriesName,
  seriesColor,
  y,
  currency,
}: Props) {
  const formattedValue = formatValue(y, format, currency);
  return (
    <div
      style={{
        backgroundColor: seriesColor,
        color: "black",
        padding: "5px 10px",
        borderRadius: "3px",
        fontSize: "12px",
        lineHeight: "15px",
        boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.08)",
        width: "200px",
        whiteSpace: "normal",
        wordWrap: "break-word",
        textAlign: "center",
      }}
    >
      {formattedDate}
      <br />
      <br />
      {seriesName}: {formattedValue}
    </div>
  );
}

export { ChartTooltip };
