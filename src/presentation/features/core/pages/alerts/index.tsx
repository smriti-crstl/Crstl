import { ReactElement, useEffect, useState } from "react";
import { Row, Table } from "antd";
import { useAlertsQuery } from "domain/interactors/alerts";
import {
  BodyRowContainer,
  ExpandedRow,
  FilterPills,
  FiltersBar,
  ParentRow,
  Subtitle,
  Title,
} from "./alerts.styles";
import moment from "moment";
import { Spinner } from "@crstl/components/atoms/loading";
import { HeaderShadowContainerWithoutTabs } from "@crstl/components/molecules/headers";
import { CustomDateRangePicker } from "../analytics/components/common";
import { HeaderButtonGroup } from "@crstl/components/molecules/button-groups/header-button-group";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  decodeUrl,
  encodeToUrl,
  parseSearchParams,
} from "presentation/utils/common";
import {
  LIVE_TABS,
  PATH_NAMES,
  TIMESTAMP_FORMAT,
  SUBTYPES,
  Subtype,
  Alert,
  DATE_FORMAT,
  DAYS,
  FILTER,
} from "./alerts.config";
import { CORE_ALERTS } from "globals/configs";
import { ValueOf } from "globals/types";

const defaultDateRange: moment.Moment[] = [
  moment().subtract(30, DAYS),
  moment(),
];
const defaultDateRangeStrings: { startDate: string; endDate: string } = {
  startDate: moment().subtract(30, DAYS).format(DATE_FORMAT),
  endDate: moment().format(DATE_FORMAT),
};

const useQuery = (): URLSearchParams =>
  new URLSearchParams(useLocation().search);

const CoreAlerts = (): ReactElement => {
  const columns = [
    {
      title: "",
      dataIndex: "headline",
      key: "id",
      render: (value: string, record: Alert) => {
        return {
          children: (
            <ParentRow>
              <Title>{value}</Title>
              <Subtitle>
                {moment(record.createdAt).format(TIMESTAMP_FORMAT)}
              </Subtitle>
            </ParentRow>
          ),
        };
      },
    },
  ];
  type AlertsQueryParams = {
    filter: string;
  };

  const [tabSelected, setTabSelected] = useState<ValueOf<Subtype>>(
    LIVE_TABS.ALL
  );
  const [datesSelected, setDatesSelected] = useState(defaultDateRange);
  const [dateStrings, setDateStrings] = useState(defaultDateRangeStrings);
  const { selectedTab: currentType } = useParams<{ selectedTab: string }>();

  const { startDate, endDate } = dateStrings;
  const { data: alertsData, isFetching } = useAlertsQuery(startDate, endDate);

  const [alerts, setAlerts] = useState(alertsData?.data);

  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const { search } = location;

  useEffect(() => {
    if (tabSelected !== LIVE_TABS.ALL) {
      const filteredAlerts = alertsData?.data?.filter(
        (alert: Alert) =>
          alert.subtype === SUBTYPES[tabSelected.toUpperCase() as keyof Subtype]
      );
      setAlerts(filteredAlerts);
    } else {
      setAlerts(alertsData?.data);
    }
  }, [alertsData?.data, tabSelected]);

  useEffect(() => {
    if (PATH_NAMES.includes(currentType)) {
      setTabSelected(
        currentType.charAt(0).toUpperCase() + currentType.slice(1)
      );

      const nextPath = generatePath(CORE_ALERTS, {
        selectedTab: currentType.toLowerCase(),
      });
      history.replace({ ...history.location, pathname: nextPath });
    } else {
      const nextPath = generatePath(CORE_ALERTS, {
        selectedTab: tabSelected.toLowerCase(),
      });
      history.replace({ ...history.location, pathname: nextPath });
    }
  }, [history, currentType, tabSelected]);

  useEffect(() => {
    if (history.location.search.indexOf(FILTER) !== -1) {
      const { filter } = parseSearchParams<AlertsQueryParams>(search);
      const { dates } = decodeUrl(filter.toString());
      if (!dates) {
        return setDatesSelected(defaultDateRange);
      }
      const datesArray = [moment(dates[0]), moment(dates[1])];
      const datesStrings = [
        datesArray[0].format(DATE_FORMAT),
        datesArray[1].format(DATE_FORMAT),
      ];
      changeDates(datesArray, datesStrings);
    } else {
      setDatesSelected(defaultDateRange);
    }
  }, []);

  const changeDates = (dates: moment.Moment[], dateStrings: string[]): void => {
    if (!dates) {
      return;
    }
    setDatesSelected(dates);
    setDateStrings({
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
    const base64 = encodeToUrl({ dates }, true);
    query.set(FILTER, base64);
    history.push({ search: query.toString() });
  };

  const handleOnClick = (selectedTab: string): void => {
    setTabSelected(selectedTab);
    const nextPath = generatePath(CORE_ALERTS, {
      selectedTab: selectedTab.toLowerCase(),
    });
    history.replace({ ...history.location, pathname: nextPath });
  };

  return (
    <div>
      <HeaderShadowContainerWithoutTabs />
      <FiltersBar>
        <CustomDateRangePicker
          datesSelected={datesSelected}
          changeDates={changeDates}
        />
        <FilterPills>
          <HeaderButtonGroup
            firstButtonText={LIVE_TABS.ALL}
            secondButtonText={LIVE_TABS.ALERTS}
            thirdButtonText={LIVE_TABS.UPDATES}
            fourthButtonText={LIVE_TABS.SUMMARY}
            tabSelected={tabSelected}
            onClick={handleOnClick}
          />
        </FilterPills>
      </FiltersBar>
      {!isFetching ? (
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          expandable={{
            // eslint-disable-next-line react/display-name
            expandedRowRender: (record) => (
              <ExpandedRow>
                <BodyRowContainer>
                  {record.body.map((r: string, index: number) => (
                    <Row key={index}>{r}</Row>
                  ))}
                </BodyRowContainer>
                <a href={record.ctaURL}>{record.ctaLabel}</a>
              </ExpandedRow>
            ),
            rowExpandable: (record) => record.body.length !== 0,
          }}
          dataSource={alerts}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CoreAlerts;
