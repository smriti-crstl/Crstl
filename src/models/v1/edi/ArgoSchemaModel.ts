export interface ArgoSchemaModel {
  status: number;
  code: string;
  data?: {
    enhancedSchema?: any;
    quickEntryUISchema?: any;
    fullEntryUISchema?: any;
    viewModeUISchema?: any;
    defaultInputSchema?: any;
  };
  metadata?: {
    id: string;
    ediDocument?: string;
    ediRelease?: string;
    ediStandard?: string;
  };
  error?: {
    message: string;
  };
}
