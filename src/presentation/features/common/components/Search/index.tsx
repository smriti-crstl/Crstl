import { Badge, Button, Form, Input, Popover, Tooltip } from "antd";
import { CORE_EDI_SEARCH_VIEW_PAGE } from "globals/configs";
import { matchPath, useHistory, useLocation } from "react-router-dom";

import { FilterOutlined, FilterTwoTone } from "@ant-design/icons";

import { theme } from "globals/themes";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useSearchParams } from "presentation/hooks/common";
import React, { useEffect } from "react";
import { AdvancedSearchFrom } from "./AdvancedSearch/AdvancedSearch";
import { SearchParamsUrlEncoder } from "./SearchParamsUrlEncoder";
import { filterFormData } from "./helpers";
import { useSearchFormData } from "./hooks/useSearchFormData";
import { BaseForm } from "./style";
import { SearchFieldsValue } from "./types";

const { Search } = Input;

/**
 * Counts the number of applied filters.
 */
export const getFilterCount = (fieldsValue: SearchFieldsValue) => {
  let filterCount = 0;
  if (fieldsValue.filter) {
    for (const filterValue of Object.values(fieldsValue.filter)) {
      if (
        filterValue &&
        (!Array.isArray(filterValue) || filterValue.length > 0)
      ) {
        filterCount++;
      }
    }
  }
  return filterCount;
};

export const SearchBox = () => {
  const { setFormData } = useSearchFormData();
  const [searchForm] = Form.useForm();
  const history = useHistory();
  const { pathname } = useLocation();
  const searchParams = useSearchParams();
  const flags = useFlags();
  const [searchFormVisible, setSearchFormVisible] = React.useState(false);
  const [filterCount, setFilterCount] = React.useState(0);

  const handleSearch = () => {
    const fieldsValue: SearchFieldsValue = searchForm.getFieldsValue();
    setFormData(filterFormData(fieldsValue));
    updateFilterCount(fieldsValue);
    setSearchFormVisible(false);

    // no need to push to history if already on search page
    const searchPage = matchPath(pathname, {
      path: CORE_EDI_SEARCH_VIEW_PAGE,
      exact: true,
      strict: true,
    });
    if (!searchPage) {
      history.push(CORE_EDI_SEARCH_VIEW_PAGE);
    }

    // Update bookmarkable URL. Use replace so we don't add every search to the back history.
    if (flags.bookmarkableSearch) {
      let path = CORE_EDI_SEARCH_VIEW_PAGE;
      const queryString = SearchParamsUrlEncoder.encode(fieldsValue);
      if (queryString) {
        path += "?" + queryString;
      }
      history.replace(path);
    }
  };

  /**
   * Counts the number of applied fileters.
   */
  const updateFilterCount = (fieldsValue: SearchFieldsValue) => {
    setFilterCount(getFilterCount(fieldsValue));
  };

  // Restore search params from URL query string.
  useEffect(() => {
    const searchPage = matchPath(pathname, {
      path: CORE_EDI_SEARCH_VIEW_PAGE,
      exact: true,
      strict: true,
    });

    // Do not restore search params on the transaction list page.
    if (!searchPage || !flags.bookmarkableSearch) {
      return;
    }

    const fieldsValue = SearchParamsUrlEncoder.decode(searchParams, flags);
    searchForm.setFieldsValue(fieldsValue);
    setFormData(filterFormData(fieldsValue));
    updateFilterCount(fieldsValue);
  }, []);

  return (
    <BaseForm form={searchForm} name="search-form">
      <Form.Item name="searchString">
        <Search
          placeholder="Search e.g., PO12345, INV12345, etc."
          onSearch={handleSearch}
        />
      </Form.Item>
      <Popover
        content={
          <AdvancedSearchFrom
            searchForm={searchForm}
            handleSearch={handleSearch}
          />
        }
        placement="topRight"
        trigger="click"
        onVisibleChange={(visible) => setSearchFormVisible(visible)}
        visible={searchFormVisible}
      >
        <Tooltip title="Advanced Search" placement="right">
          <Badge size="small" count={filterCount}>
            <Button
              {...(filterCount > 0
                ? {
                    icon: (
                      <FilterTwoTone
                        twoToneColor={theme.palette.colors.ULTRAMARINE_BLUE}
                      />
                    ),
                  }
                : { icon: <FilterOutlined /> })}
            />
          </Badge>
        </Tooltip>
      </Popover>
    </BaseForm>
  );
};
