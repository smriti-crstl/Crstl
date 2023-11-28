import { numberFormatter } from "presentation/utils";

type Props = { quantity?: string; estValue?: string };

function TableCellTooltip({ quantity = "", estValue = "" }: Props = {}) {
  const parsedQuantity = parseInt(quantity);
  const formattedQuantity = isNaN(parsedQuantity)
    ? ""
    : numberFormatter(parsedQuantity);

  return (
    <>
      {formattedQuantity}
      {formattedQuantity && estValue?.length > 0 ? <> &middot; </> : null}
      {estValue?.length > 0 ? `Est. ${estValue}` : ""}
    </>
  );
}

export { TableCellTooltip };
