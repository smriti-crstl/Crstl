import { Row } from "antd";
import { CORE_ORDERS_V2 } from "globals/configs";
import { identity, pickBy } from "lodash";
import { parse } from "qs";
import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { generatePath, useHistory, useLocation } from "react-router-dom";
import {
  CheckboxDropdownMenu,
  DropdownMenuProps,
} from "@crstl/components/molecules/dropdowns";

import { OrderTags } from "../../orders/components/common/Tags";

export type ConfigFiltersState = {
  [p: string]: string;
};

type OrdersFiltersProps = {
  configFilters: DropdownMenuProps[];
  orderDetailsLoading: boolean;
  configFiltersState: ConfigFiltersState;
  setConfigFiltersState: React.Dispatch<
    React.SetStateAction<ConfigFiltersState>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const NewOrdersFilters = ({
  configFilters,
  configFiltersState,
  setConfigFiltersState,
  setPage,
}: OrdersFiltersProps): ReactElement => {
  const history = useHistory();
  const { search } = useLocation();
  const parsedObj = parse(search.slice(1));
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    return () => {
      isFirstRender.current = false;
    };
  }, [parsedObj]);

  useLayoutEffect(() => {
    setPage(1);
    if (!isFirstRender.current) {
      const path = generatePath(CORE_ORDERS_V2, {
        type: "all",
        pageNumber: 1,
      });
      history.replace({
        ...history.location,
        pathname: path,
      });
    }
  }, [configFiltersState, history, search]);

  const handleOnChange = useCallback((individualMenuState) => {
    setConfigFiltersState((prev) => {
      const keys = Object.keys(individualMenuState);
      const menuKey = keys.length > 0 ? keys[0] : null;
      if (menuKey) {
        const filters = { ...prev, [menuKey]: individualMenuState[menuKey] };
        return pickBy(filters, identity);
      } else {
        return prev;
      }
    });
  }, []);

  return (
    <>
      <Row gutter={[0, 8]} wrap>
        {configFilters.map((filter) => (
          <CheckboxDropdownMenu
            key={filter.buttonText}
            menuConfig={filter.menuConfig}
            buttonText={filter.buttonText}
            onChange={handleOnChange}
            parentModule={filter.parentModule}
            controlledState={configFiltersState[filter.parentModule]}
            isLoading={filter.isLoading}
          />
        ))}
      </Row>
      <div
        style={{
          marginTop: "8px",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <OrderTags
          handleOnChange={handleOnChange}
          configFiltersState={configFiltersState}
        />
      </div>
    </>
  );
};
