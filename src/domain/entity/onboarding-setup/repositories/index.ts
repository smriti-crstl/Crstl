import { AxiosResponse } from "axios";
import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  GetOnboardingFormSubmissionResFE,
  OnboardingConfigFE,
  PostOnboardingFormSubmissionBodyFE,
  PostOnboardingFormSubmissionResFE,
} from "../models";

const ENDPOINTS = {
  GET_ONBOARDING_SETUP_CONFIG: "edi-onboarding/config",
  GET_ONBOARDING_SETUP_FORM_SUBMISSION: "edi-onboarding/form-submission",
  POST_ONBOARDING_SETUP_FORM_SUBMISSION: "edi-onboarding/form-submission",
};

export const getOnboardingSetupConfig = async ({
  queryKey: [_id, tradingPartnerId, requestType],
}: QueryFunctionContext<string[]>): Promise<OnboardingConfigFE> => {
  return await API_V1.get(ENDPOINTS.GET_ONBOARDING_SETUP_CONFIG, {
    params: {
      tradingPartnerId,
      requestType,
    },
  }).then((res: AxiosResponse<OnboardingConfigFE>) => res.data);
};

export const getOnboardingSetupFormSubmission = async ({
  queryKey: [_id, tradingPartnerId, requestType],
}: QueryFunctionContext<
  string[]
>): Promise<GetOnboardingFormSubmissionResFE> => {
  return await API_V1.get(ENDPOINTS.GET_ONBOARDING_SETUP_FORM_SUBMISSION, {
    params: {
      tradingPartnerId,
      requestType,
    },
  }).then((res: AxiosResponse<GetOnboardingFormSubmissionResFE>) => res.data);
};

export const postOnboardingSetupFormSubmission = async (
  payload: PostOnboardingFormSubmissionBodyFE
): Promise<PostOnboardingFormSubmissionResFE> => {
  return await API_V1.post(
    ENDPOINTS.POST_ONBOARDING_SETUP_FORM_SUBMISSION,
    payload
  ).then((res: AxiosResponse<PostOnboardingFormSubmissionResFE>) => res.data);
};

