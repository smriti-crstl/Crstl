import { ReactElement } from "react";

import { SimpleTag } from "@crstl/components/atoms/tags";

import { ORDER_TABLE_FILTER_TAGS_DATA_INDEXES_MAPPINGS } from "../../config";
import { ConfigFiltersState } from "./OrderFilters";

type OrderTagsProps = {
  handleOnChange: (x: { [x: string]: string | undefined }) => void;
  configFiltersState: ConfigFiltersState;
};

export const OrderTags = ({
  configFiltersState,
  handleOnChange,
}: OrderTagsProps): ReactElement => {
  const configKeys = Object.keys(configFiltersState);

  const handleTagClose = ({ menuKey }: { menuKey: string }): void => {
    handleOnChange({ [menuKey]: undefined });
  };

  return (
    <>
      {configKeys.map((menuKey) => {
        // Don't show the tag if key is Sort
        if (menuKey === "sort") {
          return null;
        }
        const menuItemValue = configFiltersState[menuKey];
        const tagName = ORDER_TABLE_FILTER_TAGS_DATA_INDEXES_MAPPINGS[menuKey]
          ? `${
              ORDER_TABLE_FILTER_TAGS_DATA_INDEXES_MAPPINGS[menuKey]
            }: ${menuItemValue?.split(",").join(", ")}`
          : "";
        if (tagName) {
          return (
            <SimpleTag
              closable
              key={tagName}
              visible={!!menuItemValue}
              onClose={() => handleTagClose({ menuKey })}
            >
              {tagName}
            </SimpleTag>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
