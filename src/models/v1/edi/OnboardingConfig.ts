export interface OnboardingConfig {
  status: number;
  code: string;
  data: {
    config?: OnboardingConfigData;
    error?: string;
  };
}

type RequestType = "New" | "Change";

export interface OnboardingConfigData {
  id: string;
  tradingPartnerId: string;
  requestType: RequestType;
  formConfig: FormConfig;
  submissionConfig: SubmissionConfig;
}

interface FormConfig {
  schema: any;
  uiSchema?: any;
}

type SubmissionType = "api_call" | "email" | "document";

interface SubmissionConfig {
  type: SubmissionType;
  url?: string;
  method?: string;
  contentType?: string;
  docusignDocumentId?: string; // TODO: change this if docusign is not used
  sendMailTo?: string;
}
