import { Radio, RadioChangeEvent, Space } from "antd";
import { useSaveCustomSortOrderMutation } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { StyledSecondaryButton } from "../../edi-edit/EdiEditPage.styles";
import { TextAreaSmall } from "../ShipmentPage.styles";
import { getShipmentDocsSortConfigFromLocalStorage } from "./ShipmentDocumentsModal";

export enum ShipNoticeSortByOption {
  UPC = "upc",
  SKU = "sku",
  VENDOR_PART_NUMBER = "vendorPartNumber",
}

const sortByOptions = [
  { label: "UPC", value: ShipNoticeSortByOption.UPC },
  { label: "SKU", value: ShipNoticeSortByOption.SKU },
  {
    label: "Vendor part number",
    value: ShipNoticeSortByOption.VENDOR_PART_NUMBER,
  },
];

enum CustomSortByDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export interface SortConfig {
  sortKey: ShipNoticeSortByOption;
  customSortOrder?: string;
  direction: CustomSortByDirection;
}

export interface IShipNoticeConfigProps {
  sortBy?: ShipNoticeSortByOption;
  setSortBy?: Dispatch<SetStateAction<ShipNoticeSortByOption>>;
  onApplyChanges?: (config: SortConfig) => void;
}

const ShipNoticeConfig: React.FC<IShipNoticeConfigProps> = ({
  sortBy,
  setSortBy,
  onApplyChanges,
}) => {
  const [customSortOrder, setCustomSortOrder] = useState<string>(() => {
    const config = getShipmentDocsSortConfigFromLocalStorage();
    return config?.customSortOrder?.replace(/,/g, "\n") || "";
  });
  const [internalSortBy, setInternalSortBy] = useState<ShipNoticeSortByOption>(
    () => {
      if (sortBy) {
        return sortBy;
      }
      const config = getShipmentDocsSortConfigFromLocalStorage();
      return config?.sortKey || ShipNoticeSortByOption.UPC;
    }
  );
  const {
    mutate: saveCustomSortOrder,
    isLoading: isSavingCustomSortOrder,
  } = useSaveCustomSortOrderMutation();

  const handleSaveConfigBtnClick = () => {
    if (!customSortByRequest?.customSortOrder) {
      setNotification({
        type: "success",
        moduleName: "",
        description: "Successfully saved sort configuration",
      });
      onApplyChanges?.(customSortByRequest);
      return;
    }

    saveCustomSortOrder(customSortByRequest, {
      onSuccess: () => {
        setNotification({
          type: "success",
          moduleName: "",
          description: "Successfully saved sort configuration",
        });
        onApplyChanges?.(customSortByRequest);
      },
      onError: () =>
        setNotification({
          type: "error",
          moduleName: "",
          description: "There was an error saving the sort configuration",
        }),
    });
  };

  const handleSortByChange = (e: RadioChangeEvent) => {
    setSortBy?.(e?.target?.value);
    setInternalSortBy(e?.target?.value);
  };

  const sortByValue = sortBy ?? internalSortBy;
  const customSortByRequest: any = useMemo(
    () => ({
      sortKey: sortByValue,
      customSortOrder: customSortOrder?.replace(/\n/g, ",") ?? "",
      direction: CustomSortByDirection.ASCENDING,
    }),
    [customSortOrder, sortByValue]
  );

  return (
    <div>
      <Space>
        <div>Sort By</div>
        <Radio.Group
          options={sortByOptions}
          onChange={handleSortByChange}
          value={sortByValue}
          optionType="button"
        />
      </Space>
      <div style={{ marginTop: 12 }}>
        <Space>
          <div>Custom Order</div>
          <TextAreaSmall
            placeholder="Enter custom sort order"
            onChange={(e) => setCustomSortOrder(e.target.value)}
            value={customSortOrder}
          ></TextAreaSmall>
        </Space>
      </div>
      <div style={{ marginTop: 8 }}>
        <StyledSecondaryButton
          loading={isSavingCustomSortOrder}
          onClick={handleSaveConfigBtnClick}
        >
          Save Configuration
        </StyledSecondaryButton>
      </div>
    </div>
  );
};

export default ShipNoticeConfig;

