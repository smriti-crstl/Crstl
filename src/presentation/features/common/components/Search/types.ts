export interface AdvanceSearchOptions {
  label: string;
  value: string;
}

/**
 * The data type used in the search form.
 */
export interface SearchFieldsValue {
  searchString?: string;
  filter?: {
    tradingPartnerId?: string[];
    documentType?: string[];
    status?: string[];
    createdAt?: (moment.Moment | undefined)[];
    dateField?: string[];
    dateRange?: (moment.Moment | undefined)[];
  };
}
