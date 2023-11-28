import { TablePaginationConfig } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import { EventLogResponseModelDataItem } from "domain/entity/edi/models";
import { Key } from "react";

export type EventLogColumnKey =
  | "REFERENCE_ID"
  | "EVENT_NUMBER"
  | "TRADING_PARTNER"
  | "DOCUMENT_ID"
  | "DOCUMENT_TYPE"
  | "MESSAGE"
  | "DOCUMENT_DIRECTION"
  | "CREATED_TIMESTAMP";

export interface TableConfig {
  pagination?: TablePaginationConfig;
  filters?: Record<string, (Key | boolean)[] | null>;
  sorter?:
    | SorterResult<EventLogResponseModelDataItem>
    | SorterResult<EventLogResponseModelDataItem>[];
}

