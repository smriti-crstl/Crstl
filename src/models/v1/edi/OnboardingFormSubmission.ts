export interface PostOnboardingFormSubmissionBody {
  tradingPartnerId: string;
  onboardingConfigId: string;
  relatedOnboardingTaskId?: string;
  formData: any;
  sendAfterSave: boolean;
  requestType: string;
}

export interface PostOnboardingFormSubmissionRes {
  status: number;
  code: string;
  data: {
    message?: string;
    error?: string;
  };
}

export interface GetOnboardingFormSubmissionRes {
  status: number;
  code: string;
  data: {
    formData?: any;
    isSubmitted?: boolean;
    error?: string;
  };
}
