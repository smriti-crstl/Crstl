import React, { ReactElement } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { ReactComponent as DownloadIcon } from "globals/assets/svgs/DownloadArrow.svg";
import { CSVColumn, CSV_DATE_FORMAT, FILE, POPOVER_TITLE } from "./csv.config";
import _ from "lodash";
import moment from "moment";
import { CSV } from "./csv.styles";
import { useDateRange } from "presentation/hooks/contexts";
import { StyledPopover } from "../common.styles";
import { theme } from "globals/themes";
import { useFlags } from "launchdarkly-react-client-sdk";

type ExportExcelProps = {
  csvData: any;
  fileName: string;
  style?: any;
  config?: CSVColumn[];
  showText?: boolean;
  showDateSelection?: boolean;
  defaultValue?: string;
  customDateRange?: string[];
  customDate?: string;
};

export const ExcelExport = ({
  csvData,
  fileName,
  style,
  config,
  showText = false,
  showDateSelection,
  defaultValue,
  customDateRange,
  customDate,
}: ExportExcelProps): ReactElement => {
  const fileType = FILE.TYPE;
  const fileExtension = FILE.EXTENSION;
  const flags = useFlags();

  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const exportToCSV = (csvData: any, fileName: string) => {
    const exportModel: string[] = [];
    const headers: string[] = [];
    config?.forEach((column: CSVColumn) => {
      if (!column.hidden) {
        exportModel.push(column.key);
        headers.push(column.label);
      }
    });
    const filteredData = csvData.map((c: any) => {
      if (defaultValue) {
        c.defaultValue = defaultValue;
      }
      if (showDateSelection) {
        if (customDateRange) {
          c.startDate = customDateRange[0];
          c.endDate = customDateRange[1];
        } else {
          c.startDate = moment(startDate).format(CSV_DATE_FORMAT);
          c.endDate = moment(endDate).format(CSV_DATE_FORMAT);
        }
      }
      return _.pick(c, exportModel);
    });
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [headers]);
    XLSX.utils.sheet_add_json(ws, filteredData, {
      origin: FILE.ORIGIN,
      skipHeader: true,
    });
    const csv = XLSX.utils.sheet_to_csv(ws);
    const data = new Blob([csv], { type: fileType });
    let date = moment().format(CSV_DATE_FORMAT);
    if (customDate) {
      date = customDate;
    } else if (showDateSelection) {
      date = `${moment(startDate).format(CSV_DATE_FORMAT)} - ${moment(
        endDate
      ).format(CSV_DATE_FORMAT)}`;
    }
    saveAs(data, `${fileName} (${date})${fileExtension}`);
  };

  if (!flags.exportCsvButton) {
    return <></>;
  }
  return (
    <StyledPopover
      title={POPOVER_TITLE}
      placement={"bottom"}
      color={theme.palette.colors.CONCORD}
    >
      <Button
        style={{
          ...style,
          display: "flex",
          borderRadius: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => exportToCSV(csvData, fileName)}
        icon={<DownloadIcon />}
      >
        {showText && <CSV>CSV</CSV>}
      </Button>
    </StyledPopover>
  );
};
