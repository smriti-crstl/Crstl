import { CoreRouteOrdersOptions, CORE_ORDERS } from "globals/configs";
import { identity, pickBy } from "lodash";
// import { numberFormatter } from "presentation/utils";
import { parse } from "qs";
import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  CheckboxDropdownMenu,
  DropdownMenuProps,
} from "components/molecules/dropdowns";
import { StyledCol, StyledRow } from "./OrderFilterStyles";

export type ConfigFiltersState = {
  [p: string]: string;
};

type OrdersFiltersProps = {
  configFilters: DropdownMenuProps[];
  orderDetailsLoading: boolean;
  setIncludeShopify: React.Dispatch<React.SetStateAction<boolean>>;
  setIncludeAmazon: React.Dispatch<React.SetStateAction<boolean>>;
  configFiltersState: ConfigFiltersState;
  setConfigFiltersState: React.Dispatch<
    React.SetStateAction<ConfigFiltersState>
  >;
  includeShopify: boolean;
  includeAmazon: boolean;
  // numberOfShopifyRecords: undefined | number;
  // isCountSuccess: boolean;
  // isCountFetching: boolean;
};

export const OrdersFilters = ({
  configFilters,
  orderDetailsLoading,
  setIncludeShopify,
  includeShopify,
  includeAmazon,
  configFiltersState,
  setConfigFiltersState,
  setIncludeAmazon,
}: OrdersFiltersProps): ReactElement => {
  const history = useHistory();
  const { search } = useLocation();
  const parsedObj = parse(search.slice(1));
  const isFirstRender = useRef(true);
  const { source } = useParams<{
    source: string;
  }>();
  useLayoutEffect(() => {
    return () => {
      isFirstRender.current = false;
    };
  }, [parsedObj]);

  useLayoutEffect(() => {
    if (!isFirstRender.current) {
      const path = generatePath(CORE_ORDERS, {
        type: "all",
        pageNumber: 1,
        source: source ? source : CoreRouteOrdersOptions.SHOPIFY,
      });
      history.replace({
        ...history.location,
        pathname: path,
      });
    }
  }, [configFiltersState, history, search]);

  const handleExcludeShopify = (): void => {
    setIncludeShopify(!includeShopify);
  };

  const handleExcludeAmazon = (): void => {
    setIncludeAmazon(!includeAmazon);
  };
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
      <StyledRow gutter={[0, 8]} wrap>
        {configFilters.map((filter, index) => (
          <StyledCol key={index}>
            <CheckboxDropdownMenu
              key={filter.buttonText}
              menuConfig={filter.menuConfig}
              buttonText={filter.buttonText}
              onChange={handleOnChange}
              parentModule={filter.parentModule}
              controlledState={configFiltersState[filter.parentModule]}
              isLoading={filter.isLoading}
            />
          </StyledCol>
        ))}
      </StyledRow>
    </>
  );
};
