import userEvent from "@testing-library/user-event";
import { render, screen } from "test-utils";
import ShipNoticeConfig, {
  IShipNoticeConfigProps,
  ShipNoticeSortByOption,
} from "./ShipNoticeConfig";

const mockSetSortBy = jest.fn();

const defaultProps: IShipNoticeConfigProps = {
  sortBy: ShipNoticeSortByOption.UPC,
  setSortBy: mockSetSortBy,
};

const renderComponentWithProps = (props?: IShipNoticeConfigProps) => {
  const propsToPass = { ...defaultProps, ...props };

  render(<ShipNoticeConfig {...propsToPass} />);

  return {
    props: propsToPass,
  };
};

describe("ShipNoticeConfig", () => {
  it.each([
    ["upc", { sortBy: ShipNoticeSortByOption.UPC } as IShipNoticeConfigProps],
    ["sku", { sortBy: ShipNoticeSortByOption.SKU } as IShipNoticeConfigProps],
    [
      "vendor part number",
      {
        sortBy: ShipNoticeSortByOption.VENDOR_PART_NUMBER,
      } as IShipNoticeConfigProps,
    ],
  ])(`checks %s when %s is passed`, async (value, props) => {
    renderComponentWithProps(props);

    const regExp = new RegExp(value, "i"); // to do something like /upc/i but dynamically
    const item = screen.getByRole("radio", { name: regExp });
    expect(item).toBeChecked();
  });

  it("calls setSortBy when another option is clicked", async () => {
    const {
      props: { setSortBy },
    } = renderComponentWithProps();

    const vendorPartNumber = screen.getByRole("radio", {
      name: /vendor part number/i,
    });

    userEvent.click(vendorPartNumber);

    expect(setSortBy).toHaveBeenCalledTimes(1);
  });
});
