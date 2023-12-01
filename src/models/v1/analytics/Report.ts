export interface ReportModel {
  id: string;
  code: string;
  type: string;
  subtype?: string;
  title: string;
  subtitle?: string;
  metadata: any;
  sequence?: number;
  queryVariables?: any;
}
