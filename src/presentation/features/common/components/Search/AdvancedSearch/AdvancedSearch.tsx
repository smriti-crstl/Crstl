import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import {
  useGetAdvancedSearchDocuments,
  useGetTradingPartners,
} from "domain/interactors/shared";
import moment from "moment";
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "presentation/features/core/pages/edi-edit/EdiEditPage.styles";
import { getTpfName } from "presentation/features/core/pages/edi/edi.utils";
import { DOCUMENT_TYPE_FILTER_CONFIG } from "presentation/features/core/pages/edi/event-log/constants";

import { CommonSelect } from "@crstl/components/atoms/selects";

import { SearchDocumentsDateField } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { RuleObject } from "antd/lib/form";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useEffect } from "react";
import {
  DATE_FIELD_OPTIONS_CONFIG,
  DATE_FIELD_WARNING,
  SEARCH_LABEL_CONSTANTS,
  SEARCH_NAME_CONSTANTS,
  STATUS_OPTIONS_CONFIG,
} from "../constants";
import { useSearchFormData } from "../hooks/useSearchFormData";
import {
  FromItemContainer,
  StyledButtonContainer,
  StyledContainer,
} from "./style";

const { RangePicker } = DatePicker;

const DOCUMENT_TYPE_CONFIG = DOCUMENT_TYPE_FILTER_CONFIG.filter(
  ({ value }) => value !== "997"
).map(({ text, value }) => ({
  label: text,
  value,
}));

export const AdvancedSearchFrom = ({
  searchForm,
  handleSearch,
}: {
  searchForm: any;
  handleSearch: () => void;
}) => {
  const flags = useFlags();

  const { data: tradingPartners } = useGetTradingPartners({
    select: (response) =>
      response?.data?.map(({ id, name, flavor }) => {
        const text = getTpfName({ name, flavor });

        return {
          label: text,
          value: id,
        };
      }),
  });

  const { formData } = useSearchFormData();
  const { isFetching } = useGetAdvancedSearchDocuments(formData, {
    enabled: false,
  });

  const onCalenderChange: RangePickerProps["onCalendarChange"] = (dates) => {
    if (!dates) return;
    const data = {
      filter: {
        createdAt: dates,
      },
    };
    searchForm.setFieldsValue(data);
    return;
  };

  const handleResetSearch = () => {
    searchForm.resetFields();
    handleSearch();
  };

  const dateFieldValidator = (
    rule: RuleObject,
    values: string[],
    callback: (error?: string) => void
  ) => {
    if (values && values.length > 0) {
      for (const value of values) {
        // created_at is supported on all documents.
        if (value !== SearchDocumentsDateField.created_at) {
          callback(DATE_FIELD_WARNING);
          return;
        }
      }
    }

    callback();
  };

  useEffect(() => {
    // Apply validation to fields restored from the URL.
    searchForm.validateFields();
  }, []);

  return (
    <StyledContainer>
      {flags.searchAdditionalDateFields && (
        <FromItemContainer
          label={SEARCH_LABEL_CONSTANTS.DATE_FIELD}
          name={SEARCH_NAME_CONSTANTS.DATE_FIELD}
          className="ant-row-no-wrap date-field"
          rules={[
            {
              validator: dateFieldValidator,
            },
          ]}
        >
          <CommonSelect
            mode="multiple"
            placeholder="Select Date Fields"
            options={DATE_FIELD_OPTIONS_CONFIG}
          />
        </FromItemContainer>
      )}
      <FromItemContainer
        label={SEARCH_LABEL_CONSTANTS.DATE_RANGE}
        name={
          flags.searchAdditionalDateFields
            ? SEARCH_NAME_CONSTANTS.DATE_RANGE
            : SEARCH_NAME_CONSTANTS.CREATED_AT
        }
      >
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          // Allow future dates if additional date fields are enabled.
          disabledDate={
            flags.searchAdditionalDateFields
              ? undefined
              : (current) => current > moment().endOf("day")
          }
          onCalendarChange={onCalenderChange}
        />
      </FromItemContainer>
      <FromItemContainer
        label={SEARCH_LABEL_CONSTANTS.TRADING_PARTNER}
        name={SEARCH_NAME_CONSTANTS.TRADING_PARTNER}
      >
        <CommonSelect
          mode="multiple"
          placeholder="Select Trading Partners"
          options={tradingPartners || []}
        />
      </FromItemContainer>
      <FromItemContainer
        label={SEARCH_LABEL_CONSTANTS.DOCUMENT_TYPE}
        name={SEARCH_NAME_CONSTANTS.DOCUMENT_TYPE}
      >
        <CommonSelect
          mode="multiple"
          placeholder={"Select Document Types"}
          options={DOCUMENT_TYPE_CONFIG}
        />
      </FromItemContainer>
      <FromItemContainer
        label={SEARCH_LABEL_CONSTANTS.STATUS}
        name={SEARCH_NAME_CONSTANTS.STATUS}
      >
        <CommonSelect
          mode="multiple"
          placeholder={"Select Statuses"}
          options={STATUS_OPTIONS_CONFIG}
        />
      </FromItemContainer>
      {/*
        // * Note: Hiding document direction for now
        <FromItemContainer
          label={SEARCH_LABEL_CONSTANTS.DOCUMENT_DIRECTION}
          name={SEARCH_NAME_CONSTANTS.DOCUMENT_DIRECTION}
        >
          <Radio.Group>
            <Radio defaultChecked>All</Radio>
            <Radio value={"incoming"}>Incoming</Radio>
            <Radio value={"outgoing"}>Outgoing</Radio>
          </Radio.Group>
        </FromItemContainer>
      */}
      <StyledButtonContainer>
        <StyledSecondaryButton onClick={handleResetSearch} loading={isFetching}>
          Reset
        </StyledSecondaryButton>
        <StyledPrimaryButton onClick={handleSearch} loading={isFetching}>
          Search
        </StyledPrimaryButton>
      </StyledButtonContainer>
    </StyledContainer>
  );
};
