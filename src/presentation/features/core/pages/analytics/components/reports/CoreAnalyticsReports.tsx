/* eslint-disable @typescript-eslint/no-unused-vars */
import { CORE_ANALYTICS } from "globals/configs";
import moment from "moment";
import { decodeUrl, encodeToUrl, parseSearchParams } from "presentation/utils";
import { createContext, ReactElement, useEffect, useState } from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { HeaderButtonGroup } from "@crstl/components/molecules/button-groups/header-button-group";

import { LIVE_TABS, PATH_NAMES } from "../../config";
import { CustomDateRangePicker } from "../common";
import { ReportsView } from "./ReportsView";
interface IAnalyticsTabWrapper {
  tabSelected?: string;
}

const AnalyticsTabWrapper = styled.div<IAnalyticsTabWrapper>`
  ${(props) =>
    props.tabSelected === LIVE_TABS.ALL
      ? `display: grid;
        grid-template-columns: 800px 400px;
        grid-template-rows: min-content min-content;`
      : `display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 1200px;`}
  margin: auto;
`;

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1200px;
  margin: 20px auto;
  padding: 0 12px;
`;

const FilterPills = styled.div`
  margin-left: 100px;
`;

const defaultDateRange: any = [moment().subtract(30, "days"), moment()];
const defaultDateRangeStrings: { startDate: string; endDate: string } = {
  startDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
};

type AnalyticsQueryParams = {
  filter: string;
};

const useQuery = (): URLSearchParams =>
  new URLSearchParams(useLocation().search);

export const AnalyticsDateRangeContext = createContext(defaultDateRangeStrings);

export const CoreAnalyticsReports = (): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

  const [tabSelected, setTabSelected] = useState(LIVE_TABS.ALL);
  // const theme = useContext(ThemeContext);
  const { selectedTab: currentType } = useParams<{ selectedTab: string }>();
  const { search } = location;
  const [datesSelected, setDatesSelected] = useState<any>(defaultDateRange);
  const [dateStrings, setDateStrings] = useState(defaultDateRangeStrings);

  const changeDates = (dates: any, dateStrings: any): void => {
    if (!dates) {
      return;
    }
    setDatesSelected(dates);
    setDateStrings({
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
    const base64 = encodeToUrl({ dates }, true);
    query.set("filter", base64);
    history.push({ search: query.toString() });
  };

  useEffect(() => {
    if (PATH_NAMES.includes(currentType)) {
      setTabSelected(
        currentType.charAt(0).toUpperCase() + currentType.slice(1)
      );

      const nextPath = generatePath(CORE_ANALYTICS, {
        selectedTab: currentType.toLowerCase(),
      });
      history.replace({ ...history.location, pathname: nextPath });
    } else {
      const nextPath = generatePath(CORE_ANALYTICS, {
        selectedTab: tabSelected.toLowerCase(),
      });
      history.replace({ ...history.location, pathname: nextPath });
    }
  }, [history, currentType, tabSelected]);

  useEffect(() => {
    if (history.location.search.indexOf("filter") !== -1) {
      const { filter } = parseSearchParams<AnalyticsQueryParams>(search);
      const { dates } = decodeUrl(filter.toString());
      if (!dates) {
        return setDatesSelected(defaultDateRange);
      }
      const datesArray = [moment(dates[0]), moment(dates[1])];
      const datesStrings = [
        datesArray[0].format("YYYY-MM-DD"),
        datesArray[1].format("YYYY-MM-DD"),
      ];
      changeDates(datesArray, datesStrings);
    } else {
      setDatesSelected(defaultDateRange);
    }
  }, []);

  const handleOnClick = (selectedTab: string): void => {
    setTabSelected(selectedTab);
    const nextPath = generatePath(CORE_ANALYTICS, {
      selectedTab: selectedTab.toLowerCase(),
    });
    history.replace({ ...history.location, pathname: nextPath });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FiltersBar>
        <CustomDateRangePicker
          datesSelected={datesSelected}
          changeDates={changeDates}
        />
        <FilterPills>
          <HeaderButtonGroup
            firstButtonText={LIVE_TABS.ALL}
            secondButtonText={LIVE_TABS.FINANCE}
            thirdButtonText={LIVE_TABS.OPERATIONS}
            fourthButtonText={LIVE_TABS.SALES}
            tabSelected={tabSelected}
            onClick={handleOnClick}
          />
        </FilterPills>
      </FiltersBar>
      <AnalyticsTabWrapper tabSelected={tabSelected}>
        <AnalyticsDateRangeContext.Provider value={dateStrings}>
          <ReportsView tabSelected={tabSelected} />
        </AnalyticsDateRangeContext.Provider>
      </AnalyticsTabWrapper>
    </div>
  );
};
