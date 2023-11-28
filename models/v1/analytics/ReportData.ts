export interface ReportData {
  code: ReportDataCode;
  data: any;
}

enum ReportDataCode {
  success = "success",
  fail = "fail",
  no_data = "no_data"
}
